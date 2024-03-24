import { Warning } from 'phosphor-react';
import * as React from 'react';

type Props = {
    type?: string
    text: string
    icon?: React.ReactNode
    onClick?: () => void;
}

const ErrBadge: React.FC<Props> = (props) => {
    const handleClick = () => {
        if (props.onClick) {
            props.onClick();
        }
    };
    return (
        <div  onClick={handleClick} className='p-2 bg-yellow-100 border rounded-lg flex items-center gap-1 border-yellow-500 max-w-fit'>
            <Warning size={16} />
            <span>
                {props.text}
            </span>
        </div>
    );
}
export default ErrBadge