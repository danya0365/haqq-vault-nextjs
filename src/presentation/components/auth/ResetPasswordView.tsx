'use client';

/**
 * ResetPasswordView
 * Reset password page with token validation
 */

import { AnimatedButton } from '@/src/presentation/components/animated/AnimatedButton';
import { AnimatedIslamicPattern } from '@/src/presentation/components/animated/AnimatedIslamicPattern';
import { MainLayout } from '@/src/presentation/layouts/MainLayout';
import { useAuthPresenter } from '@/src/presentation/presenters/auth/useAuthPresenter';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export function ResetPasswordView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  
  const [state, actions] = useAuthPresenter();

  const [isLoaded, setIsLoaded] = useState(false);
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoaded(true);
    actions.clearError();
  }, [actions]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    // Validate token
    if (!token) {
      setLocalError('ลิงก์รีเซ็ตรหัสผ่านไม่ถูกต้อง');
      return;
    }

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      setLocalError('รหัสผ่านไม่ตรงกัน');
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      setLocalError('รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร');
      return;
    }

    const success = await actions.resetPassword(token, formData.password);
    if (success) {
      setIsSuccess(true);
    }
  };

  const error = localError || state.error;

  // Invalid token
  if (!token && isLoaded) {
    return (
      <MainLayout>
        <div className="min-h-screen py-8 md:py-16 flex items-center">
          <div className="w-full max-w-md mx-auto px-4 sm:px-6">
            <div className="text-center">
              <div className="text-6xl mb-4">❌</div>
              <h1 className="text-2xl font-bold text-foreground mb-2">
                ลิงก์ไม่ถูกต้อง
              </h1>
              <p className="text-muted mb-6">
                ลิงก์รีเซ็ตรหัสผ่านไม่ถูกต้องหรือหมดอายุแล้ว
              </p>
              <Link href="/auth/forgot-password">
                <AnimatedButton variant="primary">
                  ขอลิงก์ใหม่
                </AnimatedButton>
              </Link>
            </div>
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
              ตั้งรหัสผ่านใหม่
            </h1>
            <p className="text-muted">กรุณากรอกรหัสผ่านใหม่ของคุณ</p>
          </div>

          {/* Form */}
          <div className={`transition-all duration-500 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            <div className="bg-surface dark:bg-surface rounded-2xl border border-border p-6 md:p-8 shadow-lg">
              {isSuccess ? (
                <div className="text-center py-6">
                  <div className="text-6xl mb-4">✅</div>
                  <h2 className="text-xl font-bold text-foreground mb-2">
                    รีเซ็ตรหัสผ่านสำเร็จ
                  </h2>
                  <p className="text-muted mb-6 text-sm">
                    รหัสผ่านของคุณถูกเปลี่ยนเรียบร้อยแล้ว
                  </p>
                  <Link href="/auth/login" className="block">
                    <AnimatedButton variant="primary" className="w-full">
                      เข้าสู่ระบบ
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
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full px-4 py-3 pl-11 pr-11 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        placeholder="อย่างน้อย 6 ตัวอักษร"
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
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      ยืนยันรหัสผ่านใหม่
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        required
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        className={`w-full px-4 py-3 pl-11 rounded-xl bg-background border focus:ring-2 outline-none transition-all ${
                          formData.confirmPassword && formData.confirmPassword !== formData.password
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                            : 'border-border focus:border-primary focus:ring-primary/20'
                        }`}
                        placeholder="ยืนยันรหัสผ่าน"
                      />
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">
                        🔐
                      </span>
                    </div>
                    {formData.confirmPassword && formData.confirmPassword !== formData.password && (
                      <p className="text-xs text-red-500 mt-1">รหัสผ่านไม่ตรงกัน</p>
                    )}
                  </div>

                  {/* Submit */}
                  <AnimatedButton
                    type="submit"
                    variant="primary"
                    size="lg"
                    disabled={state.isLoading || formData.password !== formData.confirmPassword}
                    className="w-full"
                  >
                    {state.isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="animate-spin">⏳</span>
                        กำลังรีเซ็ตรหัสผ่าน...
                      </span>
                    ) : (
                      'รีเซ็ตรหัสผ่าน'
                    )}
                  </AnimatedButton>

                  {/* Back to login */}
                  <Link href="/auth/login" className="block text-center">
                    <span className="text-sm text-primary hover:underline">
                      ← กลับไปเข้าสู่ระบบ
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
