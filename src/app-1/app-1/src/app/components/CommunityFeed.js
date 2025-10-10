'use client';

import { useState, useEffect } from 'react';
import SocialEmbed from './SocialEmbed';

/**
 * Componente CommunityFeed - Exibe grid fluido de conteúdo das redes sociais
 * Similar ao feed da comunidade do Steam nas páginas de jogos
 * 
 * Props:
 * - posts: Array de posts da comunidade
 * - maxPosts: Número máximo de posts a exibir
 * - autoRefresh: Atualiza automaticamente (em segundos)
 * - layout: 'masonry' | 'grid' | 'list'
 * - showSentiment: Mostra análise de sentimento nos posts
 */
export default function CommunityFeed({ 
  posts = [], 
  maxPosts = 12,
  autoRefresh = 0,
  layout = 'masonry',
  showSentiment = true
}) {
  const [visiblePosts, setVisiblePosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all'); // 'all', 'positive', 'negative', 'neutral'
  const [sortBy, setSortBy] = useState('recent'); // 'recent', 'popular', 'sentiment'

  useEffect(() => {
    loadPosts();
  }, [posts, filter, sortBy, maxPosts]);

  useEffect(() => {
    if (autoRefresh > 0) {
      const interval = setInterval(() => {
        loadPosts();
      }, autoRefresh * 1000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const loadPosts = () => {
    setLoading(true);
    
    // Simula carregamento
    setTimeout(() => {
      let filteredPosts = [...posts];

      // Filtrar por sentimento
      if (filter !== 'all') {
        filteredPosts = filteredPosts.filter(post => post.sentiment === filter);
      }

      // Ordenar posts
      filteredPosts.sort((a, b) => {
        switch (sortBy) {
          case 'popular':
            return (b.engagement || 0) - (a.engagement || 0);
          case 'sentiment':
            const sentimentOrder = { positive: 3, neutral: 2, negative: 1 };
            return (sentimentOrder[b.sentiment] || 0) - (sentimentOrder[a.sentiment] || 0);
          case 'recent':
          default:
            return new Date(b.date || Date.now()) - new Date(a.date || Date.now());
        }
      });

      setVisiblePosts(filteredPosts.slice(0, maxPosts));
      setLoading(false);
    }, 500);
  };

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive': return 'text-green-600 bg-green-100';
      case 'negative': return 'text-red-600 bg-red-100';
      case 'neutral': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case 'positive': return '👍';
      case 'negative': return '👎';
      case 'neutral': return '😐';
      default: return '💬';
    }
  };

  const getLayoutClasses = () => {
    switch (layout) {
      case 'masonry':
        return 'columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4';
      case 'list':
        return 'space-y-4';
      case 'grid':
      default:
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4';
    }
  };

  return (
    <div className="community-feed">
      {/* Header com controles */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            💬 Opinião da Comunidade
          </h3>
          <p className="text-gray-600">
            Veja o que as pessoas estão dizendo nas redes sociais
          </p>
        </div>

        {/* Controles de filtro e ordenação */}
        <div className="flex flex-wrap gap-3">
          {/* Filtro por sentimento */}
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">Todos os posts</option>
            <option value="positive">👍 Positivos</option>
            <option value="neutral">😐 Neutros</option>
            <option value="negative">👎 Negativos</option>
          </select>

          {/* Ordenação */}
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="recent">Mais recentes</option>
            <option value="popular">Mais populares</option>
            <option value="sentiment">Por sentimento</option>
          </select>

          {/* Layout toggle */}
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setLayout('grid')}
              className={`px-3 py-2 text-sm ${layout === 'grid' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            >
              ⊞ Grid
            </button>
            <button
              onClick={() => setLayout('masonry')}
              className={`px-3 py-2 text-sm border-l border-gray-300 ${layout === 'masonry' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            >
              ⊟ Masonry
            </button>
          </div>

          {/* Refresh button */}
          <button
            onClick={loadPosts}
            disabled={loading}
            className="px-3 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 disabled:opacity-50 flex items-center space-x-2"
          >
            <span className={loading ? 'animate-spin' : ''}>🔄</span>
            <span>Atualizar</span>
          </button>
        </div>
      </div>

      {/* Estatísticas rápidas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-600">
            {posts.filter(p => p.sentiment === 'positive').length}
          </div>
          <div className="text-sm text-green-700">👍 Positivos</div>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-gray-600">
            {posts.filter(p => p.sentiment === 'neutral').length}
          </div>
          <div className="text-sm text-gray-700">😐 Neutros</div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-red-600">
            {posts.filter(p => p.sentiment === 'negative').length}
          </div>
          <div className="text-sm text-red-700">👎 Negativos</div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{posts.length}</div>
          <div className="text-sm text-blue-700">💬 Total</div>
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="text-gray-600">Carregando posts da comunidade...</span>
          </div>
        </div>
      )}

      {/* Posts grid */}
      {!loading && (
        <div className={getLayoutClasses()}>
          {visiblePosts.map((post, index) => (
            <div 
              key={post.id || index} 
              className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200 ${layout === 'masonry' ? 'break-inside-avoid mb-4' : ''}`}
            >
              {/* Post header */}
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    {/* Platform icon */}
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm">
                      {post.platform === 'youtube' && '▶️'}
                      {post.platform === 'twitter' && '🐦'}
                      {post.platform === 'tiktok' && '🎵'}
                      {post.platform === 'instagram' && '📷'}
                      {!['youtube', 'twitter', 'tiktok', 'instagram'].includes(post.platform) && '💬'}
                    </div>
                    
                    {/* User info */}
                    <div>
                      <div className="font-semibold text-sm text-gray-900">
                        {post.author || 'Usuário'}
                      </div>
                      <div className="text-xs text-gray-500">
                        {post.platform} • {new Date(post.date || Date.now()).toLocaleDateString('pt-BR')}
                      </div>
                    </div>
                  </div>

                  {/* Sentiment badge */}
                  {showSentiment && (
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${getSentimentColor(post.sentiment)}`}>
                      {getSentimentIcon(post.sentiment)} {post.sentiment}
                    </div>
                  )}
                </div>

                {/* Post content preview */}
                {post.content && (
                  <p className="text-sm text-gray-700 line-clamp-3 mb-2">
                    {post.content}
                  </p>
                )}
              </div>

              {/* Social embed */}
              <div className="p-4">
                <SocialEmbed
                  type={post.platform}
                  url={post.url}
                  className="mb-3"
                />
              </div>

              {/* Post footer */}
              <div className="px-4 pb-4">
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <span>❤️ {post.likes || 0}</span>
                    <span>💬 {post.comments || 0}</span>
                    <span>🔄 {post.shares || 0}</span>
                  </div>
                  
                  {/* Engagement score */}
                  <div className="text-xs bg-gray-100 px-2 py-1 rounded">
                    📊 {post.engagement || 0}% engajamento
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && visiblePosts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">😔</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Nenhum post encontrado
          </h3>
          <p className="text-gray-600 mb-4">
            Não há posts da comunidade que correspondam aos filtros selecionados.
          </p>
          <button
            onClick={() => {
              setFilter('all');
              setSortBy('recent');
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Limpar filtros
          </button>
        </div>
      )}

      {/* Load more button */}
      {!loading && visiblePosts.length < posts.length && (
        <div className="text-center mt-6">
          <button
            onClick={() => setMaxPosts(prev => prev + 6)}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            Carregar mais posts ({posts.length - visiblePosts.length} restantes)
          </button>
        </div>
      )}
    </div>
  );
}

// Exemplo de dados para posts da comunidade:
/*
const communityPosts = [
  {
    id: 1,
    platform: 'youtube',
    url: 'https://www.youtube.com/watch?v=VIDEO_ID',
    author: 'TechReviewer',
    content: 'Acabei de testar o produto e estou impressionado! A qualidade superou minhas expectativas.',
    sentiment: 'positive',
    likes: 234,
    comments: 45,
    shares: 12,
    engagement: 85,
    date: '2024-10-10T10:00:00Z'
  },
  {
    id: 2,
    platform: 'twitter',
    url: 'https://twitter.com/user/status/1234567890',
    author: 'UsuarioComum',
    content: 'Produto ok, mas poderia ser melhor pelo preço. Entrega foi rápida.',
    sentiment: 'neutral',
    likes: 56,
    comments: 8,
    shares: 3,
    engagement: 45,
    date: '2024-10-09T15:30:00Z'
  }
];
*/