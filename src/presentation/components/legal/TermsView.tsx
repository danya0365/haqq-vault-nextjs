'use client';

/**
 * TermsView
 * Terms of Service page refactored to use centralized config
 */

import { LEGAL_CONFIG } from '@/src/config/legal.config';
import { SITE_CONFIG } from '@/src/config/site.config';
import { UI_CONFIG } from '@/src/config/ui.config';
import { AnimatedIslamicPattern } from '@/src/presentation/components/animated/AnimatedIslamicPattern';
import { MainLayout } from '@/src/presentation/layouts/MainLayout';
import { animated, useSpring } from '@react-spring/web';
import { useEffect, useState } from 'react';

export function TermsView() {
  const [isLoaded, setIsLoaded] = useState(false);

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

  return (
    <MainLayout>
      <div className="min-h-screen py-8 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <animated.div style={headerSpring} className="text-center mb-12">
            <div className="inline-flex items-center justify-center mb-6">
              <AnimatedIslamicPattern type="star" size="md" color="gold" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {UI_CONFIG.termsTitle}
            </h1>
            <p className="text-muted">
              {UI_CONFIG.lastUpdated}: {new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </animated.div>

          {/* Content */}
          <animated.div style={contentSpring} className="prose prose-lg dark:prose-invert max-w-none">
            <div className="bg-surface dark:bg-surface rounded-2xl border border-border p-6 md:p-8 space-y-8">
              {LEGAL_CONFIG.terms.sections.map((section, idx) => (
                <section key={idx}>
                  <h2 className="text-xl font-bold text-foreground mb-4">{section.title}</h2>
                  <p className="text-muted-dark dark:text-muted leading-relaxed mb-4">
                    {section.content}
                  </p>
                  
                  {/* General items */}
                  {'items' in section && section.items && (
                    <ul className="space-y-2 text-muted-dark dark:text-muted">
                      {section.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-primary">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Allowed / Prohibited items */}
                  {'allowed' in section && section.allowed && (
                    <ul className="space-y-2 text-muted-dark dark:text-muted mb-4">
                      {section.allowed.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-green-500">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {'prohibited' in section && section.prohibited && (
                    <ul className="space-y-2 text-muted-dark dark:text-muted">
                      {section.prohibited.map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-red-500">✗</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Special footer for Contact section */}
                  {section.title.includes('ติดต่อ') && (
                    <p className="mt-4">
                      <a href={`mailto:${SITE_CONFIG.contact.email}`} className="text-primary hover:underline font-medium">
                        {SITE_CONFIG.contact.email}
                      </a>
                    </p>
                  )}
                </section>
              ))}
            </div>
          </animated.div>
        </div>
      </div>
    </MainLayout>
  );
}
