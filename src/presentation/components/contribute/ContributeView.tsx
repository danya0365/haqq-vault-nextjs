'use client';

/**
 * ContributeView
 * Page for scholars/admins to contribute new topics
 */

import { useAuthStore } from '@/src/infrastructure/stores/authStore';
import { AnimatedButton } from '@/src/presentation/components/animated/AnimatedButton';
import { AnimatedCard } from '@/src/presentation/components/animated/AnimatedCard';
import { AnimatedIslamicPattern } from '@/src/presentation/components/animated/AnimatedIslamicPattern';
import { MainLayout } from '@/src/presentation/layouts/MainLayout';
import { animated, useSpring } from '@react-spring/web';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const CATEGORIES = [
  { id: 'quran', label: 'อัลกุรอาน' },
  { id: 'hadith', label: 'หะดีษ' },
  { id: 'prophet', label: 'ศาสดา' },
  { id: 'women', label: 'สตรีในอิสลาม' },
  { id: 'science', label: 'วิทยาศาสตร์' },
  { id: 'history', label: 'ประวัติศาสตร์' },
  { id: 'law', label: 'กฎหมายอิสลาม' },
  { id: 'other', label: 'อื่นๆ' },
];

const SEVERITY_LEVELS = [
  { id: 'low', label: 'ต่ำ', color: 'bg-green-100 text-green-700' },
  { id: 'medium', label: 'ปานกลาง', color: 'bg-yellow-100 text-yellow-700' },
  { id: 'high', label: 'สูง', color: 'bg-orange-100 text-orange-700' },
  { id: 'critical', label: 'วิกฤต', color: 'bg-red-100 text-red-700' },
];

export function ContributeView() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();

  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState<'new' | 'drafts' | 'published'>('new');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    titleArabic: '',
    claim: '',
    shortAnswer: '',
    detailedAnswer: '',
    category: '',
    severity: 'medium',
    sources: '',
    tags: '',
  });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Redirect if not authorized
  useEffect(() => {
    if (isLoaded && (!isAuthenticated || (user?.role !== 'scholar' && user?.role !== 'admin'))) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, user, isLoaded, router]);

  const headerSpring = useSpring({
    opacity: isLoaded ? 1 : 0,
    y: isLoaded ? 0 : 20,
    config: { tension: 200, friction: 20 },
  });

  const contentSpring = useSpring({
    opacity: isLoaded ? 1 : 0,
    y: isLoaded ? 0 : 30,
    config: { tension: 200, friction: 25 },
    delay: 150,
  });

  const handleSubmit = async (e: React.FormEvent, isDraft = false) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setShowSuccess(true);
    
    // Reset form after short delay
    setTimeout(() => {
      setShowSuccess(false);
      setFormData({
        title: '',
        titleArabic: '',
        claim: '',
        shortAnswer: '',
        detailedAnswer: '',
        category: '',
        severity: 'medium',
        sources: '',
        tags: '',
      });
    }, 3000);
  };

  // Mock drafts data
  const drafts = [
    { id: 1, title: 'อิสลามกับความเท่าเทียม', updatedAt: '2024-01-15' },
    { id: 2, title: 'ข้อกล่าวหาเรื่อง...', updatedAt: '2024-01-10' },
  ];

  // Mock published data
  const published = [
    { id: 1, title: 'เรื่องการแต่งงานของท่านนบี', views: 1250, status: 'published' },
    { id: 2, title: 'สตรีในอิสลาม', views: 890, status: 'published' },
  ];

  if (!isAuthenticated || (user?.role !== 'scholar' && user?.role !== 'admin')) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <span className="animate-spin text-4xl inline-block mb-4">⏳</span>
            <p className="text-muted">กำลังตรวจสอบสิทธิ์...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="min-h-screen py-8 md:py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <animated.div style={headerSpring} className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <AnimatedIslamicPattern type="star" size="md" color="primary" animation="pulse" />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                  ✍️ เพิ่มคำตอบใหม่
                </h1>
                <p className="text-muted">สร้างเนื้อหาสำหรับ Haqq Vault</p>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 border-b border-border">
              {[
                { id: 'new', label: 'สร้างใหม่', icon: '➕' },
                { id: 'drafts', label: 'แบบร่าง', icon: '📝', count: drafts.length },
                { id: 'published', label: 'เผยแพร่แล้ว', icon: '✅', count: published.length },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted hover:text-foreground'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                  {tab.count !== undefined && (
                    <span className="px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary">
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </animated.div>

          <animated.div style={contentSpring}>
            {/* New Topic Form */}
            {activeTab === 'new' && (
              <AnimatedCard className="p-6 md:p-8" variant="elevated">
                {showSuccess ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🎉</div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      บันทึกสำเร็จ!
                    </h3>
                    <p className="text-muted">
                      คำตอบของคุณถูกบันทึกเรียบร้อยแล้ว
                    </p>
                  </div>
                ) : (
                  <form onSubmit={(e) => handleSubmit(e)} className="space-y-6">
                    {/* Title */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          หัวข้อ (ภาษาไทย) *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                          placeholder="เช่น: เรื่องการแต่งงานของท่านนบี"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          หัวข้อ (ภาษาอาหรับ)
                        </label>
                        <input
                          type="text"
                          value={formData.titleArabic}
                          onChange={(e) => setFormData({ ...formData, titleArabic: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-right"
                          placeholder="عنوان بالعربية"
                          dir="rtl"
                        />
                      </div>
                    </div>

                    {/* Claim */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        ข้อกล่าวหา / คำถาม *
                      </label>
                      <textarea
                        required
                        rows={2}
                        value={formData.claim}
                        onChange={(e) => setFormData({ ...formData, claim: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                        placeholder="ระบุข้อกล่าวหาหรือคำถามที่ต้องการตอบ"
                      />
                    </div>

                    {/* Category & Severity */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          หมวดหมู่ *
                        </label>
                        <select
                          required
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        >
                          <option value="">เลือกหมวดหมู่</option>
                          {CATEGORIES.map((cat) => (
                            <option key={cat.id} value={cat.id}>{cat.label}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          ระดับความสำคัญ
                        </label>
                        <div className="flex gap-2">
                          {SEVERITY_LEVELS.map((level) => (
                            <button
                              key={level.id}
                              type="button"
                              onClick={() => setFormData({ ...formData, severity: level.id })}
                              className={`flex-1 px-3 py-2 text-xs font-medium rounded-lg transition-all ${
                                formData.severity === level.id
                                  ? level.color + ' ring-2 ring-offset-2 ring-current'
                                  : 'bg-gray-100 dark:bg-gray-800 text-muted hover:bg-gray-200'
                              }`}
                            >
                              {level.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Short Answer */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        คำตอบสั้น *
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={formData.shortAnswer}
                        onChange={(e) => setFormData({ ...formData, shortAnswer: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                        placeholder="สรุปคำตอบสั้นๆ ประมาณ 2-3 ประโยค"
                      />
                    </div>

                    {/* Detailed Answer */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        คำตอบเชิงลึก *
                      </label>
                      <textarea
                        required
                        rows={8}
                        value={formData.detailedAnswer}
                        onChange={(e) => setFormData({ ...formData, detailedAnswer: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                        placeholder="อธิบายอย่างละเอียดพร้อมหลักฐาน (รองรับ Markdown)"
                      />
                      <p className="text-xs text-muted mt-1">รองรับ Markdown สำหรับการจัดรูปแบบ</p>
                    </div>

                    {/* Sources */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        แหล่งอ้างอิง
                      </label>
                      <textarea
                        rows={3}
                        value={formData.sources}
                        onChange={(e) => setFormData({ ...formData, sources: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                        placeholder="ระบุแหล่งอ้างอิง แต่ละแหล่งขึ้นบรรทัดใหม่&#10;เช่น: صحيح البخاري، كتاب..."
                      />
                    </div>

                    {/* Tags */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        แท็ก
                      </label>
                      <input
                        type="text"
                        value={formData.tags}
                        onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        placeholder="คั่นด้วยเครื่องหมายจุลภาค เช่น: ท่านนบี, การแต่งงาน, หะดีษ"
                      />
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
                      <AnimatedButton
                        type="submit"
                        variant="primary"
                        size="lg"
                        disabled={isSubmitting}
                        className="flex-1"
                      >
                        {isSubmitting ? '⏳ กำลังบันทึก...' : '✅ เผยแพร่'}
                      </AnimatedButton>
                      <AnimatedButton
                        type="button"
                        variant="outline"
                        size="lg"
                        onClick={(e) => handleSubmit(e, true)}
                        disabled={isSubmitting}
                      >
                        📝 บันทึกเป็นแบบร่าง
                      </AnimatedButton>
                    </div>
                  </form>
                )}
              </AnimatedCard>
            )}

            {/* Drafts Tab */}
            {activeTab === 'drafts' && (
              <div className="space-y-4">
                {drafts.length === 0 ? (
                  <AnimatedCard className="p-12 text-center" variant="bordered">
                    <span className="text-4xl mb-4 block">📝</span>
                    <p className="text-muted">ยังไม่มีแบบร่าง</p>
                  </AnimatedCard>
                ) : (
                  drafts.map((draft) => (
                    <AnimatedCard key={draft.id} className="p-4" variant="bordered">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-foreground">{draft.title}</h3>
                          <p className="text-sm text-muted">แก้ไขล่าสุด: {draft.updatedAt}</p>
                        </div>
                        <div className="flex gap-2">
                          <AnimatedButton variant="ghost" size="sm">
                            แก้ไข
                          </AnimatedButton>
                          <AnimatedButton variant="ghost" size="sm" className="text-red-500">
                            ลบ
                          </AnimatedButton>
                        </div>
                      </div>
                    </AnimatedCard>
                  ))
                )}
              </div>
            )}

            {/* Published Tab */}
            {activeTab === 'published' && (
              <div className="space-y-4">
                {published.length === 0 ? (
                  <AnimatedCard className="p-12 text-center" variant="bordered">
                    <span className="text-4xl mb-4 block">📚</span>
                    <p className="text-muted">ยังไม่มีคำตอบที่เผยแพร่</p>
                  </AnimatedCard>
                ) : (
                  published.map((item) => (
                    <AnimatedCard key={item.id} className="p-4" variant="bordered">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-foreground">{item.title}</h3>
                          <p className="text-sm text-muted">👁️ {item.views.toLocaleString()} views</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-full">
                            เผยแพร่แล้ว
                          </span>
                          <AnimatedButton variant="ghost" size="sm">
                            แก้ไข
                          </AnimatedButton>
                        </div>
                      </div>
                    </AnimatedCard>
                  ))
                )}
              </div>
            )}
          </animated.div>
        </div>
      </div>
    </MainLayout>
  );
}
