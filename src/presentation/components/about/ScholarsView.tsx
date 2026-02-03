'use client';

/**
 * ScholarsView
 * Page displaying the scholar team
 */

import { UI_CONFIG } from '@/src/config/ui.config';
import { AnimatedCard } from '@/src/presentation/components/animated/AnimatedCard';
import { AnimatedIslamicPattern } from '@/src/presentation/components/animated/AnimatedIslamicPattern';
import { MainLayout } from '@/src/presentation/layouts/MainLayout';
import { animated, useSpring } from '@react-spring/web';
import { useEffect, useState } from 'react';

interface Scholar {
  id: string;
  name: string;
  nameArabic?: string;
  title: string;
  specialization: string;
  bio: string;
  image?: string;
}

const SCHOLARS: Scholar[] = [
  {
    id: '1',
    name: 'ดร.อับดุลเลาะห์',
    nameArabic: 'د. عبد الله',
    title: 'ที่ปรึกษาด้านอิสลามศึกษา',
    specialization: 'อัลกุรอานและตัฟสีร',
    bio: 'จบการศึกษาระดับปริญญาเอกด้านอิสลามศึกษาจากมหาวิทยาลัยอัลอัซฮัร มีประสบการณ์ในการสอนและวิจัยมากกว่า 15 ปี',
  },
  {
    id: '2',
    name: 'อุสตาซมุฮัมมัด',
    nameArabic: 'أستاذ محمد',
    title: 'ผู้เชี่ยวชาญด้านหะดีษ',
    specialization: 'อุลูมุลหะดีษ',
    bio: 'ศึกษาหะดีษจากนักวิชาการหลายท่านในประเทศซาอุดีอาระเบีย มีความเชี่ยวชาญในการตรวจสอบความถูกต้องของหะดีษ',
  },
  {
    id: '3',
    name: 'ดร.ฟาติมะห์',
    nameArabic: 'ด. فاطمة',
    title: 'ผู้เชี่ยวชาญด้านประวัติศาสตร์อิสลาม',
    specialization: 'ประวัติศาสตร์และสตรีในอิสลาม',
    bio: 'จบการศึกษาด้านประวัติศาสตร์อิสลามจากมหาวิทยาลัยในจอร์แดน มีงานเขียนหลายเล่มเกี่ยวกับบทบาทของสตรีในอิสลาม',
  },
  {
    id: '4',
    name: 'อุสตาซอาหมัด',
    nameArabic: 'أستاذ أحمد',
    title: 'ผู้ตรวจสอบเนื้อหา',
    specialization: 'ฟิกฮ์และอะกีดะฮ์',
    bio: 'จบการศึกษาจากมหาวิทยาลัยอิสลามมะดีนะห์ มีบทบาทในการตอบคำถามศาสนาและตรวจสอบความถูกต้องของเนื้อหา',
  },
];

export function ScholarsView() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const headerSpring = useSpring({
    opacity: isLoaded ? 1 : 0,
    y: isLoaded ? 0 : 20,
    config: { tension: 200, friction: 20 },
  });

  // No longer using useTrail to avoid "Maximum call stack size exceeded"

  return (
    <MainLayout>
      <div className="min-h-screen py-8 md:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <animated.div style={headerSpring} className="text-center mb-12">
            <div className="inline-flex items-center justify-center mb-6">
              <AnimatedIslamicPattern type="octagon" size="md" color="gold" animation="pulse" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              {UI_CONFIG.scholarsTitle}
            </h1>
            <p className="text-muted max-w-2xl mx-auto text-lg">
              {UI_CONFIG.scholarsDescription}
            </p>
          </animated.div>

          {/* Scholars Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {SCHOLARS.map((scholar, index) => (
              <ScholarCardItem
                key={scholar.id}
                scholar={scholar}
                index={index}
                isLoaded={isLoaded}
              />
            ))}
          </div>

          {/* Note */}
          <animated.div style={headerSpring} className="mt-12 text-center">
            <div className="bg-primary/5 dark:bg-primary/10 rounded-xl p-6 border border-primary/20">
              <p className="text-muted">
                <span className="text-primary">✓</span> {UI_CONFIG.labels.scholarVerificationNote}
              </p>
            </div>
          </animated.div>
        </div>
      </div>
    </MainLayout>
  );
}

/**
 * Sub-component for individual scholar card animation
 */
function ScholarCardItem({
  scholar,
  index,
  isLoaded,
}: {
  scholar: Scholar;
  index: number;
  isLoaded: boolean;
}) {
  const spring = useSpring({
    opacity: isLoaded ? 1 : 0,
    y: isLoaded ? 0 : 30,
    delay: 200 + index * 50,
    config: { tension: 200, friction: 25 },
  });

  return (
    <animated.div style={spring}>
      <AnimatedCard className="h-full p-6" variant="elevated">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center flex-shrink-0">
            <span className="text-2xl text-white">🎓</span>
          </div>

          {/* Info */}
          <div className="flex-1">
            <h3 className="font-bold text-lg text-foreground">
              {scholar.name}
            </h3>
            {scholar.nameArabic && (
              <p className="arabic-text text-muted text-sm mb-1">
                {scholar.nameArabic}
              </p>
            )}
            <p className="text-sm text-primary font-medium mb-2">
              {scholar.title}
            </p>
            <div className="inline-block px-2 py-0.5 bg-gold/10 text-gold-dark dark:text-gold text-xs rounded-full mb-3">
              {scholar.specialization}
            </div>
            <p className="text-sm text-muted leading-relaxed">
              {scholar.bio}
            </p>
          </div>
        </div>
      </AnimatedCard>
    </animated.div>
  );
}
