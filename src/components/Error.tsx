import type {JSX} from 'react';
import {TbFaceIdError} from "react-icons/tb";


interface ErrorProps {
    // Props here
    message: string;
}

function Error({message}: ErrorProps): JSX.Element {
    return (
        <div className={`flex gap-2 items-center justify-center content-start my-30 text-sm md:self-center md:justify-items-center`}>
            <TbFaceIdError className="text-3xl md:text-5xl"/>
            <p className="whitespace-pre-line ml-2 md:text-lg">{message}</p>
        </div>
    );
}

export default Error;