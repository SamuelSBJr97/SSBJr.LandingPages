"use client";

import { useEffect, useState } from 'react';

// Componente que tenta exibir a página de Trending Topics do Twitter/X
// por localização do usuário. Observações importantes:
// - Para obter tendências oficiais por localização é necessário usar a API do Twitter (autenticada).
// - Muitos endpoints do Twitter impedem embedding via iframe (X-Frame-Options).
// - Aqui fazemos uma tentativa: obtemos a localização do usuário (geolocation),
//   usamos o Nominatim (OpenStreetMap) para reverse-geocoding e montamos uma URL
//   para a página de tendências por país. Se o iframe for bloqueado, mostramos
//   um fallback com link direto para Twitter Explore/trending.

export default function TwitterTrends({ className = '' }) {
  const [countryCode, setCountryCode] = useState(null);
  const [iframeAllowed, setIframeAllowed] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function detectLocation() {
      try {
        // Primeiro, tentar geolocalização do navegador
        const pos = await new Promise((resolve, reject) => {
          if (!navigator.geolocation) return reject(new Error('geolocation-not-available'));
          const timer = setTimeout(() => reject(new Error('geolocation-timeout')), 5000);
          navigator.geolocation.getCurrentPosition(
            (p) => { clearTimeout(timer); resolve(p); },
            (err) => { clearTimeout(timer); reject(err); },
            { maximumAge: 1000 * 60 * 60, timeout: 5000 }
          );
        });

        const { latitude, longitude } = pos.coords;

        // Usar Nominatim (OpenStreetMap) para reverse-geocoding (sem necessidade de chave)
        const resp = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`);
        if (!resp.ok) throw new Error('reverse-geocode-failed');
        const json = await resp.json();
        const cc = (json.address && (json.address.country_code || json.address.country_code)) || null;
        if (!cancelled) setCountryCode(cc ? cc.toUpperCase() : null);
  } catch {
        // fallback: tentar inferir país pelo idioma do navegador
        try {
          const lang = navigator.language || (navigator.languages && navigator.languages[0]) || 'en';
          const guessed = lang.split('-')[1] || lang.split('-')[0] || null;
          if (!cancelled) setCountryCode(guessed ? guessed.toUpperCase() : null);
        } catch {
          if (!cancelled) setCountryCode(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    detectLocation();

    return () => { cancelled = true; };
  }, []);

  // Monta a URL tentativa para trends por país. Nota: Twitter/X pode mudar essas rotas.
  const trendsUrl = countryCode ? `https://twitter.com/i/trends?country_code=${countryCode}` : 'https://twitter.com/explore/tabs/trending';

  // Se o iframe for bloqueado por X-Frame-Options, não há forma segura de contornar
  // do lado do cliente sem um proxy/server-side que recupere e re-exponha o conteúdo.
  const handleIframeError = () => setIframeAllowed(false);

  return (
    <div className={`twitter-trends ${className}`}>
      <div className="text-xs text-gray-500 text-center mb-2 uppercase tracking-wide">Twitter / Tendências locais</div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-6 text-center text-sm text-gray-600">Detectando localização e carregando tendências...</div>
        ) : (
          iframeAllowed ? (
            <div style={{ height: 600 }}>
              <iframe
                title="Twitter Trends"
                src={trendsUrl}
                style={{ width: '100%', height: '100%', border: '0' }}
                onError={handleIframeError}
                onLoad={() => {
                  // Se o iframe carregar mas for bloqueado por X-Frame-Options, não há forma definitiva
                  // de detectar isso cross-origin, então mantemos o iframe e também mostramos link fallback via CSS/stack.
                }}
              />
            </div>
          ) : (
            <div className="p-6 text-center">
              <p className="text-sm text-gray-700 mb-4">Não foi possível incorporar o Twitter nesta página devido a restrições do site.</p>
              <a
                href={trendsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Abrir tendências no Twitter
              </a>
            </div>
          )
        )}
      </div>
      <div className="text-center mt-2">
        <a
          href={trendsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-gray-500 hover:text-gray-700 underline"
        >
          Ver no Twitter
        </a>
      </div>
    </div>
  );
}
