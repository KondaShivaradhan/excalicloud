import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { checkName } from '~misc/Constants';
import { AuthData } from '~routes';
import IconButton, { buttonIcons, buttonTypes } from './Components/IconButton';
import { log } from 'console';
import ErrBadge from './Components/ErrBadge';

type Props = {}

const AddNew = (props: Props) => {
    const context = AuthData()
    const [selectedOption, setSelectedOption] = useState('');

    const [name, setName] = useState('');
    const navigate = useNavigate()
    const handleChange = (event) => {
        setName(event.target.value);
    };
    function getLocalStorage(operation: string) {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: 'getLocalStorageData' }, async function (response) {
                /* Handle response from the content script if needed
                got responce
                 now send it to backend and store in Database!
                 object contains. exaclidraw, excalidraw-collab,
                 send these to backend email,name, canvasdata
                */
                console.log('====================================');
                console.log(response);
                console.log('====================================');
                if (operation.match('save'))
                    await context.saveRecord(context.user.data.email, name, JSON.stringify(response)).then(() => {
                        navigate('/')
                    })
                else
                    try {


                        await context.updateRecord(context.user.data.email, selectedOption, JSON.stringify(response)).then(() => {
                            navigate('/')
                        })
                    } catch (error) {
                        console.error("ERROR at ADDNEW updtate", error);

                    }
            });
        });
    }
    async function saveRecord() {
        const nameRegex = /^[a-zA-Z][a-zA-Z0-9]*$/;

        if (!name || !name.match(nameRegex) || checkName(name, context.user.data.data)) {
            getLocalStorage('save');
        }
        else {
            // Name already exits
            console.log(name, "already exits");
            alert('name should be unqiue')

        }
    }
    async function updateR() {
        const nameRegex = /^[a-zA-Z][a-zA-Z0-9]*$/;
        console.log(selectedOption);

        if (selectedOption) {
            getLocalStorage('update');
        }
        else {
            // Name selectedOption exits
            alert('Select a Canvas')

        }
    }

    const SehandleChange = (event) => {
        console.log(event.target);

        setSelectedOption(event.target.value);
    };
    return (
        <div className='p-4 w-52 flex flex-col flex-nowrap gap-4'>
            {
                context.user.data.data.length > 0 &&
                <div className='flex flex-col gap-1 items-center'>
                    <label htmlFor="select" className="block text-gray-700 text-sm font-bold mb-2">
                        {selectedOption ? 'Updating '+selectedOption:'Select canvas to update'}
                    </label>
                    <select
                        id="select"
                        className="block appearance-none w-full bg-white border border-gray-400 text-gray-700 p-2 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        value={selectedOption}
                        onChange={SehandleChange}
                        defaultChecked={true}
                        required
                    >
                        <option disabled selected value={''}> -- select an option -- </option>
                        {context.user.data.data.map((Canvas, i) => (
                            <option key={i} value={Canvas.name}>{Canvas.name}</option>
                        ))}
                    </select>
                    
                    <IconButton onClick={() => { updateR() }} type={buttonTypes.blue} text='Update' />
                </div>
            }
            {
                context.user.data.data.length < 5 ?
                    <div className=" flex flex-col flex-nowrap gap-3">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            New Record
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="mt-1 p-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 w-full"
                            placeholder="Enter name"
                            value={name}
                            onChange={handleChange}
                            required
                        />
                        <button type="submit" onClick={saveRecord} className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Save</button>
                    </div>
                    :
                        <ErrBadge  text='Free users can store upto 5 records'/>
            }
            <IconButton onClick={()=>{navigate('/')}} type={buttonTypes.red} icon={buttonIcons.back} text='back'/>
        </div>
    )
}

export default AddNew

function callback(response: any) {
    throw new Error('Function not implemented.');
}
