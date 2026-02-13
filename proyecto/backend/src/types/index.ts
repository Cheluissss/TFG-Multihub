// Common types used across the application
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export type UserRole = 'ADMIN' | 'MANAGER' | 'EMPLOYEE';

export type ShiftType = 'MORNING' | 'AFTERNOON' | 'NIGHT' | 'CUSTOM';

export type ShiftRequestStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED';

// ==================
// User & Auth
// ==================

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  sedeId?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserWithPassword extends User {
  password: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface JwtPayload {
  userId: string;
  email: string;
  role: UserRole;
  iat: number;
  exp: number;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  tokens: AuthTokens;
}

export interface RegisterRequest {
  email: string;
  name: string;
  password: string;
  role?: UserRole;
  sedeId?: string;
}

// ==================
// Sede
// ==================

export interface Sede {
  id: string;
  name: string;
  address: string;
  city: string;
  phone?: string;
  managerId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateSedeRequest {
  name: string;
  address: string;
  city: string;
  phone?: string;
  managerId?: string;
}

// ==================
// Shift (Turno)
// ==================

export interface Shift {
  id: string;
  type: ShiftType;
  date: Date;
  startTime: Date;
  endTime: Date;
  employeeId: string;
  sedeId: string;
  confirmed: boolean;
  cancelled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateShiftRequest {
  type: ShiftType;
  date: Date;
  startTime: Date;
  endTime: Date;
  employeeId: string;
  sedeId: string;
}

export interface UpdateShiftRequest {
  confirmed?: boolean;
  cancelled?: boolean;
  type?: ShiftType;
  startTime?: Date;
  endTime?: Date;
}

// ==================
// ShiftRequest (Permuta)
// ==================

export interface ShiftRequest {
  id: string;
  initiatorShiftId: string;
  targetShiftId: string;
  initiatorId: string;
  targetId: string;
  status: ShiftRequestStatus;
  reason?: string;
  decidedAt?: Date;
  approvedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateShiftRequestRequest {
  initiatorShiftId: string;
  targetShiftId: string;
  reason?: string;
}

export interface ApproveShiftRequestRequest {
  status: 'APPROVED' | 'REJECTED';
  reason?: string;
}
