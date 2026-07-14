import {type JSX, useReducer} from 'react';
import * as React from 'react';
import {CartContext} from "./cartContext.ts";
import type {CartActions, CartContextValue, CartState} from "../../types/cartContextTypes.ts";
import type {FoodItem} from "../../types/foodContextTypes.ts";


type CartContextProviderProps = {
    children: React.ReactNode;
}


const initialCartState = {
    cartItems: [],
}

function cartReducer(state: CartState, action: CartActions) {
    if (action.type === "ADD_TO_CART") {
        const existingItem = state.cartItems.some((item) => item.id === action.payload.id);
        if (existingItem) {
            return {
                ...state,
                cartItems: state.cartItems.map((item) => item.id === action.payload.id ? {
                    ...item,
                    quantity: item.quantity + 1
                } : item)
            };
        }

        return {...state, cartItems: [...state.cartItems, {...action.payload, quantity: 1}]};
    }

    if (action.type === "DECREASE_QUANTITY") {
        return {
            ...state,
            cartItems: state.cartItems.map((item) => item.id === action.payload ? {
                ...item,
                quantity: item.quantity - 1
            } : item).filter((item) => item.quantity > 0),
        }
    }

    if (action.type === "INCREASE_QUANTITY") {
        return {
            ...state,
            cartItems: state.cartItems.map((item) => item.id === action.payload ? {
                ...item,
                quantity: item.quantity + 1
            } : item)
        }
    }

    if (action.type === "REMOVE_CART") {
        return {
            ...state,
            cartItems: state.cartItems.filter((item) => item.id !== action.payload)
        }

    }


    if (action.type === "CLEAR_CART_ITEMS") {
        return {
            ...state,
            cartItems: []
        }
    }

    return state;
}

function CartProvider({children}: CartContextProviderProps): JSX.Element {
    const [cartState, dispatchCartState] = useReducer(cartReducer, initialCartState);

    const addToCart = (item: FoodItem) => {
        dispatchCartState({type: "ADD_TO_CART", payload: item});
    }

    const increaseItem = (id: number) => {
        dispatchCartState({type: "INCREASE_QUANTITY", payload: id});
    }

    const decreaseItem = (id: number) => {
        dispatchCartState({type: "DECREASE_QUANTITY", payload: id});
    }

    const removeFromCart = (id: number) => {
        dispatchCartState({type: "REMOVE_CART", payload: id});
    }

    const clearCartItems = () => {
        dispatchCartState({type: "CLEAR_CART_ITEMS"});
    }


    const cartContextValue: CartContextValue = {
        cartItems: cartState.cartItems,
        addToCart,
        increaseItem,
        decreaseItem,
        removeFromCart,
        clearCartItems,
    }

    return (
        <CartContext.Provider value={cartContextValue}>
            {children}
        </CartContext.Provider>
    );
}

export default CartProvider;