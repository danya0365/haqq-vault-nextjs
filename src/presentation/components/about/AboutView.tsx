'use client';

/**
 * AboutView
 * About page for Haqq Vault
 */

import { AnimatedButton } from '@/src/presentation/components/animated/AnimatedButton';
import { AnimatedIslamicPattern } from '@/src/presentation/components/animated/AnimatedIslamicPattern';
import { MainLayout } from '@/src/presentation/layouts/MainLayout';
import { animated, useSpring } from '@react-spring/web';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function AboutView() {
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <animated.div style={headerSpring} className="text-center mb-12">
            <div className="inline-flex items-center justify-center mb-6">
              <AnimatedIslamicPattern type="arabesque" size="lg" color="primary" animation="float" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              เกี่ยวกับ Haqq Vault
            </h1>
            <p className="arabic-text text-center text-xl text-muted mb-2">حق والٹ</p>
            <p className="text-muted text-lg">คลังคำตอบชุบฮาต</p>
          </animated.div>

          {/* Content */}
          <animated.div style={contentSpring} className="space-y-8">
            {/* Mission */}
            <section className="bg-surface dark:bg-surface rounded-2xl border border-border p-6 md:p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="text-3xl">🎯</span>
                พันธกิจของเรา
              </h2>
              <p className="text-muted-dark dark:text-muted leading-relaxed mb-4">
                <strong>Haqq Vault</strong> (حق - ความจริง) คือแพลตฟอร์มที่รวบรวมคำตอบสำหรับข้อกล่าวหา 
                ข้อสงสัย และความเข้าใจผิดเกี่ยวกับอิสลาม โดยใช้หลักฐานที่มั่นคงจากแหล่งอ้างอิงที่เชื่อถือได้
              </p>
              <p className="text-muted-dark dark:text-muted leading-relaxed">
                เราเชื่อว่าความจริงสามารถตอบทุกข้อกล่าวหาได้ และการนำเสนอความจริงด้วยวิธีการที่เข้าถึงง่าย
                จะช่วยให้ผู้คนเข้าใจอิสลามอย่างถูกต้อง
              </p>
            </section>

            {/* Values */}
            <section className="bg-primary/5 dark:bg-primary/10 rounded-2xl border border-primary/20 p-6 md:p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <span className="text-3xl">💎</span>
                หลักการของเรา
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    icon: '📖',
                    title: 'หลักฐานเป็นฐาน',
                    desc: 'ทุกคำตอบอ้างอิงจากอัลกุรอาน หะดีษ และความเห็นนักวิชาการ',
                  },
                  {
                    icon: '🔍',
                    title: 'ความถูกต้อง',
                    desc: 'ตรวจสอบความถูกต้องของหลักฐานก่อนนำเสนอ',
                  },
                  {
                    icon: '🎓',
                    title: 'วิชาการ',
                    desc: 'นำเสนอด้วยหลักวิชาการและเหตุผลที่ชัดเจน',
                  },
                  {
                    icon: '💬',
                    title: 'เข้าถึงง่าย',
                    desc: 'อธิบายเนื้อหายากให้เข้าใจง่ายสำหรับทุกคน',
                  },
                ].map((value, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl">
                      {value.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{value.title}</h3>
                      <p className="text-sm text-muted">{value.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Sources */}
            <section className="bg-surface dark:bg-surface rounded-2xl border border-border p-6 md:p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="text-3xl">📚</span>
                แหล่งอ้างอิงของเรา
              </h2>
              <ul className="space-y-3 text-muted-dark dark:text-muted">
                <li className="flex items-start gap-3">
                  <span className="text-primary">•</span>
                  <span><strong>อัลกุรอาน</strong> - พระวจนะของอัลลอฮ์ ﷻ</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary">•</span>
                  <span><strong>หะดีษ</strong> - คำพูด การกระทำ และการยอมรับของท่านนบี ﷺ</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary">•</span>
                  <span><strong>ตัฟสีร</strong> - การอรรถาธิบายอัลกุรอานจากนักวิชาการ</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary">•</span>
                  <span><strong>งานวิจัย</strong> - บทความและงานวิจัยทางวิชาการ</span>
                </li>
              </ul>
            </section>

            {/* Arabic Quote */}
            <section className="text-center py-8">
              <div className="inline-block">
                <AnimatedIslamicPattern type="star" size="sm" color="gold" className="mx-auto mb-4" />
                <p className="arabic-text text-center text-2xl md:text-3xl text-primary mb-3">
                  وَقُلْ جَاءَ الْحَقُّ وَزَهَقَ الْبَاطِلُ ۚ إِنَّ الْبَاطِلَ كَانَ زَهُوقًا
                </p>
                <p className="text-muted italic">
                  "และจงกล่าวเถิดว่า ความจริงได้มาแล้ว และความเท็จได้มลายไป
                  <br />แท้จริงความเท็จนั้นเป็นสิ่งที่ต้องมลายไป"
                </p>
                <p className="text-sm text-muted mt-2">- ซูเราะฮ์อัลอิสรออ์ 17:81</p>
              </div>
            </section>

            {/* CTA */}
            <div className="text-center">
              <p className="text-muted mb-6">
                พร้อมที่จะค้นหาความจริงแล้วหรือยัง?
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/topics">
                  <AnimatedButton variant="primary" size="lg">
                    ดูคำตอบทั้งหมด
                  </AnimatedButton>
                </Link>
                <Link href="/contact">
                  <AnimatedButton variant="outline" size="lg">
                    ติดต่อเรา
                  </AnimatedButton>
                </Link>
              </div>
            </div>
          </animated.div>
        </div>
      </div>
    </MainLayout>
  );
}
