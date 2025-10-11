// Este arquivo demonstra como implementar generateMetadata para SEO dinâmico
// No Next.js 13+ App Router

import { notFound } from 'next/navigation';

// Base de dados das landing pages para metadata
const landingPagesMetadata = {
  'empresa-a': {
    title: 'Empresa A - Solução Inovadora em Cloud Computing | Landing Pages Pro',
    description: 'Transforme sua infraestrutura com as soluções em nuvem mais avançadas do mercado. Escalabilidade automática, segurança avançada e suporte 24/7.',
    keywords: 'cloud computing, infraestrutura, soluções empresariais, tecnologia, nuvem',
    ogImage: '/og-empresa-a.jpg',
    canonical: '/clientes/empresa-a',
    author: 'Empresa A',
    robots: 'index, follow',
    alternates: {
      canonical: 'https://landingpages.exemplo.com/clientes/empresa-a'
    }
  },
  'campanha-black-friday': {
    title: 'Black Friday 2024 - Até 70% OFF em Tecnologia | Ofertas Imperdíveis',
    description: 'As melhores ofertas da Black Friday 2024. Descontos imperdíveis em eletrônicos, smartphones e gadgets. Economia garantida de até 70%!',
    keywords: 'black friday, ofertas, descontos, eletrônicos, promoções, tecnologia',
    ogImage: '/og-black-friday.jpg',
    canonical: '/clientes/campanha-black-friday',
    author: 'Black Friday Team',
    robots: 'index, follow',
    alternates: {
      canonical: 'https://landingpages.exemplo.com/clientes/campanha-black-friday'
    }
  },
  'startup-xyz': {
    title: 'Startup XYZ - Fintech que Revolucionou Pagamentos Digitais',
    description: 'Conheça a startup que revolucionou os pagamentos digitais e já processou R$ 1 bilhão em transações. Case de sucesso em fintech.',
    keywords: 'startup, fintech, pagamentos digitais, inovação, investimento, case de sucesso',
    ogImage: '/og-startup-xyz.jpg',
    canonical: '/clientes/startup-xyz',
    author: 'Startup XYZ',
    robots: 'index, follow',
    alternates: {
      canonical: 'https://landingpages.exemplo.com/clientes/startup-xyz'
    }
  },
  'evento-tech-2024': {
    title: 'Tech Conference 2024 - O Maior Evento de Tecnologia do Brasil',
    description: 'Participe do evento que reunirá os maiores especialistas em IA, Cloud e Desenvolvimento. 50+ palestrantes, workshops práticos e networking premium.',
    keywords: 'evento tecnologia, conferência, IA, desenvolvimento, networking, workshop',
    ogImage: '/og-evento-tech.jpg',
    canonical: '/clientes/evento-tech-2024',
    author: 'Tech Conference',
    robots: 'index, follow',
    alternates: {
      canonical: 'https://landingpages.exemplo.com/clientes/evento-tech-2024'
    }
  }
};

// Função que gera metadata dinâmica para cada landing page
export async function generateMetadata({ params }) {
  // Resolve params se for uma Promise (Next.js 13+)
  const resolvedParams = await Promise.resolve(params);
  const slug = resolvedParams.slug;
  
  // Busca os dados da página
  const pageMetadata = landingPagesMetadata[slug];
  
  // Se não encontrar a página, retorna 404
  if (!pageMetadata) {
    notFound();
  }

  const {
    title,
    description,
    keywords,
    ogImage,
    author,
    robots,
    alternates
  } = pageMetadata;

  return {
    // Título da página (aparece na aba do navegador e resultados do Google)
    title,
    
    // Descrição da página (aparece nos resultados do Google)
    description,
    
    // Palavras-chave (menos importante para SEO moderno, mas ainda útil)
    keywords,
    
    // Autor da página
    authors: [{ name: author }],
    
    // Instruções para robôs de busca
    robots,
    
    // URL canônica (evita conteúdo duplicado)
    alternates,
    
    // Open Graph (Facebook, WhatsApp, LinkedIn)
    openGraph: {
      title,
      description,
      type: 'website',
      url: alternates.canonical,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        }
      ],
      siteName: 'Landing Pages Pro',
      locale: 'pt_BR',
    },
    
    // Twitter Cards
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
      creator: '@landingpagespro',
      site: '@landingpagespro',
    },
    
    // Dados estruturados para Google Rich Snippets
    other: {
      // Schema.org JSON-LD
      'application/ld+json': JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: title,
        description,
        url: alternates.canonical,
        image: ogImage,
        author: {
          '@type': 'Organization',
          name: author
        },
        publisher: {
          '@type': 'Organization',
          name: 'Landing Pages Pro',
          url: 'https://landingpages.exemplo.com'
        },
        mainEntity: {
          '@type': 'Article',
          headline: title,
          description,
          image: ogImage,
          author: {
            '@type': 'Organization',
            name: author
          },
          publisher: {
            '@type': 'Organization',
            name: 'Landing Pages Pro'
          },
          datePublished: new Date().toISOString(),
          dateModified: new Date().toISOString()
        }
      })
    },
    
    // Meta tags adicionais
    viewport: 'width=device-width, initial-scale=1',
    themeColor: '#3B82F6',
    
    // Prevenção de cache em desenvolvimento
    ...(process.env.NODE_ENV === 'development' && {
      other: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    })
  };
}

// Função para gerar paths estáticos no build (necessário para static export)
export async function generateStaticParams() {
  // Retorna todos os slugs disponíveis para pré-gerar no build
  return Object.keys(landingPagesMetadata).map((slug) => ({
    slug,
  }));
}

// EXEMPLO DE USO:
// 
// Para usar este sistema de metadata dinâmica, você precisa:
//
// 1. Copiar as funções generateMetadata e generateStaticParams para seu arquivo page.js
// 2. Importar os tipos necessários se estiver usando TypeScript
// 3. Ajustar os dados no objeto landingPagesMetadata
//
// ESTRUTURA DO ARQUIVO page.js/tsx:
//
// import { Metadata } from 'next'; // apenas para TypeScript
// import { notFound } from 'next/navigation';
//
// // Dados das páginas...
// const landingPagesMetadata = { ... };
//
// // Função generateMetadata (copiar daqui)
// export async function generateMetadata({ params }): Promise<Metadata> { ... }
//
// // Função generateStaticParams (copiar daqui) 
// export async function generateStaticParams() { ... }
//
// // Componente da página
// export default function ClienteLandingPage({ params }) { ... }
//
// IMPORTANTE PARA STATIC EXPORT:
// - generateStaticParams é essencial para o static export funcionar
// - Todas as rotas dinâmicas devem ser pré-geradas no build
// - As imagens de Open Graph devem estar na pasta public/

export { landingPagesMetadata };