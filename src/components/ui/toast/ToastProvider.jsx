import { useState } from "react";
import { ToastContext } from "../../../context/ToastContext";
import { AnimatePresence } from 'motion/react'
import Toast from "./Toast";

export function ToastProvider({ children }) {

    const [toast, setToast] = useState(null);

    function showToast(type, message) {
        setToast({ type, message })
    };
    function hideToast() {
    setToast(null);
}

    return (
        <ToastContext.Provider value={{ toast, showToast }}>
            {children}
            <AnimatePresence>
                {toast && (
                    <Toast type={toast.type} message={toast.message} onClose={hideToast} />
                )}
            </AnimatePresence>
        </ToastContext.Provider>
    )
}