import type { ApiResponse, LoginRequest, AuthResponse } from '../types/index';
export declare const getAccessToken: () => string | null;
export declare const setAccessToken: (token: string) => void;
export declare const removeAccessToken: () => void;
export declare const getStoredUser: () => any | null;
export declare const setStoredUser: (user: any) => void;
export declare const removeStoredUser: () => void;
export declare const authAPI: {
    /**
     * Login - obtiene accessToken y refreshToken
     */
    login(credentials: LoginRequest): Promise<ApiResponse<AuthResponse>>;
    /**
     * Logout - limpia sesión
     */
    logout(): Promise<void>;
    /**
     * Refresh - obtiene nuevo accessToken usando refreshToken
     */
    refreshTokens(): Promise<ApiResponse<{
        accessToken: string;
        refreshToken: string;
    }>>;
    /**
     * Get current user info
     */
    getCurrentUser(): Promise<ApiResponse<any>>;
};
//# sourceMappingURL=api.d.ts.map