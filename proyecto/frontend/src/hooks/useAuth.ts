import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User, LoginRequest, AuthResponse } from '../types/index';
import {
  authAPI,
  getAccessToken,
  setAccessToken,
  removeAccessToken,
  getStoredUser,
  setStoredUser,
  removeStoredUser,
} from '../utils/api';

// ==================
// Auth Context
// ==================

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  logout: () => void;
  refreshTokens: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(getStoredUser());
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

  const login = async (credentials: LoginRequest): Promise<void> => {
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
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await authAPI.logout();
    } finally {
      setUser(null);
      removeAccessToken();
      removeStoredUser();
    }
  };

  const refreshTokens = async (): Promise<boolean> => {
    try {
      const response = await authAPI.refreshTokens();

      if (!response.data) {
        throw new Error('No se recibieron tokens');
      }

      setAccessToken(response.data.accessToken);
      return true;
    } catch (error) {
      console.error('Error refreshing tokens:', error);
      removeAccessToken();
      removeStoredUser();
      setUser(null);
      return false;
    }
  };

  const contextValue: AuthContextType = {
    user,
    isAuthenticated: !!user && !!getAccessToken(),
    isLoading,
    login,
    logout,
    refreshTokens,
  };

  return React.createElement(AuthContext.Provider, { value: contextValue }, children);
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
};
