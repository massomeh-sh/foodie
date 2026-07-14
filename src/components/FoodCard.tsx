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

    const addBtn = addedItem ? <p className="justify-self-end self-center text-primary text-lg">In Cart ({addedItem})</p> : <button
        onClick={handleAddToCart}
        className="cursor-pointer text-white bg-primary w-10 h-10 rounded-lg hover:bg-pink-300 justify-self-end self-center">+
    </button>;

    return (
        <div className="grid grid-cols-[100px_2fr_1fr] gap-x-5">
            <img src={image} alt={name} className="w-30 h-30 rounded-3xl"/>
            <div className="flex flex-col gap-2 mt-4">
                <h4 className="font-bold text-lg">{name}</h4>
                <p className="text-secondary-text text-sm">
                    {foodIng}
                </p>
                <p className="text-lg font-semibold">{currencyFormatter.format(price)}</p>
            </div>
            {addBtn}
        </div>
    );
}

export default FoodCard;