import type {JSX} from 'react';
import {LuLayoutGrid} from "react-icons/lu";
import type {CategoriesItems} from "../types/category.ts";
import { IoPizza } from "react-icons/io5";
import {GiCakeSlice} from "react-icons/gi";
import {GiChickenOven} from "react-icons/gi";
import {LuSalad} from "react-icons/lu";
import CategoryItem from "./CategoryItem.tsx";

const categoryItems: CategoriesItems[] = [
    {
        name: "All",
        icon: LuLayoutGrid,
    },
    {
        name: "Pizza",
        icon: IoPizza,
    },
    {
        name: "Dessert",
        icon: GiCakeSlice,
    },
    {
        name: "Chicken",
        icon: GiChickenOven,
    },
    {
        name: "Salad",
        icon: LuSalad,
    }
]

function Categories(): JSX.Element {
    return (
        <div className="flex flex-col gap-8">
            <h1 className="font-bold text-2xl">Categories</h1>
            <div className="flex justify-between">
                {categoryItems.map((item: CategoriesItems) => (<CategoryItem key={item.name} {...item}/>))}
            </div>
        </div>
    );
}

export default Categories;