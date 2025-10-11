import Image from "next/image";
import Link from "next/link";
import Sponsor from "./components/Sponsor";

// Lista de clientes/campanhas disponíveis
const landingPages = [
  {
    slug: "empresa-a",
    title: "Empresa A - Solução Inovadora",
    description: "Descubra como a Empresa A está revolucionando o mercado",
    category: "Tecnologia"
  },
  {
    slug: "campanha-black-friday",
    title: "Black Friday 2024",
    description: "As melhores ofertas da Black Friday em um só lugar",
    category: "E-commerce"
  },
  {
    slug: "startup-xyz",
    title: "Startup XYZ - Crescimento Exponencial",
    description: "A história de sucesso da Startup XYZ",
    category: "Startups"
  },
  {
    slug: "evento-tech-2024",
    title: "Tech Conference 2024",
    description: "O maior evento de tecnologia do ano",
    category: "Eventos"
  },
  {
    slug: "social-media-hub",
    title: "Social Media Hub 🌐",
    description: "Integração completa com YouTube, TikTok, Twitter, Instagram e mais",
    category: "Social Media"
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Image
                src="/next.svg"
                alt="Logo"
                width={120}
                height={30}
                className="dark:invert"
                priority
              />
              <h1 className="text-2xl font-bold text-gray-900">Landing Pages</h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link>
              <Link href="/sobre" className="text-gray-600 hover:text-gray-900">Sobre</Link>
              <Link href="/contato" className="text-gray-600 hover:text-gray-900">Contato</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Sponsor Section */}
        <section className="mb-16">
          <Sponsor 
            name="TechSponsor Pro"
            logo="/next.svg"
            website="https://techsponsor.exemplo.com"
            description="Impulsionando inovação e crescimento através de parcerias estratégicas"
          />
        </section>

        {/* Hero Section */}
        <section className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Landing Pages
            <span className="text-blue-600"> Personalizadas</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Explore nossa coleção de landing pages otimizadas para diferentes clientes e campanhas. 
            Cada página é cuidadosamente desenvolvida para maximizar conversões e engagement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#landing-pages"
              className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Ver Landing Pages
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </Link>
            <Link
              href="/contato"
              className="inline-flex items-center px-8 py-3 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors duration-200"
            >
              Solicitar Nova Landing Page
            </Link>
          </div>
        </section>

        {/* Landing Pages Grid */}
        <section id="landing-pages" className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Nossas Landing Pages
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Cada landing page é otimizada para SEO, responsiva e focada em conversão.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {landingPages.map((page) => (
              <Link
                key={page.slug}
                href={`/clientes/${page.slug}`}
                className="group bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
              >
                <div className="p-6">
                  {/* Category Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {page.category}
                    </span>
                    <svg 
                      className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>

                  {/* Content */}
                  <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {page.title}
                  </h4>
                  <p className="text-gray-600 text-sm">
                    {page.description}
                  </p>

                  {/* Footer */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <span className="text-sm text-blue-600 font-medium group-hover:text-blue-700">
                      Visitar página →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Precisa de uma Landing Page Personalizada?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Nossa equipe especializada pode criar uma landing page única para sua empresa ou campanha, 
            otimizada para conversão e com SEO técnico avançado.
          </p>
          <Link
            href="/contato"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Solicitar Orçamento
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">Landing Pages Pro</h4>
              <p className="text-gray-400">
                Criamos landing pages de alta conversão para empresas e campanhas de todos os tamanhos.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Links Úteis</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/" className="hover:text-white">Home</Link></li>
                <li><Link href="/sobre" className="hover:text-white">Sobre</Link></li>
                <li><Link href="/contato" className="hover:text-white">Contato</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contato</h4>
              <p className="text-gray-400">
                Email: contato@landingpages.com<br />
                Telefone: (11) 99999-9999
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Landing Pages Pro. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
