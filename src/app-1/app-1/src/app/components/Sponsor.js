import Image from 'next/image';

/**
 * Componente Sponsor - Exibe um patrocinador/sponsor em destaque
 * 
 * Props:
 * - name: Nome do patrocinador
 * - logo: URL do logo do patrocinador
 * - website: URL do site do patrocinador
 * - description: Descrição do patrocinador
 */
export default function Sponsor({ 
  name = "Patrocinador Principal", 
  logo = "/sponsor-logo.png", 
  website = "https://exemplo.com", 
  description = "Nosso patrocinador oficial que apoia este projeto" 
}) {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-100 p-8 rounded-lg shadow-lg border border-gray-200">
      <div className="text-center">
        <p className="text-sm text-gray-600 mb-4 uppercase tracking-wide font-medium">
          Patrocinado por
        </p>
        
        {/* Logo do Patrocinador */}
        <div className="mb-6">
          <Image
            src={logo}
            alt={`Logo ${name}`}
            width={200}
            height={80}
            className="mx-auto h-20 w-auto object-contain"
            priority
          />
        </div>
        
        {/* Nome e Descrição */}
        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          {name}
        </h2>
        
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          {description}
        </p>
        
        {/* Link para o site */}
        <a
          href={website}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Visitar Site
          <svg 
            className="ml-2 w-4 h-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
            />
          </svg>
        </a>
      </div>
    </div>
  );
}