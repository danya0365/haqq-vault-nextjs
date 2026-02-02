'use client';

/**
 * ForgotPasswordView
 * Forgot password page
 */

import { useAuthStore } from '@/src/infrastructure/stores/authStore';
import { AnimatedButton } from '@/src/presentation/components/animated/AnimatedButton';
import { AnimatedIslamicPattern } from '@/src/presentation/components/animated/AnimatedIslamicPattern';
import { MainLayout } from '@/src/presentation/layouts/MainLayout';
import { animated, useSpring } from '@react-spring/web';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function ForgotPasswordView() {
  const { forgotPassword, isLoading, clearError } = useAuthStore();

  const [isLoaded, setIsLoaded] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    clearError();
  }, [clearError]);

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
    const success = await forgotPassword(email);
    if (success) {
      setIsSubmitted(true);
    }
  };

  return (
    <MainLayout>
      <div className="min-h-screen py-8 md:py-16 flex items-center">
        <div className="w-full max-w-md mx-auto px-4 sm:px-6">
          {/* Header */}
          <animated.div style={headerSpring} className="text-center mb-8">
            <div className="inline-flex items-center justify-center mb-6">
              <AnimatedIslamicPattern type="octagon" size="lg" color="primary" animation="pulse" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              ลืมรหัสผ่าน?
            </h1>
            <p className="text-muted">ไม่ต้องกังวล เราจะช่วยคุณรีเซ็ตรหัสผ่าน</p>
          </animated.div>

          {/* Form */}
          <animated.div style={formSpring}>
            <div className="bg-surface dark:bg-surface rounded-2xl border border-border p-6 md:p-8 shadow-lg">
              {isSubmitted ? (
                <div className="text-center py-6">
                  <div className="text-6xl mb-4">📧</div>
                  <h2 className="text-xl font-bold text-foreground mb-2">
                    ตรวจสอบอีเมลของคุณ
                  </h2>
                  <p className="text-muted mb-6 text-sm">
                    หากอีเมล <span className="font-medium text-primary">{email}</span> มีอยู่ในระบบ
                    เราจะส่งลิงก์รีเซ็ตรหัสผ่านให้คุณ
                  </p>
                  <div className="space-y-3">
                    <AnimatedButton
                      variant="outline"
                      onClick={() => setIsSubmitted(false)}
                      className="w-full"
                    >
                      ส่งใหม่อีกครั้ง
                    </AnimatedButton>
                    <Link href="/auth/login" className="block">
                      <AnimatedButton variant="ghost" className="w-full">
                        กลับไปเข้าสู่ระบบ
                      </AnimatedButton>
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <p className="text-sm text-muted">
                    กรอกอีเมลที่ใช้ลงทะเบียน เราจะส่งลิงก์สำหรับรีเซ็ตรหัสผ่านให้คุณ
                  </p>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      อีเมล
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 pl-11 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        placeholder="your@email.com"
                      />
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">
                        📧
                      </span>
                    </div>
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
                        กำลังส่ง...
                      </span>
                    ) : (
                      'ส่งลิงก์รีเซ็ตรหัสผ่าน'
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
          </animated.div>
        </div>
      </div>
    </MainLayout>
  );
}
