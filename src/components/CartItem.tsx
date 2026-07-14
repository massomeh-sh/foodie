import {type JSX, useContext} from 'react';
import {MdOutlineDelete} from "react-icons/md";
import {currencyFormatter} from "../util/formatter.ts";
import {CartContext} from "../store/cart/cartContext.ts";
import Icon from "../UI/Icon.tsx";


interface CartItemProps {
    // Props here
    name: string;
    quantity: number;
    image: string;
    price: number;
    id: number;
}

function CartItem({name, quantity, image, price, id}: CartItemProps): JSX.Element {
    const {increaseItem, decreaseItem, removeFromCart} = useContext(CartContext);

    return (
        <div className="grid grid-cols-[1fr_2fr_1fr] gap-x-8 font-semibold">
            <img src={image} alt={name} className="object-cover rounded-lg w-32 h-32"/>
            <div className="text-lg flex flex-col gap-4.5">
                <p>{name}</p>
                <p className="text-sm">{currencyFormatter.format(price)}</p>
                <div className="flex gap-6 items-center border-2 border-border px-4 py-1 w-fit rounded-2xl">
                    <button onClick={() => decreaseItem(id)} className="cursor-pointer">-</button>
                    <p>{quantity}</p>
                    <button onClick={() => increaseItem(id)} className="cursor-pointer">+</button>
                </div>
            </div>
            <Icon icon={MdOutlineDelete} handleClick={() => removeFromCart(id)}
                  className="self-center justify-self-end text-gray-500 cursor-pointer font-bold"/>
        </div>
    );
}

export default CartItem;