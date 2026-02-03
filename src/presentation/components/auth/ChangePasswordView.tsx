'use client';

/**
 * ChangePasswordView
 * Change password page (requires authentication)
 */

import { UI_CONFIG } from '@/src/config/ui.config';
import { AnimatedButton } from '@/src/presentation/components/animated/AnimatedButton';
import { AnimatedIslamicPattern } from '@/src/presentation/components/animated/AnimatedIslamicPattern';
import { MainLayout } from '@/src/presentation/layouts/MainLayout';
import { useAuthPresenter } from '@/src/presentation/presenters/auth/useAuthPresenter';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function ChangePasswordView() {
  const router = useRouter();
  const [state, actions] = useAuthPresenter();

  const [isLoaded, setIsLoaded] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [passwordStrength, setPasswordStrength] = useState(0);

  useEffect(() => {
    setIsLoaded(true);
    actions.clearError();
  }, [actions]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!state.isAuthenticated && isLoaded) {
      router.push('/auth/login');
    }
  }, [state.isAuthenticated, isLoaded, router]);

  // Calculate password strength
  useEffect(() => {
    const { newPassword } = formData;
    let strength = 0;
    if (newPassword.length >= 6) strength++;
    if (newPassword.length >= 8) strength++;
    if (/[A-Z]/.test(newPassword)) strength++;
    if (/[0-9]/.test(newPassword)) strength++;
    if (/[^A-Za-z0-9]/.test(newPassword)) strength++;
    setPasswordStrength(strength);
  }, [formData.newPassword]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    // Validate password match
    if (formData.newPassword !== formData.confirmPassword) {
      setLocalError('รหัสผ่านใหม่ไม่ตรงกัน');
      return;
    }

    // Validate password length
    if (formData.newPassword.length < 6) {
      setLocalError('รหัสผ่านใหม่ต้องมีอย่างน้อย 6 ตัวอักษร');
      return;
    }

    const success = await actions.changePassword(formData.currentPassword, formData.newPassword);
    if (success) {
      setIsSuccess(true);
    }
  };

  const getStrengthColor = () => {
    if (passwordStrength <= 1) return 'bg-red-500';
    if (passwordStrength <= 2) return 'bg-orange-500';
    if (passwordStrength <= 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStrengthLabel = () => {
    if (passwordStrength <= 1) return 'อ่อน';
    if (passwordStrength <= 2) return 'ปานกลาง';
    if (passwordStrength <= 3) return 'ดี';
    return 'แข็งแรง';
  };

  const error = localError || state.error;

  // Loading state
  if (!state.user && !isLoaded) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <span className="animate-spin text-4xl inline-block mb-4">⏳</span>
            <p className="text-muted">{UI_CONFIG.labels.loading}</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="min-h-screen py-8 md:py-16 flex items-center">
        <div className="w-full max-w-md mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className={`text-center mb-8 transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            <div className="inline-flex items-center justify-center mb-6">
              <AnimatedIslamicPattern type="octagon" size="lg" color="primary" animation="pulse" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              {UI_CONFIG.labels.changePassword}
            </h1>
            <p className="text-muted">เปลี่ยนรหัสผ่านเพื่อความปลอดภัย</p>
          </div>

          {/* Form */}
          <div className={`transition-all duration-500 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            <div className="bg-surface dark:bg-surface rounded-2xl border border-border p-6 md:p-8 shadow-lg">
              {isSuccess ? (
                <div className="text-center py-6">
                  <div className="text-6xl mb-4">✅</div>
                  <h2 className="text-xl font-bold text-foreground mb-2">
                    เปลี่ยนรหัสผ่านสำเร็จ
                  </h2>
                  <p className="text-muted mb-6 text-sm">
                    รหัสผ่านของคุณถูกเปลี่ยนเรียบร้อยแล้ว
                  </p>
                  <Link href="/auth/profile" className="block">
                    <AnimatedButton variant="primary" className="w-full">
                      กลับไปโปรไฟล์
                    </AnimatedButton>
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Error message */}
                  {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-xl text-sm">
                      {error}
                    </div>
                  )}

                  {/* Current Password */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {UI_CONFIG.placeholders.currentPassword}
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        required
                        value={formData.currentPassword}
                        onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                        className="w-full px-4 py-3 pl-11 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        placeholder={UI_CONFIG.placeholders.currentPassword}
                      />
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">
                        🔑
                      </span>
                    </div>
                  </div>

                  {/* New Password */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      รหัสผ่านใหม่
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        minLength={6}
                        value={formData.newPassword}
                        onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                        className="w-full px-4 py-3 pl-11 pr-11 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        placeholder={UI_CONFIG.placeholders.newPassword}
                      />
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">
                        🔒
                      </span>
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors"
                      >
                        {showPassword ? '🙈' : '👁️'}
                      </button>
                    </div>
                    {/* Password strength */}
                    {formData.newPassword && (
                      <div className="mt-2">
                        <div className="flex gap-1 h-1.5">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className={`flex-1 rounded-full transition-colors ${
                                i < passwordStrength ? getStrengthColor() : 'bg-gray-200 dark:bg-gray-700'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-xs text-muted mt-1">
                          ความแข็งแรง: <span className={passwordStrength >= 4 ? 'text-green-500' : 'text-muted'}>{getStrengthLabel()}</span>
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Confirm New Password */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {UI_CONFIG.placeholders.confirmPassword}
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        required
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        className={`w-full px-4 py-3 pl-11 rounded-xl bg-background border focus:ring-2 outline-none transition-all ${
                          formData.confirmPassword && formData.confirmPassword !== formData.newPassword
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                            : 'border-border focus:border-primary focus:ring-primary/20'
                        }`}
                        placeholder={UI_CONFIG.placeholders.confirmPassword}
                      />
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">
                        🔐
                      </span>
                    </div>
                    {formData.confirmPassword && formData.confirmPassword !== formData.newPassword && (
                      <p className="text-xs text-red-500 mt-1">รหัสผ่านไม่ตรงกัน</p>
                    )}
                  </div>

                  {/* Submit */}
                  <AnimatedButton
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={state.isLoading || formData.newPassword !== formData.confirmPassword}
                    className="w-full"
                  >
                    {state.isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="animate-spin">⏳</span>
                        กำลังเปลี่ยนรหัสผ่าน...
                      </span>
                    ) : (
                      UI_CONFIG.labels.changePassword
                    )}
                  </AnimatedButton>

                  {/* Back to profile */}
                  <Link href="/auth/profile" className="block text-center">
                    <span className="text-sm text-primary hover:underline">
                      ← กลับไปโปรไฟล์
                    </span>
                  </Link>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
