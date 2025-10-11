import { cookies } from 'next/headers';

export async function getPrefsFromCookies() {
  try {
    const c = await cookies();
    const theme = c.get('site_theme')?.value || null;
    const lang = c.get('site_lang')?.value || null;
    return { theme, lang };
  } catch {
    return { theme: null, lang: null };
  }
}
