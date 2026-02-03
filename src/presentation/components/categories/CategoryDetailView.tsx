'use client';

/**
 * CategoryDetailView
 * Category detail page showing topics in that category
 */

import { UI_CONFIG } from '@/src/config/ui.config';
import type { SeverityLevel } from '@/src/domain/types/topic';
import { MOCK_CATEGORIES, MOCK_TOPICS } from '@/src/infrastructure/repositories/mock/data/mockData';
import { AnimatedButton } from '@/src/presentation/components/animated/AnimatedButton';
import { AnimatedCard } from '@/src/presentation/components/animated/AnimatedCard';
import { AnimatedIslamicPattern } from '@/src/presentation/components/animated/AnimatedIslamicPattern';
import { MainLayout } from '@/src/presentation/layouts/MainLayout';
import { animated, useSpring } from '@react-spring/web';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

interface CategoryDetailViewProps {
  slug: string;
}

export function CategoryDetailView({ slug }: CategoryDetailViewProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedSeverity, setSelectedSeverity] = useState<SeverityLevel | ''>('');
  const [sortBy, setSortBy] = useState<'newest' | 'popular'>('newest');

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const category = MOCK_CATEGORIES.find((c) => c.slug === slug);

  // Topics in this category
  const topics = useMemo(() => {
    if (!category) return [];

    let filtered = MOCK_TOPICS.filter(
      (t) => t.categoryId === category.id && t.status === 'published'
    );

    // Severity filter
    if (selectedSeverity) {
      filtered = filtered.filter((t) => t.severityLevel === selectedSeverity);
    }

    // Sort
    if (sortBy === 'newest') {
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else {
      filtered.sort((a, b) => b.viewCount - a.viewCount);
    }

    return filtered;
  }, [category, selectedSeverity, sortBy]);

  const headerSpring = useSpring({
    opacity: isLoaded ? 1 : 0,
    y: isLoaded ? 0 : 20,
    config: { tension: 200, friction: 20 },
  });

  // No longer using useTrail to avoid "Maximum call stack size exceeded"

  if (!category) {
    return <NotFoundState />;
  }

  const getSeverityBadge = (level: SeverityLevel) => {
    switch (level) {
      case 'basic':
        return { label: UI_CONFIG.severity.basic, class: 'badge-basic', icon: '🟢' };
      case 'intermediate':
        return { label: UI_CONFIG.severity.intermediate, class: 'badge-intermediate', icon: '🟡' };
      case 'advanced':
        return { label: UI_CONFIG.severity.advanced, class: 'badge-advanced', icon: '🔴' };
    }
  };

  return (
    <MainLayout>
      <div className="min-h-screen">
        {/* Hero Banner */}
        <animated.div
          style={headerSpring}
          className="relative overflow-hidden py-12 md:py-20"
        >
          {/* Background gradient */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              background: `linear-gradient(135deg, ${category.color}40 0%, transparent 100%)`,
            }}
          />
          
          {/* Pattern overlay */}
          <div className="absolute inset-0 islamic-pattern opacity-30" />

          {/* Content */}
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Breadcrumb */}
            <nav className="mb-6">
              <ol className="flex items-center justify-center gap-2 text-sm text-muted">
                <li>
                  <Link href="/" className="hover:text-primary transition-colors">
                    {UI_CONFIG.labels.home}
                  </Link>
                  <span className="mx-2 text-muted">/</span>
                  <Link href="/categories" className="hover:text-primary transition-colors">
                    {UI_CONFIG.labels.categories}
                  </Link>
                </li>
                <li>/</li>
                <li className="text-foreground font-medium">{category.name}</li>
              </ol>
            </nav>

            {/* Icon */}
            <div
              className="w-20 h-20 rounded-2xl mx-auto flex items-center justify-center text-4xl mb-6"
              style={{ backgroundColor: `${category.color}20` }}
            >
              {category.icon}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2">
              {category.name}
            </h1>

            {/* Arabic name */}
            {category.nameArabic && (
              <p className="arabic-text text-2xl md:text-3xl text-muted mb-4">
                {category.nameArabic}
              </p>
            )}

            {/* Description */}
            <p className="text-muted max-w-2xl mx-auto text-lg mb-6">
              {category.description}
            </p>

            {/* Stats */}
            <div className="flex items-center justify-center gap-6">
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
                <span className="text-foreground font-medium">
                  {topics.length} {UI_CONFIG.labels.answersCount}
                </span>
              </div>
            </div>
          </div>
        </animated.div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {/* Filters */}
          <animated.div style={headerSpring} className="flex flex-wrap gap-3 mb-8">
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value as SeverityLevel | '')}
              className="px-4 py-2 rounded-lg bg-surface border border-border focus:border-primary outline-none text-sm"
            >
              <option value="">{UI_CONFIG.allLevels}</option>
              <option value="basic">🟢 {UI_CONFIG.severity.basic}</option>
              <option value="intermediate">🟡 {UI_CONFIG.severity.intermediate}</option>
              <option value="advanced">🔴 {UI_CONFIG.severity.advanced}</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'newest' | 'popular')}
              className="px-4 py-2 rounded-lg bg-surface border border-border focus:border-primary outline-none text-sm"
            >
              <option value="newest">🕐 {UI_CONFIG.sortByNewest}</option>
              <option value="popular">🔥 {UI_CONFIG.sortByPopularSymbol}</option>
            </select>
          </animated.div>

          {/* Topics List */}
          {topics.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topics.map((topic, index) => (
                <TopicCardItem
                  key={topic.id}
                  topic={topic}
                  index={index}
                  isLoaded={isLoaded}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <AnimatedIslamicPattern type="octagon" size="lg" color="primary" className="mx-auto mb-4 opacity-30" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {UI_CONFIG.noTopicsInCategory}
              </h3>
              <p className="text-muted mb-8">
                {UI_CONFIG.addingContinuous}
              </p>
            </div>
          )}

          {/* Back link */}
          <div className="mt-12 text-center">
            <Link href="/categories">
              <AnimatedButton variant="outline" startIcon={<span>←</span>}>
                {UI_CONFIG.backToAllCategories}
              </AnimatedButton>
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

// Not Found State
function NotFoundState() {
  return (
    <MainLayout>
      <div className="min-h-screen flex items-center justify-center py-16">
        <div className="text-center">
          <AnimatedIslamicPattern type="star" size="lg" color="gold" className="mx-auto mb-6 opacity-50" />
          <h1 className="text-2xl font-bold text-foreground mb-2">{UI_CONFIG.labels.categoryNotFound}</h1>
            <p className="text-muted mb-8">{UI_CONFIG.noTopicsInCategory}</p>
            <Link href="/categories">
              <AnimatedButton variant="primary">
                {UI_CONFIG.backToAllCategories}
              </AnimatedButton>
            </Link>
        </div>
      </div>
    </MainLayout>
  );
}

/**
 * Sub-component for individual topic card animation
 */
function TopicCardItem({
  topic,
  index,
  isLoaded,
}: {
  topic: typeof MOCK_TOPICS[0];
  index: number;
  isLoaded: boolean;
}) {
  const spring = useSpring({
    opacity: isLoaded ? 1 : 0,
    y: isLoaded ? 0 : 20,
    delay: 300 + index * 50,
    config: { tension: 200, friction: 25 },
  });

  const getSeverityBadge = (level: typeof topic.severityLevel) => {
    switch (level) {
      case 'basic':
        return { label: UI_CONFIG.severity.basic, class: 'badge-basic', icon: '🟢' };
      case 'intermediate':
        return { label: UI_CONFIG.severity.intermediate, class: 'badge-intermediate', icon: '🟡' };
      case 'advanced':
        return { label: UI_CONFIG.severity.advanced, class: 'badge-advanced', icon: '🔴' };
    }
  };

  const severity = getSeverityBadge(topic.severityLevel);

  return (
    <animated.div style={spring}>
      <Link href={`/topics/${topic.slug}`}>
        <AnimatedCard className="h-full p-5" variant="bordered">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${severity.class}`}>
              {severity.icon} {severity.label}
            </span>
            {topic.isVerified && (
              <span className="text-primary" title={UI_CONFIG.labels.verified}>
                ✓
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-semibold text-lg text-foreground mb-2 line-clamp-2">
            {topic.title}
          </h3>

          {/* Short answer */}
          <p className="text-sm text-muted line-clamp-3 mb-4">
            {topic.shortAnswer}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between text-xs text-muted mt-auto pt-3 border-t border-border">
            <span className="flex items-center gap-1">
              <span>👁</span>
              {topic.viewCount.toLocaleString()}
            </span>
            <span>
              {new Date(topic.createdAt).toLocaleDateString('th-TH', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </span>
          </div>
        </AnimatedCard>
      </Link>
    </animated.div>
  );
}
