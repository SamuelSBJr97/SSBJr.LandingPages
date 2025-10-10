import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Ads from '../../components/Ads';
import SocialEmbed from '../../components/SocialEmbed';

// Página especializada para demonstrar embeds de redes sociais
export default async function SocialMediaHubPage({ params }) {
  const resolvedParams = await Promise.resolve(params);
  const slug = resolvedParams.slug;
  
  // Só renderiza se for a página do social media hub
  if (slug !== 'social-media-hub') {
    notFound();
  }

  // Exemplos de conteúdo das redes sociais para demonstração
  const socialContent = {
    youtube: [
      {
        title: 'Vídeo de Demonstração - Tecnologia',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        description: 'Exemplo de embed do YouTube com vídeo em alta qualidade'
      },
      {
        title: 'YouTube Shorts - Tendências',
        url: 'https://www.youtube.com/shorts/abc123',
        description: 'Demonstração de YouTube Shorts incorporado'
      }
    ],
    twitter: [
      {
        title: 'Tweet Viral sobre Tecnologia',
        url: 'https://twitter.com/elonmusk/status/1234567890',
        description: 'Exemplo de tweet incorporado com engajamento'
      }
    ],
    tiktok: [
      {
        title: 'Vídeo Viral TikTok',
        url: 'https://www.tiktok.com/@user/video/1234567890',
        description: 'Demonstração de vídeo TikTok incorporado'
      }
    ],
    instagram: [
      {
        title: 'Post Instagram Popular',
        url: 'https://www.instagram.com/p/ABC123/',
        description: 'Exemplo de post do Instagram com múltiplas fotos'
      }
    ],
    spotify: [
      {
        title: 'Playlist Corporativa',
        url: 'https://open.spotify.com/playlist/4iV5W9uYEdYUVa79Axb7Rh',
        description: 'Playlist de música ambiente para escritório'
      }
    ]
  };

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
              <span className="text-xl font-semibold text-gray-900">Social Media Hub</span>
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

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              🌐 Social Media Hub
            </h1>
            <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
              Demonstração completa de integração com as principais redes sociais: 
              YouTube, TikTok, Twitter, Instagram, Spotify e muito mais!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-purple-600 font-bold py-4 px-8 rounded-lg text-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg">
                🚀 Ver Demonstração Interativa
              </button>
              <button className="border-2 border-white text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-white hover:text-purple-600 transition-colors duration-200">
                📊 Casos de Uso
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Anúncio Topo */}
      <Ads position="top" type="banner" />

      {/* Demonstrações por Plataforma */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              🎬 Demonstrações Interativas
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Veja como integrar conteúdo de diferentes redes sociais de forma seamless em sua landing page
            </p>
          </div>

          {/* YouTube Section */}
          <div className="mb-16">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center text-white text-2xl font-bold mr-4">
                ▶️
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">YouTube</h3>
                <p className="text-gray-600">Vídeos e YouTube Shorts incorporados</p>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {socialContent.youtube.map((item, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                  <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <SocialEmbed 
                    type="youtube" 
                    url={item.url}
                    className="mb-4"
                  />
                  <div className="text-sm text-gray-500">
                    <strong>URL:</strong> {item.url}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Twitter Section */}
          <div className="mb-16">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-blue-400 rounded-lg flex items-center justify-center text-white text-2xl font-bold mr-4">
                🐦
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Twitter / X</h3>
                <p className="text-gray-600">Tweets incorporados com interatividade completa</p>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {socialContent.twitter.map((item, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                  <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <SocialEmbed 
                    type="twitter" 
                    url={item.url}
                    className="mb-4"
                  />
                  <div className="text-sm text-gray-500">
                    <strong>URL:</strong> {item.url}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* TikTok Section */}
          <div className="mb-16">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center text-white text-2xl font-bold mr-4">
                🎵
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">TikTok</h3>
                <p className="text-gray-600">Vídeos virais do TikTok com reprodução nativa</p>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {socialContent.tiktok.map((item, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                  <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <SocialEmbed 
                    type="tiktok" 
                    url={item.url}
                    className="mb-4"
                  />
                  <div className="text-sm text-gray-500">
                    <strong>URL:</strong> {item.url}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Instagram Section */}
          <div className="mb-16">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white text-2xl font-bold mr-4">
                📷
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Instagram</h3>
                <p className="text-gray-600">Posts e stories do Instagram incorporados</p>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {socialContent.instagram.map((item, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                  <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <SocialEmbed 
                    type="instagram" 
                    url={item.url}
                    className="mb-4"
                  />
                  <div className="text-sm text-gray-500">
                    <strong>URL:</strong> {item.url}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Spotify Section */}
          <div className="mb-16">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center text-white text-2xl font-bold mr-4">
                🎧
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Spotify</h3>
                <p className="text-gray-600">Músicas e playlists do Spotify integradas</p>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {socialContent.spotify.map((item, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                  <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <SocialEmbed 
                    type="spotify" 
                    url={item.url}
                    className="mb-4"
                  />
                  <div className="text-sm text-gray-500">
                    <strong>URL:</strong> {item.url}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Anúncio Meio */}
      <Ads position="middle" type="square" />

      {/* Código de Exemplo */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              👨‍💻 Como Implementar
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Veja como é simples integrar esses embeds em suas próprias landing pages
            </p>
          </div>

          <div className="bg-gray-900 rounded-lg p-8 text-white">
            <h3 className="text-xl font-bold mb-4 text-green-400">{'// Exemplo de Código React'}</h3>
            <pre className="text-sm overflow-x-auto">
{`import SocialEmbed from './components/SocialEmbed';

function MyLandingPage() {
  return (
    <div>
      {/* YouTube Video */}
      <SocialEmbed 
        type="youtube" 
        url="https://www.youtube.com/watch?v=abc123" 
        autoplay={false}
      />

      {/* Twitter Tweet */}
      <SocialEmbed 
        type="twitter" 
        url="https://twitter.com/user/status/123456" 
      />

      {/* TikTok Video */}
      <SocialEmbed 
        type="tiktok" 
        url="https://www.tiktok.com/@user/video/123456" 
      />

      {/* Instagram Post */}
      <SocialEmbed 
        type="instagram" 
        url="https://www.instagram.com/p/ABC123/" 
      />

      {/* Spotify Playlist */}
      <SocialEmbed 
        type="spotify" 
        url="https://open.spotify.com/playlist/123456" 
      />

      {/* Código HTML personalizado */}
      <SocialEmbed 
        type="custom" 
        embedCode="<iframe src='...' width='100%' height='400'></iframe>"
      />
    </div>
  );
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Pronto para Revolucionar Seu Conteúdo?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Integre todas as suas redes sociais e maximize o engajamento da sua audiência
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-600 font-bold py-4 px-8 rounded-lg text-lg hover:bg-gray-100 transition-colors duration-200">
              🚀 Começar Agora
            </button>
            <button className="border-2 border-white text-white font-bold py-4 px-8 rounded-lg text-lg hover:bg-white hover:text-purple-600 transition-colors duration-200">
              📞 Falar com Especialista
            </button>
          </div>
        </div>
      </section>

      {/* Anúncio Rodapé */}
      <Ads position="bottom" type="banner" />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Link href="/" className="text-blue-400 hover:text-blue-300 font-medium">
              ← Voltar para a Home
            </Link>
            <p className="mt-4 text-gray-400">
              &copy; 2024 Social Media Hub. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}