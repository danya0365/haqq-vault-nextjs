'use client';

/**
 * AnimatedIslamicPattern
 * Decorative Islamic geometric patterns with animations
 */

import { animated, useSpring } from '@react-spring/web';
import { useEffect, useState } from 'react';

interface AnimatedIslamicPatternProps {
  /**
   * Pattern type
   */
  type?: 'star' | 'octagon' | 'arabesque';
  /**
   * Size of the pattern
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Color theme
   */
  color?: 'primary' | 'gold' | 'accent';
  /**
   * Animation type
   */
  animation?: 'rotate' | 'pulse' | 'float' | 'none';
  /**
   * Additional class names
   */
  className?: string;
}

export function AnimatedIslamicPattern({
  type = 'star',
  size = 'md',
  color = 'primary',
  animation = 'none',
  className = '',
}: AnimatedIslamicPatternProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Entry animation
  const entrySpring = useSpring({
    opacity: isVisible ? 1 : 0,
    scale: isVisible ? 1 : 0.5,
    rotate: type === 'star' && isVisible ? 0 : -45,
    config: { tension: 200, friction: 20 },
    delay: 100,
  });

  // Continuous animation
  const continuousSpring = useSpring({
    from: { rotate: 0, y: 0, scale: 1 },
    to: async (next) => {
      if (animation === 'rotate') {
        while (true) {
          await next({ rotate: 360, config: { duration: 20000 } });
          await next({ rotate: 0, immediate: true });
        }
      } else if (animation === 'pulse') {
        while (true) {
          await next({ scale: 1.1, config: { duration: 1500 } });
          await next({ scale: 1, config: { duration: 1500 } });
        }
      } else if (animation === 'float') {
        while (true) {
          await next({ y: -10, config: { duration: 2000 } });
          await next({ y: 10, config: { duration: 2000 } });
        }
      }
    },
    loop: animation !== 'none',
  });

  const sizeMap = {
    sm: 40,
    md: 80,
    lg: 120,
  };

  const colorClasses = {
    primary: 'text-primary',
    gold: 'text-gold',
    accent: 'text-accent',
  };

  const patternSize = sizeMap[size];

  return (
    <animated.div
      style={{
        opacity: entrySpring.opacity,
        transform: entrySpring.scale.to(
          (s) =>
            `scale(${s}) rotate(${
              animation === 'rotate'
                ? continuousSpring.rotate.get()
                : entrySpring.rotate.get()
            }deg) translateY(${
              animation === 'float' ? continuousSpring.y.get() : 0
            }px)`
        ),
        width: patternSize,
        height: patternSize,
      }}
      className={`${colorClasses[color]} ${className}`}
    >
      {type === 'star' && <EightPointStar size={patternSize} />}
      {type === 'octagon' && <Octagon size={patternSize} />}
      {type === 'arabesque' && <Arabesque size={patternSize} />}
    </animated.div>
  );
}

// 8-Point Islamic Star
function EightPointStar({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M50 0L56.18 23.82L60 30L76.18 6.18L70 30L73.82 36.18L100 50L73.82 63.82L70 70L76.18 93.82L60 70L56.18 76.18L50 100L43.82 76.18L40 70L23.82 93.82L30 70L26.18 63.82L0 50L26.18 36.18L30 30L23.82 6.18L40 30L43.82 23.82L50 0Z"
        fill="currentColor"
        fillOpacity="0.15"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.3"
      />
      {/* Inner star */}
      <path
        d="M50 20L55 35L60 45L70 50L60 55L55 65L50 80L45 65L40 55L30 50L40 45L45 35L50 20Z"
        fill="currentColor"
        fillOpacity="0.2"
      />
    </svg>
  );
}

// Octagon Pattern
function Octagon({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon
        points="30,5 70,5 95,30 95,70 70,95 30,95 5,70 5,30"
        fill="currentColor"
        fillOpacity="0.1"
        stroke="currentColor"
        strokeWidth="2"
        strokeOpacity="0.3"
      />
      <polygon
        points="35,15 65,15 85,35 85,65 65,85 35,85 15,65 15,35"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.2"
      />
      <circle
        cx="50"
        cy="50"
        r="15"
        fill="currentColor"
        fillOpacity="0.15"
      />
    </svg>
  );
}

// Arabesque Pattern
function Arabesque({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.3">
        {/* Central flower */}
        <circle cx="50" cy="50" r="10" />
        {/* Petals */}
        <ellipse cx="50" cy="25" rx="8" ry="15" />
        <ellipse cx="50" cy="75" rx="8" ry="15" />
        <ellipse cx="25" cy="50" rx="15" ry="8" />
        <ellipse cx="75" cy="50" rx="15" ry="8" />
        {/* Diagonal petals */}
        <ellipse cx="30" cy="30" rx="10" ry="6" transform="rotate(-45 30 30)" />
        <ellipse cx="70" cy="30" rx="10" ry="6" transform="rotate(45 70 30)" />
        <ellipse cx="30" cy="70" rx="10" ry="6" transform="rotate(45 30 70)" />
        <ellipse cx="70" cy="70" rx="10" ry="6" transform="rotate(-45 70 70)" />
      </g>
    </svg>
  );
}
