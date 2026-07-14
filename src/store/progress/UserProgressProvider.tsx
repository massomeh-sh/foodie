import {type JSX, useState} from 'react';
import * as React from "react";
import {UserProgressContext} from "./userProgressContext.ts";
import type {UserProgressContextValue} from "../../types/userProgressContextTypes.ts";

interface UserProgressProviderProps {
    // Props here
    children: React.ReactNode;
}

function UserProgressProvider({children}: UserProgressProviderProps): JSX.Element {
    const [progress, setProgress] = useState("");

    const showCart = () => {
        setProgress("cart");
    }

    const hideCart = () => {
        setProgress("");
    }

    const showCheckout = () => {
        console.log("checkout");
        setProgress("checkout");
    }

    const hideCheckout = () => {
        setProgress("");
    }

    const showSuccess = () => {
        setProgress("success");
    }

    const hideSuccess = () => {
        setProgress("");
    }


    const useProgressCv: UserProgressContextValue = {
        progress,
        showCart,
        hideCart,
        showCheckout,
        hideCheckout,
        showSuccess,
        hideSuccess,
    }

    return (
        <UserProgressContext.Provider value={useProgressCv}>
            {children}
        </UserProgressContext.Provider>
    );
}

export default UserProgressProvider;