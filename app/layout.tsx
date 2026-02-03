import '@/public/styles/index.css';
import { SITE_CONFIG } from '@/src/config/site.config';
import { ThemeProvider } from "@/src/presentation/providers/ThemeProvider";
import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = {
  title: SITE_CONFIG.metadata.home.title,
  description: SITE_CONFIG.metadata.home.description,
  keywords: [...SITE_CONFIG.keywords],
  openGraph: {
    title: SITE_CONFIG.metadata.home.title,
    description: SITE_CONFIG.metadata.home.description,
    type: 'website',
    siteName: SITE_CONFIG.name,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" suppressHydrationWarning>
      <body className={`antialiased`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
