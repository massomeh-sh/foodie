import type {JSX} from 'react';
import type {IconType} from "react-icons";
import Icon from "../UI/Icon.tsx";
import {useContextValue} from "../hooks/useContextValue.ts";
import {FoodContext} from "../store/food/FoodContext.ts";

interface CategoryItemProps {
    // Props here
    name: string;
    icon: IconType;
}

function CategoryItem({name, icon}: CategoryItemProps): JSX.Element {
    const {changeCategory, selectedCategory, error, isLoading} = useContextValue(FoodContext);
    const categoryName = name.toLowerCase();

    return (
        <button disabled={Boolean(error) || isLoading} onClick={() => changeCategory(categoryName)}
                className={`flex flex-col gap-3 items-center rounded-3xl cursor-pointer ${selectedCategory === categoryName ? "bg-pink-100" : ""} px-5 py-3 w-20`}>
            <Icon icon={icon} size={20}
                  className={`hover:text-primary ${selectedCategory === categoryName ? "text-primary" : "text-gray-500"}`}/>
            <p className="text-sm font-bold">{name}</p>
        </button>
    );
}

export default CategoryItem;