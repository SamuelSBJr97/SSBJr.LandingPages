import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Ads from '../../components/Ads';
import CommunityFeed from '../../components/CommunityFeed';
import PurchaseThermometer from '../../components/PurchaseThermometer';
import ChatWidget from '../../components/ChatWidget';
import GroupLinks from '../../components/GroupLinks';
import CookieConsent from '../../components/CookieConsent';
import NotificationManager from '../../components/NotificationManager';
import AnalyticsTracker from '../../components/AnalyticsTracker';
import { getCommunityPosts } from '../../data/communityData';

// Base de dados das landing pages (em um projeto real, isso viria de uma API ou CMS)
const landingPagesData = {
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
        {
          title: 'Escalabilidade Automática',
          description: 'Recursos que se ajustam automaticamente à demanda do seu negócio',
          icon: '⚡'
        },
        {
          title: 'Segurança Avançada',
          description: 'Proteção de dados com criptografia militar e compliance internacional',
          icon: '🔒'
        },
        {
          title: 'Suporte 24/7',
          description: 'Equipe especializada disponível a qualquer hora para ajudar sua empresa',
          icon: '🛠️'
        }
      ],
      testimonial: {
        text: 'A migração para a nuvem da Empresa A aumentou nossa produtividade em 300% e reduziu custos em 40%.',
        author: 'Maria Silva',
        position: 'CTO da TechCorp'
      }
    }
  },
  'campanha-black-friday': {
    title: 'Black Friday 2024 - Até 70% OFF em Tecnologia',
    description: 'As melhores ofertas da Black Friday 2024. Descontos imperdíveis em eletrônicos, smartphones e gadgets',
    keywords: 'black friday, ofertas, descontos, eletrônicos, promoções',
    ogImage: '/og-black-friday.jpg',
    content: {
      hero: {
        title: 'BLACK FRIDAY 2024',
        subtitle: 'Até 70% OFF nos melhores produtos de tecnologia',
        cta: 'Ver Ofertas Agora',
        image: '/hero-black-friday.jpg'
      },
      features: [
        {
          title: 'Smartphones',
          description: 'iPhone, Samsung Galaxy e mais com até 50% de desconto',
          icon: '📱'
        },
        {
          title: 'Notebooks',
          description: 'MacBooks, Dell, Lenovo com desconto de até 40%',
          icon: '💻'
        },
        {
          title: 'Gadgets',
          description: 'AirPods, smartwatches, tablets com preços únicos',
          icon: '⌚'
        }
      ],
      testimonial: {
        text: 'Consegui economizar R$ 2.000 na Black Friday do ano passado!',
        author: 'João Santos',
        position: 'Cliente Satisfeito'
      }
    }
  },
  'startup-xyz': {
    title: 'Startup XYZ - Inovação em Fintech que está Mudando o Mercado',
    description: 'Conheça a startup que revolucionou os pagamentos digitais e já processou R$ 1 bilhão em transações',
    keywords: 'startup, fintech, pagamentos digitais, inovação, investimento',
    ogImage: '/og-startup-xyz.jpg',
    content: {
      hero: {
        title: 'A Fintech que Revolucionou os Pagamentos',
        subtitle: 'R$ 1 bilhão em transações processadas e 500 mil usuários ativos',
        cta: 'Conheça Nossa História',
        image: '/hero-startup-xyz.jpg'
      },
      features: [
        {
          title: 'Pagamentos Instantâneos',
          description: 'Transferências em tempo real sem taxas abusivas',
          icon: '💰'
        },
        {
          title: 'API Robusta',
          description: 'Integração simples para desenvolvedores e empresas',
          icon: '🔧'
        },
        {
          title: 'Crescimento 500%',
          description: 'Crescimento anual sustentável e investidores de peso',
          icon: '📈'
        }
      ],
      testimonial: {
        text: 'A Startup XYZ reduziu nossos custos com transações em 60% e aumentou a satisfação dos clientes.',
        author: 'Ana Costa',
        position: 'CEO da RetailPlus'
      }
    }
  },
  'evento-tech-2024': {
    title: 'Tech Conference 2024 - O Maior Evento de Tecnologia do Brasil',
    description: 'Participe do evento que reunirá os maiores especialistas em IA, Cloud e Desenvolvimento. Inscrições abertas!',
    keywords: 'evento tecnologia, conferência, IA, desenvolvimento, networking',
    ogImage: '/og-evento-tech.jpg',
    content: {
      hero: {
        title: 'Tech Conference 2024',
        subtitle: '3 dias de conteúdo premium com os maiores especialistas do Brasil',
        cta: 'Garantir Minha Vaga',
        image: '/hero-evento-tech.jpg'
      },
      features: [
        {
          title: '50+ Palestrantes',
          description: 'CTOs das maiores empresas de tecnologia do país',
          icon: '🎤'
        },
        {
          title: 'Workshops Práticos',
          description: 'Hands-on em IA, Cloud Computing e DevOps',
          icon: '🛠️'
        },
        {
          title: 'Networking Premium',
          description: 'Conecte-se com mais de 2.000 profissionais',
          icon: '🤝'
        }
      ],
      testimonial: {
        text: 'O melhor evento de tecnologia que já participei. Saí com 10 contatos de negócio e 3 propostas de trabalho!',
        author: 'Carlos Oliveira',
        position: 'Lead Developer'
      }
    }
  },
  'social-media-hub': {
    title: 'Social Media Hub - Integração Completa de Redes Sociais',
    description: 'Plataforma que integra conteúdo do YouTube, TikTok, Twitter, Instagram e outras redes sociais em um só lugar',
    keywords: 'redes sociais, youtube, tiktok, twitter, instagram, integração, social media',
    ogImage: '/og-social-media-hub.jpg',
    content: {
      hero: {
        title: 'Todas as Suas Redes Sociais em Um Só Lugar',
        subtitle: 'Integre e exiba conteúdo do YouTube, TikTok, Twitter, Instagram e muito mais com nossa plataforma inovadora',
        cta: 'Ver Demonstração Interativa',
        image: '/hero-social-media.jpg'
      },
      features: [
        {
          title: 'Multi-Plataforma',
          description: 'Suporte para YouTube, TikTok, Twitter, Instagram, Facebook, LinkedIn e Spotify',
          icon: '🌐'
        },
        {
          title: 'Embeds Responsivos',
          description: 'Conteúdo otimizado para qualquer dispositivo e tamanho de tela',
          icon: '📱'
        },
        {
          title: 'Atualização Automática',
          description: 'Conteúdo sempre sincronizado com as redes sociais originais',
          icon: '🔄'
        }
      ],
      testimonial: {
        text: 'O Social Media Hub revolucionou nossa estratégia digital. Aumentamos o engajamento em 250% centralizando todo nosso conteúdo!',
        author: 'Ana Carolina',
        position: 'Social Media Manager'
      }
    }
  }
};

// Componente da Landing Page
export default async function ClienteLandingPage({ params }) {
  // Resolve params se for uma Promise (Next.js 13+)
  const resolvedParams = await Promise.resolve(params);
  const slug = resolvedParams.slug;
  
  const pageData = landingPagesData[slug];
  
  if (!pageData) {
    notFound();
  }

  const { content } = pageData;

  // Busca posts da comunidade para esta landing page
  const communityPosts = getCommunityPosts(slug);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-4">
              <Image
                src="/next.svg"
                alt="Logo"
                width={120}
                height={30}
                className="dark:invert"
              />
              <span className="text-xl font-semibold text-gray-900">Landing Pages</span>
            </Link>
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              ← Voltar ao Início
            </Link>
          </div>
        </div>
      </header>

      {/* Anúncio Topo */}
      <Ads position="top" type="banner" />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                {content.hero.title}
              </h1>
              <p className="text-xl mb-8 opacity-90">
                {content.hero.subtitle}
              </p>
              <button className="bg-white text-blue-600 font-bold py-4 px-8 rounded-lg text-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg">
                {content.hero.cta}
              </button>
            </div>
            <div className="hidden lg:block">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 text-center">
                <div className="text-6xl mb-4">🚀</div>
                <p className="text-lg">Imagem Hero</p>
                <p className="text-sm opacity-75">{content.hero.image}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Por que Escolher Nossa Solução?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Conheça os principais benefícios que fazem a diferença
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.features.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-200">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Anúncio Meio */}
      <Ads position="middle" type="square" />

      {/* Testimonial Section */}
      <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gray-50 rounded-lg p-8 md:p-12">
            <div className="text-4xl text-blue-600 mb-6">&ldquo;</div>
            <blockquote className="text-xl md:text-2xl text-gray-900 mb-8 font-medium">
              {content.testimonial.text}
            </blockquote>
            <div className="flex items-center justify-center space-x-4">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                {content.testimonial.author.charAt(0)}
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900">{content.testimonial.author}</p>
                <p className="text-gray-600">{content.testimonial.position}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section - Similar ao Steam */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Termômetro de Compras */}
            <div className="lg:col-span-1">
              <PurchaseThermometer 
                posts={communityPosts}
                productName={content.hero.title}
                showDetails={true}
                animate={true}
                size="medium"
              />
            </div>
            
            {/* Feed da Comunidade */}
            <div className="lg:col-span-2">
              <CommunityFeed 
                posts={communityPosts}
                maxPosts={6}
                layout="grid"
                showSentiment={true}
                autoRefresh={0}
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Pronto para Começar?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Entre em contato conosco e descubra como podemos ajudar sua empresa
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 font-bold py-4 px-8 rounded-lg text-lg hover:bg-gray-100 transition-colors duration-200">
              Entrar em Contato
            </button>
            <button className="border-2 border-white text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-white hover:text-blue-600 transition-colors duration-200">
              Solicitar Demonstração
            </button>
          </div>
        </div>
      </section>

      {/* Anúncio Rodapé */}
      <Ads position="bottom" type="banner" />

      {/* Grupos Exclusivos */}
      <GroupLinks landingPageSlug={slug} />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Link href="/" className="text-blue-400 hover:text-blue-300 font-medium">
              ← Voltar para a Home
            </Link>
            <p className="mt-4 text-gray-400">
              &copy; 2024 Landing Pages Pro. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>

      {/* Chat Widget */}
      <ChatWidget landingPageSlug={slug} />

      {/* Cookie Consent */}
      <CookieConsent />

      {/* Notification Manager */}
      <NotificationManager />

      {/* Analytics Tracker */}
      <AnalyticsTracker landingPageSlug={slug} />
    </div>
  );
}

// Função necessária para static export - gera todas as rotas estáticas no build
export async function generateStaticParams() {
  // Retorna todos os slugs disponíveis para pré-gerar no build
  return Object.keys(landingPagesData).map((slug) => ({
    slug,
  }));
}