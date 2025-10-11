'use client';

import { useState, useEffect } from 'react';

/**
 * Componente PurchaseThermometer - Termômetro de compras baseado no sentimento da comunidade
 * Similar ao sistema de avaliações do Steam
 * 
 * Props:
 * - posts: Array de posts da comunidade para análise
 * - productName: Nome do produto/serviço
 * - showDetails: Exibe detalhes da análise
 * - animate: Anima o termômetro ao carregar
 * - size: 'small' | 'medium' | 'large'
 */
export default function PurchaseThermometer({ 
  posts = [], 
  productName = 'Este produto',
  showDetails = true,
  animate = true,
  size = 'medium'
}) {
  const [analysis, setAnalysis] = useState({
    score: 0,
    recommendation: 'neutral',
    confidence: 0,
    breakdown: {
      positive: 0,
      neutral: 0,
      negative: 0
    },
    trends: {
      improving: false,
      stable: true,
      declining: false
    },
    keywords: {
      positive: [],
      negative: []
    }
  });

  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (posts.length > 0) {
      analyzeSentiment();
    }
  }, [posts]);

  const analyzeSentiment = () => {
    if (animate) {
      setIsAnimating(true);
    }

    // Simula análise de sentimento
    setTimeout(() => {
      const positiveCount = posts.filter(p => p.sentiment === 'positive').length;
      const neutralCount = posts.filter(p => p.sentiment === 'neutral').length;
      const negativeCount = posts.filter(p => p.sentiment === 'negative').length;
      const totalPosts = posts.length;

      if (totalPosts === 0) {
        setIsAnimating(false);
        return;
      }

      // Cálculo do score (0-100)
      const positiveWeight = 1;
      const neutralWeight = 0.5;
      const negativeWeight = 0;

      const weightedScore = (
        (positiveCount * positiveWeight) + 
        (neutralCount * neutralWeight) + 
        (negativeCount * negativeWeight)
      ) / totalPosts;

      const score = Math.round(weightedScore * 100);

      // Determina recomendação
      let recommendation = 'neutral';
      let confidence = 0;

      if (score >= 75) {
        recommendation = 'strong_buy';
        confidence = Math.min(95, 60 + (score - 75) * 1.4);
      } else if (score >= 60) {
        recommendation = 'buy';
        confidence = Math.min(85, 50 + (score - 60) * 2.3);
      } else if (score >= 45) {
        recommendation = 'neutral';
        confidence = Math.min(70, 40 + Math.abs(score - 52.5) * 2);
      } else if (score >= 30) {
        recommendation = 'caution';
        confidence = Math.min(75, 45 + (45 - score) * 2);
      } else {
        recommendation = 'avoid';
        confidence = Math.min(90, 50 + (30 - score) * 2.7);
      }

      // Análise de tendências (últimos 7 vs primeiros 7 posts)
      const recentPosts = posts.slice(0, 7);
      const olderPosts = posts.slice(-7);
      
      const recentScore = calculateScoreForPosts(recentPosts);
      const olderScore = calculateScoreForPosts(olderPosts);
      
      const trends = {
        improving: recentScore > olderScore + 5,
        stable: Math.abs(recentScore - olderScore) <= 5,
        declining: recentScore < olderScore - 5
      };

      // Extração de palavras-chave (simulada)
      const keywords = extractKeywords(posts);

      setAnalysis({
        score,
        recommendation,
        confidence: Math.round(confidence),
        breakdown: {
          positive: positiveCount,
          neutral: neutralCount,
          negative: negativeCount
        },
        trends,
        keywords
      });

      setIsAnimating(false);
    }, 1500);
  };

  const calculateScoreForPosts = (postList) => {
    if (postList.length === 0) return 50;
    const pos = postList.filter(p => p.sentiment === 'positive').length;
    const neu = postList.filter(p => p.sentiment === 'neutral').length;
    return Math.round(((pos + neu * 0.5) / postList.length) * 100);
  };

  const extractKeywords = (postList) => {
    // Simulação de extração de palavras-chave
    const positiveKeywords = ['excelente', 'ótimo', 'recomendo', 'perfeito', 'qualidade', 'rápido'];
    const negativeKeywords = ['ruim', 'lento', 'caro', 'problema', 'defeito', 'péssimo'];
    
    return {
      positive: positiveKeywords.slice(0, 3),
      negative: negativeKeywords.slice(0, 2)
    };
  };

  const getRecommendationConfig = () => {
    switch (analysis.recommendation) {
      case 'strong_buy':
        return {
          text: 'FORTE RECOMENDAÇÃO DE COMPRA',
          color: 'text-green-700',
          bgColor: 'bg-green-100',
          borderColor: 'border-green-300',
          icon: '🎯',
          description: 'A comunidade adora este produto!'
        };
      case 'buy':
        return {
          text: 'RECOMENDADO PARA COMPRA',
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          icon: '👍',
          description: 'Avaliações majoritariamente positivas'
        };
      case 'neutral':
        return {
          text: 'AVALIAÇÕES MISTAS',
          color: 'text-yellow-700',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          icon: '🤔',
          description: 'Pesquise mais antes de decidir'
        };
      case 'caution':
        return {
          text: 'COMPRE COM CAUTELA',
          color: 'text-orange-700',
          bgColor: 'bg-orange-50',
          borderColor: 'border-orange-200',
          icon: '⚠️',
          description: 'Algumas preocupações da comunidade'
        };
      case 'avoid':
        return {
          text: 'NÃO RECOMENDADO',
          color: 'text-red-700',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          icon: '❌',
          description: 'Muitas avaliações negativas'
        };
      default:
        return {
          text: 'AGUARDANDO ANÁLISE',
          color: 'text-gray-600',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          icon: '⏳',
          description: 'Coletando opiniões da comunidade'
        };
    }
  };

  const getThermometerColor = () => {
    if (analysis.score >= 75) return 'bg-gradient-to-t from-green-500 to-green-400';
    if (analysis.score >= 60) return 'bg-gradient-to-t from-green-400 to-yellow-400';
    if (analysis.score >= 45) return 'bg-gradient-to-t from-yellow-400 to-yellow-500';
    if (analysis.score >= 30) return 'bg-gradient-to-t from-orange-400 to-red-400';
    return 'bg-gradient-to-t from-red-500 to-red-600';
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return {
          container: 'p-4',
          thermometer: 'h-32 w-6',
          title: 'text-lg',
          score: 'text-2xl'
        };
      case 'large':
        return {
          container: 'p-8',
          thermometer: 'h-48 w-8',
          title: 'text-3xl',
          score: 'text-4xl'
        };
      case 'medium':
      default:
        return {
          container: 'p-6',
          thermometer: 'h-40 w-7',
          title: 'text-2xl',
          score: 'text-3xl'
        };
    }
  };

  const config = getRecommendationConfig();
  const sizeClasses = getSizeClasses();

  return (
    <div className={`bg-white rounded-lg shadow-lg border ${config.borderColor} ${sizeClasses.container}`}>
      {/* Header */}
      <div className="text-center mb-6">
        <h3 className={`font-bold text-gray-900 mb-2 ${sizeClasses.title}`}>
          🌡️ Termômetro de Compras
        </h3>
        <p className="text-gray-600">
          Baseado em {posts.length} avaliações da comunidade
        </p>
      </div>

      {/* Termômetro Visual */}
      <div className="flex items-center justify-center mb-6">
        <div className="flex items-end space-x-4">
          {/* Termômetro */}
          <div className="flex flex-col items-center">
            <div className={`relative ${sizeClasses.thermometer} bg-gray-200 rounded-full overflow-hidden border-2 border-gray-300`}>
              {/* Preenchimento do termômetro */}
              <div 
                className={`absolute bottom-0 left-0 right-0 ${getThermometerColor()} transition-all duration-2000 ease-out ${isAnimating ? 'h-0' : ''}`}
                style={{ 
                  height: isAnimating ? '0%' : `${analysis.score}%`,
                  transition: isAnimating ? 'none' : 'height 2s ease-out'
                }}
              />
              
              {/* Marcações do termômetro */}
              <div className="absolute inset-0 flex flex-col justify-between py-1">
                {[100, 75, 50, 25, 0].map(mark => (
                  <div key={mark} className="h-px bg-gray-400 opacity-50" />
                ))}
              </div>
            </div>
            
            {/* Labels do termômetro */}
            <div className="flex flex-col items-end text-xs text-gray-500 mt-2 space-y-3">
              <span>100%</span>
              <span>75%</span>
              <span>50%</span>
              <span>25%</span>
              <span>0%</span>
            </div>
          </div>

          {/* Score e Recomendação */}
          <div className="text-center">
            <div className={`font-bold ${sizeClasses.score} mb-2 ${isAnimating ? 'text-gray-400' : config.color}`}>
              {isAnimating ? '...' : `${analysis.score}%`}
            </div>
            <div className={`px-4 py-2 rounded-lg border-2 ${config.bgColor} ${config.borderColor} ${config.color} font-semibold text-sm text-center mb-2`}>
              {config.icon} {config.text}
            </div>
            <p className="text-xs text-gray-600 max-w-32">
              {config.description}
            </p>
          </div>
        </div>
      </div>

      {/* Detalhes da Análise */}
      {showDetails && !isAnimating && (
        <div className="space-y-4">
          {/* Breakdown de sentimentos */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <div className="text-lg font-bold text-green-600">
                {analysis.breakdown.positive}
              </div>
              <div className="text-xs text-green-700">Positivos</div>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
              <div className="text-lg font-bold text-gray-600">
                {analysis.breakdown.neutral}
              </div>
              <div className="text-xs text-gray-700">Neutros</div>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <div className="text-lg font-bold text-red-600">
                {analysis.breakdown.negative}
              </div>
              <div className="text-xs text-red-700">Negativos</div>
            </div>
          </div>

          {/* Tendência */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
            <div className="text-sm font-semibold text-gray-700 mb-2">📈 Tendência:</div>
            <div className="flex items-center space-x-2 text-sm">
              {analysis.trends.improving && (
                <span className="text-green-600">📈 Melhorando</span>
              )}
              {analysis.trends.stable && (
                <span className="text-gray-600">➡️ Estável</span>
              )}
              {analysis.trends.declining && (
                <span className="text-red-600">📉 Piorando</span>
              )}
              <span className="text-xs text-gray-500">
                (Confiança: {analysis.confidence}%)
              </span>
            </div>
          </div>

          {/* Palavras-chave */}
          <div className="space-y-2">
            {analysis.keywords.positive.length > 0 && (
              <div>
                <div className="text-xs font-semibold text-green-700 mb-1">👍 Pontos positivos:</div>
                <div className="flex flex-wrap gap-1">
                  {analysis.keywords.positive.map((keyword, index) => (
                    <span key={index} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {analysis.keywords.negative.length > 0 && (
              <div>
                <div className="text-xs font-semibold text-red-700 mb-1">👎 Preocupações:</div>
                <div className="flex flex-wrap gap-1">
                  {analysis.keywords.negative.map((keyword, index) => (
                    <span key={index} className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Call to Action */}
          <div className="text-center pt-4 border-t border-gray-200">
            <button className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200">
              {analysis.score >= 60 ? '🛒 Comprar Agora' : '🔍 Ver Mais Detalhes'}
            </button>
          </div>
        </div>
      )}

      {/* Loading state */}
      {isAnimating && (
        <div className="text-center py-6">
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
            <div className="h-4 bg-gray-300 rounded w-2/3 mx-auto"></div>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Analisando opiniões da comunidade...
          </p>
        </div>
      )}
    </div>
  );
}

// Exemplo de uso:
/*
<PurchaseThermometer 
  posts={communityPosts}
  productName="iPhone 15 Pro"
  showDetails={true}
  animate={true}
  size="medium"
/>
*/