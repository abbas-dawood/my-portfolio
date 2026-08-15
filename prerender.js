import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function prerender() {
  try {
    const template = fs.readFileSync(path.resolve(__dirname, 'dist/index.html'), 'utf-8');
    const { render } = await import('./dist-server/entry-server.js');

    const appHtml = render('/');

    const finalHtml = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

    fs.writeFileSync(path.resolve(__dirname, 'dist/index.html'), finalHtml);
    console.log('Prerendering completed.');
  } catch (e) {
    console.error('Prerendering failed:', e);
    process.exit(1);
  }
}

prerender();
