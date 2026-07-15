import {type JSX, useEffect, useState} from 'react';
import {MdKeyboardArrowUp} from "react-icons/md";
import Icon from "../UI/Icon.tsx";

function BackToTop(): JSX.Element {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const showBtn = () => {
            setShowButton(window.scrollY > 400);
        }

        window.addEventListener("scroll", showBtn);

        return () => window.removeEventListener("scroll", showBtn);
    }, []);

    const backToTop = () => {
        setShowButton(false);
        window.scrollTo(0, 0);
    }

    return (
        <>
            {showButton &&
                <button onClick={backToTop}>
                    <Icon icon={MdKeyboardArrowUp}
                          className="fixed bottom-6 right-5 md:right-12 text-4xl md:text-5xl lg:text-6xl"/>
                </button>
            }
        </>
    );
}

export default BackToTop;