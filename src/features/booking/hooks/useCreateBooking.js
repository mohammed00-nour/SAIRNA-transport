import { useMutation } from "@tanstack/react-query";
import { createBooking } from "../services/bookingService";

export const useCreateBooking = () => {
    return useMutation({
        mutationKey: ["createBooking"],
        mutationFn: (bookingData) => createBooking(bookingData),
    });
};
