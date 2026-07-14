import type {JSX} from 'react';
import type {CartItemType} from "../types/cartContextTypes.ts";
import {currencyFormatter} from "../util/formatter.ts";
import {useContextValue} from "../hooks/useContextValue.ts";
import {CartContext} from "../store/cart/cartContext.ts";
import {UserProgressContext} from "../store/progress/userProgressContext.ts";

type TotalPriceWithButtonProps = {
    btnText: string;
}

const DELIVERY_FEE = 2.99;

function TotalPriceWithButton({btnText}: TotalPriceWithButtonProps): JSX.Element {
    const {cartItems} = useContextValue(CartContext);
    const {showCheckout} = useContextValue(UserProgressContext);

    const totalPrice = cartItems.reduce((total: number, item: CartItemType) => (total + item.price) * item.quantity, 0) + DELIVERY_FEE;

    return (
        <>
            <div className="border-y border-border py-10">
                <div className="flex justify-between">
                    <p className="font-semibold">Total Price</p>
                    <p>{currencyFormatter.format(totalPrice)}</p>
                </div>
                <div className="flex justify-between text-secondary-text mt-3">
                    <p className="font-semibold">Delivery Fee</p>
                    <p>{currencyFormatter.format(DELIVERY_FEE)}</p>
                </div>
            </div>
            <button
                onClick={showCheckout}
                className="w-full bg-primary p-3 rounded-2xl text-white hover:bg-pink-300 cursor-pointer">{btnText}
            </button>
        </>
    );
}

export default TotalPriceWithButton;