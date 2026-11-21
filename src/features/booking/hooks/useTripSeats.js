import { useQuery } from "@tanstack/react-query";
import { getTripSeats } from "../services/seatsService";

export const useTripSeats = (tripId) => {
    return useQuery({
        queryKey: ["tripSeats", tripId],
        queryFn: () => getTripSeats(tripId),
        enabled: !!tripId,
    });
};
