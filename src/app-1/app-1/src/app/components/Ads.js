'use client';

import { useState, useEffect } from 'react';

/**
 * Componente Ads - Exibe anúncios/publicidade nas landing pages
 * 
 * Props:
 * - position: 'top', 'middle', 'bottom', 'sidebar'
 * - type: 'banner', 'square', 'vertical'
 * - adContent: Objeto com conteúdo do anúncio ou código HTML
 * - className: Classes CSS adicionais
 */
export default function Ads({ 
  position = 'middle', 
  type = 'banner', 
  adContent = null,
  className = '' 
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Simula carregamento do anúncio
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Configurações de estilo baseadas no tipo
  const getAdStyles = () => {
    const baseStyles = "bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center rounded-lg transition-all duration-300";
    
    switch (type) {
      case 'banner':
        return `${baseStyles} w-full h-24 md:h-32`;
      case 'square':
        return `${baseStyles} w-64 h-64 mx-auto`;
      case 'vertical':
        return `${baseStyles} w-48 h-96`;
      default:
        return `${baseStyles} w-full h-24`;
    }
  };

  // Configurações de posição
  const getPositionStyles = () => {
    switch (position) {
      case 'top':
        return 'mb-8';
      case 'middle':
        return 'my-8';
      case 'bottom':
        return 'mt-8';
      case 'sidebar':
        return 'sticky top-4';
      default:
        return 'my-4';
    }
  };

  // Conteúdo padrão do anúncio
  const defaultAdContent = (
    <div className="text-center p-4">
      <div className="text-xs text-gray-500 mb-2">PUBLICIDADE</div>
      <div className="text-gray-700 font-medium">
        {type === 'banner' && "Banner Publicitário 728x90"}
        {type === 'square' && "Anúncio Quadrado 300x300"}
        {type === 'vertical' && "Anúncio Vertical 160x600"}
      </div>
      <div className="text-xs text-gray-500 mt-2">
        Espaço para {position}
      </div>
    </div>
  );

  // Se tem conteúdo personalizado (ex: Google AdSense)
  const renderAdContent = () => {
    if (adContent) {
      // Se for uma string HTML (ex: código do Google AdSense)
      if (typeof adContent === 'string') {
        return (
          <div 
            dangerouslySetInnerHTML={{ __html: adContent }}
            className="w-full h-full"
          />
        );
      }
      // Se for um componente React
      return adContent;
    }
    
    return defaultAdContent;
  };

  if (!isVisible) {
    return (
      <div className={`${getAdStyles()} ${getPositionStyles()} ${className} opacity-50`}>
        <div className="text-gray-400 text-sm">Carregando anúncio...</div>
      </div>
    );
  }

  return (
    <div className={`${getPositionStyles()} ${className}`}>
      {/* Label de identificação do anúncio */}
      <div className="text-xs text-gray-400 text-center mb-1">
        PUBLICIDADE
      </div>
      
      {/* Container do anúncio */}
      <div className={getAdStyles()}>
        {renderAdContent()}
      </div>
      
      {/* Exemplo de integração com Google AdSense (comentado) */}
      {/*
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
      <ins className="adsbygoogle"
           style={{display: 'block'}}
           data-ad-client="ca-pub-xxxxxxxxxx"
           data-ad-slot="xxxxxxxxxx"
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
      <script>
        (adsbygoogle = window.adsbygoogle || []).push({});
      </script>
      */}
    </div>
  );
}

// Exemplo de uso do componente:
/*
// Banner no topo
<Ads position="top" type="banner" />

// Anúncio quadrado no meio
<Ads position="middle" type="square" />

// Anúncio personalizado
<Ads 
  position="bottom" 
  type="banner"
  adContent={
    <div className="bg-blue-500 text-white p-4 text-center w-full h-full flex items-center justify-center">
      <span>Seu Anúncio Personalizado Aqui</span>
    </div>
  }
/>

// Com código HTML (ex: Google AdSense)
<Ads 
  position="sidebar" 
  type="vertical"
  adContent={`
    <div style="width:160px;height:600px;background:#f0f0f0;display:flex;align-items:center;justify-content:center;">
      Código do Google AdSense aqui
    </div>
  `}
/>
*/