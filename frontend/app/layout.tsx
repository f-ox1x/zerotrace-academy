// app/layout.tsx (الملف الرئيسي - بدون [lang])
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/app/context/AuthContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ZeroTrace Academy - Master Cybersecurity',
  description: 'Learn ethical hacking, penetration testing, and security fundamentals from industry experts',
  keywords: 'cybersecurity, ethical hacking, penetration testing, security courses',
  authors: [{ name: 'ZeroTrace Academy' }],
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
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}