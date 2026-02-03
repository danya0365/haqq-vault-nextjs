/**
 * AuthPresenter
 * Handles business logic for Authentication
 * Receives repository via dependency injection
 */

import type {
    AuthResult,
    EmailVerificationResult,
    IAuthRepository,
    PasswordResetResult,
} from '@/src/application/repositories/IAuthRepository';
import type { AuthCredentials, RegisterData, User } from '@/src/domain/types/user';
import type { Metadata } from 'next';

export interface AuthViewModel {
  user: User | null;
  isAuthenticated: boolean;
}

/**
 * Presenter for Authentication
 * ✅ Receives repository via constructor injection
 */
export class AuthPresenter {
  constructor(private readonly repository: IAuthRepository) {}

  /**
   * Generate metadata for auth pages
   */
  generateMetadata(page: 'login' | 'register' | 'forgot-password' | 'reset-password' | 'change-password' | 'verify-email' | 'profile'): Metadata {
    const titles: Record<string, Metadata> = {
      login: {
        title: 'เข้าสู่ระบบ | Haqq Vault',
        description: 'เข้าสู่ระบบ Haqq Vault เพื่อเข้าถึงคลังความรู้อิสลาม',
      },
      register: {
        title: 'สมัครสมาชิก | Haqq Vault',
        description: 'สมัครสมาชิก Haqq Vault เพื่อเข้าร่วมชุมชนความรู้อิสลาม',
      },
      'forgot-password': {
        title: 'ลืมรหัสผ่าน | Haqq Vault',
        description: 'รีเซ็ตรหัสผ่าน Haqq Vault',
      },
      'reset-password': {
        title: 'รีเซ็ตรหัสผ่าน | Haqq Vault',
        description: 'ตั้งรหัสผ่านใหม่ Haqq Vault',
      },
      'change-password': {
        title: 'เปลี่ยนรหัสผ่าน | Haqq Vault',
        description: 'เปลี่ยนรหัสผ่าน Haqq Vault',
      },
      'verify-email': {
        title: 'ยืนยันอีเมล | Haqq Vault',
        description: 'ยืนยันอีเมล Haqq Vault',
      },
      profile: {
        title: 'โปรไฟล์ | Haqq Vault',
        description: 'จัดการโปรไฟล์ของคุณ',
      },
    };

    return titles[page] || { title: 'Haqq Vault' };
  }

  /**
   * Get initial view model
   */
  async getViewModel(): Promise<AuthViewModel> {
    try {
      const user = await this.repository.getCurrentUser();
      return {
        user,
        isAuthenticated: !!user,
      };
    } catch (error) {
      console.error('Error getting auth view model:', error);
      return {
        user: null,
        isAuthenticated: false,
      };
    }
  }

  /**
   * Login
   */
  async login(credentials: AuthCredentials): Promise<AuthResult> {
    try {
      return await this.repository.login(credentials);
    } catch (error) {
      console.error('Error during login:', error);
      return {
        success: false,
        error: 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง',
      };
    }
  }

  /**
   * Register
   */
  async register(data: RegisterData): Promise<AuthResult> {
    try {
      return await this.repository.register(data);
    } catch (error) {
      console.error('Error during registration:', error);
      return {
        success: false,
        error: 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง',
      };
    }
  }

  /**
   * Logout
   */
  async logout(): Promise<void> {
    try {
      await this.repository.logout();
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }

  /**
   * Forgot password
   */
  async forgotPassword(email: string): Promise<PasswordResetResult> {
    try {
      return await this.repository.forgotPassword(email);
    } catch (error) {
      console.error('Error during forgot password:', error);
      return {
        success: false,
        error: 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง',
      };
    }
  }

  /**
   * Reset password
   */
  async resetPassword(token: string, newPassword: string): Promise<PasswordResetResult> {
    try {
      return await this.repository.resetPassword(token, newPassword);
    } catch (error) {
      console.error('Error during reset password:', error);
      return {
        success: false,
        error: 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง',
      };
    }
  }

  /**
   * Change password
   */
  async changePassword(oldPassword: string, newPassword: string): Promise<PasswordResetResult> {
    try {
      return await this.repository.changePassword(oldPassword, newPassword);
    } catch (error) {
      console.error('Error during change password:', error);
      return {
        success: false,
        error: 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง',
      };
    }
  }

  /**
   * Verify email
   */
  async verifyEmail(token: string): Promise<EmailVerificationResult> {
    try {
      return await this.repository.verifyEmail(token);
    } catch (error) {
      console.error('Error during email verification:', error);
      return {
        success: false,
        error: 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง',
      };
    }
  }

  /**
   * Resend verification email
   */
  async resendVerification(email: string): Promise<EmailVerificationResult> {
    try {
      return await this.repository.resendVerification(email);
    } catch (error) {
      console.error('Error resending verification:', error);
      return {
        success: false,
        error: 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง',
      };
    }
  }

  /**
   * Update profile
   */
  async updateProfile(data: Partial<User>): Promise<AuthResult> {
    try {
      return await this.repository.updateProfile(data);
    } catch (error) {
      console.error('Error updating profile:', error);
      return {
        success: false,
        error: 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง',
      };
    }
  }
}
