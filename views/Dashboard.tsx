import React, { } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthData } from '~routes'
import IconButton, { buttonIcons, buttonTypes } from './Components/IconButton';
import ErrBadge from './Components/ErrBadge';
import Badge, { BadgeIcons } from './Components/Badge';
type Props = {

}

const Dashboard = (props: Props) => {
  const context = AuthData()
  const user = context.user
  const navigate = useNavigate();
  const deleteThis = async (name: string) => {
    try {
      const response = await fetch('http://172.27.239.102:3003/excali/', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: name, email: user.data.email, })
      });
      if (response.ok) {
        // Successful login logic here
        console.log(response.json());
        context.fetchAll(user.data.email)
      } else {
        // Handle failed login
        const data = await response.json();
        console.log("Delete failed");

      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  return (
    <div className='p-4 flex flex-col justify-evenly w-52 overflow-hidden gap-2 items-center '>
      <div className='overflow-auto'>
        <p className=''><span className='font-bold'>Welcome</span> {(user.data.email)}</p>
        <Badge text={user.data.ispaid?'Paid':'Freemium'} icon={user.data.ispaid?BadgeIcons.party:BadgeIcons.free}/>
      </div>
      {/* exsisting data */}
      {user.data.data.length > 0 ?
        <div className='flex flex-col flex-wrap gap-2 p-2 m-2'>
          
          <h4 className=" font-bold text-gray-800 ">Load any existing canvas</h4>
          {user.data.data.map((Canvas, index) => (
            <div key={index} className="flex items-center justify-center gap-1">
              <button
                type="button"
                onClick={() => {
                  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                    chrome.tabs.sendMessage(tabs[0].id, { action: 'triggerContentScript', parameter: Canvas.canvasData }, function (response) {
                      // Handle response from content script if needed
                      console.log(response);
                      
                    });
                  });
                }}
                className="flex-grow-0 flex-shrink-0 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              >
                {Canvas.name}
              </button>
              <IconButton onClick={() => { deleteThis(Canvas.name) }} icon={buttonIcons.trash} type={buttonTypes.red} />

            </div>

          ))}
        </div>
        :
        <ErrBadge onClick={() => { console.log("working") }} text='No saved canvas found!' />

      }
      {/* Save current Canvas */}
      <IconButton type={buttonTypes.blue}  onClick={() => {
        navigate('/new')
      }} text='Save this Canvas'/>
      {/* Logout */}
      <IconButton onClick={() => { context.logout() }} type={buttonTypes.red} text='Logout' />
    </div>
  )
}

export default Dashboard