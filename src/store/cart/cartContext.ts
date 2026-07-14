import {createContext} from "react";
import type {CartContextValue} from "../../types/cartContextTypes.ts";

export const CartContext = createContext<CartContextValue>({
    cartItems: [],
    addToCart: () => {
    },
    removeFromCart: () => {
    },
    increaseItem: () => {
    },
    decreaseItem: () => {
    },
    clearCartItems: () => {
    }
});