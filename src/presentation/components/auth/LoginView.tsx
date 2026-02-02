'use client';

/**
 * LoginView
 * Login page with beautiful Islamic design
 * Using Tailwind CSS for animations (no react-spring)
 */

import { DEMO_ACCOUNTS } from '@/src/infrastructure/repositories/mock/data/mockUsers';
import { useAuthStore } from '@/src/infrastructure/stores/authStore';
import { AnimatedButton } from '@/src/presentation/components/animated/AnimatedButton';
import { AnimatedIslamicPattern } from '@/src/presentation/components/animated/AnimatedIslamicPattern';
import { MainLayout } from '@/src/presentation/layouts/MainLayout';
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
  const [quickLoginLoading, setQuickLoginLoading] = useState<string | null>(null);

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

  // Quick login with demo account
  const handleQuickLogin = async (email: string, password: string) => {
    setQuickLoginLoading(email);
    const success = await login({ email, password });
    if (success) {
      router.push('/');
    }
    setQuickLoginLoading(null);
  };

  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      case 'scholar':
        return 'bg-gold/20 text-gold-dark dark:text-gold';
      default:
        return 'bg-primary/10 text-primary';
    }
  };

  return (
    <MainLayout>
      <div className="min-h-screen py-8 md:py-16 flex items-center">
        <div className="w-full max-w-lg mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className={`text-center mb-8 transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            <div className="inline-flex items-center justify-center mb-6">
              <AnimatedIslamicPattern type="star" size="lg" color="primary" animation="pulse" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              ยินดีต้อนรับกลับ
            </h1>
            <p className="arabic-text text-lg text-muted mb-1">مرحباً بعودتك</p>
            <p className="text-muted">เข้าสู่ระบบเพื่อดำเนินการต่อ</p>
          </div>

          {/* Login Form */}
          <div className={`transition-all duration-500 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            <div className="bg-surface dark:bg-surface rounded-2xl border border-border p-6 md:p-8 shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Error message */}
                {error && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-xl text-sm animate-shake">
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
          </div>

          {/* Quick Login - Demo Accounts */}
          <div className={`mt-6 transition-all duration-500 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            <div className="bg-gradient-to-br from-primary/5 to-gold/5 dark:from-primary/10 dark:to-gold/10 border border-primary/20 rounded-2xl p-4 md:p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">🚀</span>
                <h3 className="font-semibold text-foreground">เข้าสู่ระบบด่วน</h3>
                <span className="text-xs text-muted">(คลิกเพื่อ Auto Login)</span>
              </div>
              
              <div className="grid gap-3">
                {DEMO_ACCOUNTS.map((account) => (
                  <button
                    key={account.user.email}
                    onClick={() => handleQuickLogin(account.user.email, account.password)}
                    disabled={quickLoginLoading !== null}
                    className={`group relative flex items-center gap-4 p-4 rounded-xl border border-border bg-surface hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-primary/50 transition-all duration-200 ${
                      quickLoginLoading === account.user.email ? 'opacity-70' : ''
                    }`}
                  >
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-full ${account.color} flex items-center justify-center text-2xl text-white shadow-lg group-hover:scale-110 transition-transform`}>
                      {account.icon}
                    </div>

                    {/* Info */}
                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-foreground">{account.user.name}</span>
                        <span className={`px-2 py-0.5 text-xs rounded-full ${getRoleBadgeClass(account.user.role)}`}>
                          {account.user.role === 'admin' ? 'ผู้ดูแล' : account.user.role === 'scholar' ? 'นักวิชาการ' : 'สมาชิก'}
                        </span>
                      </div>
                      <p className="text-sm text-muted">{account.description}</p>
                    </div>

                    {/* Loading/Arrow */}
                    <div className="text-muted group-hover:text-primary transition-colors">
                      {quickLoginLoading === account.user.email ? (
                        <span className="animate-spin inline-block">⏳</span>
                      ) : (
                        <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
