import {type JSX, type RefObject, useCallback, useEffect, useRef, useState} from 'react';
import type {ImageSliderType, Slide} from "../types/slide.ts";
import * as React from "react";

const images: ImageSliderType = [
    {
        src: "/food/img3.jpg",
        name: "desert",
        description: "",
    },
    {
        src: "/food/img4.jpg",
        name: "sushi",
        description: "",
    },
    {
        src: "/food/img1.jpg",
        name: "pasta",
        description: "",
    }
]

const sliderImage: Slide[] = [images[images.length - 1], ...images, images[0]];

function ImageSlider(): JSX.Element {
    const [currentImage, setCurrentImage] = useState(1);
    const [hasTransition, setHasTransition] = useState(true);
    const [dragOffset, setDragOffset] = useState(0);
    const [isDragging, setIsDragging] = useState(false);


    const startX: RefObject<number> = useRef(0);
    const timerRef: RefObject<number | undefined> = useRef(undefined);
    const sliderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!hasTransition) {
            requestAnimationFrame(() => {
                setHasTransition(true);
            })
        }
    }, [hasTransition]);


    const stopTimer = useCallback(() => clearInterval(timerRef.current), [])


    const startTimer = useCallback(() => {
        stopTimer();
        timerRef.current = setInterval(() => setCurrentImage((pre) => pre + 1), 3000)
    }, [stopTimer])


    useEffect(() => {
        startTimer();
        return () => stopTimer();
    }, [startTimer, stopTimer]);

    const nextImage = () => (setCurrentImage((curImg) => curImg + 1));

    const prevImage = () => (setCurrentImage((curImg) => curImg - 1)
    )

    function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
        setIsDragging(true);
        stopTimer();
        startX.current = event.clientX;
        event.currentTarget.setPointerCapture(event.pointerId);
        setHasTransition(false);
    }

    function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
        if (!isDragging) return;
        if (!sliderRef.current) return;
        const currentX = event.clientX;
        const move = currentX - startX.current;
        const percent = Math.trunc((move / sliderRef.current.clientWidth) * 100);
        setDragOffset(percent);
    }

    function handlePointerUp(e: React.PointerEvent<HTMLDivElement>) {
        setIsDragging(false);
        if (dragOffset > 15) {
            prevImage();
        } else if (dragOffset < -15) {
            nextImage();
        }
        setDragOffset(0);
        startTimer();
        e.currentTarget.releasePointerCapture(e.pointerId);
        setHasTransition(true);
    }

    function handlePointerCancel(event: React.PointerEvent<HTMLDivElement>) {
        setIsDragging(false);
        setDragOffset(0);
        startTimer();
        event.currentTarget.releasePointerCapture(event.pointerId);
    }

    function handleTransitionEnd() {
        if (currentImage === sliderImage.length - 1) {
            //     first image copy
            setHasTransition(false);
            setCurrentImage(1);
        }

        if (currentImage === 0) {
            //     last image copy
            setHasTransition(false);
            setCurrentImage(images.length);
        }
    }

    function getDotPosition() {
        if (currentImage === 0) {
            return 2;
        }

        if (currentImage === sliderImage.length - 1) {
            return 0;
        }

        return currentImage - 1;
    }

    const dotPos: number = getDotPosition();

    function handleClickOnDot(index: number) {
        stopTimer();
        setCurrentImage(index + 1);
        startTimer();
    }

    return (
        <div className="my-5">
            <div onPointerUp={handlePointerUp}
                 onPointerDown={handlePointerDown}
                 onPointerMove={handlePointerMove}
                 onPointerCancel={handlePointerCancel}
                 onTransitionEnd={handleTransitionEnd}
                 ref={sliderRef}
                 className={`flex flex-col gap-1 w-full h-100 overflow-hidden touch-pan-y select-none ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}>
                <div className={`flex ${hasTransition ? "transition-transform duration-500" : ""} ease-in-out`}
                     style={{transform: `translateX(-${(currentImage * 100) - dragOffset}%)`}}>
                    {sliderImage.map((image: Slide, index) => (
                        <img draggable={false} key={index} src={image.src} alt={image.name}
                             className="object-cover min-w-full h-100 select-none pointer-events-none"/>))}
                </div>
            </div>
            <div className="relative mt-6">
                <p className="absolute right-1/2 translate-x-1/4 flex justify-center gap-5">
                    {images.map((_, index: number) => (<button key={index} onClick={() => handleClickOnDot(index)}
                                                               className={`${index === dotPos ? "w-5 bg-primary" : " w-3 h-3 bg-gray-200"} rounded-full`}/>))}
                </p>
            </div>
        </div>
    );
}

export default ImageSlider;