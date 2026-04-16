// app/i18n/settings.ts
export const locales = ['en', 'ar'] as const;
export const defaultLocale = 'en' as const;
export type Locale = typeof locales[number];

export const localeNames = {
  en: 'English',
  ar: 'العربية'
};

export const getDirection = (locale: Locale): 'ltr' | 'rtl' => {
  return locale === 'ar' ? 'rtl' : 'ltr';
};

export const getFontClass = (locale: Locale): string => {
  return locale === 'ar' ? 'font-cairo' : 'font-inter';
};