import {type JSX} from 'react';
import Icon from "../UI/Icon.tsx";
import {MdOutlineFastfood} from "react-icons/md";
import {LuShoppingCart} from "react-icons/lu";
import {IoSearch} from "react-icons/io5";
import SearchInput from "./SearchInput.tsx";
import {useContextValue} from "../hooks/useContextValue.ts";
import {UserProgressContext} from "../store/progress/userProgressContext.ts";
import {CartContext} from "../store/cart/cartContext.ts";


function Header(): JSX.Element {
    const {showCart} = useContextValue(UserProgressContext);
    const {cartItems} = useContextValue(CartContext);

    return (
        <header
            className="sticky top-0 z-100 py-5 md:py-7 backdrop-blur-sm bg-white/50 flex justify-between items-center text-sm md:text-lg lg:text-2xl px-12">
            <div className="flex gap-3 items-center">
                <Icon icon={MdOutlineFastfood} className="text-primary mb-3 text-5xl lg:text-6xl"/>
                <h1 className="text-primary font-black text-shadow-sm text-2xl md:text-3xl lg:text-4xl">Foodie</h1>
            </div>
            <div className="flex items-center">
                <div className="relative mr-4 md:mr-6">
                    <Icon icon={IoSearch}
                          className="absolute top-1/2 -translate-y-1/2 left-4 text-secondary-text pointer-events-none text-lg md:text-2xl lg:text-3xl"/>
                    <SearchInput/>
                </div>
                <nav onClick={showCart} className="relative py-3">
                    <Icon icon={LuShoppingCart} className="cursor-pointer text-3xl md:text-4xl"/>
                    <span
                        className="absolute top-1 -right-2 md:top-0.5 lg:top-0 h-5 w-5 flex md:h-6 md:w-6 lg:w-7 lg:h-7 justify-center items-center text-xs md:text-sm leading-none bg-primary text-white rounded-full">{cartItems.length}</span>
                </nav>
            </div>
        </header>
    );
}

export default Header;