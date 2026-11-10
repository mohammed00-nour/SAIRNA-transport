import { useState, useCallback } from "react";
import { ToastContext } from "../../../context/ToastContext";
import { AnimatePresence } from 'motion/react'
import Toast from "./Toast";

export function ToastProvider({ children }) {

    const [toast, setToast] = useState(null);

    const showToast = useCallback((type, message) => {
        setToast({ type, message })
    }, []);
    const hideToast = useCallback(() => {
        setToast(null);
    }, []);

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