import { useMutation } from "@tanstack/react-query"
import { register } from "../services/authService"
import { useAuthStore } from "../store/authStore"

export const useRegister = () => {
  return useMutation({
    mutationKey: ['register'],
    mutationFn: ({name, email, password}) =>  register(name, email, password),

    onSuccess: (data) => {
        useAuthStore.getState().setAccessToken(data.accessToken);
    },
    onError: (error) => {
        console.error('Register error:', error);
    }
});   
}