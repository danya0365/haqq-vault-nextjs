'use client';

/**
 * AnimatedButton
 * Interactive button component with click and hover animations
 */

import { animated, useSpring } from '@react-spring/web';
import { ReactNode, useState } from 'react';

interface AnimatedButtonProps {
  children: ReactNode;
  className?: string;
  /**
   * Button variant
   */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gold';
  /**
   * Button size
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Click handler
   */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * Disabled state
   */
  disabled?: boolean;
  /**
   * Button type
   */
  type?: 'button' | 'submit' | 'reset';
  /**
   * Icon at the start
   */
  startIcon?: ReactNode;
  /**
   * Icon at the end
   */
  endIcon?: ReactNode;
}

export function AnimatedButton({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  type = 'button',
  startIcon,
  endIcon,
}: AnimatedButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  // Animation spring
  const spring = useSpring({
    scale: disabled ? 1 : isPressed ? 0.96 : isHovered ? 1.03 : 1,
    y: isPressed ? 1 : 0,
    config: { tension: 500, friction: 25 },
  });

  // Shimmer effect on hover
  const shimmerSpring = useSpring({
    x: isHovered ? 100 : -100,
    opacity: isHovered ? 0.3 : 0,
    config: { duration: 600 },
  });

  const variantClasses = {
    primary:
      'bg-primary hover:bg-primary-dark text-white shadow-lg shadow-primary/25',
    secondary:
      'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-foreground',
    outline:
      'border-2 border-primary text-primary hover:bg-primary hover:text-white',
    ghost:
      'text-foreground hover:bg-gray-100 dark:hover:bg-gray-800',
    gold:
      'bg-gradient-to-r from-gold-dark via-gold to-gold-light text-white shadow-lg shadow-gold/25',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm rounded-lg',
    md: 'px-5 py-2.5 text-sm rounded-xl',
    lg: 'px-7 py-3 text-base rounded-xl',
  };

  return (
    <animated.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        transform: spring.scale.to((s) => `scale(${s}) translateY(${spring.y.get()}px)`),
      }}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onMouseDown={() => !disabled && setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      className={`
        relative overflow-hidden font-medium
        transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
    >
      {/* Shimmer effect */}
      <animated.div
        style={{
          transform: shimmerSpring.x.to((x) => `translateX(${x}%)`),
          opacity: shimmerSpring.opacity,
        }}
        className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 pointer-events-none"
      />

      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {startIcon}
        {children}
        {endIcon}
      </span>
    </animated.button>
  );
}
