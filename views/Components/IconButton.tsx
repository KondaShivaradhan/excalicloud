import { CaretLeft, Trash } from 'phosphor-react'
import React, { type ReactNode } from 'react'

type Props = {
    type: string
    text?: string
    icon?: ReactNode
    onClick?: () => void;

}
const buttonSize = 16
export const buttonTypes = { red: 'red', green: 'green', blue: 'blue' };
export const buttonIcons = {
    back: <CaretLeft size={buttonSize} />,
    trash: <Trash size={buttonSize} />,
};
/**
 * Custom IconButton
 * @param props 
 * @returns 
 */
const IconButton = (props: Props) => {
    const handleClick = () => {
        if (props.onClick) {
            props.onClick();
        }
    };
    var buttonStyle = ``;

    if (props.type.match('red'))
        buttonStyle = `w-fit ${((props.text && props.icon) ? 'pr-2 pl-1 py-1' : 'p-1')} flex flex-row flex-nowrap text-center items-center bg-transparent text-red-900 border border-red-400 rounded-md hover:bg-red-600 hover:text-white focus:outline-none focus:bg-red-600`;

    else if (props.type.match('green'))
        buttonStyle = `w-fit flex flex-row flex-nowrap text-center items-center bg-transparent text-red-900 border border-red-400 rounded-md hover:bg-red-600 hover:text-white focus:outline-none focus:bg-red-600`;
    else if (props.type.match('blue'))
        buttonStyle = "w-fit px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
    return (
        <button onClick={handleClick} type="button" className={buttonStyle}>
            {props.icon}
            {props.text &&
                <span>{props.text}</span>
            }
        </button>
    )
}

export default IconButton