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
               className="md:w-lg bg-gray-100 md:bg-white outline-none pl-12 md:pl-15 h-12 md:h-15 border focus:ring-2 focus:ring-gray-300 border-gray-300 hover:bg-gray-200 rounded-xl shadow-xs"
               placeholder="Search for food"/>
    );
}

export default SearchInput;