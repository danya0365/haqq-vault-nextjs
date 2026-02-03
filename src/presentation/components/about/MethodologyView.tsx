'use client';

/**
 * MethodologyView
 * Page explaining the methodology for answering questions
 */

import { UI_CONFIG } from '@/src/config/ui.config';
import { AnimatedButton } from '@/src/presentation/components/animated/AnimatedButton';
import { AnimatedIslamicPattern } from '@/src/presentation/components/animated/AnimatedIslamicPattern';
import { MainLayout } from '@/src/presentation/layouts/MainLayout';
import { animated, useSpring } from '@react-spring/web';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function MethodologyView() {
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

  const steps = [
    {
      num: 1,
      title: 'รับคำถามหรือข้อกล่าวหา',
      desc: 'รวบรวมคำถาม ข้อสงสัย หรือข้อกล่าวหาที่พบบ่อยจากแหล่งต่างๆ',
      icon: '📥',
    },
    {
      num: 2,
      title: 'วิเคราะห์และจัดหมวดหมู่',
      desc: 'วิเคราะห์ประเด็นหลักและจัดหมวดหมู่ตามความยากง่าย',
      icon: '🔍',
    },
    {
      num: 3,
      title: 'ค้นคว้าหลักฐาน',
      desc: 'ค้นหาหลักฐานจากอัลกุรอาน หะดีษ ตัฟสีร และงานวิจัย',
      icon: '📚',
    },
    {
      num: 4,
      title: 'ตรวจสอบความถูกต้อง',
      desc: 'ตรวจสอบความถูกต้องของหะดีษและแหล่งอ้างอิง',
      icon: '✓',
    },
    {
      num: 5,
      title: 'เรียบเรียงคำตอบ',
      desc: 'เขียนคำตอบที่เข้าใจง่ายพร้อมหลักฐานประกอบ',
      icon: '✍️',
    },
    {
      num: 6,
      title: 'ตรวจสอบโดยนักวิชาการ',
      desc: 'ส่งให้นักวิชาการตรวจสอบและรับรองความถูกต้อง',
      icon: '🎓',
    },
    {
      num: 7,
      title: 'เผยแพร่',
      desc: 'เผยแพร่คำตอบที่ผ่านการรับรองแล้ว',
      icon: '🚀',
    },
  ];

  return (
    <MainLayout>
      <div className="min-h-screen py-8 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <animated.div style={headerSpring} className="text-center mb-12">
            <div className="inline-flex items-center justify-center mb-6">
              <AnimatedIslamicPattern type="star" size="md" color="primary" animation="rotate" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              {UI_CONFIG.methodologyTitle}
            </h1>
            <p className="text-muted max-w-2xl mx-auto text-lg">
              {UI_CONFIG.methodologyDescription}
            </p>
          </animated.div>

          {/* Principles */}
          <animated.div style={contentSpring} className="mb-12">
            <div className="bg-primary/5 dark:bg-primary/10 rounded-2xl border border-primary/20 p-6 md:p-8">
              <h2 className="text-xl font-bold text-foreground mb-4">
                {UI_CONFIG.labels.basicMethodology}
              </h2>
              <ul className="space-y-3 text-muted-dark dark:text-muted">
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">1.</span>
                  <span>ทุกคำตอบต้องอ้างอิงจากหลักฐานที่เชื่อถือได้</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">2.</span>
                  <span>ไม่ใช้ความคิดเห็นส่วนตัวในการตอบ</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">3.</span>
                  <span>ต้องระบุแหล่งอ้างอิงทุกครั้ง</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">4.</span>
                  <span>ตรวจสอบความถูกต้องของหะดีษก่อนนำมาอ้าง</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">5.</span>
                  <span>มีคำตอบสรุปสั้นและคำอธิบายเชิงลึก</span>
                </li>
              </ul>
            </div>
          </animated.div>

          {/* Process Steps */}
          <animated.div style={contentSpring}>
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
              {UI_CONFIG.labels.workProcess}
            </h2>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border hidden md:block" />

              <div className="space-y-6">
                {steps.map((step, index) => (
                  <div key={step.num} className="relative flex gap-4 md:gap-6">
                    {/* Step number */}
                    <div className="relative z-10 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center flex-shrink-0 text-white font-bold">
                      {step.num}
                    </div>

                    {/* Content */}
                    <div className="flex-1 pb-6">
                      <div className="bg-surface dark:bg-surface rounded-xl border border-border p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xl">{step.icon}</span>
                          <h3 className="font-semibold text-foreground">{step.title}</h3>
                        </div>
                        <p className="text-sm text-muted">{step.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </animated.div>

          {/* Evidence Types */}
          <animated.div style={contentSpring} className="mt-12">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
              {UI_CONFIG.labels.evidenceTypes}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { icon: '📖', label: 'อัลกุรอาน', color: 'emerald' },
                { icon: '📜', label: 'หะดีษ', color: 'amber' },
                { icon: '🎓', label: 'ความเห็นนักวิชาการ', color: 'blue' },
                { icon: '🏛️', label: 'ประวัติศาสตร์', color: 'purple' },
                { icon: '🔬', label: 'วิทยาศาสตร์', color: 'cyan' },
                { icon: '📊', label: 'สถิติและข้อมูล', color: 'gray' },
              ].map((type) => (
                <div
                  key={type.label}
                  className="flex items-center gap-3 p-4 rounded-xl bg-surface dark:bg-surface border border-border"
                >
                  <span className="text-2xl">{type.icon}</span>
                  <span className="font-medium text-foreground">{type.label}</span>
                </div>
              ))}
            </div>
          </animated.div>

          {/* CTA */}
          <animated.div style={contentSpring} className="mt-12 text-center">
            <p className="text-muted mb-6">
                {UI_CONFIG.labels.methodologyCTA}
            </p>
            <Link href="/contact">
              <AnimatedButton variant="primary" size="lg">
                {UI_CONFIG.labels.contactUs}
              </AnimatedButton>
            </Link>
          </animated.div>
        </div>
      </div>
    </MainLayout>
  );
}
