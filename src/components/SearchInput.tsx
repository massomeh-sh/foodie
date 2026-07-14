import {type JSX, useEffect, useState} from 'react';
import {useContextValue} from "../hooks/useContextValue.ts";
import {FoodContext} from "../store/food/FoodContext.ts";


function SearchInput(): JSX.Element {
    const [searchQuery, setSearchQuery] = useState<string>();
    const {getFoodItems} = useContextValue(FoodContext);

    const handleSearchClick = () => {
        scrollTo({
            top: 0,
            behavior: "instant",
        });
    }

    useEffect(() => {
        if (searchQuery === undefined) return;
        const timer = setTimeout(() => {
            getFoodItems(searchQuery);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchQuery, getFoodItems]);

    return (
        <input value={searchQuery ?? ""} onChange={(e) => setSearchQuery(e.target.value)}
               onClick={handleSearchClick}
               className="w-full bg-gray-100 outline-none pl-12 h-12 border focus:ring-2 focus:ring-gray-300 border-gray-300 hover:bg-gray-200 rounded-xl shadow-xs"
               placeholder="Search for food"/>
    );
}

export default SearchInput;