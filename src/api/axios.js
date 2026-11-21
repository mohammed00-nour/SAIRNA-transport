import axios from "axios";
import { useAuthStore } from "../stores/authStore";

const api = axios.create({
    baseURL: 'https://sairna.abdulrahman-hares.com/api/v1/website',
    headers: {
        "Content-Type": "application/json",
    },

})

api.interceptors.request.use(
    (config) => {
        const accessToken = useAuthStore.getState().accessToken;
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    }
)

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status;
        const url = error.config?.url || "";
        const isAuthRequest =
            url.includes("/auth/login") ||
            url.includes("/auth/register");

        if (status === 401 && !isAuthRequest) {
            useAuthStore.getState().clearAccessToken();
        }

        return Promise.reject(error);
    }
);

export default api;