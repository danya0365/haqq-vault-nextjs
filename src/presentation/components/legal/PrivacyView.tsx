'use client';

/**
 * PrivacyView
 * Privacy Policy page
 */

import { AnimatedIslamicPattern } from '@/src/presentation/components/animated/AnimatedIslamicPattern';
import { MainLayout } from '@/src/presentation/layouts/MainLayout';
import { animated, useSpring } from '@react-spring/web';
import { useEffect, useState } from 'react';

export function PrivacyView() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const headerSpring = useSpring({
    opacity: isLoaded ? 1 : 0,
    y: isLoaded ? 0 : 20,
    config: { tension: 200, friction: 20 },
  });

  const contentSpring = useSpring({
    opacity: isLoaded ? 1 : 0,
    y: isLoaded ? 0 : 30,
    config: { tension: 200, friction: 25 },
    delay: 200,
  });

  return (
    <MainLayout>
      <div className="min-h-screen py-8 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <animated.div style={headerSpring} className="text-center mb-12">
            <div className="inline-flex items-center justify-center mb-6">
              <AnimatedIslamicPattern type="octagon" size="md" color="primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              🔒 นโยบายความเป็นส่วนตัว
            </h1>
            <p className="text-muted">
              อัปเดตล่าสุด: {new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </animated.div>

          {/* Content */}
          <animated.div style={contentSpring} className="prose prose-lg dark:prose-invert max-w-none">
            <div className="bg-surface dark:bg-surface rounded-2xl border border-border p-6 md:p-8 space-y-8">
              <section>
                <h2 className="text-xl font-bold text-foreground mb-4">1. ข้อมูลที่เรารวบรวม</h2>
                <p className="text-muted-dark dark:text-muted leading-relaxed mb-4">
                  เราอาจรวบรวมข้อมูลต่อไปนี้เมื่อคุณใช้งานเว็บไซต์ของเรา:
                </p>
                <ul className="space-y-2 text-muted-dark dark:text-muted">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>ข้อมูลการใช้งานเว็บไซต์ (หน้าที่เข้าชม, เวลาที่ใช้)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>ข้อมูลที่คุณส่งให้เราผ่านแบบฟอร์มติดต่อ</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>ข้อมูลอุปกรณ์และเบราว์เซอร์ (ไม่ระบุตัวบุคคล)</span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-foreground mb-4">2. การใช้ข้อมูล</h2>
                <p className="text-muted-dark dark:text-muted leading-relaxed mb-4">
                  เราใช้ข้อมูลที่รวบรวมเพื่อ:
                </p>
                <ul className="space-y-2 text-muted-dark dark:text-muted">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>ปรับปรุงประสบการณ์การใช้งานเว็บไซต์</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>ตอบกลับข้อความและคำถามของคุณ</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>วิเคราะห์และปรับปรุงเนื้อหา</span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-foreground mb-4">3. คุกกี้</h2>
                <p className="text-muted-dark dark:text-muted leading-relaxed">
                  เว็บไซต์ของเราใช้คุกกี้เพื่อจดจำการตั้งค่าของคุณ (เช่น โหมดมืด/สว่าง) 
                  และวิเคราะห์การใช้งานเว็บไซต์ คุณสามารถปิดการใช้งานคุกกี้ได้ในการตั้งค่าเบราว์เซอร์
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-foreground mb-4">4. การเปิดเผยข้อมูล</h2>
                <p className="text-muted-dark dark:text-muted leading-relaxed">
                  เราไม่ขาย แลกเปลี่ยน หรือเปิดเผยข้อมูลส่วนบุคคลของคุณให้กับบุคคลภายนอก 
                  ยกเว้นในกรณีที่กฎหมายกำหนด
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-foreground mb-4">5. ความปลอดภัย</h2>
                <p className="text-muted-dark dark:text-muted leading-relaxed">
                  เราใช้มาตรการรักษาความปลอดภัยที่เหมาะสมเพื่อปกป้องข้อมูลของคุณ 
                  อย่างไรก็ตาม ไม่มีระบบใดที่ปลอดภัย 100%
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-foreground mb-4">6. สิทธิ์ของคุณ</h2>
                <p className="text-muted-dark dark:text-muted leading-relaxed mb-4">
                  คุณมีสิทธิ์:
                </p>
                <ul className="space-y-2 text-muted-dark dark:text-muted">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>ขอดูข้อมูลส่วนบุคคลที่เรามี</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>ขอให้แก้ไขหรือลบข้อมูลของคุณ</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>ยกเลิกการยินยอมในการรวบรวมข้อมูล</span>
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-foreground mb-4">7. ติดต่อเรา</h2>
                <p className="text-muted-dark dark:text-muted leading-relaxed">
                  หากมีคำถามเกี่ยวกับนโยบายความเป็นส่วนตัว สามารถติดต่อได้ที่{' '}
                  <a href="mailto:privacy@haqqvault.com" className="text-primary hover:underline">
                    privacy@haqqvault.com
                  </a>
                </p>
              </section>
            </div>
          </animated.div>
        </div>
      </div>
    </MainLayout>
  );
}
