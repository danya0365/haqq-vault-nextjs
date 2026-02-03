/**
 * IAuthRepository
 * Repository interface for Authentication operations
 * Following Clean Architecture - Application layer
 */

import type { AuthCredentials, RegisterData, User } from '@/src/domain/types/user';

export interface AuthResult {
  success: boolean;
  user?: User;
  error?: string;
}

export interface PasswordResetResult {
  success: boolean;
  error?: string;
}

export interface EmailVerificationResult {
  success: boolean;
  error?: string;
}

export interface IAuthRepository {
  /**
   * Login with email and password
   */
  login(credentials: AuthCredentials): Promise<AuthResult>;

  /**
   * Register a new user
   */
  register(data: RegisterData): Promise<AuthResult>;

  /**
   * Logout the current user
   */
  logout(): Promise<void>;

  /**
   * Send forgot password email
   */
  forgotPassword(email: string): Promise<PasswordResetResult>;

  /**
   * Reset password with token
   */
  resetPassword(token: string, newPassword: string): Promise<PasswordResetResult>;

  /**
   * Change password (requires authentication)
   */
  changePassword(oldPassword: string, newPassword: string): Promise<PasswordResetResult>;

  /**
   * Verify email with token
   */
  verifyEmail(token: string): Promise<EmailVerificationResult>;

  /**
   * Resend verification email
   */
  resendVerification(email: string): Promise<EmailVerificationResult>;

  /**
   * Get current authenticated user
   */
  getCurrentUser(): Promise<User | null>;

  /**
   * Update user profile
   */
  updateProfile(data: Partial<User>): Promise<AuthResult>;
}
