/**
 * useAuthPresenter
 * Custom hook for Auth presenter with state management
 * Integrates with Zustand store for persistence
 */

'use client';

import type { AuthCredentials, RegisterData, User } from '@/src/domain/types/user';
import { useAuthStore } from '@/src/infrastructure/stores/authStore';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { AuthPresenter } from './AuthPresenter';
import { createClientAuthPresenter } from './AuthPresenterClientFactory';

export interface AuthPresenterState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface AuthPresenterActions {
  login: (credentials: AuthCredentials) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<boolean>;
  resetPassword: (token: string, newPassword: string) => Promise<boolean>;
  changePassword: (oldPassword: string, newPassword: string) => Promise<boolean>;
  verifyEmail: (token: string) => Promise<boolean>;
  resendVerification: (email: string) => Promise<boolean>;
  updateProfile: (data: Partial<User>) => Promise<boolean>;
  clearError: () => void;
}

/**
 * Custom hook for Auth presenter
 * Uses Zustand store for state persistence
 */
export function useAuthPresenter(
  presenterOverride?: AuthPresenter
): [AuthPresenterState, AuthPresenterActions] {
  // Create presenter with useMemo for stability
  const presenter = useMemo(
    () => presenterOverride ?? createClientAuthPresenter(),
    [presenterOverride]
  );

  // Track mounted state
  const isMountedRef = useRef(true);

  // Use Zustand store for persistence
  const store = useAuthStore();

  // Local loading and error state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cleanup on unmount
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // State from store
  const state: AuthPresenterState = {
    user: store.user,
    isAuthenticated: store.isAuthenticated,
    isLoading: isLoading || store.isLoading,
    error: error || store.error,
  };

  // Actions
  const login = useCallback(
    async (credentials: AuthCredentials): Promise<boolean> => {
      setIsLoading(true);
      setError(null);

      const result = await presenter.login(credentials);

      if (isMountedRef.current) {
        setIsLoading(false);
        if (!result.success) {
          setError(result.error || 'เกิดข้อผิดพลาด');
          return false;
        }
        // Update store
        await store.login(credentials);
      }

      return result.success;
    },
    [presenter, store]
  );

  const register = useCallback(
    async (data: RegisterData): Promise<boolean> => {
      setIsLoading(true);
      setError(null);

      const result = await presenter.register(data);

      if (isMountedRef.current) {
        setIsLoading(false);
        if (!result.success) {
          setError(result.error || 'เกิดข้อผิดพลาด');
          return false;
        }
        // Update store
        await store.register(data);
      }

      return result.success;
    },
    [presenter, store]
  );

  const logout = useCallback(async (): Promise<void> => {
    await presenter.logout();
    store.logout();
  }, [presenter, store]);

  const forgotPassword = useCallback(
    async (email: string): Promise<boolean> => {
      setIsLoading(true);
      setError(null);

      const result = await presenter.forgotPassword(email);

      if (isMountedRef.current) {
        setIsLoading(false);
        if (!result.success) {
          setError(result.error || 'เกิดข้อผิดพลาด');
          return false;
        }
      }

      return result.success;
    },
    [presenter]
  );

  const resetPassword = useCallback(
    async (token: string, newPassword: string): Promise<boolean> => {
      setIsLoading(true);
      setError(null);

      const result = await presenter.resetPassword(token, newPassword);

      if (isMountedRef.current) {
        setIsLoading(false);
        if (!result.success) {
          setError(result.error || 'เกิดข้อผิดพลาด');
          return false;
        }
      }

      return result.success;
    },
    [presenter]
  );

  const changePassword = useCallback(
    async (oldPassword: string, newPassword: string): Promise<boolean> => {
      setIsLoading(true);
      setError(null);

      const result = await presenter.changePassword(oldPassword, newPassword);

      if (isMountedRef.current) {
        setIsLoading(false);
        if (!result.success) {
          setError(result.error || 'เกิดข้อผิดพลาด');
          return false;
        }
      }

      return result.success;
    },
    [presenter]
  );

  const verifyEmail = useCallback(
    async (token: string): Promise<boolean> => {
      setIsLoading(true);
      setError(null);

      const result = await presenter.verifyEmail(token);

      if (isMountedRef.current) {
        setIsLoading(false);
        if (!result.success) {
          setError(result.error || 'เกิดข้อผิดพลาด');
          return false;
        }
      }

      return result.success;
    },
    [presenter]
  );

  const resendVerification = useCallback(
    async (email: string): Promise<boolean> => {
      setIsLoading(true);
      setError(null);

      const result = await presenter.resendVerification(email);

      if (isMountedRef.current) {
        setIsLoading(false);
        if (!result.success) {
          setError(result.error || 'เกิดข้อผิดพลาด');
          return false;
        }
      }

      return result.success;
    },
    [presenter]
  );

  const updateProfile = useCallback(
    async (data: Partial<User>): Promise<boolean> => {
      setIsLoading(true);
      setError(null);

      const result = await presenter.updateProfile(data);

      if (isMountedRef.current) {
        setIsLoading(false);
        if (!result.success) {
          setError(result.error || 'เกิดข้อผิดพลาด');
          return false;
        }
        // Update store
        await store.updateProfile(data);
      }

      return result.success;
    },
    [presenter, store]
  );

  const clearError = useCallback(() => {
    setError(null);
    store.clearError();
  }, [store]);

  const actions: AuthPresenterActions = {
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    changePassword,
    verifyEmail,
    resendVerification,
    updateProfile,
    clearError,
  };

  return [state, actions];
}
