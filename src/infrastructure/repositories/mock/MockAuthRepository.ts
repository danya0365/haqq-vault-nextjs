/**
 * MockAuthRepository
 * Mock implementation for development and testing
 * Following Clean Architecture - Infrastructure layer
 */

import type {
    AuthResult,
    EmailVerificationResult,
    IAuthRepository,
    PasswordResetResult,
} from '@/src/application/repositories/IAuthRepository';
import type { AuthCredentials, RegisterData, User } from '@/src/domain/types/user';
import { MOCK_PASSWORDS, MOCK_USERS } from './data/mockUsers';

export class MockAuthRepository implements IAuthRepository {
  private currentUser: User | null = null;
  private users: User[] = [...MOCK_USERS];
  private passwords: Record<string, string> = { ...MOCK_PASSWORDS };

  // Simulate network delay
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async login(credentials: AuthCredentials): Promise<AuthResult> {
    await this.delay(1000);

    const user = this.users.find((u) => u.email === credentials.email);
    const correctPassword = this.passwords[credentials.email];

    if (!user || correctPassword !== credentials.password) {
      return {
        success: false,
        error: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง',
      };
    }

    this.currentUser = user;
    return {
      success: true,
      user,
    };
  }

  async register(data: RegisterData): Promise<AuthResult> {
    await this.delay(1500);

    // Check if email already exists
    const existingUser = this.users.find((u) => u.email === data.email);
    if (existingUser) {
      return {
        success: false,
        error: 'อีเมลนี้ถูกใช้งานแล้ว',
      };
    }

    // Validate password match
    if (data.password !== data.confirmPassword) {
      return {
        success: false,
        error: 'รหัสผ่านไม่ตรงกัน',
      };
    }

    // Create new user
    const newUser: User = {
      id: `user-${Date.now()}`,
      email: data.email,
      name: data.name,
      role: 'user',
      isVerified: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.users.push(newUser);
    this.passwords[data.email] = data.password;
    this.currentUser = newUser;

    return {
      success: true,
      user: newUser,
    };
  }

  async logout(): Promise<void> {
    await this.delay(300);
    this.currentUser = null;
  }

  async forgotPassword(email: string): Promise<PasswordResetResult> {
    await this.delay(1500);

    // Don't reveal if email exists for security
    // Simulate sending reset email
    console.log(`[Mock] Password reset email sent to: ${email}`);
    
    return { success: true };
  }

  async resetPassword(token: string, newPassword: string): Promise<PasswordResetResult> {
    await this.delay(1000);

    // Validate token (mock: accept any non-empty token)
    if (!token) {
      return {
        success: false,
        error: 'โทเค็นไม่ถูกต้องหรือหมดอายุ',
      };
    }

    // Validate password length
    if (newPassword.length < 6) {
      return {
        success: false,
        error: 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร',
      };
    }

    // In real app, decode token to get user email and update password
    console.log(`[Mock] Password reset successful for token: ${token}`);
    
    return { success: true };
  }

  async changePassword(oldPassword: string, newPassword: string): Promise<PasswordResetResult> {
    await this.delay(1000);

    if (!this.currentUser) {
      return {
        success: false,
        error: 'กรุณาเข้าสู่ระบบก่อน',
      };
    }

    // Verify old password
    const correctPassword = this.passwords[this.currentUser.email];
    if (correctPassword !== oldPassword) {
      return {
        success: false,
        error: 'รหัสผ่านปัจจุบันไม่ถูกต้อง',
      };
    }

    // Validate new password
    if (newPassword.length < 6) {
      return {
        success: false,
        error: 'รหัสผ่านใหม่ต้องมีอย่างน้อย 6 ตัวอักษร',
      };
    }

    // Update password
    this.passwords[this.currentUser.email] = newPassword;
    
    return { success: true };
  }

  async verifyEmail(token: string): Promise<EmailVerificationResult> {
    await this.delay(1000);

    // Validate token (mock: accept any non-empty token)
    if (!token) {
      return {
        success: false,
        error: 'โทเค็นไม่ถูกต้องหรือหมดอายุ',
      };
    }

    // In real app, decode token to get user and verify
    if (this.currentUser) {
      this.currentUser = {
        ...this.currentUser,
        isVerified: true,
        updatedAt: new Date().toISOString(),
      };

      // Update in users array
      const index = this.users.findIndex((u) => u.id === this.currentUser?.id);
      if (index !== -1) {
        this.users[index] = this.currentUser;
      }
    }

    return { success: true };
  }

  async resendVerification(email: string): Promise<EmailVerificationResult> {
    await this.delay(1500);

    const user = this.users.find((u) => u.email === email);
    if (!user) {
      // Don't reveal if email exists for security
      return { success: true };
    }

    if (user.isVerified) {
      return {
        success: false,
        error: 'อีเมลนี้ได้รับการยืนยันแล้ว',
      };
    }

    console.log(`[Mock] Verification email resent to: ${email}`);
    return { success: true };
  }

  async getCurrentUser(): Promise<User | null> {
    await this.delay(100);
    return this.currentUser;
  }

  async updateProfile(data: Partial<User>): Promise<AuthResult> {
    await this.delay(1000);

    if (!this.currentUser) {
      return {
        success: false,
        error: 'ไม่พบข้อมูลผู้ใช้',
      };
    }

    const updatedUser: User = {
      ...this.currentUser,
      ...data,
      updatedAt: new Date().toISOString(),
    };

    this.currentUser = updatedUser;

    // Update in users array
    const index = this.users.findIndex((u) => u.id === this.currentUser?.id);
    if (index !== -1) {
      this.users[index] = updatedUser;
    }

    return {
      success: true,
      user: updatedUser,
    };
  }
}

// Export singleton instance
export const mockAuthRepository = new MockAuthRepository();
