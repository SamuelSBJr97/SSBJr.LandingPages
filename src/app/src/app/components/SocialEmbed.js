'use client';

import { useEffect, useRef } from 'react';
import TwitterTrends from './TwitterTrends';

/**
 * Componente SocialEmbed - Incorpora conteúdo de diversas redes sociais
 * 
 * Suporta:
 * - YouTube (vídeos e shorts)
 * - Twitter/X (tweets)
 * - TikTok (vídeos)
 * - Instagram (posts)
 * - Facebook (posts e vídeos)
 * - LinkedIn (posts)
 * - Twitch (clips e vídeos)
 * - Spotify (músicas e playlists)
 * 
 * Props:
 * - type: 'youtube' | 'twitter' | 'tiktok' | 'instagram' | 'facebook' | 'linkedin' | 'twitch' | 'spotify'
 * - url: URL do conteúdo original
 * - embedCode: Código HTML de embed (opcional)
 * - width: Largura do embed
 * - height: Altura do embed
 * - autoplay: Reproduzir automaticamente (quando suportado)
 * - className: Classes CSS adicionais
 */
export default function SocialEmbed({
  type,
  url,
  embedCode = null,
  width = '100%',
  height = 'auto',
  autoplay = false,
  className = ''
}) {
  const containerRef = useRef(null);

  // Função para extrair ID do YouTube
  const getYouTubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Função para extrair ID do TikTok
  const getTikTokId = (url) => {
    const regExp = /(?:https?:\/\/)?(?:www\.)?tiktok\.com\/@[\w.-]+\/video\/(\d+)/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  // Função para extrair ID do Twitter
  const getTwitterId = (url) => {
    const regExp = /status\/(\d+)/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  // Carregar scripts externos quando necessário
  useEffect(() => {
    if (type === 'twitter') {
      // Carregar Twitter Widget Script
      if (!window.twttr) {
        const script = document.createElement('script');
        script.src = 'https://platform.twitter.com/widgets.js';
        script.async = true;
        document.head.appendChild(script);
      } else {
        window.twttr.widgets.load(containerRef.current);
      }
    }

    if (type === 'instagram') {
      // Carregar Instagram Embed Script
      if (!window.instgrm) {
        const script = document.createElement('script');
        script.src = 'https://www.instagram.com/embed.js';
        script.async = true;
        document.head.appendChild(script);
      } else {
        window.instgrm.Embeds.process();
      }
    }

    if (type === 'tiktok') {
      // Carregar TikTok Embed Script
      if (!window.TikTokEmbed) {
        const script = document.createElement('script');
        script.src = 'https://www.tiktok.com/embed.js';
        script.async = true;
        document.head.appendChild(script);
      }
    }
  }, [type]);

  // Renderizar embed baseado no tipo
  const renderEmbed = () => {
    // Se foi fornecido código HTML personalizado
    if (embedCode) {
      return (
        <div 
          ref={containerRef}
          dangerouslySetInnerHTML={{ __html: embedCode }}
          className="w-full"
        />
      );
    }

    switch (type) {
      case 'youtube': {
        const videoId = getYouTubeId(url);
        if (!videoId) return <div className="text-red-500">URL do YouTube inválida</div>;
        
        const embedUrl = `https://www.youtube.com/embed/${videoId}${autoplay ? '?autoplay=1' : ''}`;
        
        return (
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              src={embedUrl}
              title="YouTube video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full rounded-lg"
            />
          </div>
        );
      }

      case 'twitter': {
        // Se a URL é de um tweet específico, exibimos o tweet embutido.
        // Caso contrário, exibimos a seção de tendências locais do Twitter.
        const tweetId = getTwitterId(url);
        if (tweetId) {
          return (
            <div ref={containerRef} className="flex justify-center">
              <blockquote className="twitter-tweet" data-theme="light">
                <a href={url}>Tweet</a>
              </blockquote>
            </div>
          );
        }

        // Não é um link de tweet -> mostrar trends locais
        return <TwitterTrends />;
      }

      case 'tiktok': {
        const videoId = getTikTokId(url);
        if (!videoId) return <div className="text-red-500">URL do TikTok inválida</div>;
        
        return (
          <div ref={containerRef} className="flex justify-center">
            <blockquote 
              className="tiktok-embed" 
              cite={url} 
              data-video-id={videoId}
              style={{ maxWidth: '605px', minWidth: '325px' }}
            >
              <section>
                <a target="_blank" title={`@user`} href={url}>TikTok Video</a>
              </section>
            </blockquote>
          </div>
        );
      }

      case 'instagram': {
        return (
          <div ref={containerRef} className="flex justify-center">
            <blockquote 
              className="instagram-media" 
              data-instgrm-permalink={url}
              data-instgrm-version="14"
              style={{ 
                background: '#FFF',
                border: '0',
                borderRadius: '3px',
                boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
                margin: '1px',
                maxWidth: '540px',
                minWidth: '326px',
                padding: '0',
                width: 'calc(100% - 2px)'
              }}
            >
              <a href={url} target="_blank" rel="noopener noreferrer">
                Ver post no Instagram
              </a>
            </blockquote>
          </div>
        );
      }

      case 'facebook': {
        return (
          <div className="flex justify-center">
            <div 
              className="fb-post" 
              data-href={url}
              data-width="500"
              data-show-text="true"
            >
              <blockquote cite={url} className="fb-xfbml-parse-ignore">
                <a href={url}>Facebook Post</a>
              </blockquote>
            </div>
          </div>
        );
      }

      case 'linkedin': {
        return (
          <div className="flex justify-center">
            <iframe 
              src={`https://www.linkedin.com/embed/feed/update/${url.split('/').pop()}`}
              height="400" 
              width="504" 
              frameBorder="0" 
              allowFullScreen
              title="LinkedIn post"
              className="rounded-lg"
            />
          </div>
        );
      }

      case 'twitch': {
        const channelOrVideo = url.includes('/videos/') ? 
          `&video=${url.split('/videos/')[1]}` : 
          `&channel=${url.split('/')[3]}`;
        
        return (
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              src={`https://player.twitch.tv/?${channelOrVideo}&parent=${window.location.hostname}`}
              frameBorder="0"
              allowFullScreen
              scrolling="no"
              className="absolute top-0 left-0 w-full h-full rounded-lg"
            />
          </div>
        );
      }

      case 'spotify': {
        const spotifyId = url.split('/').pop().split('?')[0];
        const type = url.includes('/track/') ? 'track' : 
                    url.includes('/album/') ? 'album' : 
                    url.includes('/playlist/') ? 'playlist' : 'track';
        
        return (
          <iframe 
            src={`https://open.spotify.com/embed/${type}/${spotifyId}`}
            width="100%" 
            height="352" 
            frameBorder="0" 
            allowtransparency="true" 
            allow="encrypted-media"
            className="rounded-lg"
          />
        );
      }

      default:
        return (
          <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <div className="text-gray-600 mb-2">Embed não suportado</div>
            <div className="text-sm text-gray-500">Tipo: {type}</div>
            <a 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 underline mt-2 inline-block"
            >
              Ver conteúdo original
            </a>
          </div>
        );
    }
  };

  return (
    <div className={`social-embed ${className}`} style={{ width, height }}>
      {/* Label indicativo */}
      <div className="text-xs text-gray-500 text-center mb-2 uppercase tracking-wide">
        {type} embed
      </div>
      
      {/* Container do embed */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {renderEmbed()}
      </div>
      
      {/* Link para o conteúdo original */}
      <div className="text-center mt-2">
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-xs text-gray-500 hover:text-gray-700 underline"
        >
          Ver no {type.charAt(0).toUpperCase() + type.slice(1)}
        </a>
      </div>
    </div>
  );
}

// Exemplos de uso do componente:
/*
// YouTube
<SocialEmbed 
  type="youtube" 
  url="https://www.youtube.com/watch?v=dQw4w9WgXcQ" 
  autoplay={false}
/>

// Twitter
<SocialEmbed 
  type="twitter" 
  url="https://twitter.com/user/status/1234567890" 
/>

// TikTok
<SocialEmbed 
  type="tiktok" 
  url="https://www.tiktok.com/@user/video/1234567890" 
/>

// Instagram
<SocialEmbed 
  type="instagram" 
  url="https://www.instagram.com/p/ABC123/" 
/>

// Spotify
<SocialEmbed 
  type="spotify" 
  url="https://open.spotify.com/track/4iV5W9uYEdYUVa79Axb7Rh" 
/>

// Código personalizado
<SocialEmbed 
  type="custom" 
  embedCode={`<iframe src="..." width="100%" height="400"></iframe>`}
/>
*/