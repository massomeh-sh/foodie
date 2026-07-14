import type {FoodApi, FoodItem} from "../types/foodContextTypes.ts";

export async function getFood(query: string) {
    let response;
    if (!navigator.onLine) {
        throw new Error("You are offline!\nPlease check your network and try again later.");
    }
    if (query === "") {
        response = await fetch('https://dummyjson.com/recipes?limit=50');
    } else {
        response = await fetch(`https://dummyjson.com/recipes/search?q=${query}`)
    }

    if (!response.ok) {
        throw new Error("Something happened while searching the food!")
    }

    const foodData: FoodApi = await response.json();

    if (foodData.recipes.length === 0) {
        throw new Error("We couldn't find what you were looking for. Please check out later.")
    }

    const foodItems: FoodItem[] = foodData.recipes.map((foodItem: FoodItem) => ({
        id: foodItem.id,
        name: foodItem.name,
        ingredients: foodItem.ingredients,
        image: foodItem.image,
        tags: foodItem.tags,
        price: +(Math.random() * (30 - 15) + 15).toFixed(2),
    }));


    return foodItems;
}