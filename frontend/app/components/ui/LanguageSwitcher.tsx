'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
    const pathname = usePathname();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const currentLang = pathname.split('/')[1] === 'ar' ? 'ar' : 'en';

    const switchLanguage = (lang: string) => {
        const segments = pathname.split('/');
        if (segments[1] === 'en' || segments[1] === 'ar') {
            segments[1] = lang;
        } else {
            segments.splice(1, 0, lang);
        }
        const newPath = segments.join('/') || '/';
        router.push(newPath);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-cyan-500/50 transition-all"
            >
                <Globe className="w-4 h-4 text-cyan-400" />
                <span className="text-sm text-white">{currentLang === 'ar' ? 'العربية' : 'English'}</span>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-gray-900/95 backdrop-blur-xl rounded-xl border border-gray-700 shadow-2xl overflow-hidden z-50">
                    <button
                        onClick={() => switchLanguage('en')}
                        className="w-full px-4 py-2 text-left text-gray-300 hover:bg-cyan-500/10 hover:text-cyan-400 transition"
                    >
                        English
                    </button>
                    <button
                        onClick={() => switchLanguage('ar')}
                        className="w-full px-4 py-2 text-left text-gray-300 hover:bg-cyan-500/10 hover:text-cyan-400 transition"
                    >
                        العربية
                    </button>
                </div>
            )}
        </div>
    );
}