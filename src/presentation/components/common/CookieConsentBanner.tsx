'use client';

/**
 * CookieConsentBanner
 * PDPA/GDPR compliant cookie consent banner with settings modal
 */

import { useCookieConsentStore, type CookiePreferences } from '@/src/infrastructure/stores/cookieConsentStore';
import { animated, useSpring } from '@react-spring/web';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function CookieConsentBanner() {
  const {
    hasConsented,
    showBanner,
    showSettings,
    preferences,
    acceptAll,
    rejectAll,
    savePreferences,
    openSettings,
    closeSettings,
  } = useCookieConsentStore();

  const [mounted, setMounted] = useState(false);
  const [localPreferences, setLocalPreferences] = useState<CookiePreferences>(preferences);

  useEffect(() => {
    setMounted(true);
    setLocalPreferences(preferences);
  }, [preferences]);

  // Banner animation
  const bannerSpring = useSpring({
    transform: mounted && showBanner && !hasConsented ? 'translateY(0%)' : 'translateY(100%)',
    opacity: mounted && showBanner && !hasConsented ? 1 : 0,
    config: { tension: 280, friction: 25 },
  });

  // Settings modal animation
  const modalSpring = useSpring({
    opacity: showSettings ? 1 : 0,
    transform: showSettings ? 'scale(1)' : 'scale(0.95)',
    config: { tension: 300, friction: 25 },
  });

  const handleSavePreferences = () => {
    savePreferences(localPreferences);
  };

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return; // Cannot toggle necessary cookies
    setLocalPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (!mounted) return null;

  const cookieTypes = [
    {
      key: 'necessary' as const,
      title: 'คุกกี้ที่จำเป็น',
      titleEn: 'Necessary Cookies',
      description: 'จำเป็นสำหรับการทำงานของเว็บไซต์ ไม่สามารถปิดได้',
      required: true,
    },
    {
      key: 'analytics' as const,
      title: 'คุกกี้วิเคราะห์',
      titleEn: 'Analytics Cookies',
      description: 'ช่วยให้เราเข้าใจว่าผู้เยี่ยมชมใช้งานเว็บไซต์อย่างไร',
      required: false,
    },
    {
      key: 'functional' as const,
      title: 'คุกกี้ฟังก์ชัน',
      titleEn: 'Functional Cookies',
      description: 'จดจำการตั้งค่าและปรับแต่งประสบการณ์การใช้งาน',
      required: false,
    },
    {
      key: 'marketing' as const,
      title: 'คุกกี้การตลาด',
      titleEn: 'Marketing Cookies',
      description: 'ใช้เพื่อติดตามผู้เยี่ยมชมและแสดงโฆษณาที่เกี่ยวข้อง',
      required: false,
    },
  ];

  return (
    <>
      {/* Cookie Consent Banner */}
      <animated.div
        style={bannerSpring}
        className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6"
      >
        <div className="max-w-6xl mx-auto bg-surface dark:bg-gray-900 rounded-2xl border border-border shadow-2xl overflow-hidden">
          <div className="p-4 md:p-6">
            <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
              {/* Icon & Text */}
              <div className="flex-1">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">🍪</span>
                  <div>
                    <h3 className="font-bold text-foreground text-lg mb-1">
                      การใช้คุกกี้และความเป็นส่วนตัว
                    </h3>
                    <p className="text-sm text-muted leading-relaxed">
                      เว็บไซต์นี้ใช้คุกกี้เพื่อปรับปรุงประสบการณ์การใช้งานของคุณ 
                      ตาม <strong className="text-foreground">พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล (PDPA)</strong> ของประเทศไทย 
                      คุณสามารถเลือกยอมรับหรือปรับแต่งความยินยอมได้{' '}
                      <Link href="/privacy" className="text-primary hover:underline">
                        อ่านนโยบายความเป็นส่วนตัว
                      </Link>
                    </p>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 lg:flex-shrink-0">
                <button
                  onClick={openSettings}
                  className="px-4 py-2.5 text-sm font-medium text-foreground bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition-colors"
                >
                  ⚙️ ตั้งค่าคุกกี้
                </button>
                <button
                  onClick={rejectAll}
                  className="px-4 py-2.5 text-sm font-medium text-foreground border border-border hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
                >
                  ปฏิเสธทั้งหมด
                </button>
                <button
                  onClick={acceptAll}
                  className="px-6 py-2.5 text-sm font-medium text-white bg-primary hover:bg-primary-dark rounded-xl transition-colors"
                >
                  ยอมรับทั้งหมด
                </button>
              </div>
            </div>
          </div>

          {/* PDPA Badge */}
          <div className="bg-primary/5 dark:bg-primary/10 px-4 py-2 border-t border-border flex items-center justify-center gap-2">
            <span className="text-xs">🇹🇭</span>
            <span className="text-xs text-muted">
              สอดคล้องกับ พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA)
            </span>
          </div>
        </div>
      </animated.div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeSettings}
          />

          {/* Modal */}
          <animated.div
            style={modalSpring}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden bg-surface dark:bg-gray-900 rounded-2xl border border-border shadow-2xl"
          >
            {/* Header */}
            <div className="p-4 md:p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">⚙️</span>
                  <div>
                    <h2 className="text-lg font-bold text-foreground">ตั้งค่าคุกกี้</h2>
                    <p className="text-sm text-muted">จัดการความยินยอมในการใช้คุกกี้</p>
                  </div>
                </div>
                <button
                  onClick={closeSettings}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 md:p-6 overflow-y-auto max-h-[50vh]">
              <div className="space-y-4">
                {cookieTypes.map((cookie) => (
                  <div
                    key={cookie.key}
                    className={`p-4 rounded-xl border transition-colors ${
                      localPreferences[cookie.key]
                        ? 'border-primary/30 bg-primary/5'
                        : 'border-border bg-gray-50 dark:bg-gray-800/50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-foreground">{cookie.title}</h4>
                          {cookie.required && (
                            <span className="px-2 py-0.5 text-xs bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full">
                              จำเป็น
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted">{cookie.description}</p>
                      </div>
                      <button
                        onClick={() => togglePreference(cookie.key)}
                        disabled={cookie.required}
                        className={`relative w-12 h-6 rounded-full transition-colors ${
                          localPreferences[cookie.key]
                            ? 'bg-primary'
                            : 'bg-gray-300 dark:bg-gray-600'
                        } ${cookie.required ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                      >
                        <span
                          className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                            localPreferences[cookie.key] ? 'translate-x-7' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Info */}
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
                <div className="flex items-start gap-3">
                  <span className="text-xl">ℹ️</span>
                  <div className="text-sm text-blue-700 dark:text-blue-300">
                    <p className="font-medium mb-1">เกี่ยวกับ PDPA</p>
                    <p className="text-blue-600 dark:text-blue-400">
                      ตาม พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 
                      คุณมีสิทธิ์ในการควบคุมข้อมูลส่วนบุคคลของคุณ 
                      รวมถึงสิทธิ์ในการเข้าถึง แก้ไข และลบข้อมูล
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 md:p-6 border-t border-border bg-gray-50 dark:bg-gray-800/50">
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={rejectAll}
                  className="flex-1 px-4 py-2.5 text-sm font-medium text-foreground border border-border hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
                >
                  ปฏิเสธทั้งหมด
                </button>
                <button
                  onClick={handleSavePreferences}
                  className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-primary hover:bg-primary-dark rounded-xl transition-colors"
                >
                  บันทึกการตั้งค่า
                </button>
                <button
                  onClick={acceptAll}
                  className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-gold hover:bg-gold-dark rounded-xl transition-colors"
                >
                  ยอมรับทั้งหมด
                </button>
              </div>
            </div>
          </animated.div>
        </div>
      )}
    </>
  );
}
