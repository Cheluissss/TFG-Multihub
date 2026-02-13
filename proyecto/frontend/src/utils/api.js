const API_URL = 'http://localhost:3001/api';
// ==================
// Utilities
// ==================
export const getAccessToken = () => {
    return localStorage.getItem('accessToken');
};
export const setAccessToken = (token) => {
    localStorage.setItem('accessToken', token);
};
export const removeAccessToken = () => {
    localStorage.removeItem('accessToken');
};
export const getStoredUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};
export const setStoredUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
};
export const removeStoredUser = () => {
    localStorage.removeItem('user');
};
// ==================
// API Calls
// ==================
export const authAPI = {
    /**
     * Login - obtiene accessToken y refreshToken
     */
    async login(credentials) {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
            credentials: 'include', // Para enviar cookies (refreshToken)
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || 'Error al iniciar sesión');
        }
        return data;
    },
    /**
     * Logout - limpia sesión
     */
    async logout() {
        try {
            await fetch(`${API_URL}/auth/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${getAccessToken()}`,
                },
                credentials: 'include',
            });
        }
        catch (error) {
            console.error('Error en logout:', error);
        }
    },
    /**
     * Refresh - obtiene nuevo accessToken usando refreshToken
     */
    async refreshTokens() {
        const response = await fetch(`${API_URL}/auth/refresh`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || 'Error al refrescar tokens');
        }
        return data;
    },
    /**
     * Get current user info
     */
    async getCurrentUser() {
        const response = await fetch(`${API_URL}/auth/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getAccessToken()}`,
            },
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || 'Error al obtener usuario');
        }
        return data;
    },
};
//# sourceMappingURL=api.js.map