import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/lib/AppContext';

export const metadata: Metadata = {
  title: 'HerPath — Her Skills. Her Journey. Her Future.',
  description: 'AI-powered women-focused skill ecosystem. Discover, learn, practice, showcase, connect, and earn through your skills.',
  keywords: 'women empowerment, skill learning, mentorship, freelancing, portfolio, AI learning',
  openGraph: {
    title: 'HerPath',
    description: 'Her Skills. Her Journey. Her Future.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
