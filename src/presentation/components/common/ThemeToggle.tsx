'use client';

/**
 * ThemeToggle
 * Animated toggle for switching between dark and light mode
 */

import { animated, useSpring } from '@react-spring/web';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === 'dark';

  // Animation for the toggle container
  const containerSpring = useSpring({
    backgroundColor: isDark ? 'rgba(30, 64, 175, 0.2)' : 'rgba(251, 191, 36, 0.2)',
    borderColor: isDark ? 'rgba(59, 130, 246, 0.3)' : 'rgba(251, 191, 36, 0.3)',
    scale: isHovered ? 1.05 : 1,
    config: { tension: 300, friction: 20 },
  });

  // Animation for moon/sun icon
  const iconSpring = useSpring({
    transform: isDark ? 'rotate(0deg)' : 'rotate(180deg)',
    opacity: 1,
    config: { tension: 280, friction: 20 },
  });

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-xl bg-gray-200 dark:bg-gray-700 animate-pulse" />
    );
  }

  return (
    <animated.button
      onClick={toggleTheme}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={containerSpring}
      className="relative w-10 h-10 rounded-xl border flex items-center justify-center cursor-pointer transition-shadow hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <animated.span style={iconSpring} className="text-xl">
        {isDark ? '🌙' : '☀️'}
      </animated.span>
    </animated.button>
  );
}
