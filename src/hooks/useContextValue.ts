import {type Context, useContext} from "react";

export function useContextValue<T>(context: Context<T>) {
    const contextValue = useContext(context);
    if (!contextValue) throw new Error("context must be used within a Provider");
    return contextValue;
}