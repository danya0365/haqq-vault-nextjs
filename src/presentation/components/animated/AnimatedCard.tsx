'use client';

/**
 * AnimatedCard
 * Interactive card component with hover effects using react-spring
 */

import { animated, useSpring } from '@react-spring/web';
import { ReactNode, useState } from 'react';

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  /**
   * Card variant for different styles
   */
  variant?: 'default' | 'elevated' | 'glass' | 'bordered';
  /**
   * Whether to enable hover effects
   */
  interactive?: boolean;
  /**
   * Click handler
   */
  onClick?: () => void;
  /**
   * Disable animations
   */
  disableAnimation?: boolean;
}

export function AnimatedCard({
  children,
  className = '',
  variant = 'default',
  interactive = true,
  onClick,
  disableAnimation = false,
}: AnimatedCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  // Hover and press animation
  const spring = useSpring({
    scale: disableAnimation
      ? 1
      : isPressed
      ? 0.98
      : isHovered && interactive
      ? 1.02
      : 1,
    y: disableAnimation
      ? 0
      : isHovered && interactive
      ? -4
      : 0,
    shadow: isHovered && interactive
      ? '0 20px 40px rgba(0, 0, 0, 0.1)'
      : '0 4px 12px rgba(0, 0, 0, 0.05)',
    config: { tension: 400, friction: 25 },
  });

  // Glow effect for hover
  const glowSpring = useSpring({
    opacity: isHovered && interactive ? 1 : 0,
    config: { tension: 300, friction: 30 },
  });

  const variantClasses = {
    default: 'bg-surface dark:bg-surface',
    elevated: 'bg-surface dark:bg-surface shadow-lg',
    glass: 'card-glass',
    bordered: 'bg-surface dark:bg-surface border border-border',
  };

  return (
    <animated.div
      style={{
        transform: spring.scale.to((s) => `scale(${s}) translateY(${spring.y.get()}px)`),
        boxShadow: spring.shadow,
      }}
      onMouseEnter={() => interactive && setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onMouseDown={() => interactive && setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onClick={onClick}
      className={`
        relative rounded-xl overflow-hidden transition-colors
        ${variantClasses[variant]}
        ${interactive ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {/* Hover glow effect */}
      {interactive && (
        <animated.div
          style={{ opacity: glowSpring.opacity }}
          className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none"
        />
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </animated.div>
  );
}
