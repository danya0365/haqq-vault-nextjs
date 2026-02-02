'use client';

/**
 * HomeView
 * Homepage view component with Islamic-themed design
 */

import { MOCK_CATEGORIES, MOCK_STATS, MOCK_TOPICS } from '@/src/infrastructure/repositories/mock/data/mockData';
import { AnimatedButton } from '@/src/presentation/components/animated/AnimatedButton';
import { AnimatedCard } from '@/src/presentation/components/animated/AnimatedCard';
import { AnimatedIslamicPattern } from '@/src/presentation/components/animated/AnimatedIslamicPattern';
import { MainLayout } from '@/src/presentation/layouts/MainLayout';
import { animated, useSpring } from '@react-spring/web';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function HomeView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Featured topics (verified & published, limited to 4)
  const featuredTopics = MOCK_TOPICS.filter(
    (t) => t.isVerified && t.status === 'published'
  ).slice(0, 4);

  // Active categories (limited to 6)
  const categories = MOCK_CATEGORIES.filter((c) => c.isActive).slice(0, 6);

  return (
    <MainLayout>
      {/* Hero Section */}
      <HeroSection
        isLoaded={isLoaded}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Categories Section */}
      <CategoriesSection categories={categories} isLoaded={isLoaded} />

      {/* Featured Topics Section */}
      <FeaturedTopicsSection topics={featuredTopics} isLoaded={isLoaded} />

      {/* Statistics Section */}
      <StatisticsSection stats={MOCK_STATS} isLoaded={isLoaded} />

      {/* CTA Section */}
      <CTASection isLoaded={isLoaded} />
    </MainLayout>
  );
}

// Hero Section Component
function HeroSection({
  isLoaded,
  searchQuery,
  onSearchChange,
}: {
  isLoaded: boolean;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}) {
  const heroSpring = useSpring({
    opacity: isLoaded ? 1 : 0,
    y: isLoaded ? 0 : 30,
    config: { tension: 200, friction: 20 },
    delay: 100,
  });

  const arabicSpring = useSpring({
    opacity: isLoaded ? 1 : 0,
    scale: isLoaded ? 1 : 0.9,
    config: { tension: 180, friction: 20 },
    delay: 300,
  });

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 opacity-20 dark:opacity-10">
          <AnimatedIslamicPattern type="star" size="lg" color="primary" animation="rotate" />
        </div>
        <div className="absolute top-40 right-20 opacity-15 dark:opacity-10">
          <AnimatedIslamicPattern type="octagon" size="md" color="gold" animation="pulse" />
        </div>
        <div className="absolute bottom-20 left-1/4 opacity-20 dark:opacity-10">
          <AnimatedIslamicPattern type="arabesque" size="md" color="primary" animation="float" />
        </div>
        <div className="absolute bottom-40 right-1/3 opacity-15 dark:opacity-10">
          <AnimatedIslamicPattern type="star" size="sm" color="gold" animation="rotate" />
        </div>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-surface/50 dark:from-primary/10 dark:to-background/80" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Arabic Bismillah */}
        <animated.div style={arabicSpring} className="mb-6">
          <p className="arabic-text text-2xl md:text-3xl text-gold dark:text-gold-light font-medium">
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </p>
        </animated.div>

        {/* Main heading */}
        <animated.div style={heroSpring}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
            <span className="text-emerald-gradient">Haqq</span>{' '}
            <span className="text-gold-gradient">Vault</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted mb-4">
            คลังคำตอบชุบฮาต
          </p>
          <p className="text-base md:text-lg text-muted-dark dark:text-muted max-w-2xl mx-auto mb-8">
            แหล่งรวบรวมคำตอบสำหรับข้อกล่าวหาและข้อสงสัยเกี่ยวกับอิสลาม
            <br className="hidden md:block" />
            โดยใช้หลักฐานจากอัลกุรอาน หะดีษ และความเห็นของบรรดานักวิชาการ
          </p>
        </animated.div>

        {/* Search bar */}
        <animated.div style={heroSpring} className="max-w-xl mx-auto mb-8">
          <div className="relative group">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="ค้นหาคำตอบ เช่น อิสลามกับความรุนแรง..."
              className="w-full px-6 py-4 pl-14 text-lg rounded-2xl bg-surface dark:bg-surface border-2 border-transparent focus:border-primary outline-none shadow-lg shadow-black/5 transition-all duration-300 group-hover:shadow-xl"
            />
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-xl text-muted">
              🔍
            </span>
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors"
              >
                ✕
              </button>
            )}
          </div>
        </animated.div>

        {/* CTA Buttons */}
        <animated.div style={heroSpring} className="flex flex-wrap justify-center gap-4">
          <Link href="/topics">
            <AnimatedButton variant="primary" size="lg" startIcon={<span>📖</span>}>
              ดูคำตอบทั้งหมด
            </AnimatedButton>
          </Link>
          <Link href="/categories">
            <AnimatedButton variant="outline" size="lg" startIcon={<span>📚</span>}>
              เลือกหมวดหมู่
            </AnimatedButton>
          </Link>
        </animated.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 rounded-full border-2 border-muted/30 flex justify-center pt-2">
          <div className="w-1.5 h-3 rounded-full bg-primary animate-pulse" />
        </div>
      </div>
    </section>
  );
}

// Categories Section
function CategoriesSection({
  categories,
  isLoaded,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  categories: any[];
  isLoaded: boolean;
}) {
  // No longer using useTrail to avoid "Maximum call stack size exceeded"

  return (
    <section className="py-16 md:py-24 bg-surface-warm dark:bg-surface/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 text-sm font-medium text-primary bg-primary/10 px-4 py-1.5 rounded-full mb-4">
            <span>📂</span> หมวดหมู่
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            เลือกหมวดหมู่ที่สนใจ
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            ค้นหาคำตอบตามหมวดหมู่เพื่อให้ง่ายต่อการค้นหา
          </p>
        </div>

        {/* Categories grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <CategoryItemCard
              key={category.id}
              category={category}
              index={index}
              isLoaded={isLoaded}
            />
          ))}
        </div>

        {/* View all link */}
        <div className="text-center mt-10">
          <Link href="/categories">
            <AnimatedButton variant="ghost" endIcon={<span>→</span>}>
              ดูหมวดหมู่ทั้งหมด
            </AnimatedButton>
          </Link>
        </div>
      </div>
    </section>
  );
}

// Featured Topics Section
function FeaturedTopicsSection({
  topics,
  isLoaded,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  topics: any[];
  isLoaded: boolean;
}) {
  // No longer using useTrail to avoid "Maximum call stack size exceeded"

  const getSeverityBadge = (level: string) => {
    switch (level) {
      case 'basic':
        return { label: 'พื้นฐาน', class: 'badge-basic' };
      case 'intermediate':
        return { label: 'ปานกลาง', class: 'badge-intermediate' };
      case 'advanced':
        return { label: 'ขั้นสูง', class: 'badge-advanced' };
      default:
        return { label: level, class: 'badge-basic' };
    }
  };

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 text-sm font-medium text-gold bg-gold/10 px-4 py-1.5 rounded-full mb-4">
            <span>⭐</span> แนะนำ
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            คำตอบที่ได้รับการยืนยัน
          </h2>
          <p className="text-muted max-w-2xl mx-auto">
            คำตอบที่ผ่านการตรวจสอบจากนักวิชาการ
          </p>
        </div>

        {/* Topics grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {topics.map((topic, index) => (
            <TopicItemCard
              key={topic.id}
              topic={topic}
              index={index}
              isLoaded={isLoaded}
            />
          ))}
        </div>

        {/* View all link */}
        <div className="text-center mt-10">
          <Link href="/topics">
            <AnimatedButton variant="primary" size="lg" endIcon={<span>→</span>}>
              ดูคำตอบทั้งหมด
            </AnimatedButton>
          </Link>
        </div>
      </div>
    </section>
  );
}

// Statistics Section
function StatisticsSection({
  stats,
  isLoaded,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  stats: any;
  isLoaded: boolean;
}) {
  const spring = useSpring({
    opacity: isLoaded ? 1 : 0,
    y: isLoaded ? 0 : 30,
    config: { tension: 200, friction: 25 },
    delay: 900,
  });

  const statItems = [
    { value: stats.totalTopics, label: 'คำตอบ', icon: '📖' },
    { value: stats.verifiedTopics, label: 'ได้รับการยืนยัน', icon: '✓' },
    { value: stats.totalCategories, label: 'หมวดหมู่', icon: '📂' },
    { value: stats.totalViews, label: 'ยอดเข้าชม', icon: '👁' },
  ];

  return (
    <animated.section
      style={spring}
      className="py-16 md:py-24 bg-gradient-to-br from-primary to-primary-dark"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            สถิติของเรา
          </h2>
          <p className="text-white/80">
            เราพัฒนาคลังคำตอบอย่างต่อเนื่องเพื่อให้ครอบคลุมทุกข้อสงสัย
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {statItems.map((stat, index) => (
            <AnimatedStatCard key={index} stat={stat} delay={index * 100} />
          ))}
        </div>
      </div>
    </animated.section>
  );
}

// Animated Stat Card
function AnimatedStatCard({
  stat,
  delay,
}: {
  stat: { value: number; label: string; icon: string };
  delay: number;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const duration = 1500;
      const steps = 50;
      const increment = stat.value / steps;
      let current = 0;
      const interval = setInterval(() => {
        current += increment;
        if (current >= stat.value) {
          setCount(stat.value);
          clearInterval(interval);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
    }, delay + 500);

    return () => clearTimeout(timer);
  }, [stat.value, delay]);

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
      <span className="text-3xl mb-2 block">{stat.icon}</span>
      <div className="text-3xl md:text-4xl font-bold text-white mb-1">
        {count.toLocaleString()}
      </div>
      <div className="text-sm text-white/80">{stat.label}</div>
    </div>
  );
}

// CTA Section
function CTASection({ isLoaded }: { isLoaded: boolean }) {
  const spring = useSpring({
    opacity: isLoaded ? 1 : 0,
    y: isLoaded ? 0 : 30,
    config: { tension: 200, friction: 25 },
    delay: 1100,
  });

  return (
    <animated.section style={spring} className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Decorative pattern */}
        <div className="flex justify-center mb-8">
          <AnimatedIslamicPattern type="star" size="lg" color="gold" animation="pulse" />
        </div>

        {/* Quote */}
        <div className="mb-8">
          <p className="arabic-text text-2xl md:text-3xl text-primary mb-4">
            الحق أحق أن يتبع
          </p>
          <p className="text-lg text-muted italic">
            "ความจริงนั้นมีสิทธิมากที่สุดที่จะได้รับการปฏิบัติตาม"
          </p>
        </div>

        {/* CTA */}
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
          มีคำถามหรือข้อสงสัย?
        </h2>
        <p className="text-muted mb-8 max-w-xl mx-auto">
          ค้นหาคำตอบในคลังของเรา หรือติดต่อทีมนักวิชาการเพื่อขอคำตอบสำหรับคำถามใหม่ๆ
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/search">
            <AnimatedButton variant="primary" size="lg" startIcon={<span>🔍</span>}>
              ค้นหาคำตอบ
            </AnimatedButton>
          </Link>
          <Link href="/contact">
            <AnimatedButton variant="gold" size="lg" startIcon={<span>💬</span>}>
              ส่งคำถาม
            </AnimatedButton>
          </Link>
        </div>
      </div>
    </animated.section>
  );
}

/**
 * Sub-component for individual category card animation
 */
function CategoryItemCard({
  category,
  index,
  isLoaded,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  category: any;
  index: number;
  isLoaded: boolean;
}) {
  const spring = useSpring({
    opacity: isLoaded ? 1 : 0,
    y: isLoaded ? 0 : 30,
    delay: 500 + index * 50,
    config: { tension: 200, friction: 25 },
  });

  return (
    <animated.div style={spring}>
      <Link href={`/categories/${category.slug}`}>
        <AnimatedCard className="p-6 h-full" variant="bordered">
          <div className="flex items-start gap-4">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl"
              style={{ backgroundColor: `${category.color}20` }}
            >
              {category.icon}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-foreground mb-1">
                {category.name}
              </h3>
              {category.nameArabic && (
                <p className="arabic-text text-sm text-muted mb-2">
                  {category.nameArabic}
                </p>
              )}
              <p className="text-sm text-muted line-clamp-2">
                {category.description}
              </p>
              <div className="flex items-center gap-2 mt-3 text-xs text-muted">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
                <span>{category.topicCount} คำตอบ</span>
              </div>
            </div>
          </div>
        </AnimatedCard>
      </Link>
    </animated.div>
  );
}

/**
 * Sub-component for individual topic card animation
 */
function TopicItemCard({
  topic,
  index,
  isLoaded,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  topic: any;
  index: number;
  isLoaded: boolean;
}) {
  const spring = useSpring({
    opacity: isLoaded ? 1 : 0,
    y: isLoaded ? 0 : 30,
    delay: 700 + index * 50,
    config: { tension: 200, friction: 25 },
  });

  const getSeverityBadge = (level: string) => {
    switch (level) {
      case 'basic':
        return { label: 'พื้นฐาน', class: 'badge-basic' };
      case 'intermediate':
        return { label: 'ปานกลาง', class: 'badge-intermediate' };
      case 'advanced':
        return { label: 'ขั้นสูง', class: 'badge-advanced' };
      default:
        return { label: level, class: 'badge-basic' };
    }
  };

  const severity = getSeverityBadge(topic.severityLevel);

  return (
    <animated.div style={spring}>
      <Link href={`/topics/${topic.slug}`}>
        <AnimatedCard className="p-6 h-full" variant="elevated">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${severity.class}`}>
                {severity.label}
              </span>
              {topic.isVerified && (
                <span className="text-primary text-sm" title="ได้รับการยืนยัน">
                  ✓
                </span>
              )}
            </div>
            <div className="flex items-center gap-1 text-xs text-muted">
              <span>👁</span>
              <span>{topic.viewCount.toLocaleString()}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-semibold text-lg text-foreground mb-2 line-clamp-2">
            {topic.title}
          </h3>

          {/* Arabic title */}
          {topic.titleArabic && (
            <p className="arabic-text text-sm text-muted mb-3">
              {topic.titleArabic}
            </p>
          )}

          {/* Short answer preview */}
          <p className="text-sm text-muted line-clamp-3 mb-4">
            {topic.shortAnswer}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {topic.tags.slice(0, 3).map((tag: string) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
        </AnimatedCard>
      </Link>
    </animated.div>
  );
}
