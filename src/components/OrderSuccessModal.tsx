import type {JSX} from 'react';
import Modal from "../UI/Modal.tsx";
import {useContextValue} from "../hooks/useContextValue.ts";
import {UserProgressContext} from "../store/progress/userProgressContext.ts";
import {MdDone} from "react-icons/md";
import Icon from "../UI/Icon.tsx";
import {MdOutlineDeliveryDining} from "react-icons/md";


function OrderSuccessModal(): JSX.Element {
    const {progress, hideSuccess} = useContextValue(UserProgressContext);

    return (
        <Modal open={progress === "success"} close={progress === "success" ? hideSuccess : undefined}>
            <div className="flex flex-col gap-6 items-center text-center">
                <Icon icon={MdDone} className="bg-primary rounded-full text-white px-2 text-5xl md:text-6xl"/>
                <p className="font-semibold">Order Placed!<br/>Thank you for your order</p>
                <p className="text-secondary-text text-lg">Your order has been placed successfully.<br/>You will receive
                    a confirmation call shortly.</p>
                <div className="flex justify-between w-3/5 text-sm font-medium bg-gray-100 p-3 rounded-lg">
                    <div className="flex flex-col items-start md:text-lg">
                        <p>Estimate Delivery</p>
                        <p className="">25 - 30 mins</p>
                    </div>
                    <Icon icon={MdOutlineDeliveryDining} className="text-primary text-4xl md:text-5xl"/>
                </div>
                <button onClick={hideSuccess}
                        className="bg-primary p-3 text-lg text-white rounded-2xl md:text-2xl w-3/5 hover:bg-pink-300 cursor-pointer">Continue
                    Shopping
                </button>
            </div>
        </Modal>
    )
        ;
}

export default OrderSuccessModal;