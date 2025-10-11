/* eslint-disable @typescript-eslint/no-var-requires */
// Script simples para ajustes antes do build para Cloudflare
const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'out-pages');

console.log('prepare-cloudflare: verificando diretório de saída', outDir);
// Cria diretório se não existir (compatibilidade com next-on-pages)
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

console.log('prepare-cloudflare: pronto');
