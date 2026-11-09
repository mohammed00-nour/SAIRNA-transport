import { useAuthStore } from '../store/authStore'
import useMe from '../hooks/useMe'
import { Navigate } from 'react-router-dom';

export function ProtectedRoute({ children }) {
    const { data, isPending, isError, error, refetch } = useMe();
    const accessToken = useAuthStore((state) => state.accessToken);

    if (!accessToken) {
        return <Navigate to="/login" replace />;
    }
    if (isPending) {
        return <div>Loading...</div>
    };
    if (isError) {
        if (error?.response?.status === 401) {
            return <Navigate to='/login' replace />;
        }
        return (
            <div>
                <p>Error occurred while fetching user data.</p>
                <button onClick={() => refetch()}>
                    Try Again
                </button>
            </div>
        )
    };
    if (!data) {
        return <Navigate to='/login' replace />
    }
    return children;
}