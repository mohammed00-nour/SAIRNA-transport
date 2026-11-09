import { useQuery } from "@tanstack/react-query";
import { me } from "../services/authService";
import { useAuthStore } from "../store/authStore";

export default function useMe() {
    const accessToken = useAuthStore((state) => state.accessToken);
    return useQuery({
        queryKey: ["me"],
        queryFn: me,
        staleTime: 1000 * 60 * 5, 
        gcTime: 1000 * 60 * 10, 
        enabled: Boolean(accessToken),
    });

}