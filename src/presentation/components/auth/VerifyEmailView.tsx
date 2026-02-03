'use client';

/**
 * VerifyEmailView
 * Email verification page with token handling
 */

import { UI_CONFIG } from '@/src/config/ui.config';
import { AnimatedButton } from '@/src/presentation/components/animated/AnimatedButton';
import { AnimatedIslamicPattern } from '@/src/presentation/components/animated/AnimatedIslamicPattern';
import { MainLayout } from '@/src/presentation/layouts/MainLayout';
import { useAuthPresenter } from '@/src/presentation/presenters/auth/useAuthPresenter';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export function VerifyEmailView() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  
  const [state, actions] = useAuthPresenter();

  const [isLoaded, setIsLoaded] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'error' | 'no-token'>('loading');
  const [resendEmail, setResendEmail] = useState('');
  const [resendSuccess, setResendSuccess] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    if (!token) {
      setVerificationStatus('no-token');
      return;
    }

    // Auto-verify on page load
    const verify = async () => {
      const success = await actions.verifyEmail(token);
      setVerificationStatus(success ? 'success' : 'error');
    };

    verify();
  }, [token, actions]);

  const handleResend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resendEmail) return;

    const success = await actions.resendVerification(resendEmail);
    if (success) {
      setResendSuccess(true);
    }
  };

  // No token - show resend form
  if (verificationStatus === 'no-token' && isLoaded) {
    return (
      <MainLayout>
        <div className="min-h-screen py-8 md:py-16 flex items-center">
          <div className="w-full max-w-md mx-auto px-4 sm:px-6">
            <div className={`text-center mb-8 transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
              <div className="inline-flex items-center justify-center mb-6">
                <AnimatedIslamicPattern type="star" size="lg" color="gold" animation="pulse" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                {UI_CONFIG.verifyEmailTitle}
              </h1>
              <p className="text-muted">{UI_CONFIG.verifyEmailSubtitle}</p>
            </div>

            <div className={`transition-all duration-500 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
              <div className="bg-surface dark:bg-surface rounded-2xl border border-border p-6 md:p-8 shadow-lg">
                {resendSuccess ? (
                  <div className="text-center py-6">
                    <div className="text-6xl mb-4">📧</div>
                    <h2 className="text-xl font-bold text-foreground mb-2">
                      ส่งลิงก์ยืนยันแล้ว
                    </h2>
                    <p className="text-muted mb-6 text-sm">
                      กรุณาตรวจสอบกล่องจดหมายของคุณ
                    </p>
                    <Link href="/auth/login">
                      <AnimatedButton variant="outline" className="w-full">
                        {UI_CONFIG.backToLogin}
                      </AnimatedButton>
                    </Link>
                  </div>
                ) : (
                  <form onSubmit={handleResend} className="space-y-5">
                    {state.error && (
                      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-4 py-3 rounded-xl text-sm">
                        {state.error}
                      </div>
                    )}

                    <p className="text-sm text-muted">
                      กรอกอีเมลที่ใช้สมัครสมาชิก เราจะส่งลิงก์ยืนยันอีเมลให้คุณ
                    </p>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        อีเมล
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          required
                          value={resendEmail}
                          onChange={(e) => setResendEmail(e.target.value)}
                          className="w-full px-4 py-3 pl-11 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                          placeholder="your@email.com"
                        />
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">
                          📧
                        </span>
                      </div>
                    </div>

                    <AnimatedButton
                      type="submit"
                      variant="primary"
                      size="lg"
                      disabled={state.isLoading}
                      className="w-full"
                    >
                      {state.isLoading ? (
                        <span className="flex items-center justify-center gap-2">
                          <span className="animate-spin">⏳</span>
                          กำลังส่ง...
                        </span>
                      ) : (
                        UI_CONFIG.verifyEmailTitle
                      )}
                    </AnimatedButton>

                    <Link href="/auth/login" className="block text-center">
                      <span className="text-sm text-primary hover:underline">
                        ← {UI_CONFIG.backToLogin}
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

  return (
    <MainLayout>
      <div className="min-h-screen py-8 md:py-16 flex items-center">
        <div className="w-full max-w-md mx-auto px-4 sm:px-6">
          <div className={`text-center transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            <div className="bg-surface dark:bg-surface rounded-2xl border border-border p-8 md:p-12 shadow-lg">
              {verificationStatus === 'loading' && (
                <>
                  <div className="text-6xl mb-4 animate-bounce">📧</div>
                  <h1 className="text-xl font-bold text-foreground mb-2">
                    {UI_CONFIG.verifyingEmail}
                  </h1>
                  <p className="text-muted">{UI_CONFIG.pleaseWait}</p>
                </>
              )}

              {verificationStatus === 'success' && (
                <>
                  <div className="text-6xl mb-4">✅</div>
                  <h1 className="text-2xl font-bold text-foreground mb-2">
                    {UI_CONFIG.verifyEmailSuccess}
                  </h1>
                  <p className="text-muted mb-6">
                    อีเมลของคุณได้รับการยืนยันเรียบร้อยแล้ว
                  </p>
                  <Link href={state.isAuthenticated ? "/" : "/auth/login"}>
                    <AnimatedButton variant="primary" className="w-full">
                      {state.isAuthenticated ? 'กลับหน้าแรก' : 'เข้าสู่ระบบ'}
                    </AnimatedButton>
                  </Link>
                </>
              )}

              {verificationStatus === 'error' && (
                <>
                  <div className="text-6xl mb-4">❌</div>
                  <h1 className="text-2xl font-bold text-foreground mb-2">
                    {UI_CONFIG.verifyEmailError}
                  </h1>
                  <p className="text-muted mb-6">
                    {state.error || 'ลิงก์ไม่ถูกต้องหรือหมดอายุแล้ว'}
                  </p>
                  <div className="space-y-3">
                    <Link href="/auth/verify-email" className="block">
                      <AnimatedButton variant="primary" className="w-full">
                        {UI_CONFIG.requestNewLink}
                      </AnimatedButton>
                    </Link>
                    <Link href="/auth/login" className="block">
                      <AnimatedButton variant="ghost" className="w-full">
                        {UI_CONFIG.backToLogin}
                      </AnimatedButton>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
