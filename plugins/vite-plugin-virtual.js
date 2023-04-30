import { globSync } from 'glob';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFile } from 'node:fs/promises';
import stringifyObject from 'stringify-object';

const virtualModulePrefix = 'virtual:';
const virtualModules = ['postList', 'latexList', 'pageInfoList', 'routes'];

const __dirname = dirname(fileURLToPath(import.meta.url));

const code = {
  postList: await readFile(resolve(__dirname, './misc/postList.js'), 'utf-8'),
  latexList: await readFile(
    resolve(__dirname, './misc/latexList.js'),
    'utf-8',
  ),
  pageInfoList: await readFile(
    resolve(__dirname, './misc/pageInfoList.js'),
    'utf-8',
  ),
  routes: await readFile(resolve(__dirname, './misc/routes.js'), 'utf-8'),
};

/**
 * @this {import('rollup').PluginContext}
 * @param {string} file
 */
async function pageInfo(file) {
  const resolution = await this.resolve(file, undefined, {
    skipSelf: true,
  });

  if (!resolution) {
    throw new Error(`failed to resolve file: ${file}`);
  }

  const loaded = await this.load(resolution);

  // node.js will throw an error when it tries to execute import statements in data uri code
  // because it will fail to resolve the module.
  // for now, removing the import statement will avoid throwing errors.
  const modified = loaded.code.replaceAll(/^(import\s.+;)$/gm, '');

  const executed = await import(
    `data:text/javascript,${encodeURIComponent(modified)}`
  );

  return {
    path: file.replace(/^content(.+?)(\/index|)\.(md|mdx)$/, '$1'),
    title: executed.title,
    draft: executed.draft,
    date: executed.date,
    permalink: executed.permalink,
    modifiedDate: executed.modifiedDate,
    hash: executed.hash,
    weight: executed.weight || 0,
  };
}

/** @type {() => import('vite').PluginOption} */
function virtual() {
  let serve = false;

  return {
    name: 'virtual',
    config(_, env) {
      serve = env.command === 'serve';
    },
    resolveId(source) {
      if (!source.startsWith(virtualModulePrefix)) {
        return null;
      }

      const target = source.slice(virtualModulePrefix.length);

      if (!virtualModules.includes(target)) {
        return null;
      }

      return source;
    },
    async load(id) {
      if (!id.startsWith(virtualModulePrefix)) {
        return null;
      }

      const target = id.slice(virtualModulePrefix.length);

      if (!virtualModules.includes(target)) {
        return null;
      }

      if (serve) {
        return code[target];
      }

      const files = globSync('./content/**/*.{md,mdx}');

      const pageInfoList = await Promise.all(
        files.map((file) => pageInfo.call(this, file)),
      );

      if (target === 'routes') {
        const routes = files.map((file) => ({
          path: file.replace(/^content(.+?)(\/index|)\.(md|mdx)$/, '$1'),
          file: `../../${file}`,
        }));

        return `export default ${stringifyObject(routes)}`;
      }

      if (target === 'postList') {
        const postList = pageInfoList
          .filter((item) => item.path.startsWith('/post'))
          .sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

        return `export default ${stringifyObject(postList)}`;
      }

      if (target === 'latexList') {
        const latexList = pageInfoList
          .filter((item) => item.path.startsWith('/latex'))
          .sort((a, b) => a.weight - b.weight)
          .map((item) => ({ title: item.title, path: item.path }));

        return `export default ${stringifyObject(latexList)}`;
      }

      throw new Error(`unexpected virtual module: ${{ serve, target }}`);
    },
  };
}

export default virtual;
