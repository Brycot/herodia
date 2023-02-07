import { AuthProvider } from './auth';
import { AppRouter } from './router/AppRouter';

export const HerodiaApp = () => {
    return (
        <AuthProvider>
            <AppRouter />
        </AuthProvider>
    );
};
