'use client';

/**
 * RegisterView
 * Registration page with beautiful Islamic design
 */

import { UI_CONFIG } from '@/src/config/ui.config';
import { useAuthStore } from '@/src/infrastructure/stores/authStore';
import { AnimatedButton } from '@/src/presentation/components/animated/AnimatedButton';
import { AnimatedIslamicPattern } from '@/src/presentation/components/animated/AnimatedIslamicPattern';
import { MainLayout } from '@/src/presentation/layouts/MainLayout';
import { animated, useSpring } from '@react-spring/web';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function RegisterView() {
  const router = useRouter();
  const { register, isLoading, error, clearError, isAuthenticated } = useAuthStore();

  const [isLoaded, setIsLoaded] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  useEffect(() => {
    setIsLoaded(true);
    clearError();
  }, [clearError]);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  // Calculate password strength
  useEffect(() => {
    const { password } = formData;
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    setPasswordStrength(strength);
  }, [formData.password]);

  const headerSpring = useSpring({
    opacity: isLoaded ? 1 : 0,
    y: isLoaded ? 0 : 20,
    config: { tension: 200, friction: 20 },
  });

  const formSpring = useSpring({
    opacity: isLoaded ? 1 : 0,
    y: isLoaded ? 0 : 30,
    config: { tension: 200, friction: 25 },
    delay: 150,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.agreeTerms) {
      return;
    }

    const success = await register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    });

    if (success) {
      router.push('/');
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

  return (
    <MainLayout>
      <div className="min-h-screen py-8 md:py-12 flex items-center">
        <div className="w-full max-w-md mx-auto px-4 sm:px-6">
          {/* Header */}
          <animated.div style={headerSpring} className="text-center mb-8">
            <div className="inline-flex items-center justify-center mb-6">
              <AnimatedIslamicPattern type="arabesque" size="lg" color="gold" animation="float" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              {UI_CONFIG.labels.register}
            </h1>
            <p className="arabic-text text-lg text-muted mb-1">أنشئ حسابك الجديد</p>
            <p className="text-muted">เข้าร่วมชุมชน Haqq Vault</p>
          </animated.div>

          {/* Register Form */}
          <animated.div style={formSpring}>
            <div className="bg-surface dark:bg-surface rounded-2xl border border-border p-6 md:p-8 shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Error message */}
                {error && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-xl text-sm">
                    {error}
                  </div>
                )}

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    ชื่อแสดง
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 pl-11 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      placeholder={UI_CONFIG.placeholders.yourName}
                    />
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">
                      👤
                    </span>
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    อีเมล
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 pl-11 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      placeholder="your@email.com"
                    />
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">
                      📧
                    </span>
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    รหัสผ่าน
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      minLength={6}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
                  {formData.password && (
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

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    ยืนยันรหัสผ่าน
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
                      placeholder={UI_CONFIG.placeholders.confirmPasswordGeneral}
                    />
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">
                      🔐
                    </span>
                  </div>
                  {formData.confirmPassword && formData.confirmPassword !== formData.password && (
                    <p className="text-xs text-red-500 mt-1">รหัสผ่านไม่ตรงกัน</p>
                  )}
                </div>

                {/* Terms */}
                <div>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={formData.agreeTerms}
                      onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                      className="w-4 h-4 mt-1 rounded border-border text-primary focus:ring-primary"
                    />
                    <span className="text-sm text-muted">
                      ฉันยอมรับ{' '}
                      <Link href="/terms" className="text-primary hover:underline">
                        เงื่อนไขการใช้งาน
                      </Link>{' '}
                      และ{' '}
                      <Link href="/privacy" className="text-primary hover:underline">
                        นโยบายความเป็นส่วนตัว
                      </Link>
                    </span>
                  </label>
                </div>

                {/* Submit */}
                <AnimatedButton
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={isLoading || formData.password !== formData.confirmPassword}
                  className="w-full"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="animate-spin">⏳</span>
                      กำลังสมัครสมาชิก...
                    </span>
                  ) : (
                    UI_CONFIG.labels.register
                  )}
                </AnimatedButton>
              </form>

              {/* Login link */}
              <p className="text-center text-sm text-muted mt-6">
                มีบัญชีอยู่แล้ว?{' '}
                <Link href="/auth/login" className="text-primary hover:underline font-medium">
                  เข้าสู่ระบบ
                </Link>
              </p>
            </div>
          </animated.div>
        </div>
      </div>
    </MainLayout>
  );
}
