import type {FoodItem} from "./foodContextTypes.ts";

export type CartItemType = FoodItem & { quantity: number; };

export type CartContextValue = {
    cartItems: CartItemType[],
    addToCart: (item: FoodItem) => void,
    increaseItem: (id: number) => void,
    decreaseItem: (id: number) => void,
    removeFromCart: (id: number) => void,
    clearCartItems: () => void,
}


export type CartState = {
    cartItems: CartItemType[],
}


export type CartActions =
    { type: "ADD_TO_CART", payload: FoodItem }
    | { type: "DECREASE_QUANTITY", payload: number }
    | {
    type: "REMOVE_CART", payload: number
}
    | { type: "INCREASE_QUANTITY", payload: number } | { type: "CLEAR_CART_ITEMS" };