# 🌐 Social Media Embeds - Guia Completo

## 📋 Sobre

O componente `SocialEmbed` permite incorporar conteúdo de diversas redes sociais de forma fácil e responsiva em suas landing pages. Suporta as principais plataformas de mídia social com renderização nativa e otimizada.

## 🎯 Plataformas Suportadas

### ✅ Totalmente Implementadas:
- **🎬 YouTube** - Vídeos e YouTube Shorts
- **🐦 Twitter/X** - Tweets com interatividade completa
- **🎵 TikTok** - Vídeos virais com player nativo
- **📷 Instagram** - Posts e carroseis de fotos
- **📘 Facebook** - Posts e vídeos
- **💼 LinkedIn** - Posts corporativos
- **🎮 Twitch** - Lives e vídeos
- **🎧 Spotify** - Músicas, álbuns e playlists

### 🔧 Em Desenvolvimento:
- Pinterest - Pins e boards
- Reddit - Posts e threads
- Discord - Mensagens e servidores
- WhatsApp - Status e mensagens

## 🚀 Como Usar

### Instalação

O componente já está incluído no projeto. Apenas importe:

```javascript
import SocialEmbed from './components/SocialEmbed';
```

### Uso Básico

```javascript
// YouTube
<SocialEmbed 
  type="youtube" 
  url="https://www.youtube.com/watch?v=dQw4w9WgXcQ" 
/>

// Twitter
<SocialEmbed 
  type="twitter" 
  url="https://twitter.com/user/status/1234567890" 
/>

// TikTok
<SocialEmbed 
  type="tiktok" 
  url="https://www.tiktok.com/@username/video/1234567890" 
/>
```

### Props Disponíveis

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `type` | string | - | Tipo da plataforma ('youtube', 'twitter', etc.) |
| `url` | string | - | URL original do conteúdo |
| `embedCode` | string | null | Código HTML personalizado |
| `width` | string | '100%' | Largura do embed |
| `height` | string | 'auto' | Altura do embed |
| `autoplay` | boolean | false | Reprodução automática (quando suportado) |
| `className` | string | '' | Classes CSS adicionais |

## 📱 Exemplos por Plataforma

### 🎬 YouTube

```javascript
// Vídeo normal
<SocialEmbed 
  type="youtube" 
  url="https://www.youtube.com/watch?v=VIDEO_ID" 
  autoplay={false}
  className="my-4"
/>

// YouTube Shorts
<SocialEmbed 
  type="youtube" 
  url="https://www.youtube.com/shorts/SHORT_ID" 
/>

// Com dimensões customizadas
<SocialEmbed 
  type="youtube" 
  url="https://www.youtube.com/watch?v=VIDEO_ID"
  width="800px"
  height="450px"
/>
```

**Formatos de URL Suportados:**
- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://youtu.be/VIDEO_ID`
- `https://www.youtube.com/shorts/SHORT_ID`

### 🐦 Twitter/X

```javascript
<SocialEmbed 
  type="twitter" 
  url="https://twitter.com/username/status/TWEET_ID" 
/>

// Tema escuro (via CSS)
<SocialEmbed 
  type="twitter" 
  url="https://twitter.com/username/status/TWEET_ID"
  className="dark-theme"
/>
```

**Formatos de URL Suportados:**
- `https://twitter.com/username/status/TWEET_ID`
- `https://x.com/username/status/TWEET_ID`

### 🎵 TikTok

```javascript
<SocialEmbed 
  type="tiktok" 
  url="https://www.tiktok.com/@username/video/VIDEO_ID" 
/>

// Centralizado
<SocialEmbed 
  type="tiktok" 
  url="https://www.tiktok.com/@username/video/VIDEO_ID"
  className="flex justify-center"
/>
```

**Formatos de URL Suportados:**
- `https://www.tiktok.com/@username/video/VIDEO_ID`
- `https://vm.tiktok.com/SHORT_CODE`

### 📷 Instagram

```javascript
<SocialEmbed 
  type="instagram" 
  url="https://www.instagram.com/p/POST_ID/" 
/>

// Reel
<SocialEmbed 
  type="instagram" 
  url="https://www.instagram.com/reel/REEL_ID/" 
/>
```

**Formatos de URL Suportados:**
- `https://www.instagram.com/p/POST_ID/`
- `https://www.instagram.com/reel/REEL_ID/`

### 🎧 Spotify

```javascript
// Música
<SocialEmbed 
  type="spotify" 
  url="https://open.spotify.com/track/TRACK_ID" 
/>

// Playlist
<SocialEmbed 
  type="spotify" 
  url="https://open.spotify.com/playlist/PLAYLIST_ID" 
/>

// Álbum
<SocialEmbed 
  type="spotify" 
  url="https://open.spotify.com/album/ALBUM_ID" 
/>
```

### 🔧 Código HTML Personalizado

```javascript
<SocialEmbed 
  type="custom" 
  embedCode={`
    <iframe 
      src="https://exemplo.com/embed" 
      width="100%" 
      height="400"
      frameBorder="0">
    </iframe>
  `}
/>
```

## 🎨 Customização CSS

### Classes Disponíveis

```css
/* Container principal */
.social-embed {
  /* Seus estilos aqui */
}

/* Por tipo de plataforma */
.social-embed.youtube { }
.social-embed.twitter { }
.social-embed.tiktok { }
.social-embed.instagram { }

/* Estados */
.social-embed.loading { }
.social-embed.error { }
```

### Exemplo de Estilização

```css
.social-embed {
  margin: 1rem 0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.social-embed.twitter {
  max-width: 500px;
  margin: 0 auto;
}

.social-embed.tiktok {
  max-width: 325px;
  margin: 0 auto;
}
```

## ⚡ Performance e SEO

### Carregamento Otimizado
- Scripts de terceiros carregados apenas quando necessário
- Lazy loading automático para melhor performance
- Fallbacks para casos de erro de carregamento

### SEO Friendly
- Links para conteúdo original sempre visíveis
- Meta tags preservadas do conteúdo original
- Acessibilidade otimizada com ARIA labels

### Best Practices
- Use `loading="lazy"` para iframes quando possível
- Sempre forneça fallbacks com links para o conteúdo original
- Teste em diferentes dispositivos e conexões

## 🛠️ Troubleshooting

### Problemas Comuns

**1. Embed não carrega:**
- Verifique se a URL está correta
- Confirme se o conteúdo é público
- Teste com URLs diferentes da mesma plataforma

**2. Scripts não carregam:**
- Verifique se há bloqueadores de anúncio ativos
- Confirme se os domínios estão liberados no CSP
- Teste em modo incógnito

**3. Responsividade quebrada:**
- Use containers com aspect-ratio CSS
- Teste em diferentes tamanhos de tela
- Ajuste width/height props conforme necessário

### Debug Mode

Para debugar problemas, adicione:

```javascript
<SocialEmbed 
  type="youtube" 
  url="https://youtube.com/watch?v=INVALID"
  onError={(error) => console.log('Embed error:', error)}
/>
```

## 🔐 Privacidade e GDPR

### Conformidade
- Scripts de terceiros carregados apenas com consentimento
- Opção de preview antes do carregamento completo
- Links diretos como fallback sempre disponíveis

### Implementação com Consentimento

```javascript
const [hasConsent, setHasConsent] = useState(false);

{hasConsent ? (
  <SocialEmbed type="youtube" url={videoUrl} />
) : (
  <div className="consent-placeholder">
    <p>Este conteúdo requer consentimento para cookies</p>
    <button onClick={() => setHasConsent(true)}>
      Aceitar e carregar conteúdo
    </button>
  </div>
)}
```

## 📊 Analytics e Tracking

### Eventos Suportados
- `embed_loaded` - Quando o embed carrega
- `embed_error` - Quando há erro no carregamento
- `embed_interaction` - Quando usuário interage

### Implementação

```javascript
<SocialEmbed 
  type="youtube" 
  url={videoUrl}
  onLoad={() => analytics.track('embed_loaded', { type: 'youtube' })}
  onError={() => analytics.track('embed_error', { type: 'youtube' })}
/>
```

## 🚀 Próximas Features

### Em Desenvolvimento
- [ ] Modo offline com cache
- [ ] Preview thumbnails antes do carregamento
- [ ] Batch loading para múltiplos embeds
- [ ] Integração com Google Analytics

### Solicitações da Comunidade
- [ ] Suporte para Discord
- [ ] Integração com Pinterest
- [ ] Embeds de Reddit
- [ ] Stories do Instagram

---

## 📞 Suporte

Para dúvidas ou problemas:
1. Consulte a seção de troubleshooting
2. Verifique os exemplos na landing page de demonstração
3. Teste com URLs conhecidamente funcionais

**Página de Demonstração:** `/clientes/social-media-hub`

---

*Última atualização: Outubro 2024*