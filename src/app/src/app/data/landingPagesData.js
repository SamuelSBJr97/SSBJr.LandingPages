export const landingPagesData = {
  'empresa-a': {
    title: 'Empresa A - Solução Inovadora em Cloud Computing',
    description: 'Transforme sua infraestrutura com as soluções em nuvem mais avançadas do mercado',
    keywords: 'cloud computing, infraestrutura, soluções empresariais, tecnologia',
    ogImage: '/og-empresa-a.jpg',
    content: {
      hero: {
        title: 'Revolucione sua Infraestrutura com Cloud Computing',
        subtitle: 'A Empresa A oferece soluções completas em nuvem para empresas de todos os portes',
        cta: 'Solicitar Demonstração Gratuita',
        image: '/hero-empresa-a.jpg'
      },
      features: [
        { title: 'Escalabilidade Automática', description: 'Recursos que se ajustam automaticamente à demanda do seu negócio', icon: '⚡' },
        { title: 'Segurança Avançada', description: 'Proteção de dados com criptografia militar e compliance internacional', icon: '🔒' },
        { title: 'Suporte 24/7', description: 'Equipe especializada disponível a qualquer hora para ajudar sua empresa', icon: '🛠️' }
      ],
      testimonial: { text: 'A migração para a nuvem da Empresa A aumentou nossa produtividade em 300% e reduziu custos em 40%.', author: 'Maria Silva', position: 'CTO da TechCorp' }
    }
  },
  'campanha-black-friday': {
    title: 'Black Friday 2024 - Até 70% OFF em Tecnologia',
    description: 'As melhores ofertas da Black Friday 2024. Descontos imperdíveis em eletrônicos, smartphones e gadgets',
    keywords: 'black friday, ofertas, descontos, eletrônicos, promoções',
    ogImage: '/og-black-friday.jpg',
    content: {
      hero: { title: 'BLACK FRIDAY 2024', subtitle: 'Até 70% OFF nos melhores produtos de tecnologia', cta: 'Ver Ofertas Agora', image: '/hero-black-friday.jpg' },
      features: [
        { title: 'Smartphones', description: 'iPhone, Samsung Galaxy e mais com até 50% de desconto', icon: '📱' },
        { title: 'Notebooks', description: 'MacBooks, Dell, Lenovo com desconto de até 40%', icon: '💻' },
        { title: 'Gadgets', description: 'AirPods, smartwatches, tablets com preços únicos', icon: '⌚' }
      ],
      testimonial: { text: 'Consegui economizar R$ 2.000 na Black Friday do ano passado!', author: 'João Santos', position: 'Cliente Satisfeito' }
    }
  },
  'startup-xyz': {
    title: 'Startup XYZ - Inovação em Fintech que está Mudando o Mercado',
    description: 'Conheça a startup que revolucionou os pagamentos digitais e já processou R$ 1 bilhão em transações',
    keywords: 'startup, fintech, pagamentos digitais, inovação, investimento',
    ogImage: '/og-startup-xyz.jpg',
    content: {
      hero: { title: 'A Fintech que Revolucionou os Pagamentos', subtitle: 'R$ 1 bilhão em transações processadas e 500 mil usuários ativos', cta: 'Conheça Nossa História', image: '/hero-startup-xyz.jpg' },
      features: [
        { title: 'Pagamentos Instantâneos', description: 'Transferências em tempo real sem taxas abusivas', icon: '💰' },
        { title: 'API Robusta', description: 'Integração simples para desenvolvedores e empresas', icon: '🔧' },
        { title: 'Crescimento 500%', description: 'Crescimento anual sustentável e investidores de peso', icon: '📈' }
      ],
      testimonial: { text: 'A Startup XYZ reduziu nossos custos com transações em 60% e aumentou a satisfação dos clientes.', author: 'Ana Costa', position: 'CEO da RetailPlus' }
    }
  },
  'evento-tech-2024': {
    title: 'Tech Conference 2024 - O Maior Evento de Tecnologia do Brasil',
    description: 'Participe do evento que reunirá os maiores especialistas em IA, Cloud e Desenvolvimento. Inscrições abertas!',
    keywords: 'evento tecnologia, conferência, IA, desenvolvimento, networking',
    ogImage: '/og-evento-tech.jpg',
    content: {
      hero: { title: 'Tech Conference 2024', subtitle: '3 dias de conteúdo premium com os maiores especialistas do Brasil', cta: 'Garantir Minha Vaga', image: '/hero-evento-tech.jpg' },
      features: [
        { title: '50+ Palestrantes', description: 'CTOs das maiores empresas de tecnologia do país', icon: '🎤' },
        { title: 'Workshops Práticos', description: 'Hands-on em IA, Cloud Computing e DevOps', icon: '🛠️' },
        { title: 'Networking Premium', description: 'Conecte-se com mais de 2.000 profissionais', icon: '🤝' }
      ],
      testimonial: { text: 'O melhor evento de tecnologia que já participei. Saí com 10 contatos de negócio e 3 propostas de trabalho!', author: 'Carlos Oliveira', position: 'Lead Developer' }
    }
  },
  'social-media-hub': {
    title: 'Social Media Hub - Integração Completa de Redes Sociais',
    description: 'Plataforma que integra conteúdo do YouTube, TikTok, Twitter, Instagram e outras redes sociais em um só lugar',
    keywords: 'redes sociais, youtube, tiktok, twitter, instagram, integração, social media',
    ogImage: '/og-social-media-hub.jpg',
    content: {
      hero: { title: 'Todas as Suas Redes Sociais em Um Só Lugar', subtitle: 'Integre e exiba conteúdo do YouTube, TikTok, Twitter, Instagram e muito mais com nossa plataforma inovadora', cta: 'Ver Demonstração Interativa', image: '/hero-social-media.jpg' },
      features: [
        { title: 'Multi-Plataforma', description: 'Suporte para YouTube, TikTok, Twitter, Instagram, Facebook, LinkedIn e Spotify', icon: '🌐' },
        { title: 'Embeds Responsivos', description: 'Conteúdo otimizado para qualquer dispositivo e tamanho de tela', icon: '📱' },
        { title: 'Atualização Automática', description: 'Conteúdo sempre sincronizado com as redes sociais originais', icon: '🔄' }
      ],
      testimonial: { text: 'O Social Media Hub revolucionou nossa estratégia digital. Aumentamos o engajamento em 250% centralizando todo nosso conteúdo!', author: 'Ana Carolina', position: 'Social Media Manager' }
    }
  }
};

export const allSlugs = () => Object.keys(landingPagesData);
