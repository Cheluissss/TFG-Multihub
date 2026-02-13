import { Router } from 'express';
import { authController } from '../controllers/auth.controller.js';
import { authMiddleware, roleMiddleware } from '../middleware/auth.js';

const router = Router();

/**
 * Rutas públicas (sin autenticación)
 */

// POST /auth/login
router.post('/login', (req, res) => authController.login(req, res));

// POST /auth/refresh
router.post('/refresh', (req, res) => authController.refreshTokens(req, res));

/**
 * Rutas protegidas (requieren autenticación)
 */

// POST /auth/register - Solo ADMIN
router.post('/register', authMiddleware, roleMiddleware(['ADMIN']), (req, res) =>
  authController.register(req, res)
);

// POST /auth/logout
router.post('/logout', authMiddleware, (req, res) => authController.logout(req, res));

// POST /auth/change-password
router.post('/change-password', authMiddleware, (req, res) =>
  authController.changePassword(req, res)
);

// POST /auth/reset-password/:userId - Solo ADMIN
router.post('/reset-password/:userId', authMiddleware, roleMiddleware(['ADMIN']), (req, res) =>
  authController.resetPassword(req, res)
);

// GET /auth/me - Usuario actual
router.get('/me', authMiddleware, (req, res) => authController.getCurrentUser(req, res));

export default router;
