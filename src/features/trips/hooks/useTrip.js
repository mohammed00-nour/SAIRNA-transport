
import { useQuery } from "@tanstack/react-query";
import { getTrips } from "../services/tripsService";
import { useTripSearchStore } from "../../../stores/useTripSearchStore";

export function useTrips() {
    const appliedFilters = useTripSearchStore(
        (state) => state.appliedFilters
    );

    return useQuery({
        queryKey: ["trips", appliedFilters],
        queryFn: () => getTrips(appliedFilters),
        enabled: appliedFilters !== null,
    });
}
