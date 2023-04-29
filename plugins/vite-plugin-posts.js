import { globSync } from 'glob';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFile } from 'node:fs/promises';

const virtualModulePrefix = 'posts:';

const __dirname = dirname(fileURLToPath(import.meta.url));

const blogCode = await readFile(resolve(__dirname, './misc/blog.js'), 'utf-8');

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

      return source;
    },
    async load(id) {
      if (!id.startsWith(virtualModulePrefix)) {
        return null;
      }

      if (serve) {
        console.log(blogCode);

        return blogCode;
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
