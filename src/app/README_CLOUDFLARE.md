Instruções de build e deploy para Cloudflare (Pages / Workers)

Resumo das mudanças locais:
- Atualizei dependências detectadas pelo npm-check-updates (react, react-dom, @types/node e outras devDeps menores).
- Adicionei `wrangler` e `@cloudflare/next-on-pages` como devDependencies para gerar um build compatível com Cloudflare.
- Adicionei script `build:cloudflare` em `package.json` que executa `next build` e depois `next-on-pages build --outdir out-pages`.
- Criei `wrangler.toml` com placeholders para `account_id` e `project_name`.
- Criei `scripts/prepare-cloudflare.mjs` (simples) para garantir existência de diretório de saída.

Passos para preparar e executar o build localmente (PowerShell):

1) Instalar dependências (já feito localmente com --legacy-peer-deps):
   cd src\app
   npm install --legacy-peer-deps

2) Configurar `wrangler.toml`:
   - Substitua `<CLOUDFLARE_ACCOUNT_ID>` pelo seu Cloudflare Account ID.
   - Ajuste `project_name` se desejar.

3) Se o build falhar com erro EBUSY (Windows) ao remover `out`:
   - Feche o Explorer ou qualquer editor que esteja abrindo arquivos da pasta `src\app\out`.
   - Tente remover o diretório forçadamente (PowerShell como Administrador):

     Remove-Item -LiteralPath .\out -Force -Recurse -ErrorAction Stop

   - Se ainda falhar, reinicie o Windows (ou encerre processos que possam travar arquivos).

4) Rodar o build para Cloudflare:
   cd src\app
   npm run build:cloudflare

   Saída esperada: um diretório `out-pages` contendo `worker.js` e os assets estáticos.

5) Deploy com Wrangler (após configurar `wrangler.toml`):
   npx wrangler pages deploy out-pages --project-name=ssbjr-landingpages --branch=main

   Ou para Workers Sites:
   npx wrangler deploy

Notas e recomendações:
- `@cloudflare/next-on-pages` está depreciado em favor de OpenNext (https://opennext.js.org/cloudflare). Recomendo migrar para o adapter OpenNext no próximo ciclo de manutenção.
- Há algumas advertências de ESLint (hooks com dependências faltando) e 4 vulnerabilidades reportadas por `npm audit`. Considere revisar as regras do ESLint e corrigir vulnerabilidades com `npm audit fix`.
- Se você preferir, posso:
  - Remover o `output: 'export'` do `next.config.ts` para evitar geração automática de `out` (pode evitar o EBUSY), ou
  - Migrar para OpenNext e ajustar scripts/`wrangler.toml` para Pages + Functions.

Se quiser, executo a migração para OpenNext e finalizo o pipeline de build+deploy automaticamente.
