import type {JSX} from 'react';
import Modal from "../UI/Modal.tsx";
import {useContextValue} from "../hooks/useContextValue.ts";
import {UserProgressContext} from "../store/progress/userProgressContext.ts";
import {LuMoveLeft} from "react-icons/lu";
import Icon from "../UI/Icon.tsx";
import Input from "../UI/Input.tsx";
import {currencyFormatter} from "../util/formatter.ts";
import type {CartItemType} from "../types/cartContextTypes.ts";
import {CartContext} from "../store/cart/cartContext.ts";
import TotalPriceWithButton from "./TotalPriceWithButton.tsx";
import {useForm, type SubmitHandler} from "react-hook-form";

interface FormData {
    fullName: string;
    address: string;
    phoneNumber: number | null;
}

function CheckoutModal(): JSX.Element {
    const {progress, hideCheckout, showCart, showSuccess} = useContextValue(UserProgressContext);
    const {cartItems, clearCartItems} = useContextValue(CartContext);

    const {register, handleSubmit, reset, formState: {errors}} = useForm<FormData>({
        defaultValues: {
            fullName: "",
            address: "",
            phoneNumber: null
        },
        mode: "onBlur",
        reValidateMode: "onChange"
    });

    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log(data);
        hideCheckout();
        showSuccess();
        clearCartItems();
        reset();
    };

    const handleCloseCheckout = () => {
        hideCheckout();
        showCart();
    }

    return (
        <Modal open={progress === "checkout"} close={progress === "checkout" ? hideCheckout : undefined}>
            <div className="flex flex-col gap-8">
                <div className="flex gap-6 items-center">
                    <Icon icon={LuMoveLeft} handleClick={handleCloseCheckout} className="cursor-pointer"/>
                    <p className="font-semibold">Checkout</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                    <fieldset>
                        <legend className="font-semibold mb-6">Delivery Information</legend>
                        <Input {...register("fullName", {
                            required: "Full-name is required", minLength: {
                                value: 3, message: "Full-name must be at least 3 characters"
                            },
                            maxLength: {
                                value: 20,
                                message: "Full-name is too long"
                            }
                        })} errorMessage={errors.fullName?.message} label="Full Name"
                               name="fullName" id="full-name"
                               autoComplete="name"
                               placeholder="Enter your full name"/>
                        <Input {...register("address", {
                            required: "Address is required", maxLength: {
                                value: 10,
                                message: "Address is too long"
                            }
                        })} errorMessage={errors.address?.message} label="Address"
                               name="address" id="address"
                               autoComplete="street-address"
                               placeholder="Enter your delivery address"/>
                        <Input {...register("phoneNumber", {
                            required: "Phone-number is required", pattern: {
                                value: /^09\d{9}$/,
                                message: "Invalid phone number"
                            }
                        })}
                               errorMessage={errors.phoneNumber?.message} type="tel"
                               label="Phone Number"
                               name="phoneNumber"
                               id="full-name" autoComplete="tel"
                               placeholder="Enter your phone number"/>
                    </fieldset>
                    <p className="font-semibold">Order Summary</p>
                    <ul className="flex flex-col gap-3 text-lg">
                        {cartItems.map((item: CartItemType) => (
                            <div key={item.id} className="flex justify-between"><p>{item.name} <span
                                className="text-primary font-semibold">x{item.quantity}</span></p>
                                <p>{currencyFormatter.format(item.price)}</p></div>))}
                    </ul>
                    <TotalPriceWithButton btnText="Place Order"/>
                </form>
            </div>
        </Modal>
    )
        ;
}

export default CheckoutModal;