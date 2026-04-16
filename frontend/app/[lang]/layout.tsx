// app/[lang]/layout.tsx
import { Metadata } from 'next';
import { Inter, Cairo } from 'next/font/google';
import { getDirection } from '@/app/i18n/settings';
import Navbar from '@/app/components/Navbar';
import CyberBackground from '@/app/components/ui/CyberBackground';
import '../globals.css';

const inter = Inter({ subsets: ['latin'] });
const cairo = Cairo({ subsets: ['arabic'], weight: ['400', '500', '600', '700'] });

export const metadata: Metadata = {
    title: 'ZeroTrace Academy - Master Cybersecurity',
    description: 'Learn ethical hacking, penetration testing, and security fundamentals',
};

export default function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { lang: string };
}) {
    const direction = getDirection(params.lang as 'en' | 'ar');
    const font = params.lang === 'ar' ? cairo.className : inter.className;

    return (
        <html lang={params.lang} dir={direction}>
            <body className={`${font} bg-gray-950 text-white antialiased`}>
                <CyberBackground />
                <Navbar />
                <main className="relative z-10 pt-16 min-h-screen">
                    {children}
                </main>
            </body>
        </html>
    );
}