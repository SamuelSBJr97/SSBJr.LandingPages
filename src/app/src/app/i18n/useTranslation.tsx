"use client";

import { useMemo } from 'react';
import { translations } from './translations';

function readLocale() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('site_lang') || (document.cookie.match(/site_lang=([^;]+)/)?.[1]) || 'pt-BR';
  }
  return 'pt-BR';
}

export default function useTranslation() {
  const locale = readLocale();
  const dict = translations[locale as keyof typeof translations] || translations['pt-BR'];
  const dictTyped = dict as Record<string,string>;

  const t = useMemo(() => (key: string) => {
    return dictTyped[key] || key;
  }, [dictTyped]);

  return { t, locale };
}
