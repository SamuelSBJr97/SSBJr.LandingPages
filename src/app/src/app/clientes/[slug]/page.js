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
import ThemeSwitcher from '../../components/ThemeSwitcher';
import { getCommunityPosts } from '../../data/communityData';
import { landingPagesData, allSlugs } from '../../data/landingPagesData';

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
            <div className="flex items-center space-x-4">
              <ThemeSwitcher />
              <Link
                href="/lang"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Idioma
              </Link>
              <Link
                href="/"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                ← Voltar ao Início
              </Link>
            </div>
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
  return allSlugs().map((slug) => ({ slug }));
}

// Localized metadata per page
export async function generateMetadata({ params }) {
  const slug = params.slug;
  const pageData = landingPagesData[slug];
  if (!pageData) return {};

  return {
    title: pageData.title,
    description: pageData.description,
    openGraph: {
      title: pageData.title,
      description: pageData.description,
      images: [pageData.ogImage]
    },
    // alternates removed: static export without built-in i18n
  };
}