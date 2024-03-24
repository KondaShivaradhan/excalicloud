import { Confetti, PiggyBank, Warning } from '@phosphor-icons/react';
import * as React from 'react';
import { buttonSize } from './IconButton';

type Props = {
    type?: string
    text: string
    icon?: React.ReactNode
    onClick?: () => void;
}
export const BadgeTypes = { red: 'red', green: 'green', blue: 'blue' };
export const BadgeIcons = {
    party: <Confetti size={buttonSize} />,
    free:<PiggyBank  size={buttonSize}/>
};
const Badge: React.FC<Props> = (props) => {
    const handleClick = () => {
        if (props.onClick) {
            props.onClick();
        }
    };
    return (
        <div onClick={handleClick} className='p-1 border rounded-lg flex items-center gap-1 border-green-800 max-w-fit'>
            {props.icon}
            <span>
                {props.text}
            </span>
        </div>
    );
}
export default Badge