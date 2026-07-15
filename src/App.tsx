import Header from "./components/Header.tsx";
import ImageSlider from "./components/ImageSlider.tsx";
import Categories from "./components/Categories.tsx";
import Icon from "./UI/Icon.tsx";
import FoodItems from "./components/FoodItems.tsx";
import FoodProvider from "./store/food/FoodProvider.tsx";
import BackToTop from "./components/BackToTop.tsx";
import UserProgressProvider from "./store/progress/UserProgressProvider.tsx";
import CartModal from "./components/CartModal.tsx";
import CartProvider from "./store/cart/CartProvider.tsx";
import CheckoutModal from "./components/CheckoutModal.tsx";
import OrderSuccessModal from "./components/OrderSuccessModal.tsx";

function App() {
    return (
        <UserProgressProvider>
            <FoodProvider>
                <CartProvider>
                    <Header/>
                    <main className="flex flex-col gap-6 px-12 lg:px-40 pb-7 md:pb-10 min-h-screen">
                        <ImageSlider/>
                        <Icon icon={Categories} className="text-primary"/>
                        <FoodItems/>
                        <BackToTop/>
                        <CartModal/>
                        <CheckoutModal/>
                        <OrderSuccessModal/>
                    </main>
                </CartProvider>
            </FoodProvider>
        </UserProgressProvider>
    )
}

export default App
