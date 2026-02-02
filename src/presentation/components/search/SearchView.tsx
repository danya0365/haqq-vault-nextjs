'use client';

/**
 * SearchView
 * Full-featured search page with instant results
 */

import type { SeverityLevel, Topic } from '@/src/domain/types/topic';
import { MOCK_CATEGORIES, MOCK_TOPICS } from '@/src/infrastructure/repositories/mock/data/mockData';
import { AnimatedButton } from '@/src/presentation/components/animated/AnimatedButton';
import { AnimatedCard } from '@/src/presentation/components/animated/AnimatedCard';
import { AnimatedIslamicPattern } from '@/src/presentation/components/animated/AnimatedIslamicPattern';
import { MainLayout } from '@/src/presentation/layouts/MainLayout';
import { animated, useSpring } from '@react-spring/web';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';

export function SearchView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [isLoaded, setIsLoaded] = useState(false);
  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
      // Update URL
      if (query) {
        router.replace(`/search?q=${encodeURIComponent(query)}`, { scroll: false });
      } else {
        router.replace('/search', { scroll: false });
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query, router]);

  // Search results
  const results = useMemo(() => {
    if (!debouncedQuery.trim()) return [];

    const q = debouncedQuery.toLowerCase().trim();
    return MOCK_TOPICS.filter(
      (topic) =>
        topic.status === 'published' &&
        (topic.title.toLowerCase().includes(q) ||
          topic.claim.toLowerCase().includes(q) ||
          topic.shortAnswer.toLowerCase().includes(q) ||
          topic.detailedExplanation.toLowerCase().includes(q) ||
          topic.tags.some((tag) => tag.toLowerCase().includes(q)))
    );
  }, [debouncedQuery]);

  // Popular search terms
  const popularSearches = [
    'อัลกุรอาน',
    'ท่านนบี ﷺ',
    'สตรีในอิสลาม',
    'ญิฮาด',
    'วิทยาศาสตร์',
    'ประวัติศาสตร์',
  ];

  const headerSpring = useSpring({
    opacity: isLoaded ? 1 : 0,
    y: isLoaded ? 0 : 20,
    config: { tension: 200, friction: 20 },
  });

  // No longer using useTrail to avoid "Maximum call stack size exceeded"

  return (
    <MainLayout>
      <div className="min-h-screen py-8 md:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <animated.div style={headerSpring} className="text-center mb-8">
            <div className="inline-flex items-center justify-center mb-4">
              <AnimatedIslamicPattern type="star" size="md" color="primary" animation="rotate" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              ค้นหาคำตอบ
            </h1>
            <p className="text-muted">
              พิมพ์คำค้นหาเพื่อค้นหาคำตอบที่คุณต้องการ
            </p>
          </animated.div>

          {/* Search Input */}
          <animated.div style={headerSpring} className="mb-8">
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="เช่น อิสลามกับความรุนแรง, สตรีในอิสลาม..."
                autoFocus
                className="w-full px-6 py-5 pl-14 text-lg rounded-2xl bg-surface border-2 border-transparent focus:border-primary shadow-lg outline-none transition-all"
              />
              <span className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl">
                🔍
              </span>
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors text-xl"
                >
                  ✕
                </button>
              )}
            </div>
          </animated.div>

          {/* Popular Searches (when no query) */}
          {!debouncedQuery && (
            <animated.div style={headerSpring} className="mb-12">
              <h2 className="text-sm font-medium text-muted mb-4 text-center">
                คำค้นหายอดนิยม
              </h2>
              <div className="flex flex-wrap justify-center gap-2">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-4 py-2 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors text-sm"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </animated.div>
          )}

          {/* Search Results */}
          {debouncedQuery && (
            <div>
              {/* Results count */}
              <div className="mb-6 flex items-center justify-between">
                <p className="text-muted">
                  พบ <span className="font-semibold text-foreground">{results.length}</span> ผลลัพธ์
                  สำหรับ &ldquo;<span className="text-primary">{debouncedQuery}</span>&rdquo;
                </p>
              </div>

              {/* Results list */}
              {results.length > 0 ? (
                <div className="space-y-4">
                  {results.map((topic, index) => (
                    <SearchResultCard
                      key={topic.id}
                      topic={topic}
                      index={index}
                      query={debouncedQuery}
                      isLoaded={isLoaded}
                    />
                  ))}
                </div>
              ) : (
                <NoResultsState query={debouncedQuery} />
              )}
            </div>
          )}

          {/* Browse categories (when no query) */}
          {!debouncedQuery && (
            <animated.div style={headerSpring}>
              <h2 className="text-lg font-semibold text-foreground mb-4 text-center">
                หรือเลือกตามหมวดหมู่
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {MOCK_CATEGORIES.filter((c) => c.isActive).map((category) => (
                  <Link key={category.id} href={`/categories/${category.slug}`}>
                    <AnimatedCard className="p-4 text-center" variant="bordered">
                      <span className="text-2xl mb-2 block">{category.icon}</span>
                      <span className="text-sm font-medium text-foreground">
                        {category.name}
                      </span>
                    </AnimatedCard>
                  </Link>
                ))}
              </div>
            </animated.div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}

// Search Result Card with highlighting and individual animation
function SearchResultCard({ 
  topic, 
  query,
  index,
  isLoaded
}: { 
  topic: Topic; 
  query: string;
  index: number;
  isLoaded: boolean;
}) {
  const spring = useSpring({
    opacity: isLoaded ? 1 : 0,
    y: isLoaded ? 0 : 20,
    delay: 100 + index * 30, // Shorter stagger for search results
    config: { tension: 200, friction: 25 },
  });

  const category = MOCK_CATEGORIES.find((c) => c.id === topic.categoryId);

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

  const severity = getSeverityBadge(topic.severityLevel);

  // Highlight matching text
  const highlightText = useCallback((text: string, maxLength = 200) => {
    const truncated = text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = truncated.split(regex);

    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="bg-yellow-200 dark:bg-yellow-800/50 text-foreground px-0.5 rounded">
          {part}
        </mark>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  }, [query]);

  return (
    <animated.div style={spring}>
      <Link href={`/topics/${topic.slug}`}>
        <AnimatedCard className="p-5" variant="bordered">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-3">
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
                {severity.label}
              </span>
            </div>
            {topic.isVerified && (
              <span className="text-primary flex-shrink-0" title="ได้รับการยืนยัน">
                ✓
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-semibold text-lg text-foreground mb-2">
            {highlightText(topic.title, 100)}
          </h3>

          {/* Short answer with highlight */}
          <p className="text-sm text-muted">
            {highlightText(topic.shortAnswer)}
          </p>

          {/* Matched tags */}
          {topic.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase())) && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {topic.tags
                .filter((tag) => tag.toLowerCase().includes(query.toLowerCase()))
                .map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-xs bg-primary/10 text-primary rounded"
                  >
                    #{tag}
                  </span>
                ))}
            </div>
          )}
        </AnimatedCard>
      </Link>
    </animated.div>
  );
}

// No Results State
function NoResultsState({ query }: { query: string }) {
  return (
    <div className="text-center py-12">
      <div className="text-6xl mb-4">🔍</div>
      <h3 className="text-xl font-semibold text-foreground mb-2">
        ไม่พบผลลัพธ์
      </h3>
      <p className="text-muted mb-6 max-w-md mx-auto">
        ไม่พบคำตอบที่ตรงกับ &ldquo;{query}&rdquo;
        <br />
        ลองใช้คำอื่นหรือตรวจสอบการสะกดคำ
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link href="/topics">
          <AnimatedButton variant="primary">ดูคำตอบทั้งหมด</AnimatedButton>
        </Link>
        <Link href="/categories">
          <AnimatedButton variant="outline">เลือกหมวดหมู่</AnimatedButton>
        </Link>
      </div>
    </div>
  );
}
