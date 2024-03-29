import { compile } from '@mdx-js/mdx';
import matter from 'gray-matter';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import stringifyObject from 'stringify-object';
import { VFile } from 'vfile';
import rehypeMdxHeadings from 'rehype-mdx-headings';
import rehypeHighlightCode from './rehype-highlight-code';
import rehypeHeadingAnchor from 'rehype-heading-anchor';
import rehypeImage from './rehype-image';
import { execSync } from 'child_process';
import { relative } from 'path';
import { cwd } from 'process';
import yaml from 'js-yaml';

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

      const { data, content } = matter(value, {
        engines: {
          // specify engine with option to prevent date from being converted to Date instance with timezone info dropped
          yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }),
        },
      });

      const history = execSync(
        `git log --pretty=format:"%H %cd %s" --date=iso-strict -- ${file.path}`,
      )
        .toString()
        .split('\n');

      const lastModified = history.find(
        (line) => !line.includes('[skip modified]'),
      );

      const hash = lastModified ? lastModified.split(' ')[0] : undefined;

      const permalink = hash
        ? `${REPO_URL}/blob/${hash}/${relative(cwd(), file.path)}`
        : undefined;

      const modifiedDate = lastModified
        ? lastModified.split(' ')[1]
        : undefined;

      const result = await compile(content, {
        remarkPlugins: [remarkGfm, remarkMath],
        rehypePlugins: [
          rehypeSlug,
          [rehypeHeadingAnchor, { className: ['heading-anchor'] }],
          rehypeKatex,
          rehypeMdxHeadings,
          rehypeHighlightCode,
          rehypeImage,
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
