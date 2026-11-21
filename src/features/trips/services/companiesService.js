import api from "../../../api/axios";

export const getCompanies = async () => {
    const response = await api.get("/companies");
    return response.data;
}