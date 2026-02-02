'use client';

/**
 * PopularView
 * Popular topics page showing most viewed content
 */

import type { SeverityLevel } from '@/src/domain/types/topic';
import { MOCK_CATEGORIES, MOCK_TOPICS } from '@/src/infrastructure/repositories/mock/data/mockData';
import { AnimatedCard } from '@/src/presentation/components/animated/AnimatedCard';
import { AnimatedIslamicPattern } from '@/src/presentation/components/animated/AnimatedIslamicPattern';
import { MainLayout } from '@/src/presentation/layouts/MainLayout';
import { animated, useSpring, useTrail } from '@react-spring/web';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

export function PopularView() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Get popular topics sorted by view count
  const popularTopics = useMemo(() => {
    return [...MOCK_TOPICS]
      .filter((t) => t.status === 'published')
      .sort((a, b) => b.viewCount - a.viewCount)
      .slice(0, 10);
  }, []);

  const headerSpring = useSpring({
    opacity: isLoaded ? 1 : 0,
    y: isLoaded ? 0 : 20,
    config: { tension: 200, friction: 20 },
  });

  const trail = useTrail(popularTopics.length, {
    opacity: isLoaded ? 1 : 0,
    x: isLoaded ? 0 : -20,
    config: { tension: 200, friction: 25 },
    delay: 200,
  });

  const getSeverityBadge = (level: SeverityLevel) => {
    switch (level) {
      case 'basic':
        return { label: 'พื้นฐาน', class: 'badge-basic' };
      case 'intermediate':
        return { label: 'ปานกลาง', class: 'badge-intermediate' };
      case 'advanced':
        return { label: 'ขั้นสูง', class: 'badge-advanced' };
    }
  };

  return (
    <MainLayout>
      <div className="min-h-screen py-8 md:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <animated.div style={headerSpring} className="text-center mb-12">
            <div className="inline-flex items-center justify-center mb-6">
              <AnimatedIslamicPattern type="star" size="md" color="gold" animation="pulse" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              🔥 คำตอบยอดนิยม
            </h1>
            <p className="text-muted max-w-2xl mx-auto text-lg">
              คำตอบที่ได้รับความสนใจและมีผู้เข้าชมมากที่สุด
            </p>
          </animated.div>

          {/* Popular Topics List */}
          <div className="space-y-4">
            {trail.map((spring, index) => {
              const topic = popularTopics[index];
              const category = MOCK_CATEGORIES.find((c) => c.id === topic.categoryId);
              const severity = getSeverityBadge(topic.severityLevel);

              return (
                <animated.div key={topic.id} style={spring}>
                  <Link href={`/topics/${topic.slug}`}>
                    <AnimatedCard className="p-5" variant="bordered">
                      <div className="flex items-start gap-4">
                        {/* Rank */}
                        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center">
                          <span className="text-xl font-bold text-white">
                            {index + 1}
                          </span>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
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
                              {severity.label}
                            </span>
                          </div>

                          <h2 className="font-semibold text-lg text-foreground mb-1 line-clamp-1">
                            {topic.title}
                          </h2>

                          <p className="text-sm text-muted line-clamp-2">
                            {topic.shortAnswer}
                          </p>
                        </div>

                        {/* View count */}
                        <div className="flex-shrink-0 text-right">
                          <div className="text-lg font-semibold text-primary">
                            {topic.viewCount.toLocaleString()}
                          </div>
                          <div className="text-xs text-muted">เข้าชม</div>
                        </div>
                      </div>
                    </AnimatedCard>
                  </Link>
                </animated.div>
              );
            })}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
