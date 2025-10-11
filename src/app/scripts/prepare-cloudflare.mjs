// Script simples (ESM) para ajustes antes do build para Cloudflare
import fs from 'fs';
import path from 'path';

const outDir = path.join(new URL('.', import.meta.url).pathname, '..', 'out-pages');

console.log('prepare-cloudflare (mjs): verificando diretório de saída', outDir);
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}
console.log('prepare-cloudflare (mjs): pronto');
