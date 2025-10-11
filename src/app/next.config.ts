import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Habilita o static export para gerar um site estático
  output: 'export',
  
  // Opcional: desabilita otimização de imagens para static export
  images: {
    unoptimized: true
  },
  
  // Opcional: configura o prefixo de assets se hospedado em subdiretório
  // assetPrefix: process.env.NODE_ENV === 'production' ? '/SSBJr.LandingPages' : '',
  
  // Garante que trailing slashes sejam consistentes
  trailingSlash: true,
  
  // Opcional: configura base path se hospedado em subdiretório do GitHub Pages
  // basePath: process.env.NODE_ENV === 'production' ? '/SSBJr.LandingPages' : '',
  
  // PWA configurações
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Configurações do service worker serão tratadas manualmente
    }
    return config;
  },
};

export default nextConfig;
