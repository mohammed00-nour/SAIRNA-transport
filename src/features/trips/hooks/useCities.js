import { useQuery } from "@tanstack/react-query"
import { getCities } from "../services/citiesService"

export const useCities = () => {
    return useQuery({
        queryKey: ["cities"],
        queryFn: getCities,
        staleTime: 1000 * 60 * 6,
    })
}
