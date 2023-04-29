import { globSync } from 'glob';
import { build } from 'vite';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));

execSync(`rm -rf ${__dirname}/../dist`);

await build({
  build: {
    outDir: 'dist/static',
  },
});

await build({
  build: {
    outDir: 'dist/server',
    ssr: 'src/EntryServer.bs.js',
  },
});

console.log('prerendering routes...');

const files = globSync('./content/**/*.{md,mdx}');

const routes = [
  ...files.map((file) =>
    file.replace(/^content(.+?)(\/index|)\.(md|mdx)$/, '$1'),
  ),
  '/',
];

const template = await readFile(
  resolve(__dirname, '../dist/static/index.html'),
  'utf-8',
);
const { render } = await import('../dist/server/EntryServer.bs.js');

const promises = routes.map(async (route) => {
  const result = render(route);
  const html = template.replace('<!--ssr-outlet-->', result);

  await mkdir(resolve(__dirname, '../dist/static', `./${route}`), {
    recursive: true,
  });

  await writeFile(
    resolve(__dirname, '../dist/static', `./${route}`, 'index.html'),
    html,
  );
});

await Promise.all(promises);
