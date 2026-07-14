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
                    <Icon icon={MdKeyboardArrowUp} size={30}
                          className="fixed bottom-6 right-6"/>
                </button>
            }
        </>
    );
}

export default BackToTop;