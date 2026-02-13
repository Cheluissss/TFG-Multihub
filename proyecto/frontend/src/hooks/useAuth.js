import React, { createContext, useContext, useEffect, useState } from 'react';
import { authAPI, getAccessToken, setAccessToken, removeAccessToken, getStoredUser, setStoredUser, removeStoredUser, } from '../utils/api';
const AuthContext = createContext(undefined);
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(getStoredUser());
    const [isLoading, setIsLoading] = useState(false);
    // Verificar token al montar el componente
    useEffect(() => {
        const token = getAccessToken();
        if (token && !user) {
            // Si hay token pero no user en contexto, intenta refrescar
            refreshTokens().catch(() => {
                // Si falla, limpia todo
                removeAccessToken();
                removeStoredUser();
            });
        }
    }, []);
    const login = async (credentials) => {
        setIsLoading(true);
        try {
            const response = await authAPI.login(credentials);
            if (!response.data) {
                throw new Error('No se recibieron datos de autenticación');
            }
            const { user: userData, accessToken } = response.data;
            // Guardar en memoria y localStorage
            setUser(userData);
            setAccessToken(accessToken);
            setStoredUser(userData);
        }
        finally {
            setIsLoading(false);
        }
    };
    const logout = async () => {
        try {
            await authAPI.logout();
        }
        finally {
            setUser(null);
            removeAccessToken();
            removeStoredUser();
        }
    };
    const refreshTokens = async () => {
        try {
            const response = await authAPI.refreshTokens();
            if (!response.data) {
                throw new Error('No se recibieron tokens');
            }
            setAccessToken(response.data.accessToken);
            return true;
        }
        catch (error) {
            console.error('Error refreshing tokens:', error);
            removeAccessToken();
            removeStoredUser();
            setUser(null);
            return false;
        }
    };
    const contextValue = {
        user,
        isAuthenticated: !!user && !!getAccessToken(),
        isLoading,
        login,
        logout,
        refreshTokens,
    };
    return React.createElement(AuthContext.Provider, { value: contextValue }, children);
};
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe ser usado dentro de AuthProvider');
    }
    return context;
};
//# sourceMappingURL=useAuth.js.map