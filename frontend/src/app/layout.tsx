import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Hacker News Aggregator | Premium Tech Feed',
  description: 'The ultimate bridge between Hacker News and your productivity. Discover trending stories, curated automatically.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Toaster 
            position="top-right"
            toastOptions={{
              style: {
                background: '#0f172a',
                color: '#f8fafc',
                border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: '500',
              }
            }}
          />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
