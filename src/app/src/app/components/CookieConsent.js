'use client';

import { useState, useEffect } from 'react';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
    functional: false
  });

  useEffect(() => {
    // Verificar se o usuário já deu consentimento
    const consent = localStorage.getItem('ssbjr_cookie_consent') || (document.cookie.match(/ssbjr_cookie_consent=([^;]+)/)?.[1] ? decodeURIComponent(document.cookie.match(/ssbjr_cookie_consent=([^;]+)/)[1]) : null);
    if (!consent) {
      setShowBanner(true);
    } else {
      const savedPreferences = JSON.parse(consent);
      setPreferences(savedPreferences);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('ssbjr_cookie_consent', JSON.stringify(allAccepted));
  // Persist in cookie for server-side reads when needed
  document.cookie = `ssbjr_cookie_consent=${encodeURIComponent(JSON.stringify(allAccepted))}; path=/; max-age=31536000; samesite=lax`;
    setPreferences(allAccepted);
    setShowBanner(false);
    
    // Inicializar cookies aceitos
    initializeCookies(allAccepted);
  };

  const handleRejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('ssbjr_cookie_consent', JSON.stringify(onlyNecessary));
  document.cookie = `ssbjr_cookie_consent=${encodeURIComponent(JSON.stringify(onlyNecessary))}; path=/; max-age=31536000; samesite=lax`;
    setPreferences(onlyNecessary);
    setShowBanner(false);
    
    // Limpar cookies não essenciais
    clearNonEssentialCookies();
  };

  const handleSavePreferences = () => {
    const savedPrefs = {
      ...preferences,
      timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('ssbjr_cookie_consent', JSON.stringify(savedPrefs));
  document.cookie = `ssbjr_cookie_consent=${encodeURIComponent(JSON.stringify(savedPrefs))}; path=/; max-age=31536000; samesite=lax`;
    setShowBanner(false);
    setShowPreferences(false);
    
    // Aplicar preferências
    initializeCookies(savedPrefs);
  };

  const initializeCookies = (prefs) => {
    if (prefs.analytics) {
      // Inicializar Google Analytics, etc.
      console.log('Analytics cookies enabled');
    }
    
    if (prefs.marketing) {
      // Inicializar pixels de marketing
      console.log('Marketing cookies enabled');
    }
    
    if (prefs.functional) {
      // Inicializar cookies funcionais
      console.log('Functional cookies enabled');
    }
  };

  const clearNonEssentialCookies = () => {
    // Limpar cookies não essenciais
    const cookiesToClear = ['_ga', '_gid', '_fbp', '_gat'];
    cookiesToClear.forEach(cookie => {
      document.cookie = `${cookie}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });
  };

  const togglePreference = (key) => {
    if (key === 'necessary') return; // Necessários não podem ser desabilitados
    
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  if (!showBanner && !showPreferences) return null;

  return (
    <>
      {/* Cookie Banner */}
      {showBanner && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-blue-500 shadow-2xl z-50">
          <div className="max-w-7xl mx-auto p-6">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0">
              <div className="flex-1 lg:pr-8">
                <div className="flex items-start space-x-3">
                  <div className="text-2xl">🍪</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Utilizamos cookies para melhorar sua experiência
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Este site utiliza cookies essenciais e opcionais para funcionalidade, 
                      análise e personalização. Ao continuar navegando, você concorda com nossa 
                      <button className="text-blue-600 hover:underline mx-1" onClick={() => setShowPreferences(true)}>
                        Política de Privacidade
                      </button> 
                      e uso de cookies conforme a LGPD.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full lg:w-auto">
                <button
                  onClick={() => setShowPreferences(true)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  ⚙️ Personalizar
                </button>
                <button
                  onClick={handleRejectAll}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  ❌ Rejeitar Tudo
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="px-6 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                >
                  ✅ Aceitar Tudo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Preferences Modal */}
      {showPreferences && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-60 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  🔒 Configurações de Privacidade
                </h2>
                <button
                  onClick={() => setShowPreferences(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Privacy Notice */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-blue-900 mb-2">
                  📋 Sobre nossos cookies
                </h3>
                <p className="text-sm text-blue-800">
                  Respeitamos sua privacidade e seguimos rigorosamente a LGPD (Lei Geral de Proteção de Dados). 
                  Você tem controle total sobre quais cookies aceitar.
                </p>
              </div>

              {/* Cookie Categories */}
              <div className="space-y-4">
                {/* Necessary Cookies */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">
                      🔒 Cookies Essenciais
                    </h4>
                    <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                      Sempre ativo
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Necessários para o funcionamento básico do site. Não podem ser desabilitados.
                  </p>
                  <div className="text-xs text-gray-500">
                    <strong>Exemplos:</strong> Autenticação, carrinho de compras, preferências de idioma
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">
                      📊 Cookies de Analytics
                    </h4>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.analytics}
                        onChange={() => togglePreference('analytics')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Ajudam-nos a entender como você usa o site para melhorar a experiência.
                  </p>
                  <div className="text-xs text-gray-500">
                    <strong>Exemplos:</strong> Google Analytics, páginas mais visitadas, tempo de permanência
                  </div>
                </div>

                {/* Marketing Cookies */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">
                      🎯 Cookies de Marketing
                    </h4>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.marketing}
                        onChange={() => togglePreference('marketing')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Personalizam anúncios e conteúdo baseados em seus interesses.
                  </p>
                  <div className="text-xs text-gray-500">
                    <strong>Exemplos:</strong> Facebook Pixel, Google Ads, remarketing
                  </div>
                </div>

                {/* Functional Cookies */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">
                      ⚙️ Cookies Funcionais
                    </h4>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={preferences.functional}
                        onChange={() => togglePreference('functional')}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Melhoram a funcionalidade e personalização do site.
                  </p>
                  <div className="text-xs text-gray-500">
                    <strong>Exemplos:</strong> Chat ao vivo, players de vídeo, mapas interativos
                  </div>
                </div>
              </div>

              {/* LGPD Info */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-6">
                <h4 className="font-semibold text-gray-900 mb-2">
                  ⚖️ Seus Direitos (LGPD)
                </h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>• <strong>Acesso:</strong> Solicitar cópia dos seus dados</p>
                  <p>• <strong>Correção:</strong> Corrigir dados incorretos</p>
                  <p>• <strong>Exclusão:</strong> Solicitar remoção dos seus dados</p>
                  <p>• <strong>Portabilidade:</strong> Transferir dados para outro serviço</p>
                  <p>• <strong>Revogação:</strong> Retirar consentimento a qualquer momento</p>
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  Para exercer seus direitos, entre em contato: privacy@ssbjr.com
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 mt-6">
                <button
                  onClick={handleRejectAll}
                  className="flex-1 px-4 py-3 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  Rejeitar Todos
                </button>
                <button
                  onClick={handleSavePreferences}
                  className="flex-1 px-4 py-3 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                >
                  Salvar Preferências
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="flex-1 px-4 py-3 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                >
                  Aceitar Todos
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}