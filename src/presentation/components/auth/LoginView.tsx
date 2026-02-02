'use client';

/**
 * LoginView
 * Login page with beautiful Islamic design
 */

import { useAuthStore } from '@/src/infrastructure/stores/authStore';
import { AnimatedButton } from '@/src/presentation/components/animated/AnimatedButton';
import { AnimatedIslamicPattern } from '@/src/presentation/components/animated/AnimatedIslamicPattern';
import { MainLayout } from '@/src/presentation/layouts/MainLayout';
import { animated, useSpring } from '@react-spring/web';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function LoginView() {
  const router = useRouter();
  const { login, isLoading, error, clearError, isAuthenticated } = useAuthStore();

  const [isLoaded, setIsLoaded] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
  });
  const [showPassword, setShowPassword] = useState(false);

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
    const success = await login({
      email: formData.email,
      password: formData.password,
    });

    if (success) {
      router.push('/');
    }
  };

  return (
    <MainLayout>
      <div className="min-h-screen py-8 md:py-16 flex items-center">
        <div className="w-full max-w-md mx-auto px-4 sm:px-6">
          {/* Header */}
          <animated.div style={headerSpring} className="text-center mb-8">
            <div className="inline-flex items-center justify-center mb-6">
              <AnimatedIslamicPattern type="star" size="lg" color="primary" animation="pulse" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              ยินดีต้อนรับกลับ
            </h1>
            <p className="arabic-text text-lg text-muted mb-1">مرحباً بعودتك</p>
            <p className="text-muted">เข้าสู่ระบบเพื่อดำเนินการต่อ</p>
          </animated.div>

          {/* Login Form */}
          <animated.div style={formSpring}>
            <div className="bg-surface dark:bg-surface rounded-2xl border border-border p-6 md:p-8 shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Error message */}
                {error && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-xl text-sm">
                    {error}
                  </div>
                )}

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
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full px-4 py-3 pl-11 pr-11 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      placeholder="••••••••"
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

                {/* Remember & Forgot */}
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.remember}
                      onChange={(e) => setFormData({ ...formData, remember: e.target.checked })}
                      className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                    />
                    <span className="text-muted">จดจำฉัน</span>
                  </label>
                  <Link
                    href="/auth/forgot-password"
                    className="text-primary hover:underline"
                  >
                    ลืมรหัสผ่าน?
                  </Link>
                </div>

                {/* Submit */}
                <AnimatedButton
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={isLoading}
                  className="w-full"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="animate-spin">⏳</span>
                      กำลังเข้าสู่ระบบ...
                    </span>
                  ) : (
                    'เข้าสู่ระบบ'
                  )}
                </AnimatedButton>
              </form>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center">
                  <span className="px-3 bg-surface text-sm text-muted">หรือ</span>
                </div>
              </div>

              {/* Social Login (placeholder) */}
              <div className="space-y-3">
                <button
                  type="button"
                  disabled
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-border hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-50"
                >
                  <span>🌐</span>
                  <span className="text-sm font-medium text-foreground">
                    ดำเนินการต่อด้วย Google
                  </span>
                </button>
              </div>

              {/* Register link */}
              <p className="text-center text-sm text-muted mt-6">
                ยังไม่มีบัญชี?{' '}
                <Link href="/auth/register" className="text-primary hover:underline font-medium">
                  สมัครสมาชิก
                </Link>
              </p>
            </div>
          </animated.div>

          {/* Demo credentials */}
          <animated.div style={formSpring} className="mt-6">
            <div className="bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-xl p-4 text-center">
              <p className="text-xs text-muted mb-2">🔑 บัญชีทดสอบ</p>
              <div className="space-y-1 text-xs">
                <p><span className="text-muted">Admin:</span> admin@haqqvault.com / admin123</p>
                <p><span className="text-muted">User:</span> user@example.com / user123</p>
              </div>
            </div>
          </animated.div>
        </div>
      </div>
    </MainLayout>
  );
}
