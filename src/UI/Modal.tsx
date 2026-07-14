import {type JSX, useEffect, useRef} from 'react';
import {createPortal} from "react-dom";
import * as React from "react";

interface ModalProps {
    children: React.ReactNode;
    open?: boolean;
    close?: () => void;
}

function Modal({children, open, close}: ModalProps): JSX.Element {
    const modalRef = useRef<HTMLDialogElement>(null)

    useEffect(() => {
        const modal: HTMLDialogElement | null = modalRef.current;
        if (!open) return;
        if (open) {
            modal?.showModal();
        }
        return () => modal?.close();
    }, [open]);

    return (createPortal(<dialog onClose={close}
                                 className="m-auto w-full max-w-2xl max-h-3/4 scrollbar-none rounded-xl p-10 shadow-2xl border border-gray-200 bg-white outline-none backdrop:bg-black/60 backdrop:backdrop-blur-xs"
                                 ref={modalRef}>{children}</dialog>, document.getElementById("modal")!))
}

export default Modal;