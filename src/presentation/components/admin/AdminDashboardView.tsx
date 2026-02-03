'use client';

/**
 * AdminDashboardView
 * Admin dashboard for managing the platform
 */

import { SITE_CONFIG } from '@/src/config/site.config';
import { UI_CONFIG } from '@/src/config/ui.config';
import { useAuthStore } from '@/src/infrastructure/stores/authStore';
import { AnimatedButton } from '@/src/presentation/components/animated/AnimatedButton';
import { AnimatedCard } from '@/src/presentation/components/animated/AnimatedCard';
import { AnimatedIslamicPattern } from '@/src/presentation/components/animated/AnimatedIslamicPattern';
import { MainLayout } from '@/src/presentation/layouts/MainLayout';
import { animated, useSpring } from '@react-spring/web';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// Mock stats data
const MOCK_STATS = {
  totalTopics: 156,
  totalCategories: 8,
  totalUsers: 1250,
  totalViews: 45600,
  pendingReviews: 12,
  newQuestions: 28,
};

// Mock recent activity
const MOCK_ACTIVITY = [
  { id: 1, type: 'topic', action: 'created', title: 'คำตอบใหม่ถูกสร้าง', user: 'ดร.อับดุลเลาะห์', time: '5 นาทีที่แล้ว' },
  { id: 2, type: 'user', action: 'registered', title: 'สมาชิกใหม่ลงทะเบียน', user: 'user123@gmail.com', time: '15 นาทีที่แล้ว' },
  { id: 3, type: 'question', action: 'submitted', title: 'คำถามใหม่ถูกส่งเข้ามา', user: 'ผู้ใช้งาน', time: '1 ชั่วโมงที่แล้ว' },
  { id: 4, type: 'topic', action: 'updated', title: 'คำตอบถูกแก้ไข', user: 'Admin', time: '2 ชั่วโมงที่แล้ว' },
];

// Mock pending reviews
const MOCK_PENDING = [
  { id: 1, title: 'ข้อกล่าวหาเรื่องความรุนแรง', author: 'ดร.มูฮัมหมัด', status: 'pending' },
  { id: 2, title: 'อิสลามกับสิทธิสตรี', author: 'อุสตาซ อาลี', status: 'pending' },
  { id: 3, title: 'เรื่องญิฮาด', author: 'ดร.อับดุลเลาะห์', status: 'review' },
];

export function AdminDashboardView() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();

  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState<'overview' | 'topics' | 'users' | 'questions' | 'settings'>('overview');

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Redirect if not admin
  useEffect(() => {
    if (isLoaded && (!isAuthenticated || user?.role !== 'admin')) {
      router.push('/');
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

  if (!isAuthenticated || user?.role !== 'admin') {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <span className="animate-spin text-4xl inline-block mb-4">⏳</span>
            <p className="text-muted">{UI_CONFIG.labels.checkingPermission}</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  const statCards = [
    { label: 'คำตอบทั้งหมด', value: MOCK_STATS.totalTopics, icon: '📚', color: 'from-primary to-primary-dark' },
    { label: 'หมวดหมู่', value: MOCK_STATS.totalCategories, icon: '📂', color: 'from-gold to-gold-dark' },
    { label: 'ผู้ใช้งาน', value: MOCK_STATS.totalUsers, icon: '👥', color: 'from-blue-500 to-blue-600' },
    { label: 'การเข้าชม', value: MOCK_STATS.totalViews, icon: '👁️', color: 'from-purple-500 to-purple-600' },
  ];

  const sidebarItems = [
    { id: 'overview', label: 'ภาพรวม', icon: '📊' },
    { id: 'topics', label: 'จัดการคำตอบ', icon: '📚' },
    { id: 'users', label: 'ผู้ใช้งาน', icon: '👥' },
    { id: 'questions', label: 'คำถามที่ส่งเข้ามา', icon: '❓', badge: MOCK_STATS.newQuestions },
    { id: 'settings', label: 'ตั้งค่า', icon: '⚙️' },
  ];

  return (
    <MainLayout>
      <div className="min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <animated.div style={headerSpring} className="mb-8">
            <div className="flex items-center gap-4">
              <AnimatedIslamicPattern type="octagon" size="md" color="primary" animation="pulse" />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                  ⚙️ {UI_CONFIG.labels.admin}
                </h1>
                <p className="text-muted">จัดการและดูแลระบบ {SITE_CONFIG.name}</p>
              </div>
            </div>
          </animated.div>

          <animated.div style={contentSpring}>
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Sidebar */}
              <div className="lg:w-64 flex-shrink-0">
                <AnimatedCard className="p-2" variant="bordered">
                  <nav className="space-y-1">
                    {sidebarItems.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setActiveSection(item.id as typeof activeSection)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                          activeSection === item.id
                            ? 'bg-primary/10 text-primary'
                            : 'text-foreground hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <span>{item.icon}</span>
                          <span>{item.label}</span>
                        </span>
                        {item.badge && (
                          <span className="px-2 py-0.5 text-xs bg-red-500 text-white rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </button>
                    ))}
                  </nav>
                </AnimatedCard>
              </div>

              {/* Main Content */}
              <div className="flex-1">
                {activeSection === 'overview' && (
                  <div className="space-y-6">
                    {/* Stats Grid */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {statCards.map((stat, index) => (
                        <AnimatedCard key={stat.label} className="p-4" variant="elevated">
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                              <span className="text-2xl">{stat.icon}</span>
                            </div>
                            <div>
                              <p className="text-2xl font-bold text-foreground">
                                {stat.value.toLocaleString()}
                              </p>
                              <p className="text-sm text-muted">{stat.label}</p>
                            </div>
                          </div>
                        </AnimatedCard>
                      ))}
                    </div>

                    {/* Quick Actions */}
                    <AnimatedCard className="p-6" variant="bordered">
                      <h3 className="font-semibold text-foreground mb-4">⚡ การดำเนินการด่วน</h3>
                      <div className="grid sm:grid-cols-3 gap-3">
                        <Link href="/contribute">
                          <AnimatedButton variant="primary" className="w-full">
                            ➕ เพิ่มคำตอบใหม่
                          </AnimatedButton>
                        </Link>
                        <AnimatedButton variant="outline" className="w-full">
                          📝 ตรวจสอบแบบร่าง ({MOCK_STATS.pendingReviews})
                        </AnimatedButton>
                        <AnimatedButton variant="outline" className="w-full">
                          ❓ ดูคำถามใหม่ ({MOCK_STATS.newQuestions})
                        </AnimatedButton>
                      </div>
                    </AnimatedCard>

                    {/* Pending Reviews */}
                    <AnimatedCard className="p-6" variant="bordered">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-foreground">📋 รอการตรวจสอบ</h3>
                        <span className="text-sm text-muted">ดูทั้งหมด →</span>
                      </div>
                      <div className="space-y-3">
                        {MOCK_PENDING.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50"
                          >
                            <div>
                              <p className="font-medium text-foreground">{item.title}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">โดย: {item.author}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                item.status === 'pending'
                                  ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                                  : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                              }`}>
                                {item.status === 'pending' ? 'รอดำเนินการ' : 'กำลังตรวจสอบ'}
                              </span>
                              <AnimatedButton variant="ghost" size="sm">
                                ดู
                              </AnimatedButton>
                            </div>
                          </div>
                        ))}
                      </div>
                    </AnimatedCard>

                    {/* Recent Activity */}
                    <AnimatedCard className="p-6" variant="bordered">
                      <h3 className="font-semibold text-foreground mb-4">🕐 กิจกรรมล่าสุด</h3>
                      <div className="space-y-3">
                        {MOCK_ACTIVITY.map((activity) => (
                          <div
                            key={activity.id}
                            className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                          >
                            <span className="text-xl">
                              {activity.type === 'topic' ? '📚' : activity.type === 'user' ? '👤' : '❓'}
                            </span>
                            <div className="flex-1">
                              <p className="text-foreground">{activity.title}</p>
                               <p className="text-sm text-gray-600 dark:text-gray-400">{activity.user}</p>
                            </div>
                            <span className="text-xs text-gray-600 dark:text-gray-400">{activity.time}</span>
                          </div>
                        ))}
                      </div>
                    </AnimatedCard>
                  </div>
                )}

                {activeSection === 'topics' && (
                  <AnimatedCard className="p-6" variant="bordered">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-foreground">📚 จัดการคำตอบ</h3>
                      <Link href="/contribute">
                        <AnimatedButton variant="primary" size="sm">
                          ➕ เพิ่มใหม่
                        </AnimatedButton>
                      </Link>
                    </div>
                    <div className="space-y-4">
                      {[
                        { title: 'เรื่องการแต่งงานของท่านนบี', category: 'ศาสดา', views: 1250, status: 'published' },
                        { title: 'สตรีในอิสลาม', category: 'สตรี', views: 890, status: 'published' },
                        { title: 'อิสลามกับวิทยาศาสตร์', category: 'วิทยาศาสตร์', views: 720, status: 'published' },
                      ].map((topic, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 rounded-xl border border-border">
                          <div>
                            <p className="font-medium text-foreground">{topic.title}</p>
                            <p className="text-sm text-muted">{topic.category} • 👁️ {topic.views}</p>
                          </div>
                          <div className="flex gap-2">
                            <AnimatedButton variant="ghost" size="sm">แก้ไข</AnimatedButton>
                            <AnimatedButton variant="ghost" size="sm" className="text-red-500">ลบ</AnimatedButton>
                          </div>
                        </div>
                      ))}
                    </div>
                  </AnimatedCard>
                )}

                {activeSection === 'users' && (
                  <AnimatedCard className="p-6" variant="bordered">
                    <h3 className="text-lg font-semibold text-foreground mb-6">👥 ผู้ใช้งาน</h3>
                    <div className="space-y-4">
                      {[
                        { name: 'ผู้ดูแลระบบ', email: 'cleancode1986@gmail.com', role: 'admin', status: 'active' },
                        { name: 'ดร.อับดุลเลาะห์', email: 'scholar@cleancode1986.com', role: 'scholar', status: 'active' },
                        { name: 'ผู้ใช้ทั่วไป', email: 'user@example.com', role: 'user', status: 'active' },
                      ].map((u, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 rounded-xl border border-border">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
                              <span className="text-white font-medium">{u.name.charAt(0)}</span>
                            </div>
                            <div>
                              <p className="font-medium text-foreground">{u.name}</p>
                              <p className="text-sm text-muted">{u.email}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              u.role === 'admin' 
                                ? 'bg-red-100 text-red-700' 
                                : u.role === 'scholar' 
                                  ? 'bg-gold/20 text-gold-dark' 
                                  : 'bg-primary/10 text-primary'
                            }`}>
                              {u.role === 'admin' ? 'ผู้ดูแล' : u.role === 'scholar' ? 'นักวิชาการ' : 'สมาชิก'}
                            </span>
                            <AnimatedButton variant="ghost" size="sm">จัดการ</AnimatedButton>
                          </div>
                        </div>
                      ))}
                    </div>
                  </AnimatedCard>
                )}

                {activeSection === 'questions' && (
                  <AnimatedCard className="p-6" variant="bordered">
                    <h3 className="text-lg font-semibold text-foreground mb-6">❓ คำถามที่ส่งเข้ามา</h3>
                    <div className="space-y-4">
                      {[
                        { question: 'ทำไมอิสลามจึง...?', from: 'ผู้ใช้ A', date: '2024-01-20' },
                        { question: 'เรื่องการบังคับให้นับถือศาสนา', from: 'ผู้ใช้ B', date: '2024-01-19' },
                        { question: 'อิสลามกับสิทธิมนุษยชน', from: 'ผู้ใช้ C', date: '2024-01-18' },
                      ].map((q, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 rounded-xl border border-border">
                          <div>
                            <p className="font-medium text-foreground">{q.question}</p>
                            <p className="text-sm text-muted">จาก: {q.from} • {q.date}</p>
                          </div>
                          <div className="flex gap-2">
                            <AnimatedButton variant="primary" size="sm">ตอบ</AnimatedButton>
                            <AnimatedButton variant="ghost" size="sm">ละเว้น</AnimatedButton>
                          </div>
                        </div>
                      ))}
                    </div>
                  </AnimatedCard>
                )}

                {activeSection === 'settings' && (
                  <AnimatedCard className="p-6" variant="bordered">
                    <h3 className="text-lg font-semibold text-foreground mb-6">⚙️ ตั้งค่าระบบ</h3>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          ชื่อเว็บไซต์
                        </label>
                        <input
                          type="text"
                          defaultValue={SITE_CONFIG.name}
                          className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          คำอธิบาย
                        </label>
                        <textarea
                          rows={3}
                          defaultValue={SITE_CONFIG.description}
                          className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                        />
                      </div>
                      <div className="flex items-center justify-between p-4 rounded-xl border border-border">
                        <div>
                          <p className="font-medium text-foreground">โหมดบำรุงรักษา</p>
                          <p className="text-sm text-muted">ปิดการเข้าถึงเว็บไซต์ชั่วคราว</p>
                        </div>
                        <button className="w-12 h-6 rounded-full bg-gray-200 dark:bg-gray-700 relative transition-colors">
                          <span className="absolute left-1 top-1 w-4 h-4 rounded-full bg-white shadow transition-transform" />
                        </button>
                      </div>
                      <AnimatedButton variant="primary">
                        บันทึกการตั้งค่า
                      </AnimatedButton>
                    </div>
                  </AnimatedCard>
                )}
              </div>
            </div>
          </animated.div>
        </div>
      </div>
    </MainLayout>
  );
}
