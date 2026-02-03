'use client';

/**
 * ProfileView
 * User profile page
 */

import { UI_CONFIG } from '@/src/config/ui.config';
import { useAuthStore } from '@/src/infrastructure/stores/authStore';
import { AnimatedButton } from '@/src/presentation/components/animated/AnimatedButton';
import { AnimatedCard } from '@/src/presentation/components/animated/AnimatedCard';
import { MainLayout } from '@/src/presentation/layouts/MainLayout';
import { animated, useSpring } from '@react-spring/web';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function ProfileView() {
  const router = useRouter();
  const { user, isAuthenticated, updateProfile, logout, isLoading } = useAuthStore();

  const [isLoaded, setIsLoaded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
  });
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        bio: user.bio || '',
      });
    }
  }, [user]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated && isLoaded) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, isLoaded, router]);

  const headerSpring = useSpring({
    opacity: isLoaded ? 1 : 0,
    y: isLoaded ? 0 : 20,
    config: { tension: 200, friction: 20 },
  });

  const contentSpring = useSpring({
    opacity: isLoaded ? 1 : 0,
    y: isLoaded ? 0 : 30,
    config: { tension: 200, friction: 25 },
    delay: 150,
  });

  const handleSave = async () => {
    const success = await updateProfile({
      name: formData.name,
      bio: formData.bio,
    });
    if (success) {
      setIsEditing(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return { label: UI_CONFIG.roles.admin, color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' };
      case 'scholar':
        return { label: UI_CONFIG.roles.scholar, color: 'bg-gold/20 text-gold-dark dark:text-gold' };
      default:
        return { label: UI_CONFIG.roles.member, color: 'bg-primary/10 text-primary' };
    }
  };

  if (!user) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <span className="animate-spin text-4xl inline-block mb-4">⏳</span>
            <p className="text-muted">{UI_CONFIG.labels.pleaseWait}</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  const roleBadge = getRoleBadge(user.role);

  return (
    <MainLayout>
      <div className="min-h-screen py-8 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <animated.div style={headerSpring} className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              {UI_CONFIG.labels.myProfileTitle}
            </h1>
            <p className="text-muted">{UI_CONFIG.labels.myProfileDesc}</p>
          </animated.div>

          {/* Success message */}
          {saveSuccess && (
            <animated.div style={contentSpring} className="mb-6">
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 px-4 py-3 rounded-xl text-sm text-center">
                ✅ {UI_CONFIG.labels.saveSuccess}
              </div>
            </animated.div>
          )}

          <animated.div style={contentSpring}>
            {/* Profile Card */}
            <AnimatedCard className="p-6 md:p-8 mb-6" variant="elevated">
              {/* Avatar & Basic Info */}
              <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
                    <span className="text-4xl text-white">
                      {user.name?.charAt(0).toUpperCase() || '👤'}
                    </span>
                  </div>
                  {user.isVerified && (
                    <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-4 border-surface">
                      <span className="text-white text-sm">✓</span>
                    </div>
                  )}
                </div>
                <div className="text-center sm:text-left">
                  <h2 className="text-xl font-bold text-foreground">{user.name}</h2>
                  {user.nameArabic && (
                    <p className="arabic-text text-muted">{user.nameArabic}</p>
                  )}
                  <p className="text-sm text-muted mb-2">{user.email}</p>
                  <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${roleBadge.color}`}>
                    {roleBadge.label}
                  </span>
                </div>
              </div>

              {/* Edit Form */}
              <div className="border-t border-border pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-foreground">{UI_CONFIG.labels.personalInfo}</h3>
                  {!isEditing && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="text-sm text-primary hover:underline"
                    >
                      {UI_CONFIG.labels.edit}
                    </button>
                  )}
                </div>

                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        {UI_CONFIG.labels.displayName}
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        {UI_CONFIG.labels.aboutMe}
                      </label>
                      <textarea
                        rows={3}
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                        placeholder={UI_CONFIG.placeholders.aboutMe}
                      />
                    </div>
                    <div className="flex gap-3">
                      <AnimatedButton
                        variant="primary"
                        onClick={handleSave}
                        disabled={isLoading}
                      >
                        {isLoading ? UI_CONFIG.labels.saving : UI_CONFIG.labels.save}
                </AnimatedButton>
                <AnimatedButton
                  variant="ghost"
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({ name: user.name || '', bio: user.bio || '' });
                  }}
                >
                  {UI_CONFIG.labels.cancel}
                </AnimatedButton>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted mb-1">{UI_CONFIG.labels.displayName}</p>
                      <p className="text-foreground">{user.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted mb-1">{UI_CONFIG.labels.aboutMe}</p>
                      <p className="text-foreground">{user.bio || '-'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted mb-1">{UI_CONFIG.labels.memberSince}</p>
                      <p className="text-foreground">
                        {new Date(user.createdAt).toLocaleDateString('th-TH', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </AnimatedCard>

            {/* Security Section */}
            <AnimatedCard className="p-6 md:p-8 mb-6" variant="bordered">
              <h3 className="font-semibold text-foreground mb-4">{UI_CONFIG.labels.security}</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-foreground">{UI_CONFIG.labels.password}</p>
                    <p className="text-sm text-muted">{UI_CONFIG.labels.changePasswordDesc}</p>
                  </div>
                  <Link href="/auth/change-password">
                    <AnimatedButton variant="outline" size="sm">
                      {UI_CONFIG.labels.changePassword}
                    </AnimatedButton>
                  </Link>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-foreground">{UI_CONFIG.labels.emailVerification}</p>
                    <p className="text-sm text-muted">
                      {user.isVerified ? `✅ ${UI_CONFIG.labels.verifiedStatus}` : `❌ ${UI_CONFIG.labels.unverifiedStatus}`}
                    </p>
                  </div>
                  {!user.isVerified && (
                    <AnimatedButton variant="outline" size="sm">
                      {UI_CONFIG.labels.sendVerificationLink}
                    </AnimatedButton>
                  )}
                </div>
              </div>
            </AnimatedCard>

            {/* Logout */}
            <div className="text-center">
                <button
                onClick={handleLogout}
                className="text-red-500 hover:text-red-600 hover:underline text-sm"
              >
                {UI_CONFIG.labels.logout}
              </button>
            </div>
          </animated.div>
        </div>
      </div>
    </MainLayout>
  );
}
