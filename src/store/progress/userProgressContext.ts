import {createContext} from "react";

export const UserProgressContext = createContext({
    progress: "", showCart: () => {
    },
    hideCart: () => {
    },
    showCheckout: () => {
    },
    hideCheckout: () => {
    },
    showSuccess: () => {
    },
    hideSuccess: () => {
    }
});