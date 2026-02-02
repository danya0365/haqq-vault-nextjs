/**
 * Auth Store using Zustand
 * Manages authentication state with localStorage persistence
 */

import type { AuthCredentials, RegisterData, User } from '@/src/domain/types/user';
import { MOCK_PASSWORDS, MOCK_USERS } from '@/src/infrastructure/repositories/mock/data/mockUsers';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AuthState {
  // State
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;

  // Actions
  login: (credentials: AuthCredentials) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<boolean>;
  clearError: () => void;
  forgotPassword: (email: string) => Promise<boolean>;
  resetPassword: (token: string, newPassword: string) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      isLoading: false,
      isAuthenticated: false,
      error: null,

      // Login action
      login: async (credentials: AuthCredentials) => {
        set({ isLoading: true, error: null });

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const user = MOCK_USERS.find((u) => u.email === credentials.email);
        const correctPassword = MOCK_PASSWORDS[credentials.email];

        if (!user || correctPassword !== credentials.password) {
          set({
            isLoading: false,
            error: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง',
          });
          return false;
        }

        set({
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });

        return true;
      },

      // Register action
      register: async (data: RegisterData) => {
        set({ isLoading: true, error: null });

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Check if email already exists
        const existingUser = MOCK_USERS.find((u) => u.email === data.email);
        if (existingUser) {
          set({
            isLoading: false,
            error: 'อีเมลนี้ถูกใช้งานแล้ว',
          });
          return false;
        }

        // Validate password match
        if (data.password !== data.confirmPassword) {
          set({
            isLoading: false,
            error: 'รหัสผ่านไม่ตรงกัน',
          });
          return false;
        }

        // Create new mock user
        const newUser: User = {
          id: `user-${Date.now()}`,
          email: data.email,
          name: data.name,
          role: 'user',
          isVerified: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        // In real app, this would save to database
        // For mock, we simulate success
        set({
          user: newUser,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });

        return true;
      },

      // Logout action
      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          error: null,
        });
      },

      // Update profile
      updateProfile: async (data: Partial<User>) => {
        set({ isLoading: true, error: null });

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const currentUser = get().user;
        if (!currentUser) {
          set({
            isLoading: false,
            error: 'ไม่พบข้อมูลผู้ใช้',
          });
          return false;
        }

        const updatedUser: User = {
          ...currentUser,
          ...data,
          updatedAt: new Date().toISOString(),
        };

        set({
          user: updatedUser,
          isLoading: false,
          error: null,
        });

        return true;
      },

      // Clear error
      clearError: () => {
        set({ error: null });
      },

      // Forgot password
      forgotPassword: async (email: string) => {
        set({ isLoading: true, error: null });

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const user = MOCK_USERS.find((u) => u.email === email);
        if (!user) {
          // Don't reveal if email exists for security
          set({ isLoading: false });
          return true;
        }

        // Simulate sending reset email
        set({ isLoading: false });
        return true;
      },

      // Reset password
      resetPassword: async (token: string, newPassword: string) => {
        set({ isLoading: true, error: null });

        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // In real app, validate token and update password
        set({ isLoading: false });
        return true;
      },
    }),
    {
      name: 'haqq-vault-auth',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
