import { PrismaClient } from '@prisma/client';
import bcryptjs from 'bcryptjs';
import type {
  User,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  AuthTokens,
  UserRole,
} from '../types/index.js';
import { generateTokens, verifyRefreshToken } from '../utils/jwt.js';
import { LoginSchema, RegisterSchema } from '../utils/validations.js';

const prisma = new PrismaClient();

export class AuthService {
  /**
   * Login de usuario - valida credenciales y genera tokens
   */
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    // Validar input
    const validated = LoginSchema.parse(credentials);

    // Buscar usuario
    const user = await prisma.user.findUnique({
      where: { email: validated.email },
    });

    if (!user) {
      throw new Error('Usuario o contraseña incorrectos');
    }

    // Validar contraseña
    const passwordMatch = await bcryptjs.compare(validated.password, user.password);

    if (!passwordMatch) {
      throw new Error('Usuario o contraseña incorrectos');
    }

    // Generar tokens
    const tokens = generateTokens(user.id, user.email, user.role);

    // Retornar usuario sin contraseña
    const userWithoutPassword = this.excludePassword(user);

    return {
      user: userWithoutPassword,
      tokens,
    };
  }

  /**
   * Registro de usuario - solo ADMIN puede crear nuevos usuarios
   * El sistema genera automáticamente una contraseña temporal
   */
  async register(
    data: RegisterRequest,
    adminId: string
  ): Promise<{ user: User; tempPassword: string }> {
    // Validar que el que registra sea admin
    const admin = await prisma.user.findUnique({
      where: { id: adminId },
    });

    if (!admin || admin.role !== 'ADMIN') {
      throw new Error('Solo administradores pueden crear usuarios');
    }

    // Validar input (sin password, se genera automáticamente)
    const validated = RegisterSchema.parse(data);

    // Verificar que el email no exista
    const existingUser = await prisma.user.findUnique({
      where: { email: validated.email },
    });

    if (existingUser) {
      throw new Error('Este email ya está registrado');
    }

    // Generar contraseña temporal (10 caracteres aleatorios)
    const tempPassword = Math.random().toString(36).slice(2, 12);
    const hashedPassword = await bcryptjs.hash(tempPassword, 10);

    // Crear usuario
    const newUser = await prisma.user.create({
      data: {
        email: validated.email,
        name: validated.name,
        password: hashedPassword,
        role: validated.role as UserRole,
        sedeId: validated.sedeId,
      },
    });

    // Retornar usuario sin contraseña y contraseña temporal
    const userWithoutPassword = this.excludePassword(newUser);

    return {
      user: userWithoutPassword,
      tempPassword,
    };
  }

  /**
   * Refresh tokens - genera nuevos tokens usando refresh token
   */
  async refreshTokens(refreshToken: string): Promise<AuthTokens> {
    const payload = verifyRefreshToken(refreshToken);

    if (!payload) {
      throw new Error('Refresh token inválido o expirado');
    }

    // Buscar usuario para validar que sigue existiendo
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
    });

    if (!user) {
      throw new Error('Usuario no existe');
    }

    // Generar nuevos tokens
    const tokens = generateTokens(user.id, user.email, user.role);

    return tokens;
  }

  /**
   * Cambiar contraseña
   * En el primer cambio, el usuario puede usar la contraseña temporal
   */
  async changePassword(userId: string, oldPassword: string, newPassword: string): Promise<void> {
    // Buscar usuario
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('Usuario no existe');
    }

    // Validar contraseña antigua
    const passwordMatch = await bcryptjs.compare(oldPassword, user.password);

    if (!passwordMatch) {
      throw new Error('Contraseña actual incorrecta');
    }

    // Validar que nueva contraseña sea diferente
    if (oldPassword === newPassword) {
      throw new Error('Nueva contraseña debe ser diferente a la actual');
    }

    // Validar longitud mínima
    if (newPassword.length < 6) {
      throw new Error('La contraseña debe tener al menos 6 caracteres');
    }

    // Hash nueva contraseña
    const hashedPassword = await bcryptjs.hash(newPassword, 10);

    // Actualizar
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });
  }

  /**
   * Reset de contraseña - solo ADMIN
   */
  async resetPassword(userId: string, adminId: string): Promise<{ tempPassword: string }> {
    // Validar que el que resetea sea admin
    const admin = await prisma.user.findUnique({
      where: { id: adminId },
    });

    if (!admin || admin.role !== 'ADMIN') {
      throw new Error('Solo administradores pueden resetear contraseñas');
    }

    // Buscar usuario
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('Usuario no existe');
    }

    // Generar contraseña temporal (8 caracteres aleatorios)
    const tempPassword = Math.random().toString(36).slice(2, 10);
    const hashedPassword = await bcryptjs.hash(tempPassword, 10);

    // Actualizar
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    return { tempPassword };
  }

  /**
   * Obtener usuario por ID
   */
  async getUserById(userId: string): Promise<User> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('Usuario no existe');
    }

    return this.excludePassword(user);
  }

  /**
   * Obtener todos los usuarios (solo ADMIN)
   */
  async getAllUsers(
    adminId: string,
    page = 1,
    limit = 10
  ): Promise<{
    users: User[];
    total: number;
    page: number;
    limit: number;
  }> {
    // Validar que sea admin
    const admin = await prisma.user.findUnique({
      where: { id: adminId },
    });

    if (!admin || admin.role !== 'ADMIN') {
      throw new Error('Solo administradores pueden listar usuarios');
    }

    const total = await prisma.user.count();

    const users = await prisma.user.findMany({
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });

    return {
      users: users.map((u: any) => this.excludePassword(u)),
      total,
      page,
      limit,
    };
  }

  /**
   * Utilidad: Excluir contraseña de usuario
   */
  private excludePassword(user: any): User {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}

export const authService = new AuthService();
