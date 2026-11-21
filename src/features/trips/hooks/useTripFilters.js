import { useSearchParams } from "react-router-dom";

export default function useTripFilters() {
    const [searchParams, setSearchParams] = useSearchParams();

    const filters = {
        from: searchParams.get("from") || "",
        destination: searchParams.get("destination") || "",
        date: searchParams.get("date") || "",
        travelers: Number(searchParams.get("travelers") || 1),
        companyId: searchParams.get("companyId") || "",
        departureTime: searchParams.get("departureTime") || "",

    };

    function updateFilter(key, value) {
        const updatedParams = new URLSearchParams(searchParams);

        if (value === null || value === "") {
            updatedParams.delete(key);
        } else {
            updatedParams.set(key, String(value));
        }
        setSearchParams(updatedParams);
    }
    function resetFilters() {
        const updatedParams = new URLSearchParams(searchParams);

        updatedParams.delete("companyId");
        updatedParams.delete("departureTime");

        setSearchParams(updatedParams);
    }
    return {
        filters,
        updateFilter,
        resetFilters,
    };
}
