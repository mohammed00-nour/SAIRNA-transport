import { useMutation } from '@tanstack/react-query'
import { login } from '../services/authService'
import { useAuthStore } from "../store/authStore";

export const useLogin = () => {
    return useMutation ({
        mutationKey: ["login"],
        mutationFn: ({email, password}) => login(email, password),
        
        onSuccess: (data) => {
            useAuthStore.getState().setAccessToken(data.accessToken);
        },
        onError: (error) => {
            console.error('Login error:', error);
        }
    })
    
}