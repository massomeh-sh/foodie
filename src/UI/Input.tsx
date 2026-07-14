import type {JSX} from 'react';

interface InputProps {
    // Props here
    label: string;
    id: string;
    placeholder: string;
    name: string;
    type?: string;
    autoComplete: string;
    errorMessage?: string;
}

function Input({label, id, errorMessage, type = "text", ...rest}: InputProps): JSX.Element {
    return (
        <div className="flex flex-col gap-2 mt-4">
            <label htmlFor={id} className="text-lg font-medium">{label}</label>
            <input id={id} {...rest} type={type}
                   className="text-lg outline-none border-2 border-gray-400 rounded-lg p-3 focus:border-pink-300"/>
            <p className="text-sm text-red-500">{errorMessage}</p>
        </div>
    );
}

export default Input;