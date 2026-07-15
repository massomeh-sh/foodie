import type {JSX} from 'react';
import type {IconType} from "react-icons";

interface IconProps {
    // Props here
    icon: IconType;
    size?: number;
    className?: string;
    handleClick?: () => void;
}

function Icon({icon: Icon, size, className, handleClick}: IconProps): JSX.Element {
    return (
        <Icon size={size} onClick={handleClick} className={className || ""}/>
    );
}

export default Icon;