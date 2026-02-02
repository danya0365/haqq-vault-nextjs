/**
 * User Type Definition
 */

export type UserRole = 'user' | 'scholar' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  nameArabic?: string;
  avatar?: string;
  role: UserRole;
  isVerified: boolean;
  bio?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  confirmPassword: string;
}
