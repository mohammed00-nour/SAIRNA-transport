import api from "../../../api/axios";

export const getTrips = async (filters) => {

    const params = {
        ...(filters.from && { originId: filters.from }),
        ...(filters.destination && { destinationId: filters.destination }),
        ...(filters.date && { date: filters.date }),
        ...(filters.companyId && { companyId: filters.companyId }),
    };
    console.log("Filters:", filters);
    console.log("Params:", params);
    const response = await api.get("/trips", { params });
    console.log("API Response:", response.data);

    return response.data;
};