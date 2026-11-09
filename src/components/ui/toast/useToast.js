import { useContext } from "react";
import { ToastContext } from "../../../context/ToastContext";

export const useToast = ( ) => {
    const {toast, showToast} = useContext(ToastContext);

    return { toast, showToast };
}