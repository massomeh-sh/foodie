import type {JSX} from 'react';
import FoodCard from "./FoodCard.tsx";
import FoodCardSkeleton from "./FoodCardSkeleton.tsx";
import type {FoodItem} from "../types/foodContextTypes.ts";
import Error from "./Error.tsx";
import {useContextValue} from "../hooks/useContextValue.ts";
import {FoodContext} from "../store/food/FoodContext.ts";

function FoodItems(): JSX.Element {
    const {foodItems, isLoading, error} = useContextValue(FoodContext);

    return (
        <div className="mt-5 flex flex-col gap-8 md:grid md:grid-cols-4 xl:grid-cols-5 md:gap-10">
            <h3 className="font-bold text-2xl md:text-3xl md:col-span-4 xl:col-span-5">Popular Dishes</h3>
            {isLoading ? (Array.from({length: 8}).map((_, index) => (<FoodCardSkeleton key={index}/>)))
                : foodItems.map((food: FoodItem) => <FoodCard key={food.id} {...food}/>)}
            {foodItems.length === 0 && !isLoading && !error &&
                <Error message="Sorry, but there's nothing to show here!"/>}
            {error && <Error message={error}/>}
        </div>
    )
        ;
}

export default FoodItems;