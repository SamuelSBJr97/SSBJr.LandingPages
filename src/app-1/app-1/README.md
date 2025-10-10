# Landing Pages Pro - Next.js Static Export

Projeto Next.js configurado para gerar landing pages estáticas exportáveis, com SEO dinâmico e componentes de anúncios.

## 🚀 Estrutura do Projeto

```
src/app/
├── page.tsx                     # Página inicial com sponsor e links
├── layout.tsx                   # Layout principal
├── globals.css                  # Estilos globais
├── components/
│   ├── Sponsor.js              # Componente do patrocinador
│   └── Ads.js                  # Componente de anúncios
└── clientes/
    └── [slug]/
        ├── page.js             # Landing pages dinâmicas
        └── metadata.js         # SEO dinâmico (exemplo)
```

## 📋 Funcionalidades

### ✅ Implementadas

- **Static Export**: Projeto configurado para gerar site estático
- **Rota Dinâmica**: `/clientes/[slug]` para landing pages personalizadas
- **SEO Dinâmico**: Meta tags, Open Graph e Twitter Cards únicos por página
- **Componente Sponsor**: Exibição de patrocinador em destaque
- **Componente Ads**: Sistema flexível de anúncios/publicidade
- **Responsivo**: Design otimizado para mobile e desktop
- **GitHub Pages Ready**: Arquivo `.nojekyll` incluído

### 🎯 Landing Pages Disponíveis

- `/clientes/empresa-a` - Solução em Cloud Computing
- `/clientes/campanha-black-friday` - Ofertas Black Friday
- `/clientes/startup-xyz` - Case de sucesso Fintech
- `/clientes/evento-tech-2024` - Evento de tecnologia

## 🛠️ Comandos de Build

### Desenvolvimento
```bash
npm run dev
```
Inicia o servidor de desenvolvimento com Turbopack

### Build para Produção
```bash
npm run build
```
Gera o build otimizado com static export

### Preview Local
```bash
npm run preview
```
Executa build e serve localmente para teste

## 📦 Deploy

### GitHub Pages

1. **Configurar basePath** (se necessário):
   ```typescript
   // next.config.ts
   basePath: process.env.NODE_ENV === 'production' ? '/SSBJr.LandingPages' : '',
   assetPrefix: process.env.NODE_ENV === 'production' ? '/SSBJr.LandingPages' : '',
   ```

2. **Build e Deploy**:
   ```bash
   npm run build
   # Conteúdo estático será gerado na pasta 'out'
   ```

### Vercel/Netlify
```bash
npm run build
```
Plataformas detectam automaticamente a configuração Next.js

## ⚙️ Configuração Atual

### next.config.ts
- ✅ `output: 'export'` - Static export habilitado
- ✅ `images: { unoptimized: true }` - Imagens para static export
- ✅ `trailingSlash: true` - URLs consistentes
- 💡 basePath comentado (descomente para GitHub Pages em subdiretório)

### package.json
- ✅ Scripts de build atualizados
- ✅ Suporte a static export
- ✅ Preview local

## 🎨 Personalização

### Adicionar Nova Landing Page

1. **Em `page.js`** - Adicione nos dados:
   ```javascript
   const landingPagesData = {
     'nova-pagina': {
       title: 'Título da Nova Página',
       description: 'Descrição para SEO',
       content: { /* conteúdo */ }
     }
   }
   ```

2. **Em `metadata.js`** - Adicione metadata:
   ```javascript
   const landingPagesMetadata = {
     'nova-pagina': {
       title: 'Título SEO Completo',
       description: 'Meta description',
       ogImage: '/og-nova-pagina.jpg'
     }
   }
   ```

### Personalizar Sponsor

```javascript
<Sponsor 
  name="Seu Patrocinador"
  logo="/logo-patrocinador.png"
  website="https://patrocinador.com"
  description="Descrição do patrocinador"
/>
```

### Personalizar Anúncios

```javascript
// Banner no topo
<Ads position="top" type="banner" />

// Anúncio personalizado
<Ads 
  position="middle" 
  type="square"
  adContent={<div>Seu anúncio customizado</div>}
/>
```

## 🔍 SEO Implementado

- ✅ Meta tags dinâmicas por página
- ✅ Open Graph (Facebook, WhatsApp)
- ✅ Twitter Cards
- ✅ Schema.org JSON-LD
- ✅ URLs canônicas
- ✅ Robots meta

## 📱 Responsividade

Design otimizado para todos os dispositivos usando Tailwind CSS com breakpoints:
- sm (640px), md (768px), lg (1024px), xl (1280px)

## 🚀 Getting Started

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview local do build
npm run preview
```

Abra [http://localhost:3000](http://localhost:3000) para ver o resultado.

## 🐛 Troubleshooting

### Build Falha
- Verifique dependências: `npm install`
- Confirme que não há erros de lint: `npm run lint`

### GitHub Pages 404
- Confirme que `.nojekyll` está na pasta `public`
- Verifique configuração do `basePath` se em subdiretório

### Rotas Dinâmicas Não Funcionam
- Confirme que `generateStaticParams` está implementado
- Teste localmente: `npm run preview`

---

Este projeto utiliza Next.js 15+ com App Router, Tailwind CSS 4, e está otimizado para static export e deploy em GitHub Pages.
