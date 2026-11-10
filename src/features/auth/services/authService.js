import api from "../../../api/axios";

export const login = async (email, password) => {
    try {
        const response = await api.post('/auth/login', { email, password });
        return response.data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

export const register = async (name, email, password) => {
    try {
        const response = await api.post("/auth/register", { name, email, password });
        return response.data;
    } catch (error) {
        console.error('Register error:', error)
        throw error;
    }
}
export const me = async () => {
    try {
        const response = await api.get('/auth/me');
        return response.data;

    } catch (error) {
        console.error('GetMe error:', error)
        throw error;
    }
}