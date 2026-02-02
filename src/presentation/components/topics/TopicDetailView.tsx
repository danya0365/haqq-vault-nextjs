'use client';

/**
 * TopicDetailView
 * Topic detail page showing full answer with evidences
 */

import type { Evidence } from '@/src/domain/types/evidence';
import type { SeverityLevel, Topic } from '@/src/domain/types/topic';
import { MOCK_CATEGORIES, MOCK_EVIDENCES, MOCK_TOPICS } from '@/src/infrastructure/repositories/mock/data/mockData';
import { AnimatedButton } from '@/src/presentation/components/animated/AnimatedButton';
import { AnimatedCard } from '@/src/presentation/components/animated/AnimatedCard';
import { AnimatedIslamicPattern } from '@/src/presentation/components/animated/AnimatedIslamicPattern';
import { MainLayout } from '@/src/presentation/layouts/MainLayout';
import { animated, useSpring } from '@react-spring/web';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface TopicDetailViewProps {
  slug: string;
}

export function TopicDetailView({ slug }: TopicDetailViewProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState<'answer' | 'evidence'>('answer');

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Find topic by slug
  const topic = MOCK_TOPICS.find((t) => t.slug === slug);
  const category = topic ? MOCK_CATEGORIES.find((c) => c.id === topic.categoryId) : null;
  const evidences = topic ? MOCK_EVIDENCES.filter((e) => e.topicId === topic.id) : [];

  // Related topics (same category, excluding current)
  const relatedTopics = topic
    ? MOCK_TOPICS.filter(
        (t) => t.categoryId === topic.categoryId && t.id !== topic.id && t.status === 'published'
      ).slice(0, 3)
    : [];

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

  if (!topic) {
    return <NotFoundState />;
  }

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
    <MainLayout>
      <article className="min-h-screen py-8 md:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <animated.nav style={headerSpring} className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-muted">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  หน้าแรก
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link href="/topics" className="hover:text-primary transition-colors">
                  คำตอบทั้งหมด
                </Link>
              </li>
              {category && (
                <>
                  <li>/</li>
                  <li>
                    <Link
                      href={`/categories/${category.slug}`}
                      className="hover:text-primary transition-colors"
                    >
                      {category.name}
                    </Link>
                  </li>
                </>
              )}
            </ol>
          </animated.nav>

          {/* Header */}
          <animated.header style={headerSpring} className="mb-8">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {category && (
                <span
                  className="px-3 py-1 text-sm rounded-full"
                  style={{
                    backgroundColor: `${category.color}15`,
                    color: category.color,
                  }}
                >
                  {category.icon} {category.name}
                </span>
              )}
              <span className={`px-3 py-1 text-sm font-medium rounded-full ${severity.class}`}>
                {severity.icon} {severity.label}
              </span>
              {topic.isVerified && (
                <span className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary flex items-center gap-1">
                  <span>✓</span> ได้รับการยืนยัน
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3">
              {topic.title}
            </h1>

            {/* Arabic title */}
            {topic.titleArabic && (
              <p className="arabic-text text-xl md:text-2xl text-muted mb-4">
                {topic.titleArabic}
              </p>
            )}

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
              <span className="flex items-center gap-1">
                <span>👁</span>
                {topic.viewCount.toLocaleString()} เข้าชม
              </span>
              <span className="flex items-center gap-1">
                <span>📅</span>
                {new Date(topic.createdAt).toLocaleDateString('th-TH', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
          </animated.header>

          {/* Claim Box */}
          <animated.div style={contentSpring}>
            <div className="relative bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-r-xl p-5 mb-8">
              <div className="absolute -left-3 top-4 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">❓</span>
              </div>
              <h2 className="font-semibold text-red-700 dark:text-red-400 mb-2">
                ข้อกล่าวหา / ชุบฮาต
              </h2>
              <p className="text-red-800 dark:text-red-300">{topic.claim}</p>
            </div>
          </animated.div>

          {/* Section Tabs */}
          <animated.div style={contentSpring} className="flex gap-2 mb-6">
            <button
              onClick={() => setActiveSection('answer')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeSection === 'answer'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-muted hover:text-foreground'
              }`}
            >
              📖 คำตอบ
            </button>
            <button
              onClick={() => setActiveSection('evidence')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeSection === 'evidence'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-muted hover:text-foreground'
              }`}
            >
              📜 หลักฐาน ({evidences.length})
            </button>
          </animated.div>

          {/* Content */}
          <animated.div style={contentSpring}>
            {activeSection === 'answer' ? (
              <AnswerSection topic={topic} />
            ) : (
              <EvidenceSection evidences={evidences} />
            )}
          </animated.div>

          {/* Tags */}
          <animated.div style={contentSpring} className="mt-8 pt-8 border-t border-border">
            <h3 className="text-sm font-semibold text-muted mb-3">แท็ก</h3>
            <div className="flex flex-wrap gap-2">
              {topic.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/topics?search=${encodeURIComponent(tag)}`}
                  className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-muted hover:text-primary hover:bg-primary/10 rounded-lg text-sm transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </animated.div>

          {/* Related Topics */}
          {relatedTopics.length > 0 && (
            <animated.section style={contentSpring} className="mt-12">
              <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                <span>📚</span> คำตอบที่เกี่ยวข้อง
              </h2>
              <div className="grid gap-4">
                {relatedTopics.map((related) => (
                  <Link key={related.id} href={`/topics/${related.slug}`}>
                    <AnimatedCard className="p-4" variant="bordered">
                      <h3 className="font-medium text-foreground hover:text-primary transition-colors">
                        {related.title}
                      </h3>
                      <p className="text-sm text-muted line-clamp-2 mt-1">
                        {related.shortAnswer}
                      </p>
                    </AnimatedCard>
                  </Link>
                ))}
              </div>
            </animated.section>
          )}

          {/* Back to Topics */}
          <div className="mt-12 text-center">
            <Link href="/topics">
              <AnimatedButton variant="outline" startIcon={<span>←</span>}>
                กลับไปดูคำตอบทั้งหมด
              </AnimatedButton>
            </Link>
          </div>
        </div>
      </article>
    </MainLayout>
  );
}

// Answer Section
function AnswerSection({ topic }: { topic: Topic }) {
  return (
    <div className="space-y-8">
      {/* Short Answer */}
      <div className="bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-2xl p-6">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
            <span className="text-lg">💡</span>
          </div>
          <div>
            <h2 className="font-semibold text-primary mb-2">คำตอบสรุป</h2>
            <p className="text-foreground leading-relaxed">{topic.shortAnswer}</p>
          </div>
        </div>
      </div>

      {/* Detailed Explanation */}
      <div className="bg-surface dark:bg-surface border border-border rounded-2xl p-6 md:p-8">
        <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
          <span>📝</span> คำอธิบายเชิงลึก
        </h2>
        <div className="prose prose-lg dark:prose-invert max-w-none">
          {/* Render markdown-like content */}
          {topic.detailedExplanation.split('\n').map((line, index) => {
            if (line.startsWith('## ')) {
              return (
                <h2 key={index} className="text-xl font-bold text-foreground mt-6 mb-3">
                  {line.replace('## ', '')}
                </h2>
              );
            }
            if (line.startsWith('### ')) {
              return (
                <h3 key={index} className="text-lg font-semibold text-foreground mt-4 mb-2">
                  {line.replace('### ', '')}
                </h3>
              );
            }
            if (line.startsWith('- ')) {
              return (
                <li key={index} className="text-muted-dark dark:text-muted ml-4">
                  {line.replace('- ', '')}
                </li>
              );
            }
            if (line.trim() === '') {
              return <br key={index} />;
            }
            return (
              <p key={index} className="text-muted-dark dark:text-muted leading-relaxed mb-3">
                {line}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Evidence Section
function EvidenceSection({ evidences }: { evidences: Evidence[] }) {
  const getEvidenceStyle = (type: Evidence['type']) => {
    switch (type) {
      case 'quran':
        return { icon: '📖', bg: 'bg-emerald-50 dark:bg-emerald-900/20', border: 'border-emerald-500' };
      case 'hadith':
        return { icon: '📜', bg: 'bg-amber-50 dark:bg-amber-900/20', border: 'border-amber-500' };
      case 'scholarly':
        return { icon: '🎓', bg: 'bg-blue-50 dark:bg-blue-900/20', border: 'border-blue-500' };
      case 'historical':
        return { icon: '🏛️', bg: 'bg-purple-50 dark:bg-purple-900/20', border: 'border-purple-500' };
      case 'scientific':
        return { icon: '🔬', bg: 'bg-cyan-50 dark:bg-cyan-900/20', border: 'border-cyan-500' };
      default:
        return { icon: '📄', bg: 'bg-gray-50 dark:bg-gray-800', border: 'border-gray-300' };
    }
  };

  if (evidences.length === 0) {
    return (
      <div className="text-center py-12">
        <AnimatedIslamicPattern type="star" size="lg" color="gold" className="mx-auto mb-4 opacity-50" />
        <p className="text-muted">ยังไม่มีหลักฐานที่เพิ่มเข้ามา</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {evidences.map((evidence) => {
        const style = getEvidenceStyle(evidence.type);
        return (
          <div
            key={evidence.id}
            className={`${style.bg} border-l-4 ${style.border} rounded-r-xl p-5`}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">{style.icon}</span>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">{evidence.title}</h3>
                
                {/* Arabic content */}
                {evidence.contentArabic && (
                  <p className="arabic-text text-lg text-foreground mb-2 leading-relaxed">
                    {evidence.contentArabic}
                  </p>
                )}
                
                {/* Translation/Content */}
                <p className="text-muted-dark dark:text-muted mb-3 leading-relaxed">
                  {evidence.content}
                </p>
                
                {/* Source */}
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium text-muted">แหล่งอ้างอิง:</span>
                  <span className="text-primary">{evidence.source}</span>
                  {evidence.isAuthenticated && (
                    <span className="text-green-600 dark:text-green-400" title="ตรวจสอบแล้ว">
                      ✓
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Not Found State
function NotFoundState() {
  return (
    <MainLayout>
      <div className="min-h-screen flex items-center justify-center py-16">
        <div className="text-center">
          <AnimatedIslamicPattern type="star" size="lg" color="gold" className="mx-auto mb-6 opacity-50" />
          <h1 className="text-2xl font-bold text-foreground mb-2">ไม่พบคำตอบ</h1>
          <p className="text-muted mb-6">คำตอบที่คุณกำลังหาอาจถูกลบหรือไม่มีในระบบ</p>
          <Link href="/topics">
            <AnimatedButton variant="primary">ดูคำตอบทั้งหมด</AnimatedButton>
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}
