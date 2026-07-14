export interface FoodItem {
    name: string;
    id: number;
    image: string;
    ingredients: string[];
    tags: string[];
    price: number;
}

export type FoodApi = {
    recipes: FoodItem[];
}

export type FoodState = {
    foodItems: FoodItem[];
    isLoading: boolean;
    error: string | null;
    selectedCategory: string;
}

export type FoodContextValue = FoodState & {
    changeCategory: (category: string) => void;
    getFoodItems: (query: string) => void;
}

export type FoodActions = { type: "FETCH_START" } | { type: "FETCH_FAILURE", payload: string } | {
    type: "FETCH_SUCCESS",
    payload: FoodItem[]
} | { type: "CHANGE_CATEGORY", payload: string };