import { CheckCircle2, CircleX, X } from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";

export default function Toast({ type, message, onClose }) {
    const isSuccess = type === "success";
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);

        return () => {
            clearTimeout(timer)
        }
    }, [onClose])

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={`fixed top-5 right-5 z-[999]
            flex items-center gap-3
            w-[calc(100%-2.5rem)] max-w-sm
            rounded-xl border bg-white p-4 shadow-lg
            ${isSuccess
                    ? "border-green-500"
                    : "border-red-500"
                }`}
        >
            {isSuccess ? (
                <CheckCircle2
                    className="h-5 w-5 shrink-0 text-green-500"
                />
            ) : (
                <CircleX
                    className="h-5 w-5 shrink-0 text-red-500"
                />
            )}

            <p className="flex-1 text-sm text-gray-700">
                {message}
            </p>

            <button
                type="button"
                aria-label="Close notification"
                className="ml-auto shrink-0 text-gray-400 transition hover:text-gray-700"
                onClick={onClose}
            >
                <X size={18} />
            </button>
        </motion.div>
    );
}