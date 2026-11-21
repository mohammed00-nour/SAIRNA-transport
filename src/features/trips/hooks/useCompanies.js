import {getCompanies} from "../services/companiesService";
import { useQuery } from "@tanstack/react-query";

export const useCompanies = () => {
    return useQuery({
        queryKey: ["companies"],
        queryFn: getCompanies,
        staleTime: 1000 * 60 * 6,
    })
}