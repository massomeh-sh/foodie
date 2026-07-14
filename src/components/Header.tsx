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
            className="sticky top-0 z-100 py-5 backdrop-blur-sm flex justify-between items-center text-sm px-12">
            <div className="flex gap-3 items-center">
                <Icon icon={MdOutlineFastfood} size={30} className="text-primary mb-3"/>
                <h1 className="text-primary font-black text-shadow-sm text-2xl">Foodie</h1>
            </div>
            <div className="flex items-center">
                <div className="relative">
                    <Icon icon={IoSearch} size={12}
                          className="absolute top-1/2 -translate-y-1/2 left-4 text-secondary-text pointer-events-none"/>
                    <SearchInput/>
                </div>
                <nav onClick={showCart} className="relative px-4 py-3">
                    <Icon icon={LuShoppingCart} size={20} className="cursor-pointer"/>
                    <span
                        className="absolute top-1.5 right-1 h-5 w-5 flex justify-center items-center text-xs leading-none bg-primary text-white rounded-full">{cartItems.length}</span>
                </nav>
            </div>
        </header>
    );
}

export default Header;