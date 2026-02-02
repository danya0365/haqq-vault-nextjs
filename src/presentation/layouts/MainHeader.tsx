'use client';

/**
 * MainHeader
 * Header component with Islamic-themed design, navigation, theme toggle, and auth menu
 */

import { useAuthStore } from '@/src/infrastructure/stores/authStore';
import { ThemeToggle } from '@/src/presentation/components/common/ThemeToggle';
import { animated, useSpring } from '@react-spring/web';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

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
  const { user, isAuthenticated, logout } = useAuthStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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

  // User menu animation
  const userMenuSpring = useSpring({
    opacity: isUserMenuOpen ? 1 : 0,
    transform: isUserMenuOpen ? 'translateY(0) scale(1)' : 'translateY(-10px) scale(0.95)',
    config: { tension: 300, friction: 25 },
  });

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      case 'scholar':
        return 'bg-gold/20 text-gold-dark dark:text-gold';
      default:
        return 'bg-primary/10 text-primary';
    }
  };

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

              {/* Auth Section */}
              {isAuthenticated && user ? (
                <div className="relative" ref={userMenuRef}>
                  {/* User Avatar Button */}
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
                      <span className="text-sm text-white font-medium">
                        {user.name?.charAt(0).toUpperCase() || '👤'}
                      </span>
                    </div>
                    <span className="hidden lg:block text-sm font-medium text-foreground max-w-[100px] truncate">
                      {user.name}
                    </span>
                    <span className="hidden lg:block text-muted text-xs">
                      {isUserMenuOpen ? '▲' : '▼'}
                    </span>
                  </button>

                  {/* User Dropdown Menu */}
                  {isUserMenuOpen && (
                    <animated.div
                      style={userMenuSpring}
                      className="absolute right-0 top-full mt-2 w-64 bg-surface dark:bg-surface border border-border rounded-2xl shadow-xl overflow-hidden"
                    >
                      {/* User Info */}
                      <div className="p-4 border-b border-border bg-gray-50 dark:bg-gray-800/50">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
                            <span className="text-lg text-white font-medium">
                              {user.name?.charAt(0).toUpperCase() || '👤'}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-foreground truncate">{user.name}</p>
                            <p className="text-xs text-muted truncate">{user.email}</p>
                            <span className={`inline-block mt-1 px-2 py-0.5 text-xs font-medium rounded-full ${getRoleBadgeColor(user.role)}`}>
                              {user.role === 'admin' ? 'ผู้ดูแล' : user.role === 'scholar' ? 'นักวิชาการ' : 'สมาชิก'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="py-2">
                        <Link
                          href="/profile"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        >
                          <span>👤</span>
                          <span>โปรไฟล์ของฉัน</span>
                        </Link>

                        {/* Admin Link */}
                        {user.role === 'admin' && (
                          <Link
                            href="/admin"
                            onClick={() => setIsUserMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                          >
                            <span>⚙️</span>
                            <span>จัดการระบบ</span>
                          </Link>
                        )}

                        {/* Scholar Link */}
                        {(user.role === 'scholar' || user.role === 'admin') && (
                          <Link
                            href="/contribute"
                            onClick={() => setIsUserMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                          >
                            <span>✍️</span>
                            <span>เพิ่มคำตอบ</span>
                          </Link>
                        )}

                        <div className="border-t border-border my-2" />

                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        >
                          <span>🚪</span>
                          <span>ออกจากระบบ</span>
                        </button>
                      </div>
                    </animated.div>
                  )}
                </div>
              ) : (
                <div className="hidden sm:flex items-center gap-2">
                  <Link
                    href="/auth/login"
                    className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                  >
                    เข้าสู่ระบบ
                  </Link>
                  <Link
                    href="/auth/register"
                    className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary-dark rounded-xl transition-colors"
                  >
                    สมัครสมาชิก
                  </Link>
                </div>
              )}
              
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

            {/* Mobile Auth Links */}
            <div className="border-t border-border mt-4 pt-4">
              {isAuthenticated && user ? (
                <>
                  <Link
                    href="/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary/10 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
                      <span className="text-sm text-white">{user.name?.charAt(0).toUpperCase()}</span>
                    </div>
                    <div>
                      <span className="font-medium text-foreground block">{user.name}</span>
                      <span className="text-xs text-muted">ดูโปรไฟล์</span>
                    </div>
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <span className="text-xl">🚪</span>
                    <span className="font-medium">ออกจากระบบ</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary/10 transition-colors"
                  >
                    <span className="text-xl">🔑</span>
                    <span className="font-medium text-foreground">เข้าสู่ระบบ</span>
                  </Link>
                  <Link
                    href="/auth/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors"
                  >
                    <span className="text-xl">✨</span>
                    <span className="font-medium text-primary">สมัครสมาชิก</span>
                  </Link>
                </>
              )}
            </div>
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
