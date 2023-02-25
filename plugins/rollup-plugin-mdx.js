import { compile } from '@mdx-js/mdx';
import matter from 'gray-matter';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import stringifyObject from 'stringify-object';
import { VFile } from 'vfile';
import rehypeHeadings from './rehype-headings';
import rehypeHighlightCode from './rehype-highlight-code';
import rehypeHeadingAnchor from './rehype-heading-anchor';

function namedExports(data) {
  return Object.entries(data).reduce(
    (acc, [key, value]) =>
      `${acc}export const ${key} = ${stringifyObject(value)};\n`,
    '',
  );
}

function mdx() {
  return {
    name: 'mdx',
    async transform(value, path) {
      const file = new VFile({ value, path });

      if (!file.extname || !['.md', '.mdx'].includes(file.extname)) {
        return null;
      }

      const { data, content } = matter(value);

      const result = await compile(content, {
        remarkPlugins: [remarkGfm, remarkMath],
        rehypePlugins: [
          rehypeSlug,
          rehypeHeadingAnchor,
          rehypeKatex,
          rehypeHeadings,
          rehypeHighlightCode,
        ],
      });

      return `${namedExports(data)}${result.toString()}`;
    },
  };
}

export default mdx;
