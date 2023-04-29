import { globSync } from 'glob';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFile } from 'node:fs/promises';

const virtualModulePrefix = 'posts:';

const __dirname = dirname(fileURLToPath(import.meta.url));

const code = {
  blog: await readFile(resolve(__dirname, './misc/blog.js'), 'utf-8'),
  latex: await readFile(resolve(__dirname, './misc/latex.js'), 'utf-8'),
};

/** @type {() => import('vite').PluginOption} */
function posts() {
  let serve = false;

  return {
    name: 'posts',
    config(_, env) {
      serve = env.command === 'serve';
    },
    resolveId(source) {
      if (!source.startsWith(virtualModulePrefix)) {
        return null;
      }

      const target = source.slice(virtualModulePrefix.length);

      if (!['blog', 'latex'].includes(target)) {
        return null;
      }

      return source;
    },
    async load(id) {
      if (!id.startsWith(virtualModulePrefix)) {
        return null;
      }

      const target = id.slice(virtualModulePrefix.length);

      if (!['blog', 'latex'].includes(target)) {
        return null;
      }

      if (serve) {
        return code[target];
      }

      const files = globSync('./content/**/*.{md,mdx}');

      const file = files[0];

      const resolution = await this.resolve(file, undefined, {
        skipSelf: true,
      });

      if (!resolution) {
        throw new Error(`failed to resolve file: ${file}`);
      }

      const loaded = await this.load(resolution);

      console.log('here', loaded.code);
      return 'export const a = 1;';
    },
  };
}

export default posts;
