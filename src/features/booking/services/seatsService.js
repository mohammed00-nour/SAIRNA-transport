import api from "../../../api/axios";
export const getTripSeats = async (tripId) => {
    const response = await api.get(`/trips/${tripId}/seats`);
    return response.data;
}