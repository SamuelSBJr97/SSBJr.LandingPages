"use client";

import { useEffect, useState } from 'react';

const THEMES = ['day','night','glass'];

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState(() => typeof window !== 'undefined' ? (localStorage.getItem('site_theme') || 'day') : 'day');

  useEffect(() => {
    if (!theme) return;
    const root = document.documentElement;
    root.classList.remove(...THEMES.map(t => `theme-${t}`));
    root.classList.add(`theme-${theme}`);
    localStorage.setItem('site_theme', theme);
    // Set cookie for SSR so preferences persist across devices (max-age 1 year)
    try {
      document.cookie = `site_theme=${theme}; path=/; max-age=${60*60*24*365}; samesite=lax`;
    } catch {
      // ignore
    }
  }, [theme]);

  return (
    <div className="inline-flex items-center space-x-2">
      {THEMES.map(t => (
        <button
          key={t}
          onClick={() => setTheme(t)}
          className={`px-3 py-1 rounded-md ${theme===t? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'}`}
          aria-pressed={theme===t}
        >
          {t}
        </button>
      ))}
    </div>
  );
}
