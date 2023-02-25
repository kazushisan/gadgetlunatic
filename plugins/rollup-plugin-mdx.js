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
import { execSync } from 'child_process';
import { relative } from 'path';
import { cwd } from 'process';

function namedExports(data) {
  return Object.entries(data).reduce(
    (acc, [key, value]) =>
      `${acc}export const ${key} = ${stringifyObject(value)};\n`,
    '',
  );
}

const REPO_URL = 'https://github.com/kazushisan/gadgetlunatic';

function mdx() {
  return {
    name: 'mdx',
    async transform(value, path) {
      const file = new VFile({ value, path });

      if (!file.extname || !['.md', '.mdx'].includes(file.extname)) {
        return null;
      }

      const { data, content } = matter(value);

      const output = execSync(
        `git log --pretty=format:"%H %cd" --date=iso-strict -- ${file.path}`,
      )
        .toString()
        .split('\n');

      const hash = output.length > 0 ? output[0].split(' ')[0] : undefined;

      const permalink = hash
        ? `${REPO_URL}/blob/${hash}/${relative(cwd(), file.path)}`
        : undefined;

      const modifiedDate =
        output.length > 1 ? output[0].split(' ')[1] : undefined;

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

      return `${namedExports({
        ...data,
        hash,
        permalink,
        modifiedDate,
      })}${result.toString()}`;
    },
  };
}

export default mdx;
