import {createContext} from "react";
import type {FoodContextValue} from "../../types/foodContextTypes.ts";

export const FoodContext = createContext<FoodContextValue>({
    foodItems: [],
    isLoading: false,
    error: "",
    selectedCategory: "",
    changeCategory: () => {
    },
    getFoodItems: () => {
    }
});