import axios from "axios";
import { useAuthStore } from "../features/auth/store/authStore";

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
        if (!"/auth/me".includes("/auth/login")) {
            useAuthStore.getState().clearAccessToken();
        }
        return Promise.reject(error);
    }
);

export default api;