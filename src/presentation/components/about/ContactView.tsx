'use client';

/**
 * ContactView
 * Contact page with form and information
 */

import { AnimatedButton } from '@/src/presentation/components/animated/AnimatedButton';
import { AnimatedCard } from '@/src/presentation/components/animated/AnimatedCard';
import { AnimatedIslamicPattern } from '@/src/presentation/components/animated/AnimatedIslamicPattern';
import { MainLayout } from '@/src/presentation/layouts/MainLayout';
import { animated, useSpring } from '@react-spring/web';
import { useEffect, useState } from 'react';

export function ContactView() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactMethods = [
    {
      icon: '📧',
      title: 'อีเมล',
      value: 'contact@haqqvault.com',
      href: 'mailto:contact@haqqvault.com',
    },
    {
      icon: '💬',
      title: 'Facebook',
      value: 'Haqq Vault',
      href: '#',
    },
    {
      icon: '📱',
      title: 'Twitter / X',
      value: '@HaqqVault',
      href: '#',
    },
  ];

  return (
    <MainLayout>
      <div className="min-h-screen py-8 md:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <animated.div style={headerSpring} className="text-center mb-12">
            <div className="inline-flex items-center justify-center mb-6">
              <AnimatedIslamicPattern type="arabesque" size="md" color="primary" animation="float" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              💬 ติดต่อเรา
            </h1>
            <p className="text-muted max-w-2xl mx-auto text-lg">
              มีคำถาม ข้อเสนอแนะ หรือต้องการส่งคำถามใหม่? ติดต่อเราได้ที่นี่
            </p>
          </animated.div>

          <animated.div style={contentSpring}>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <AnimatedCard className="p-6 md:p-8" variant="elevated">
                  {isSubmitted ? (
                    <div className="text-center py-12">
                      <div className="text-6xl mb-4">✅</div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">
                        ส่งข้อความสำเร็จ!
                      </h3>
                      <p className="text-muted mb-6">
                        ขอบคุณที่ติดต่อเรา เราจะตอบกลับโดยเร็วที่สุด
                      </p>
                      <AnimatedButton
                        variant="outline"
                        onClick={() => setIsSubmitted(false)}
                      >
                        ส่งข้อความอีกครั้ง
                      </AnimatedButton>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <h2 className="text-xl font-bold text-foreground mb-4">
                        ส่งข้อความถึงเรา
                      </h2>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            ชื่อ *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                            placeholder="ชื่อของคุณ"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            อีเมล *
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({ ...formData, email: e.target.value })
                            }
                            className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                            placeholder="email@example.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          หัวข้อ *
                        </label>
                        <select
                          required
                          value={formData.subject}
                          onChange={(e) =>
                            setFormData({ ...formData, subject: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        >
                          <option value="">เลือกหัวข้อ</option>
                          <option value="question">ส่งคำถามใหม่</option>
                          <option value="correction">แจ้งข้อผิดพลาด</option>
                          <option value="suggestion">ข้อเสนอแนะ</option>
                          <option value="collaboration">ร่วมมือกับเรา</option>
                          <option value="other">อื่นๆ</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          ข้อความ *
                        </label>
                        <textarea
                          required
                          rows={5}
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({ ...formData, message: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                          placeholder="รายละเอียดข้อความของคุณ..."
                        />
                      </div>

                      <AnimatedButton
                        type="submit"
                        variant="primary"
                        size="lg"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'กำลังส่ง...' : 'ส่งข้อความ'}
                      </AnimatedButton>
                    </form>
                  )}
                </AnimatedCard>
              </div>

              {/* Contact Info */}
              <div className="space-y-6">
                <AnimatedCard className="p-6" variant="bordered">
                  <h3 className="font-semibold text-foreground mb-4">
                    ช่องทางติดต่อ
                  </h3>
                  <div className="space-y-4">
                    {contactMethods.map((method) => (
                      <a
                        key={method.title}
                        href={method.href}
                        className="flex items-center gap-3 text-muted hover:text-primary transition-colors"
                      >
                        <span className="text-xl">{method.icon}</span>
                        <div>
                          <div className="text-xs text-muted">{method.title}</div>
                          <div className="text-sm font-medium text-foreground">
                            {method.value}
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </AnimatedCard>

                <AnimatedCard className="p-6" variant="bordered">
                  <h3 className="font-semibold text-foreground mb-4">
                    ส่งคำถามใหม่
                  </h3>
                  <p className="text-sm text-muted mb-4">
                    หากคุณมีคำถามหรือพบข้อกล่าวหาที่ยังไม่มีคำตอบ สามารถส่งให้เราพิจารณาได้
                  </p>
                  <ul className="text-sm text-muted space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>ระบุคำถามหรือข้อกล่าวหาให้ชัดเจน</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>แนบแหล่งที่มา (ถ้ามี)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>เราจะพิจารณาและตอบกลับ</span>
                    </li>
                  </ul>
                </AnimatedCard>

                {/* Arabic Quote */}
                <div className="text-center p-6 bg-primary/5 dark:bg-primary/10 rounded-xl border border-primary/20">
                  <p className="arabic-text text-lg text-primary mb-2">
                    ادْعُ إِلَى سَبِيلِ رَبِّكَ بِالْحِكْمَةِ وَالْمَوْعِظَةِ الْحَسَنَةِ
                  </p>
                  <p className="text-xs text-muted italic">
                    "จงเชิญชวนสู่ทางของพระผู้อภิบาลของเจ้าด้วยวิทยปัญญาและการตักเตือนที่ดี"
                  </p>
                  <p className="text-xs text-muted mt-1">- ซูเราะฮ์อันนะฮ์ล 16:125</p>
                </div>
              </div>
            </div>
          </animated.div>
        </div>
      </div>
    </MainLayout>
  );
}
