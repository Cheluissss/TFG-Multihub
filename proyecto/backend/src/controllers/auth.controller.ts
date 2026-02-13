import type { Request, Response } from 'express';
import { authService } from '../services/auth.service.js';
import type { ApiResponse, LoginResponse } from '../types/index.js';
import { LoginSchema, RegisterSchema } from '../utils/validations.js';

export class AuthController {
  /**
   * POST /auth/login
   */
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      // Validar input
      LoginSchema.parse({ email, password });

      const result = await authService.login({ email, password });

      // Opcionalmente: guardar refresh token en http-only cookie
      res.cookie('refreshToken', result.tokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días
      });

      const response: ApiResponse<LoginResponse> = {
        success: true,
        data: result,
      };

      res.json(response);
    } catch (error: any) {
      console.error('Login error:', error.message);
      const response: ApiResponse<null> = {
        success: false,
        error: error.message || 'Error en login',
      };
      res.status(401).json(response);
    }
  }

  /**
   * POST /auth/register
   * Solo ADMIN puede crear usuarios
   */
  async register(req: Request, res: Response): Promise<void> {
    try {
      const adminId = req.user?.userId;

      if (!adminId) {
        res.status(401).json({
          success: false,
          error: 'Usuario no autenticado',
        });
        return;
      }

      const { email, name, password, role, sedeId } = req.body;

      // Validar input
      RegisterSchema.parse({ email, name, password, role, sedeId });

      const result = await authService.register({ email, name, password, role, sedeId }, adminId);

      const response: ApiResponse<LoginResponse> = {
        success: true,
        data: result,
        message: 'Usuario creado exitosamente',
      };

      res.status(201).json(response);
    } catch (error: any) {
      console.error('Register error:', error.message);
      const response: ApiResponse<null> = {
        success: false,
        error: error.message || 'Error en registro',
      };
      res.status(400).json(response);
    }
  }

  /**
   * POST /auth/refresh
   * Generar nuevos tokens usando refresh token
   */
  async refreshTokens(req: Request, res: Response): Promise<void> {
    try {
      const refreshToken = req.cookies.refreshToken || req.body.refreshToken;

      if (!refreshToken) {
        res.status(401).json({
          success: false,
          error: 'Refresh token no proporcionado',
        });
        return;
      }

      const tokens = await authService.refreshTokens(refreshToken);

      // Actualizar cookie si es necesario
      res.cookie('refreshToken', tokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.json({
        success: true,
        data: tokens,
      });
    } catch (error: any) {
      console.error('Refresh token error:', error.message);
      res.status(401).json({
        success: false,
        error: error.message || 'Error al refrescar tokens',
      });
    }
  }

  /**
   * POST /auth/logout
   */
  async logout(req: Request, res: Response): Promise<void> {
    try {
      // Limpiar cookie de refresh token
      res.clearCookie('refreshToken');

      res.json({
        success: true,
        message: 'Sesión cerrada exitosamente',
      });
    } catch (error: any) {
      console.error('Logout error:', error.message);
      res.status(500).json({
        success: false,
        error: 'Error al cerrar sesión',
      });
    }
  }

  /**
   * POST /auth/change-password
   */
  async changePassword(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.userId;

      if (!userId) {
        res.status(401).json({
          success: false,
          error: 'Usuario no autenticado',
        });
        return;
      }

      const { oldPassword, newPassword } = req.body;

      if (!oldPassword || !newPassword) {
        res.status(400).json({
          success: false,
          error: 'Contraseñas requeridas',
        });
        return;
      }

      await authService.changePassword(userId, oldPassword, newPassword);

      res.json({
        success: true,
        message: 'Contraseña actualizada exitosamente',
      });
    } catch (error: any) {
      console.error('Change password error:', error.message);
      res.status(400).json({
        success: false,
        error: error.message || 'Error al cambiar contraseña',
      });
    }
  }

  /**
   * POST /auth/reset-password/:userId
   * Solo ADMIN
   */
  async resetPassword(req: Request, res: Response): Promise<void> {
    try {
      const adminId = req.user?.userId;
      const { userId } = req.params;

      if (!adminId) {
        res.status(401).json({
          success: false,
          error: 'Usuario no autenticado',
        });
        return;
      }

      const { tempPassword } = await authService.resetPassword(userId, adminId);

      res.json({
        success: true,
        data: { tempPassword },
        message: `Contraseña reseteada. Contraseña temporal: ${tempPassword}`,
      });
    } catch (error: any) {
      console.error('Reset password error:', error.message);
      res.status(400).json({
        success: false,
        error: error.message || 'Error al resetear contraseña',
      });
    }
  }

  /**
   * GET /auth/me
   * Obtener info del usuario actual
   */
  async getCurrentUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.userId;

      if (!userId) {
        res.status(401).json({
          success: false,
          error: 'Usuario no autenticado',
        });
        return;
      }

      const user = await authService.getUserById(userId);

      res.json({
        success: true,
        data: user,
      });
    } catch (error: any) {
      console.error('Get current user error:', error.message);
      res.status(400).json({
        success: false,
        error: error.message || 'Error al obtener usuario',
      });
    }
  }
}

export const authController = new AuthController();
