import type {JSX} from 'react';
import {currencyFormatter} from "../util/formatter.ts";
import {useContextValue} from "../hooks/useContextValue.ts";
import {CartContext} from "../store/cart/cartContext.ts";

interface FoodCartProps {
    // Props here
    name: string;
    price: number;
    image: string;
    tags: string[];
    ingredients: string[];
    id: number;
}

function FoodCard({name, price, image, ingredients, id, tags}: FoodCartProps): JSX.Element {
    const {addToCart} = useContextValue(CartContext);
    const {cartItems} = useContextValue(CartContext);

    const addedItem = cartItems.find((item) => item.id === id)?.quantity;

    const foodIng = ingredients.slice(0, 3).join(", ");

    const handleAddToCart = () => {
        const selectedItem = {name, price, image, id, ingredients, tags};
        addToCart(selectedItem);
    }

    const addBtn = addedItem ?
        <p className="text-primary text-lg md:font-bold h-10">In Cart ({addedItem})</p> : <button
            onClick={handleAddToCart}
            className="cursor-pointer text-white bg-primary w-10 h-10 md:w-15 rounded-lg hover:bg-pink-300">+
        </button>;

    return (
        <div
            className="grid grid-cols-[100px_2fr_1fr] items-stretch gap-x-5 md:grid-cols-none md:grid-rows md:shadow-sm md:rounded-lg md:gap-4 md:pb-4 w-full">
            <img src={image} alt={name}
                 className="aspect-[4/3] w-full min-h-1/3 rounded-sm md:rounded-none md:rounded-t-lg"/>
            <div className="flex flex-col gap-2 md:px-5">
                <h4 className="font-bold text-lg md:text-2xl">{name}</h4>
                <p className="text-secondary-text text-sm">
                    {foodIng}
                </p>
                <p className="text-lg font-semibold">{currencyFormatter.format(price)}</p>
            </div>
            <div className="justify-self-end self-center md:px-5">
                {addBtn}
            </div>
        </div>
    );
}

export default FoodCard;