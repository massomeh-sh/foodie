import type {JSX} from 'react';
import {useContextValue} from "../hooks/useContextValue.ts";
import {UserProgressContext} from "../store/progress/userProgressContext.ts";
import Modal from "../UI/Modal.tsx";
import {IoMdClose} from "react-icons/io";
import {CartContext} from "../store/cart/cartContext.ts";
import CartItem from "./CartItem.tsx";
import Icon from "../UI/Icon.tsx";
import TotalPriceWithButton from "./TotalPriceWithButton.tsx";


function CartModal(): JSX.Element {
    const {progress, hideCart} = useContextValue(UserProgressContext);
    const {cartItems,} = useContextValue(CartContext);


    return (
        <Modal open={progress === "cart"} close={progress === "cart" ? hideCart : undefined}>
            <div className="flex flex-col gap-5">
                <div className="flex justify-between">
                    <p className="font-semibold text-2xl">Your Cart</p>
                    <Icon icon={IoMdClose} handleClick={hideCart} className="cursor-pointer text-3xl md:text-4xl"/>
                </div>
                <div className="border border-border"/>
                {cartItems.length === 0 ? <p className="text-lg">Your cart is currently empty. Try add some food! 😃</p> :
                    <>
                        <ul className="flex flex-col gap-6">
                            {cartItems.map((item) => (<CartItem key={item.id} {...item}/>))}
                        </ul>
                        <TotalPriceWithButton btnText="Checkout"/>
                    </>
                }
            </div>
        </Modal>
    );
}

export default CartModal;