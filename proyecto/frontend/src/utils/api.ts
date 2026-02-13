import type { ApiResponse, LoginRequest, AuthResponse } from '../types/index';

const API_URL = 'http://localhost:3001/api';

// ==================
// Utilities
// ==================

export const getAccessToken = (): string | null => {
  return localStorage.getItem('accessToken');
};

export const setAccessToken = (token: string): void => {
  localStorage.setItem('accessToken', token);
};

export const removeAccessToken = (): void => {
  localStorage.removeItem('accessToken');
};

export const getStoredUser = (): any | null => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const setStoredUser = (user: any): void => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const removeStoredUser = (): void => {
  localStorage.removeItem('user');
};

// ==================
// API Calls
// ==================

export const authAPI = {
  /**
   * Login - obtiene accessToken y refreshToken
   */
  async login(credentials: LoginRequest): Promise<ApiResponse<AuthResponse>> {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
      credentials: 'include', // Para enviar cookies (refreshToken)
    });

    const data: ApiResponse<AuthResponse> = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Error al iniciar sesión');
    }

    return data;
  },

  /**
   * Logout - limpia sesión
   */
  async logout(): Promise<void> {
    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getAccessToken()}`,
        },
        credentials: 'include',
      });
    } catch (error) {
      console.error('Error en logout:', error);
    }
  },

  /**
   * Refresh - obtiene nuevo accessToken usando refreshToken
   */
  async refreshTokens(): Promise<ApiResponse<{ accessToken: string; refreshToken: string }>> {
    const response = await fetch(`${API_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    const data: ApiResponse<{ accessToken: string; refreshToken: string }> = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Error al refrescar tokens');
    }

    return data;
  },

  /**
   * Get current user info
   */
  async getCurrentUser(): Promise<ApiResponse<any>> {
    const response = await fetch(`${API_URL}/auth/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });

    const data: ApiResponse<any> = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Error al obtener usuario');
    }

    return data;
  },
};
