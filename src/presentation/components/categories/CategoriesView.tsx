'use client';

/**
 * CategoriesView
 * Categories listing page
 */

import { MOCK_CATEGORIES } from '@/src/infrastructure/repositories/mock/data/mockData';
import { AnimatedCard } from '@/src/presentation/components/animated/AnimatedCard';
import { AnimatedIslamicPattern } from '@/src/presentation/components/animated/AnimatedIslamicPattern';
import { MainLayout } from '@/src/presentation/layouts/MainLayout';
import { animated, useSpring } from '@react-spring/web';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function CategoriesView() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const categories = MOCK_CATEGORIES.filter((c) => c.isActive);

  const headerSpring = useSpring({
    opacity: isLoaded ? 1 : 0,
    y: isLoaded ? 0 : 20,
    config: { tension: 200, friction: 20 },
  });

  return (
    <MainLayout>
      <div className="min-h-screen py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <animated.div style={headerSpring} className="text-center mb-12">
            <div className="inline-flex items-center justify-center mb-6">
              <AnimatedIslamicPattern type="star" size="md" color="gold" animation="pulse" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              หมวดหมู่คำตอบ
            </h1>
            <p className="text-muted max-w-2xl mx-auto text-lg">
              เลือกหมวดหมู่ที่สนใจเพื่อค้นหาคำตอบที่เหมาะกับคุณ
            </p>
          </animated.div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {categories.map((category, index) => (
              <CategoryCardItem
                key={category.id}
                category={category}
                index={index}
                isLoaded={isLoaded}
              />
            ))}
          </div>

          {/* Decorative section */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-2 text-muted">
              <div className="w-12 h-px bg-border" />
              <AnimatedIslamicPattern type="octagon" size="sm" color="primary" />
              <div className="w-12 h-px bg-border" />
            </div>
            <p className="mt-4 text-muted">
              เรากำลังเพิ่มเติมคำตอบอย่างต่อเนื่อง
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

/**
 * Sub-component to handle individual entry animation
 * This replaces useTrail to avoid "Maximum call stack size exceeded"
 */
function CategoryCardItem({ 
  category, 
  index, 
  isLoaded 
}: { 
  category: typeof MOCK_CATEGORIES[0], 
  index: number, 
  isLoaded: boolean 
}) {
  const spring = useSpring({
    opacity: isLoaded ? 1 : 0,
    y: isLoaded ? 0 : 30,
    scale: isLoaded ? 1 : 0.95,
    delay: 150 + index * 50, // Stagger effect
    config: { tension: 200, friction: 25 },
  });

  return (
    <animated.div style={spring}>
      <Link href={`/categories/${category.slug}`}>
        <AnimatedCard className="h-full overflow-hidden" variant="elevated">
          {/* Color banner */}
          <div
            className="h-2"
            style={{ backgroundColor: category.color }}
          />
          
          <div className="p-6">
            {/* Icon */}
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-4"
              style={{ backgroundColor: `${category.color}15` }}
            >
              {category.icon}
            </div>

            {/* Content */}
            <h2 className="text-xl font-bold text-foreground mb-1">
              {category.name}
            </h2>
            
            {category.nameArabic && (
              <p className="arabic-text text-lg text-muted mb-3">
                {category.nameArabic}
              </p>
            )}

            <p className="text-muted text-sm leading-relaxed mb-4">
              {category.description}
            </p>

            {/* Stats */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
                <span className="text-sm text-muted">
                  {category.topicCount} คำตอบ
                </span>
              </div>
              <span className="text-primary text-sm font-medium flex items-center gap-1">
                ดูทั้งหมด
                <span>→</span>
              </span>
            </div>
          </div>
        </AnimatedCard>
      </Link>
    </animated.div>
  );
}
