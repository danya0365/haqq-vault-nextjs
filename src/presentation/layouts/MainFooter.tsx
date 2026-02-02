'use client';

/**
 * MainFooter
 * Footer with Islamic-themed design and decorative elements
 */

import { animated, useSpring } from '@react-spring/web';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface FooterLink {
  href: string;
  label: string;
}

const FOOTER_SECTIONS = {
  browse: {
    title: 'ค้นหาคำตอบ',
    links: [
      { href: '/topics', label: 'คำตอบทั้งหมด' },
      { href: '/categories', label: 'หมวดหมู่' },
      { href: '/search', label: 'ค้นหา' },
      { href: '/popular', label: 'ยอดนิยม' },
    ],
  },
  categories: {
    title: 'หมวดหมู่หลัก',
    links: [
      { href: '/categories/quran', label: 'อัลกุรอาน' },
      { href: '/categories/prophet', label: 'ศาสดามุฮัมมัด ﷺ' },
      { href: '/categories/women', label: 'สตรีในอิสลาม' },
      { href: '/categories/science', label: 'วิทยาศาสตร์' },
    ],
  },
  about: {
    title: 'เกี่ยวกับเรา',
    links: [
      { href: '/about', label: 'เกี่ยวกับ Haqq Vault' },
      { href: '/scholars', label: 'ทีมนักวิชาการ' },
      { href: '/methodology', label: 'หลักการตอบคำถาม' },
      { href: '/contact', label: 'ติดต่อเรา' },
    ],
  },
};

export function MainFooter() {
  return (
    <footer className="relative overflow-hidden">
      {/* Islamic Pattern Background */}
      <div className="absolute inset-0 islamic-pattern opacity-50" />
      
      {/* Decorative top border */}
      <div className="h-1 bg-gradient-to-r from-primary via-gold to-primary" />

      <div className="relative bg-surface/80 backdrop-blur-sm dark:bg-surface/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <Link href="/" className="flex items-center gap-3 group mb-4">
                <div className="relative w-12 h-12 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-dark rounded-xl transform rotate-45" />
                  <span className="relative text-2xl font-bold text-white z-10">ح</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">Haqq Vault</h3>
                  <p className="text-sm text-muted">คลังคำตอบชุบฮาต</p>
                </div>
              </Link>
              
              <p className="text-sm text-muted leading-relaxed mb-6">
                แหล่งรวบรวมคำตอบสำหรับข้อกล่าวหาและข้อสงสัยเกี่ยวกับอิสลาม
                โดยใช้หลักฐานจากอัลกุรอาน หะดีษ และความเห็นของบรรดานักวิชาการ
              </p>

              {/* Arabic Quote */}
              <div className="p-4 rounded-xl bg-primary/5 dark:bg-primary/10 border border-primary/20">
                <p className="arabic-text text-lg text-primary-dark dark:text-primary-light mb-2">
                  وَقُلْ رَبِّ زِدْنِي عِلْمًا
                </p>
                <p className="text-xs text-muted italic">
                  "และจงกล่าวว่า โอ้พระผู้อภิบาลของฉัน โปรดเพิ่มพูนความรู้แก่ฉันด้วย"
                </p>
                <p className="text-xs text-muted mt-1">- ซูเราะฮ์ฏอฮา 20:114</p>
              </div>
            </div>

            {/* Links Sections */}
            {Object.entries(FOOTER_SECTIONS).map(([key, section]) => (
              <div key={key}>
                <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {section.title}
                </h4>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <AnimatedFooterLink link={link} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Decorative Islamic Stars */}
          <div className="flex justify-center gap-3 my-8">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-gold/50 dark:bg-gold/30 transform rotate-45"
              />
            ))}
          </div>

          {/* Bottom Section */}
          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted text-center md:text-left">
              © {new Date().getFullYear()} Haqq Vault. สงวนลิขสิทธิ์ (Demo Version)
            </p>
            
            <div className="flex items-center gap-4 text-sm text-muted">
              <Link href="/privacy" className="hover:text-primary transition-colors">
                นโยบายความเป็นส่วนตัว
              </Link>
              <span className="w-1 h-1 rounded-full bg-muted/50" />
              <Link href="/terms" className="hover:text-primary transition-colors">
                เงื่อนไขการใช้งาน
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Animated Footer Link
function AnimatedFooterLink({ link }: { link: FooterLink }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const spring = useSpring({
    x: isHovered ? 4 : 0,
    color: isHovered ? 'var(--color-primary)' : 'var(--color-muted)',
    config: { tension: 400, friction: 30 },
    immediate: !isMounted,
  });

  return (
    <Link href={link.href}>
      <animated.span
        style={isMounted ? spring : {}}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="inline-block text-sm cursor-pointer transition-colors"
      >
        {link.label}
      </animated.span>
    </Link>
  );
}
