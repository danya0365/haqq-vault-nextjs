'use client';

/**
 * MainHeader
 * Header component with Islamic-themed design, navigation, and theme toggle
 */

import { ThemeToggle } from '@/src/presentation/components/common/ThemeToggle';
import { animated, useSpring } from '@react-spring/web';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface NavLink {
  href: string;
  label: string;
  labelArabic?: string;
  icon?: string;
}

const NAV_LINKS: NavLink[] = [
  { href: '/', label: 'หน้าแรก', icon: '🏠' },
  { href: '/topics', label: 'คำตอบทั้งหมด', icon: '📚' },
  { href: '/categories', label: 'หมวดหมู่', icon: '📂' },
  { href: '/search', label: 'ค้นหา', icon: '🔍' },
];

export function MainHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Header animation on scroll
  const headerSpring = useSpring({
    backgroundColor: isScrolled
      ? 'rgba(255, 251, 245, 0.95)'
      : 'rgba(255, 251, 245, 0)',
    boxShadow: isScrolled
      ? '0 4px 20px rgba(0, 0, 0, 0.08)'
      : '0 0 0 rgba(0, 0, 0, 0)',
    backdropFilter: isScrolled ? 'blur(12px)' : 'blur(0px)',
    config: { tension: 300, friction: 30 },
  });

  // Mobile menu animation
  const mobileMenuSpring = useSpring({
    transform: isMobileMenuOpen ? 'translateY(0%)' : 'translateY(-100%)',
    opacity: isMobileMenuOpen ? 1 : 0,
    config: { tension: 280, friction: 24 },
  });

  return (
    <>
      <animated.header
        style={headerSpring}
        className="fixed top-0 left-0 right-0 z-50 dark:bg-background/95"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
                {/* Islamic star decoration */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-dark rounded-xl transform rotate-45 group-hover:rotate-[55deg] transition-transform duration-300" />
                <span className="relative text-xl md:text-2xl font-bold text-white z-10">
                  ح
                </span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                  Haqq Vault
                </h1>
                <p className="text-xs text-muted hidden md:block">
                  คลังคำตอบชุบฮาต
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <AnimatedNavLink
                  key={link.href}
                  link={link}
                  isHovered={hoveredLink === link.href}
                  onHover={() => setHoveredLink(link.href)}
                  onLeave={() => setHoveredLink(null)}
                />
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <ThemeToggle />
              
              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle menu"
              >
                <div className="w-6 h-5 flex flex-col justify-between">
                  <span
                    className={`block h-0.5 bg-foreground transition-all duration-300 origin-left ${
                      isMobileMenuOpen ? 'rotate-45 translate-x-0.5' : ''
                    }`}
                  />
                  <span
                    className={`block h-0.5 bg-foreground transition-all duration-300 ${
                      isMobileMenuOpen ? 'opacity-0' : ''
                    }`}
                  />
                  <span
                    className={`block h-0.5 bg-foreground transition-all duration-300 origin-left ${
                      isMobileMenuOpen ? '-rotate-45 translate-x-0.5' : ''
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <animated.div
          style={mobileMenuSpring}
          className="md:hidden absolute top-full left-0 right-0 bg-surface dark:bg-surface border-b border-border shadow-lg"
        >
          <nav className="py-4 px-4 space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary/10 transition-colors"
              >
                <span className="text-xl">{link.icon}</span>
                <span className="font-medium text-foreground">{link.label}</span>
              </Link>
            ))}
          </nav>
        </animated.div>
      </animated.header>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}

// Animated Navigation Link
function AnimatedNavLink({
  link,
  isHovered,
  onHover,
  onLeave,
}: {
  link: NavLink;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const spring = useSpring({
    backgroundColor: isHovered ? 'rgba(5, 150, 105, 0.1)' : 'rgba(0, 0, 0, 0)',
    scale: isHovered ? 1.02 : 1,
    config: { tension: 400, friction: 30 },
  });

  const underlineSpring = useSpring({
    width: isHovered ? '100%' : '0%',
    config: { tension: 400, friction: 30 },
  });

  return (
    <Link href={link.href}>
      <animated.div
        style={spring}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        className="relative px-4 py-2 rounded-lg cursor-pointer"
      >
        <span className="flex items-center gap-2 text-sm font-medium text-foreground">
          <span>{link.icon}</span>
          <span>{link.label}</span>
        </span>
        <animated.div
          style={underlineSpring}
          className="absolute bottom-1 left-4 right-4 h-0.5 bg-primary rounded-full"
        />
      </animated.div>
    </Link>
  );
}
