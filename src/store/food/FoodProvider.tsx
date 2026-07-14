import {type JSX, useCallback, useEffect, useMemo, useReducer} from 'react';
import * as React from 'react';
import {FoodContext} from "./FoodContext.ts";
import type {FoodActions, FoodContextValue, FoodItem, FoodState} from "../../types/foodContextTypes.ts";
import {getFood} from "../../services/getFood.ts";

interface FoodProviderProps {
    // Props here
    children: React.ReactNode;
}

const initialFoodStore: FoodState = {
    foodItems: [],
    isLoading: false,
    error: null,
    selectedCategory: "",
}

function foodReducer(state: FoodState, action: FoodActions) {
    if (action.type === "FETCH_START") {
        return {...state, isLoading: true, error: null}
    }

    if (action.type === "FETCH_SUCCESS") {
        return {...state, foodItems: action.payload, isLoading: false, selectedCategory: "all", error :null}
    }

    if (action.type === "FETCH_FAILURE") {
        return {...state, isLoading: false, error: action.payload, foodItems: [], selectedCategory: ""}
    }

    if (action.type === "CHANGE_CATEGORY") {
        return {...state, selectedCategory: action.payload}
    }

    return state;
}

function FoodProvider({children}: FoodProviderProps): JSX.Element {
    const [foodStore, dispatchFoodStore] = useReducer(foodReducer, initialFoodStore);

    const getFoodItems = useCallback(async (query: string) => {
        dispatchFoodStore({type: "FETCH_START"});
        try {
            if (query.trim() !== "" && query.length < 3) {
                throw new Error("Search food items must be at least 3 characters");
            }

            const foodItems: FoodItem[] = await getFood(query);

            dispatchFoodStore({type: "FETCH_SUCCESS", payload: foodItems})

        } catch (error) {
            if (error instanceof Error) {
                dispatchFoodStore({type: "FETCH_FAILURE", payload: error.message});
            } else {
                dispatchFoodStore({type: "FETCH_FAILURE", payload: "Something went wrong!"});
            }
        }
    }, [])


    useEffect(() => {
        getFoodItems("");
    }, [getFoodItems]);

    const changeCategory = useCallback((selectedCategory: string) => {
        dispatchFoodStore({type: "CHANGE_CATEGORY", payload: selectedCategory});
    }, []);

    const filteredFood: FoodItem[] = useMemo(() => {
        if (foodStore.selectedCategory === "all") {
            return foodStore.foodItems;
        } else {
            return foodStore.foodItems.filter((food) => food.tags.join(" ").toLowerCase().includes(foodStore.selectedCategory));
        }
    }, [foodStore.selectedCategory, foodStore.foodItems]);

    const foodContextValue: FoodContextValue = {
        ...foodStore,
        foodItems: filteredFood,
        changeCategory,
        getFoodItems,
    }

    return (
        <FoodContext.Provider value={foodContextValue}>
            {children}
        </FoodContext.Provider>
    );
}

export default FoodProvider;