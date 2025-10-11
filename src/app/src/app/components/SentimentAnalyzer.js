/**
 * SentimentAnalyzer - Utilitário para análise de sentimento de textos
 * Usado para analisar posts da comunidade e determinar sentimento
 */

export class SentimentAnalyzer {
  constructor() {
    // Dicionário de palavras positivas e negativas em português
    this.positiveWords = [
      'excelente', 'ótimo', 'maravilhoso', 'fantástico', 'perfeito', 'incrível',
      'amei', 'adorei', 'recomendo', 'qualidade', 'rápido', 'eficiente',
      'satisfeito', 'feliz', 'bom', 'boa', 'melhor', 'top', 'show',
      'legal', 'bacana', 'demais', 'sucesso', 'aprovado', 'vale',
      'worth', 'love', 'amazing', 'great', 'excellent', 'perfect',
      'awesome', 'fantastic', 'wonderful', 'brilliant', 'outstanding'
    ];

    this.negativeWords = [
      'ruim', 'péssimo', 'horrível', 'terrível', 'decepção', 'decepciona',
      'problema', 'defeito', 'lento', 'caro', 'não', 'nunca', 'odeio',
      'detesto', 'frustrante', 'irritante', 'pior', 'horrible', 'hate',
      'terrible', 'awful', 'bad', 'worst', 'disappointing', 'frustrated',
      'slow', 'expensive', 'broken', 'useless', 'waste', 'money'
    ];

    this.neutralWords = [
      'ok', 'normal', 'comum', 'regular', 'médio', 'média', 'razoável',
      'aceitável', 'básico', 'simples', 'okay', 'average', 'decent'
    ];

    // Multiplicadores para intensidade
    this.intensifiers = {
      'muito': 1.5,
      'super': 1.8,
      'extremamente': 2.0,
      'bastante': 1.3,
      'meio': 0.7,
      'um pouco': 0.5,
      'really': 1.5,
      'very': 1.5,
      'extremely': 2.0,
      'quite': 1.3,
      'somewhat': 0.7,
      'a bit': 0.5
    };

    // Negadores
    this.negators = [
      'não', 'nao', 'nunca', 'jamais', 'sem', 'not', 'no', 'never', 'without'
    ];
  }

  /**
   * Analisa o sentimento de um texto
   * @param {string} text - Texto para análise
   * @returns {Object} - Resultado da análise
   */
  analyze(text) {
    if (!text || typeof text !== 'string') {
      return {
        sentiment: 'neutral',
        score: 0,
        confidence: 0,
        details: {
          positive: 0,
          negative: 0,
          neutral: 0,
          words: []
        }
      };
    }

    const cleanText = this.cleanText(text);
    const words = cleanText.split(/\s+/);
    
    let positiveScore = 0;
    let negativeScore = 0;
    let neutralScore = 0;
    let foundWords = [];

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      const previousWord = i > 0 ? words[i - 1] : '';
      
      // Verifica se há negação
      const isNegated = this.negators.includes(previousWord.toLowerCase());
      
      // Verifica se há intensificador
      const intensifier = this.intensifiers[previousWord.toLowerCase()] || 1;

      let wordScore = 0;
      let wordType = 'neutral';

      // Determina o tipo da palavra
      if (this.positiveWords.includes(word.toLowerCase())) {
        wordScore = 1 * intensifier;
        wordType = 'positive';
      } else if (this.negativeWords.includes(word.toLowerCase())) {
        wordScore = -1 * intensifier;
        wordType = 'negative';
      } else if (this.neutralWords.includes(word.toLowerCase())) {
        wordScore = 0;
        wordType = 'neutral';
      }

      // Aplica negação se necessário
      if (isNegated && wordScore !== 0) {
        wordScore = -wordScore;
        wordType = wordType === 'positive' ? 'negative' : 'positive';
      }

      // Adiciona ao score total
      if (wordScore > 0) {
        positiveScore += wordScore;
      } else if (wordScore < 0) {
        negativeScore += Math.abs(wordScore);
      } else {
        neutralScore += 0.1; // Peso mínimo para palavras neutras
      }

      // Guarda palavra encontrada
      if (wordScore !== 0) {
        foundWords.push({
          word,
          score: wordScore,
          type: wordType,
          intensified: intensifier !== 1,
          negated: isNegated
        });
      }
    }

    // Calcula score final (-1 a 1)
    const totalScore = positiveScore + negativeScore + neutralScore;
    const finalScore = totalScore > 0 ? (positiveScore - negativeScore) / totalScore : 0;

    // Determina sentimento
    let sentiment = 'neutral';
    let confidence = 0;

    if (finalScore > 0.1) {
      sentiment = 'positive';
      confidence = Math.min(95, 50 + (finalScore * 100));
    } else if (finalScore < -0.1) {
      sentiment = 'negative';
      confidence = Math.min(95, 50 + (Math.abs(finalScore) * 100));
    } else {
      sentiment = 'neutral';
      confidence = Math.max(30, 100 - (Math.abs(finalScore) * 200));
    }

    return {
      sentiment,
      score: finalScore,
      confidence: Math.round(confidence),
      details: {
        positive: positiveScore,
        negative: negativeScore,
        neutral: neutralScore,
        words: foundWords
      }
    };
  }

  /**
   * Analisa múltiplos posts e retorna estatísticas
   * @param {Array} posts - Array de posts para análise
   * @returns {Object} - Estatísticas agregadas
   */
  analyzeMultiple(posts) {
    if (!Array.isArray(posts) || posts.length === 0) {
      return {
        overall: 'neutral',
        score: 0,
        confidence: 0,
        breakdown: {
          positive: 0,
          negative: 0,
          neutral: 0
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
      };
    }

    const analyses = posts.map(post => {
      const content = post.content || post.text || '';
      return this.analyze(content);
    });

    // Conta sentimentos
    const breakdown = {
      positive: analyses.filter(a => a.sentiment === 'positive').length,
      negative: analyses.filter(a => a.sentiment === 'negative').length,
      neutral: analyses.filter(a => a.sentiment === 'neutral').length
    };

    // Calcula score geral
    const totalScore = analyses.reduce((sum, a) => sum + a.score, 0) / analyses.length;
    
    // Determina sentimento geral
    let overall = 'neutral';
    if (breakdown.positive > breakdown.negative && breakdown.positive > breakdown.neutral) {
      overall = 'positive';
    } else if (breakdown.negative > breakdown.positive && breakdown.negative > breakdown.neutral) {
      overall = 'negative';
    }

    // Calcula confiança
    const confidence = Math.round(
      Math.min(95, 
        30 + (Math.abs(totalScore) * 100) + 
        ((Math.max(...Object.values(breakdown)) / posts.length) * 50)
      )
    );

    // Análise de tendências (últimos vs primeiros posts)
    const halfPoint = Math.floor(posts.length / 2);
    const recentPosts = posts.slice(0, halfPoint);
    const olderPosts = posts.slice(halfPoint);

    const recentAnalyses = recentPosts.map(p => this.analyze(p.content || ''));
    const olderAnalyses = olderPosts.map(p => this.analyze(p.content || ''));

    const recentScore = recentAnalyses.reduce((sum, a) => sum + a.score, 0) / recentAnalyses.length;
    const olderScore = olderAnalyses.reduce((sum, a) => sum + a.score, 0) / olderAnalyses.length;

    const trends = {
      improving: recentScore > olderScore + 0.1,
      stable: Math.abs(recentScore - olderScore) <= 0.1,
      declining: recentScore < olderScore - 0.1
    };

    // Extrai palavras-chave mais frequentes
    const allWords = analyses.flatMap(a => a.details.words);
    const positiveWords = allWords
      .filter(w => w.type === 'positive')
      .map(w => w.word)
      .slice(0, 5);
    
    const negativeWords = allWords
      .filter(w => w.type === 'negative')
      .map(w => w.word)
      .slice(0, 5);

    return {
      overall,
      score: totalScore,
      confidence,
      breakdown,
      trends,
      keywords: {
        positive: [...new Set(positiveWords)],
        negative: [...new Set(negativeWords)]
      }
    };
  }

  /**
   * Limpa o texto removendo caracteres especiais e normalizando
   * @param {string} text - Texto para limpeza
   * @returns {string} - Texto limpo
   */
  cleanText(text) {
    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ') // Remove pontuação
      .replace(/\s+/g, ' ') // Normaliza espaços
      .trim();
  }

  /**
   * Sugere melhorias baseadas na análise
   * @param {Object} analysis - Resultado da análise
   * @returns {Array} - Array de sugestões
   */
  getSuggestions(analysis) {
    const suggestions = [];

    if (analysis.overall === 'negative') {
      suggestions.push('Considere melhorar a qualidade do produto/serviço');
      suggestions.push('Responda às preocupações da comunidade');
      suggestions.push('Implemente melhorias baseadas no feedback');
    } else if (analysis.overall === 'neutral') {
      suggestions.push('Busque mais feedback da comunidade');
      suggestions.push('Destaque os pontos fortes do produto');
      suggestions.push('Melhore a comunicação com os usuários');
    } else {
      suggestions.push('Continue mantendo a qualidade');
      suggestions.push('Use o feedback positivo no marketing');
      suggestions.push('Expanda para novos mercados');
    }

    return suggestions;
  }
}

// Instância singleton para uso global
export const sentimentAnalyzer = new SentimentAnalyzer();

// Função helper para uso direto
export const analyzeSentiment = (text) => sentimentAnalyzer.analyze(text);
export const analyzeMultiplePosts = (posts) => sentimentAnalyzer.analyzeMultiple(posts);

// Exemplo de uso:
/*
import { sentimentAnalyzer, analyzeSentiment } from './SentimentAnalyzer';

// Análise de texto único
const result = analyzeSentiment('Este produto é muito bom e recomendo!');
console.log(result.sentiment); // 'positive'
console.log(result.confidence); // 85

// Análise de múltiplos posts
const posts = [
  { content: 'Produto excelente!' },
  { content: 'Não gostei, muito caro' },
  { content: 'Ok, nada demais' }
];

const stats = sentimentAnalyzer.analyzeMultiple(posts);
console.log(stats.overall); // 'neutral'
console.log(stats.breakdown); // { positive: 1, negative: 1, neutral: 1 }
*/