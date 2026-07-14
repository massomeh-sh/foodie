import type {JSX} from 'react';
import {TbFaceIdError} from "react-icons/tb";


interface ErrorProps {
    // Props here
    message: string;
}

function Error({message}: ErrorProps): JSX.Element {
    return (
        <div className={`flex gap-2 justify-center items-center mt-30 text-sm`}>
            <TbFaceIdError size={20}/>
            <p className="whitespace-pre-line ml-2">{message}</p>
        </div>
    );
}

export default Error;