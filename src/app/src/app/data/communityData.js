/**
 * CommunityData - Dados mockados para demonstração do feed da comunidade
 * Simula posts reais das redes sociais com diferentes sentimentos
 */

export const communityData = {
  'empresa-a': [
    {
      id: 1,
      platform: 'youtube',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      author: 'TechReviewerBR',
      content: 'Testei a solução de cloud da Empresa A por 3 meses e estou impressionado! A migração foi super tranquila e o suporte técnico é excepcional. Recomendo muito!',
      sentiment: 'positive',
      likes: 342,
      comments: 28,
      shares: 15,
      engagement: 89,
      date: '2024-10-10T08:30:00Z'
    },
    {
      id: 2,
      platform: 'twitter',
      url: 'https://twitter.com/devops_guru/status/1234567890',
      author: 'DevOpsGuru',
      content: 'Implementamos a infraestrutura da @EmpresaA e nossa produtividade aumentou 300%. O auto-scaling funciona perfeitamente!',
      sentiment: 'positive',
      likes: 156,
      comments: 12,
      shares: 8,
      engagement: 76,
      date: '2024-10-09T14:15:00Z'
    },
    {
      id: 3,
      platform: 'linkedin',
      url: 'https://linkedin.com/posts/cto-startup_123456',
      author: 'Maria Silva - CTO',
      content: 'Após 6 meses usando a plataforma, posso dizer que a Empresa A entrega o que promete. Reduzimos custos em 40% e ganhamos em performance.',
      sentiment: 'positive',
      likes: 89,
      comments: 5,
      shares: 3,
      engagement: 67,
      date: '2024-10-08T16:45:00Z'
    },
    {
      id: 4,
      platform: 'instagram',
      url: 'https://www.instagram.com/p/ABC123/',
      author: 'startuplife_br',
      content: 'Setup da nossa nova infraestrutura na nuvem concluído! A equipe da Empresa A foi incrível no suporte. #cloud #startup',
      sentiment: 'positive',
      likes: 234,
      comments: 18,
      shares: 12,
      engagement: 82,
      date: '2024-10-07T11:20:00Z'
    },
    {
      id: 5,
      platform: 'twitter',
      url: 'https://twitter.com/usuario_comum/status/1234567891',
      author: 'João Santos',
      content: 'O preço da Empresa A está um pouco salgado, mas considerando a qualidade do serviço, vale o investimento. Poderia ser mais barato.',
      sentiment: 'neutral',
      likes: 23,
      comments: 4,
      shares: 1,
      engagement: 45,
      date: '2024-10-06T09:30:00Z'
    },
    {
      id: 6,
      platform: 'youtube',
      url: 'https://www.youtube.com/watch?v=abc12345',
      author: 'DevChannel',
      content: 'Tutorial: Como migrar para a nuvem com Empresa A. Processo bem documentado, mas demora um pouco para configurar tudo.',
      sentiment: 'neutral',
      likes: 67,
      comments: 15,
      shares: 5,
      engagement: 58,
      date: '2024-10-05T13:00:00Z'
    }
  ],

  'campanha-black-friday': [
    {
      id: 7,
      platform: 'tiktok',
      url: 'https://www.tiktok.com/@ofertas_tech/video/1234567890',
      author: 'OfertasTech',
      content: 'GENTE! Essa Black Friday está INSANA! iPhone 15 por R$3.500, notebook gamer por R$2.800... Corram que está voando!',
      sentiment: 'positive',
      likes: 1250,
      comments: 89,
      shares: 156,
      engagement: 94,
      date: '2024-10-10T15:30:00Z'
    },
    {
      id: 8,
      platform: 'instagram',
      url: 'https://www.instagram.com/p/DEF456/',
      author: 'compradora_profissa',
      content: 'Consegui economizar R$2.000 nas compras da Black Friday! As ofertas estão realmente boas esse ano 🛒💰',
      sentiment: 'positive',
      likes: 345,
      comments: 45,
      shares: 23,
      engagement: 87,
      date: '2024-10-09T19:45:00Z'
    },
    {
      id: 9,
      platform: 'twitter',
      url: 'https://twitter.com/deal_hunter/status/1234567892',
      author: 'DealHunter',
      content: 'Lista atualizada das melhores ofertas da #BlackFriday2024! Smartphone até 50% OFF, notebooks até 40% OFF. Thread com links nos comentários 👇',
      sentiment: 'positive',
      likes: 567,
      comments: 78,
      shares: 234,
      engagement: 91,
      date: '2024-10-08T12:15:00Z'
    },
    {
      id: 10,
      platform: 'youtube',
      url: 'https://www.youtube.com/watch?v=blackfriday2024',
      author: 'CanalOfertas',
      content: 'ALERTA: Algumas lojas estão com preços inflacionados antes da Black Friday. Sempre confiram o histórico de preços!',
      sentiment: 'neutral',
      likes: 189,
      comments: 34,
      shares: 12,
      engagement: 62,
      date: '2024-10-07T10:30:00Z'
    },
    {
      id: 11,
      platform: 'twitter',
      url: 'https://twitter.com/consumidor_br/status/1234567893',
      author: 'ConsumidorBR',
      content: 'Cuidado com as "ofertas" da Black Friday. Vi um notebook que custava R$2.500 semana passada sendo vendido por R$2.800 "com desconto".',
      sentiment: 'negative',
      likes: 123,
      comments: 45,
      shares: 67,
      engagement: 58,
      date: '2024-10-06T14:20:00Z'
    }
  ],

  'startup-xyz': [
    {
      id: 12,
      platform: 'linkedin',
      url: 'https://linkedin.com/posts/fintech-expert_987654',
      author: 'Ana Carolina - Fintech Expert',
      content: 'A Startup XYZ está revolucionando os pagamentos no Brasil! API simples, taxas justas e suporte excepcional. Já estamos integrando.',
      sentiment: 'positive',
      likes: 234,
      comments: 18,
      shares: 12,
      engagement: 84,
      date: '2024-10-10T11:00:00Z'
    },
    {
      id: 13,
      platform: 'twitter',
      url: 'https://twitter.com/ecommerce_ceo/status/1234567894',
      author: 'CEO E-commerce',
      content: 'Integramos a Startup XYZ no nosso checkout e as conversões aumentaram 25%! O processo de pagamento ficou muito mais fluido.',
      sentiment: 'positive',
      likes: 156,
      comments: 23,
      shares: 18,
      engagement: 78,
      date: '2024-10-09T16:30:00Z'
    },
    {
      id: 14,
      platform: 'youtube',
      url: 'https://www.youtube.com/watch?v=fintech_review',
      author: 'FintechReview',
      content: 'Review completo da Startup XYZ: prós e contras da nova fintech que promete revolucionar pagamentos digitais no Brasil.',
      sentiment: 'neutral',
      likes: 89,
      comments: 34,
      shares: 7,
      engagement: 65,
      date: '2024-10-08T14:45:00Z'
    },
    {
      id: 15,
      platform: 'instagram',
      url: 'https://www.instagram.com/p/GHI789/',
      author: 'dev_fullstack',
      content: 'Documentação da API da Startup XYZ é excelente! Em 2 horas já tinha a integração funcionando. Parabéns ao time técnico! 👨‍💻',
      sentiment: 'positive',
      likes: 167,
      comments: 12,
      shares: 8,
      engagement: 73,
      date: '2024-10-07T09:15:00Z'
    },
    {
      id: 16,
      platform: 'twitter',
      url: 'https://twitter.com/pequeno_lojista/status/1234567895',
      author: 'Pequeno Lojista',
      content: 'As taxas da Startup XYZ são boas, mas o suporte demora um pouco para responder. No geral estou satisfeito com o serviço.',
      sentiment: 'neutral',
      likes: 45,
      comments: 8,
      shares: 2,
      engagement: 52,
      date: '2024-10-06T17:20:00Z'
    }
  ],

  'evento-tech-2024': [
    {
      id: 17,
      platform: 'instagram',
      url: 'https://www.instagram.com/p/JKL012/',
      author: 'dev_conference',
      content: 'Tech Conference 2024 foi ÉPICA! 3 dias de puro aprendizado, networking incrível e palestrantes de alto nível. Já quero 2025!',
      sentiment: 'positive',
      likes: 456,
      comments: 67,
      shares: 34,
      engagement: 92,
      date: '2024-10-10T20:00:00Z'
    },
    {
      id: 18,
      platform: 'twitter',
      url: 'https://twitter.com/tech_lead_sp/status/1234567896',
      author: 'TechLead SP',
      content: 'Melhor evento de tecnologia que já participei! Workshops práticos, palestras inspiradoras e muito networking. Saí com 10 contatos novos!',
      sentiment: 'positive',
      likes: 234,
      comments: 45,
      shares: 23,
      engagement: 88,
      date: '2024-10-09T18:30:00Z'
    },
    {
      id: 19,
      platform: 'linkedin',
      url: 'https://linkedin.com/posts/cto-empresa_654321',
      author: 'Carlos Oliveira - CTO',
      content: 'Tech Conference 2024 superou expectativas! Conteúdo de altíssima qualidade, organização impecável. Já garantimos presença em 2025.',
      sentiment: 'positive',
      likes: 178,
      comments: 28,
      shares: 15,
      engagement: 81,
      date: '2024-10-08T22:15:00Z'
    },
    {
      id: 20,
      platform: 'youtube',
      url: 'https://www.youtube.com/watch?v=tech_conf_recap',
      author: 'DevVlog',
      content: 'VLOG: Minha experiência na Tech Conference 2024. Mostro os bastidores, palestras e o networking incrível do evento.',
      sentiment: 'positive',
      likes: 123,
      comments: 34,
      shares: 12,
      engagement: 74,
      date: '2024-10-07T15:45:00Z'
    },
    {
      id: 21,
      platform: 'twitter',
      url: 'https://twitter.com/junior_dev/status/1234567897',
      author: 'Junior Developer',
      content: 'Tech Conference foi legal, mas alguns workshops foram muito avançados para iniciantes. Poderia ter mais conteúdo para juniores.',
      sentiment: 'neutral',
      likes: 67,
      comments: 15,
      shares: 4,
      engagement: 58,
      date: '2024-10-06T13:30:00Z'
    },
    {
      id: 22,
      platform: 'instagram',
      url: 'https://www.instagram.com/p/MNO345/',
      author: 'estudante_cc',
      content: 'Primeira vez em um evento assim e foi transformador! Aprendi muito sobre IA, cloud e desenvolvimento. Valeu cada centavo!',
      sentiment: 'positive',
      likes: 89,
      comments: 12,
      shares: 6,
      engagement: 69,
      date: '2024-10-05T11:00:00Z'
    }
  ],

  'social-media-hub': [
    {
      id: 23,
      platform: 'youtube',
      url: 'https://www.youtube.com/watch?v=social_media_tips',
      author: 'MarketingDigital',
      content: 'Como usar o Social Media Hub para aumentar engajamento: tutorial completo com todas as funcionalidades da plataforma.',
      sentiment: 'positive',
      likes: 345,
      comments: 56,
      shares: 28,
      engagement: 85,
      date: '2024-10-10T14:00:00Z'
    },
    {
      id: 24,
      platform: 'twitter',
      url: 'https://twitter.com/social_manager/status/1234567898',
      author: 'Social Media Manager',
      content: 'O Social Media Hub centralizou todo nosso conteúdo e aumentou engajamento em 250%! Ferramenta essencial para agências.',
      sentiment: 'positive',
      likes: 189,
      comments: 23,
      shares: 12,
      engagement: 79,
      date: '2024-10-09T10:45:00Z'
    },
    {
      id: 25,
      platform: 'instagram',
      url: 'https://www.instagram.com/p/PQR678/',
      author: 'agencia_criativa',
      content: 'Dashboard do Social Media Hub é incrível! Conseguimos monitorar todas as redes sociais dos clientes em um só lugar 📊✨',
      sentiment: 'positive',
      likes: 267,
      comments: 34,
      shares: 19,
      engagement: 83,
      date: '2024-10-08T16:20:00Z'
    },
    {
      id: 26,
      platform: 'linkedin',
      url: 'https://linkedin.com/posts/marketing-director_567890',
      author: 'Marketing Director',
      content: 'Implementamos o Social Media Hub e os resultados foram impressionantes. ROI aumentou 180% em 3 meses de uso.',
      sentiment: 'positive',
      likes: 123,
      comments: 18,
      shares: 9,
      engagement: 75,
      date: '2024-10-07T12:30:00Z'
    },
    {
      id: 27,
      platform: 'twitter',
      url: 'https://twitter.com/freelance_smm/status/1234567899',
      author: 'Freelancer SMM',
      content: 'Interface do Social Media Hub é boa, mas tem uma curva de aprendizado. Depois que pega o jeito, facilita muito o trabalho.',
      sentiment: 'neutral',
      likes: 56,
      comments: 12,
      shares: 3,
      engagement: 48,
      date: '2024-10-06T15:15:00Z'
    }
  ]
};

/**
 * Função para obter posts da comunidade por slug da landing page
 * @param {string} slug - Slug da landing page
 * @returns {Array} - Array de posts da comunidade
 */
export const getCommunityPosts = (slug) => {
  return communityData[slug] || [];
};

/**
 * Função para gerar posts aleatórios para demonstração
 * @param {number} count - Número de posts a gerar
 * @returns {Array} - Array de posts aleatórios
 */
export const generateRandomPosts = (count = 10) => {
  const platforms = ['youtube', 'twitter', 'instagram', 'tiktok', 'linkedin'];
  const sentiments = ['positive', 'neutral', 'negative'];
  const authors = [
    'TechUser', 'MarketingPro', 'DevExpert', 'DigitalNomad', 'StartupGuru',
    'ContentCreator', 'SocialMedia', 'BusinessOwner', 'Freelancer', 'Student'
  ];
  
  const positiveContents = [
    'Produto incrível! Superou todas as expectativas.',
    'Recomendo muito! Qualidade excepcional.',
    'Melhor investimento que fiz esse ano.',
    'Atendimento excelente e produto top.',
    'Vale muito a pena! Estou impressionado.'
  ];
  
  const neutralContents = [
    'Produto ok, nada de especial mas cumpre o que promete.',
    'Atende as necessidades básicas, preço justo.',
    'Funciona bem, mas poderia ser melhor.',
    'Experiência mediana, nem bom nem ruim.',
    'Produto decente pelo preço que cobram.'
  ];
  
  const negativeContents = [
    'Não recomendo, tive vários problemas.',
    'Qualidade deixa a desejar pelo preço.',
    'Atendimento péssimo, produto com defeito.',
    'Perda de tempo e dinheiro.',
    'Experiência frustrante, não vale a pena.'
  ];

  const posts = [];
  
  for (let i = 0; i < count; i++) {
    const sentiment = sentiments[Math.floor(Math.random() * sentiments.length)];
    const platform = platforms[Math.floor(Math.random() * platforms.length)];
    const author = authors[Math.floor(Math.random() * authors.length)];
    
    let content = '';
    if (sentiment === 'positive') {
      content = positiveContents[Math.floor(Math.random() * positiveContents.length)];
    } else if (sentiment === 'negative') {
      content = negativeContents[Math.floor(Math.random() * negativeContents.length)];
    } else {
      content = neutralContents[Math.floor(Math.random() * neutralContents.length)];
    }

    posts.push({
      id: i + 1000,
      platform,
      url: `https://example.com/${platform}/post/${i}`,
      author,
      content,
      sentiment,
      likes: Math.floor(Math.random() * 500) + 10,
      comments: Math.floor(Math.random() * 50) + 1,
      shares: Math.floor(Math.random() * 25) + 1,
      engagement: Math.floor(Math.random() * 40) + 30,
      date: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString()
    });
  }
  
  return posts;
};

/**
 * Função para obter estatísticas dos posts
 * @param {Array} posts - Array de posts
 * @returns {Object} - Estatísticas dos posts
 */
export const getPostsStats = (posts) => {
  if (!posts || posts.length === 0) {
    return {
      total: 0,
      positive: 0,
      neutral: 0,
      negative: 0,
      averageEngagement: 0,
      topPlatforms: []
    };
  }

  const positive = posts.filter(p => p.sentiment === 'positive').length;
  const neutral = posts.filter(p => p.sentiment === 'neutral').length;
  const negative = posts.filter(p => p.sentiment === 'negative').length;
  
  const totalEngagement = posts.reduce((sum, post) => sum + (post.engagement || 0), 0);
  const averageEngagement = Math.round(totalEngagement / posts.length);
  
  // Conta posts por plataforma
  const platformCounts = posts.reduce((acc, post) => {
    acc[post.platform] = (acc[post.platform] || 0) + 1;
    return acc;
  }, {});
  
  const topPlatforms = Object.entries(platformCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3)
    .map(([platform, count]) => ({ platform, count }));

  return {
    total: posts.length,
    positive,
    neutral,
    negative,
    averageEngagement,
    topPlatforms
  };
};

export default communityData;