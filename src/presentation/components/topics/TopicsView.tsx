'use client';

/**
 * TopicsView
 * Topics listing page with search, filter, and pagination
 */

import type { SeverityLevel, Topic } from '@/src/domain/types/topic';
import { MOCK_CATEGORIES, MOCK_TOPICS } from '@/src/infrastructure/repositories/mock/data/mockData';
import { AnimatedButton } from '@/src/presentation/components/animated/AnimatedButton';
import { AnimatedCard } from '@/src/presentation/components/animated/AnimatedCard';
import { MainLayout } from '@/src/presentation/layouts/MainLayout';
import { animated, useSpring } from '@react-spring/web';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

export function TopicsView() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSeverity, setSelectedSeverity] = useState<SeverityLevel | ''>('');
  const [sortBy, setSortBy] = useState<'newest' | 'popular'>('newest');

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Filter and sort topics
  const filteredTopics = useMemo(() => {
    let topics = [...MOCK_TOPICS].filter(t => t.status === 'published');

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      topics = topics.filter(
        (t) =>
          t.title.toLowerCase().includes(query) ||
          t.claim.toLowerCase().includes(query) ||
          t.shortAnswer.toLowerCase().includes(query) ||
          t.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Category filter
    if (selectedCategory) {
      topics = topics.filter((t) => t.categoryId === selectedCategory);
    }

    // Severity filter
    if (selectedSeverity) {
      topics = topics.filter((t) => t.severityLevel === selectedSeverity);
    }

    // Sort
    if (sortBy === 'newest') {
      topics.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else {
      topics.sort((a, b) => b.viewCount - a.viewCount);
    }

    return topics;
  }, [searchQuery, selectedCategory, selectedSeverity, sortBy]);

  const headerSpring = useSpring({
    opacity: isLoaded ? 1 : 0,
    y: isLoaded ? 0 : 20,
    config: { tension: 200, friction: 20 },
  });

  // No longer using useTrail to avoid "Maximum call stack size exceeded"

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedSeverity('');
  };

  const hasFilters = !!(searchQuery || selectedCategory || selectedSeverity);

  return (
    <MainLayout>
      <div className="min-h-screen py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <animated.div style={headerSpring} className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">📚</span>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                คำตอบทั้งหมด
              </h1>
            </div>
            <p className="text-muted max-w-2xl">
              รวบรวมคำตอบสำหรับข้อกล่าวหาและข้อสงสัยเกี่ยวกับอิสลาม
              พร้อมหลักฐานจากอัลกุรอาน หะดีษ และนักวิชาการ
            </p>
          </animated.div>

          {/* Filters Section */}
          <animated.div
            style={headerSpring}
            className="bg-surface dark:bg-surface rounded-2xl border border-border p-4 md:p-6 mb-8"
          >
            {/* Search */}
            <div className="relative mb-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ค้นหาคำตอบ..."
                className="w-full px-4 py-3 pl-12 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">
                🔍
              </span>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-foreground"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Filter Row */}
            <div className="flex flex-wrap gap-3">
              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 rounded-lg bg-background border border-border focus:border-primary outline-none text-sm"
              >
                <option value="">ทุกหมวดหมู่</option>
                {MOCK_CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.icon} {cat.name}
                  </option>
                ))}
              </select>

              {/* Severity Filter */}
              <select
                value={selectedSeverity}
                onChange={(e) => setSelectedSeverity(e.target.value as SeverityLevel | '')}
                className="px-4 py-2 rounded-lg bg-background border border-border focus:border-primary outline-none text-sm"
              >
                <option value="">ทุกระดับ</option>
                <option value="basic">🟢 พื้นฐาน</option>
                <option value="intermediate">🟡 ปานกลาง</option>
                <option value="advanced">🔴 ขั้นสูง</option>
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'newest' | 'popular')}
                className="px-4 py-2 rounded-lg bg-background border border-border focus:border-primary outline-none text-sm"
              >
                <option value="newest">🕐 ใหม่ล่าสุด</option>
                <option value="popular">🔥 ยอดนิยม</option>
              </select>

              {/* Clear filters */}
              {hasFilters && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 rounded-lg text-sm text-primary hover:bg-primary/10 transition-colors"
                >
                  ล้างตัวกรอง
                </button>
              )}
            </div>
          </animated.div>

          {/* Results count */}
          <div className="mb-6 text-sm text-muted">
            พบ {filteredTopics.length} คำตอบ
          </div>

          {/* Topics Grid */}
          {filteredTopics.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTopics.map((topic, index) => (
                <TopicCard
                  key={topic.id}
                  topic={topic}
                  index={index}
                  isLoaded={isLoaded}
                />
              ))}
            </div>
          ) : (
            <EmptyState hasFilters={hasFilters} onClear={clearFilters} />
          )}
        </div>
      </div>
    </MainLayout>
  );
}

// Topic Card Component with individual animation
function TopicCard({ 
  topic, 
  index, 
  isLoaded 
}: { 
  topic: Topic;
  index: number;
  isLoaded: boolean;
}) {
  const spring = useSpring({
    opacity: isLoaded ? 1 : 0,
    y: isLoaded ? 0 : 20,
    delay: 200 + index * 50,
    config: { tension: 200, friction: 25 },
  });

  const category = MOCK_CATEGORIES.find((c) => c.id === topic.categoryId);

  const getSeverityBadge = (level: SeverityLevel) => {
    switch (level) {
      case 'basic':
        return { label: 'พื้นฐาน', class: 'badge-basic', icon: '🟢' };
      case 'intermediate':
        return { label: 'ปานกลาง', class: 'badge-intermediate', icon: '🟡' };
      case 'advanced':
        return { label: 'ขั้นสูง', class: 'badge-advanced', icon: '🔴' };
    }
  };

  const severity = getSeverityBadge(topic.severityLevel);

  return (
    <animated.div style={spring}>
      <Link href={`/topics/${topic.slug}`}>
        <AnimatedCard className="h-full p-5" variant="bordered">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            {category && (
              <span
                className="px-2 py-0.5 text-xs rounded-full"
                style={{
                  backgroundColor: `${category.color}15`,
                  color: category.color,
                }}
              >
                {category.icon} {category.name}
              </span>
            )}
            <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${severity.class}`}>
              {severity.icon} {severity.label}
            </span>
          </div>
          {topic.isVerified && (
            <span className="text-primary text-lg" title="ได้รับการยืนยัน">
              ✓
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-semibold text-lg text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {topic.title}
        </h3>

        {/* Arabic title */}
        {topic.titleArabic && (
          <p className="arabic-text text-sm text-muted mb-2 line-clamp-1">
            {topic.titleArabic}
          </p>
        )}

        {/* Short answer preview */}
        <p className="text-sm text-muted line-clamp-3 mb-4">
          {topic.shortAnswer}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-muted mt-auto pt-3 border-t border-border">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <span>👁</span>
              {topic.viewCount.toLocaleString()}
            </span>
          </div>
          <span>
            {new Date(topic.createdAt).toLocaleDateString('th-TH', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {topic.tags.slice(0, 3).map((tag) => (
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

// Empty State Component
function EmptyState({
  hasFilters,
  onClear,
}: {
  hasFilters: boolean;
  onClear: () => void;
}) {
  return (
    <div className="text-center py-16">
      <div className="text-6xl mb-4">🔍</div>
      <h3 className="text-xl font-semibold text-foreground mb-2">
        ไม่พบคำตอบ
      </h3>
      <p className="text-muted mb-6 max-w-md mx-auto">
        {hasFilters
          ? 'ลองเปลี่ยนคำค้นหาหรือตัวกรองเพื่อดูผลลัพธ์เพิ่มเติม'
          : 'ยังไม่มีคำตอบในระบบ'}
      </p>
      {hasFilters && (
        <AnimatedButton variant="outline" onClick={onClear}>
          ล้างตัวกรอง
        </AnimatedButton>
      )}
    </div>
  );
}
