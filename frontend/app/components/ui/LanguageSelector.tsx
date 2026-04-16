'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Globe, Check } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧', dir: 'ltr' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦', dir: 'rtl' }
];

export default function LanguageSelector() {
  const { lang } = useParams();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = languages.find(l => l.code === lang) || languages[0];

  const switchLanguage = (langCode: string) => {
    const currentPath = window.location.pathname;
    const newPath = currentPath.replace(/^\/[a-z]{2}/, `/${langCode}`);
    router.push(newPath);
    setIsOpen(false);
    window.location.reload();
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-cyan-500/50 transition-all group"
      >
        <Globe className="w-4 h-4 text-cyan-400" />
        <span className="text-sm text-white">{currentLang.flag} {currentLang.name}</span>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-gray-900/95 backdrop-blur-xl rounded-xl border border-gray-700 shadow-2xl overflow-hidden z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => switchLanguage(lang.code)}
              className="w-full px-4 py-3 flex items-center justify-between hover:bg-cyan-500/10 transition-colors"
            >
              <span className="flex items-center gap-2 text-gray-300">
                <span className="text-xl">{lang.flag}</span>
                <span>{lang.name}</span>
              </span>
              {currentLang.code === lang.code && <Check className="w-4 h-4 text-cyan-400" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}