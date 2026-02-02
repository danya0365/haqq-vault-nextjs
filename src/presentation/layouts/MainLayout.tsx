'use client';

/**
 * MainLayout
 * Main layout wrapper with Islamic-themed design
 */

import { ReactNode } from 'react';
import { MainFooter } from './MainFooter';
import { MainHeader } from './MainHeader';

interface MainLayoutProps {
  children: ReactNode;
  /**
   * Whether to show decorative Islamic patterns in the background
   * @default true
   */
  showPattern?: boolean;
  /**
   * Custom background class
   */
  backgroundClass?: string;
}

export function MainLayout({
  children,
  showPattern = true,
  backgroundClass,
}: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Fixed Header */}
      <MainHeader />

      {/* Main Content */}
      <main
        className={`flex-1 pt-16 md:pt-20 ${
          showPattern ? 'islamic-pattern' : ''
        } ${backgroundClass || ''}`}
      >
        {/* Gradient overlay for pattern */}
        {showPattern && (
          <div className="fixed inset-0 pointer-events-none bg-gradient-to-b from-background via-transparent to-background opacity-80 z-0" />
        )}
        
        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </main>

      {/* Footer */}
      <MainFooter />
    </div>
  );
}
