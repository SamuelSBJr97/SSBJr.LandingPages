"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LangPage() {
  const router = useRouter();

  useEffect(() => {
    // default presents selection UI; nothing to do on mount
  }, []);

  const setLang = (lang: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('site_lang', lang);
      try {
        document.cookie = `site_lang=${lang}; path=/; max-age=${60*60*24*365}; samesite=lax`;
      } catch {
        // ignore
      }
    }
    router.push('/');
  }

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Escolha o idioma</h1>
      <p className="mb-6 text-muted">Selecione o idioma que será usado em todo o site.</p>
      <div className="flex gap-4">
        <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={() => setLang('pt-BR')}>Português (BR)</button>
        <button className="px-4 py-2 bg-gray-100 text-gray-800 rounded" onClick={() => setLang('en-US')}>English (US)</button>
        <button className="px-4 py-2 bg-gray-100 text-gray-800 rounded" onClick={() => setLang('es-ES')}>Español (ES)</button>
      </div>
    </div>
  );
}
