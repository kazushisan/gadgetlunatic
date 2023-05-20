import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'node:stream';

/**
 * @param {string} code
 * @returns {Module}
 */
const executeCode = (code) =>
  import(`data:text/javascript,${encodeURIComponent(code)}`);

/**
 * @returns {import('vite').PluginOption}
 */
function sitemap() {
  return {
    name: 'sitemap',
    apply: (_, env) => {
      return !env.ssrBuild && env.command === 'build';
    },
    async buildStart() {
      const stream = new SitemapStream({
        hostname: 'https://gadgetlunatic.com',
      });

      stream.write({ url: '' });

      await Promise.all(
        ['ssg:postList', 'ssg:latexList'].map(async (target) => {
          const resolution = await this.resolve(target);

          if (!resolution) {
            throw new Error(`failed to resolve ${target}`);
          }

          const loaded = await this.load(resolution);

          const data = (await executeCode(loaded.code)).default;

          const list = data.map((item) => ({
            url: item.path,
            lastmod: item.modifiedDate || item.date,
          }));

          const readable = Readable.from(list);

          readable.pipe(stream, { end: false });

          return new Promise((resolve) => {
            readable.on('end', resolve);
          });
        }),
      );

      stream.end();

      const source = (await streamToPromise(stream)).toString();

      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source,
      });
    },
  };
}

export default sitemap;
