import { z } from 'zod';

// ============
// Auth Schema
// ============

export const LoginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Contraseña debe tener al menos 6 caracteres'),
});

export const RegisterSchema = z.object({
  email: z.string().email('Email inválido'),
  name: z.string().min(2, 'Nombre debe tener al menos 2 caracteres'),
  password: z.string().min(6, 'Contraseña debe tener al menos 6 caracteres'),
  role: z.enum(['ADMIN', 'MANAGER', 'EMPLOYEE']).optional().default('EMPLOYEE'),
  sedeId: z.string().optional(),
});

// ============
// User Schema
// ============

export const CreateUserSchema = z.object({
  email: z.string().email('Email inválido'),
  name: z.string().min(2, 'Nombre requerido'),
  password: z.string().min(6, 'Contraseña debe tener al menos 6 caracteres'),
  role: z.enum(['ADMIN', 'MANAGER', 'EMPLOYEE']).default('EMPLOYEE'),
  sedeId: z.string().optional(),
});

export const UpdateUserSchema = z.object({
  name: z.string().min(2).optional(),
  role: z.enum(['ADMIN', 'MANAGER', 'EMPLOYEE']).optional(),
  sedeId: z.string().optional().nullable(),
});

// ============
// Sede Schema
// ============

export const CreateSedeSchema = z.object({
  name: z.string().min(2, 'Nombre de sede requerido'),
  address: z.string().min(5, 'Dirección requerida'),
  city: z.string().min(2, 'Ciudad requerida'),
  phone: z.string().regex(/^\+?[0-9\s-()]{7,}$/, 'Teléfono inválido').optional(),
  managerId: z.string().optional(),
});

export const UpdateSedeSchema = z.object({
  name: z.string().min(2).optional(),
  address: z.string().min(5).optional(),
  city: z.string().min(2).optional(),
  phone: z.string().optional(),
  managerId: z.string().optional().nullable(),
});

// ============
// Shift Schema
// ============

export const CreateShiftSchema = z.object({
  type: z.enum(['MORNING', 'AFTERNOON', 'NIGHT', 'CUSTOM']),
  date: z.coerce.date(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  employeeId: z.string().cuid('ID de empleado inválido'),
  sedeId: z.string().cuid('ID de sede inválido'),
}).refine(
  (data) => data.startTime < data.endTime,
  { message: 'Hora de inicio debe ser antes que hora de fin', path: ['startTime'] }
);

export const UpdateShiftSchema = z.object({
  confirmed: z.boolean().optional(),
  cancelled: z.boolean().optional(),
  type: z.enum(['MORNING', 'AFTERNOON', 'NIGHT', 'CUSTOM']).optional(),
  startTime: z.coerce.date().optional(),
  endTime: z.coerce.date().optional(),
});

// ============
// ShiftRequest Schema
// ============

export const CreateShiftRequestSchema = z.object({
  initiatorShiftId: z.string().cuid('ID de turno inválido'),
  targetShiftId: z.string().cuid('ID de turno objetivo inválido'),
  reason: z.string().max(500).optional(),
}).refine(
  (data) => data.initiatorShiftId !== data.targetShiftId,
  { message: 'No puedes solicitar permuta con el mismo turno', path: ['targetShiftId'] }
);

export const ApproveShiftRequestSchema = z.object({
  status: z.enum(['APPROVED', 'REJECTED']),
  reason: z.string().max(500).optional(),
});

// ============
// Pagination
// ============

export const PaginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});
