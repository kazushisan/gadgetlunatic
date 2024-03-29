import { toJs } from 'estree-util-to-js';
import { globSync } from 'glob';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import stringifyObject from 'stringify-object';

const prefix = 'content:';
const internalPrefix = 'content-internal:';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '../');

/**
 * @param {{ path: string, file: string}[]} routes
 */
const generateExportCode = (routes) => {
  return toJs({
    type: 'Program',
    body: [
      {
        type: 'ExportDefaultDeclaration',
        declaration: {
          type: 'ArrayExpression',
          elements: routes.map(({ path, file }) => ({
            type: 'ObjectExpression',
            properties: [
              {
                type: 'Property',
                method: false,
                shorthand: false,
                computed: false,
                key: {
                  type: 'Identifier',
                  name: 'path',
                },
                value: {
                  type: 'Literal',
                  value: `${path}`,
                  raw: `'${path}'`,
                },
                kind: 'init',
              },
              {
                type: 'Property',
                method: false,
                shorthand: false,
                computed: false,
                key: {
                  type: 'Identifier',
                  name: 'load',
                },
                value: {
                  type: 'ArrowFunctionExpression',
                  id: null,
                  expression: true,
                  generator: false,
                  async: false,
                  params: [],
                  body: {
                    type: 'ImportExpression',
                    source: {
                      type: 'Literal',
                      value: `${file}`,
                      raw: `'${file}'`,
                    },
                  },
                },
                kind: 'init',
              },
            ],
          })),
        },
      },
    ],
    sourceType: 'module',
  }).value;
};

/**
 * @this {import('rollup').PluginContext}
 * @param {string} file
 */
async function extractFromFile(file) {
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
    data: executed,
    path: file.replace(/^content(.+?)(\/index|)\.(md|mdx)$/, '$1'),
  };
}

/**
 * @param {{ query: { [list: string]: string }}} config
 * @returns {import('vite').PluginOption}
 */
function content(config) {
  let serve = false;

  return {
    name: 'content',
    config(_, env) {
      serve = env.command === 'serve';
    },
    resolveId(source) {
      if (source === `${prefix}routes`) {
        return `\0${source}`;
      }

      if (source.startsWith(prefix)) {
        const target = source.slice(prefix.length);

        if (!Object.keys(config.query).includes(target)) {
          return null;
        }

        return `\0${source}`;
      }

      if (source.startsWith(internalPrefix)) {
        const target = source.slice(internalPrefix.length);

        if (!Object.keys(config.query).includes(target)) {
          return null;
        }

        return resolve(projectRoot, config.query[target]);
      }

      return null;
    },
    async load(id) {
      if (!id.startsWith(`\0${prefix}`)) {
        return null;
      }

      const target = id.slice(`\0${prefix}`.length);
      const files = globSync('./content/**/*.{md,mdx}');

      // use the same logic for serve and build
      if (target === 'routes') {
        const routes = files.map((file) => ({
          path: file.replace(/^content(.+?)(\/index|)\.(md|mdx)$/, '$1'),
          file: `/${file}`,
        }));

        return generateExportCode(routes);
      }

      if (!Object.keys(config.query).includes(target)) {
        return null;
      }

      if (serve) {
        return `
        import query from '${internalPrefix}${target}';
        const files = import.meta.glob('/content/**/*.{md,mdx}', { eager: true });
        const list = Object.entries(files).map(([path, data]) => ({
          path: path.replace(/^\\/content(.+?)(\\/index|)\\.(md|mdx)$/, '$1'),
          data,
        }));
        const result = query(list);
        export default result;
        `;
      }

      const list = await Promise.all(
        files.map((file) => extractFromFile.call(this, file)),
      );

      const { default: query } = await import(
        resolve(projectRoot, config.query[target])
      );
      const result = query(list);

      return `export default ${stringifyObject(result)}`;
    },
  };
}

export default content;
