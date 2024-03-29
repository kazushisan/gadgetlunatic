import { visit } from 'unist-util-visit';
import { toText } from 'hast-util-to-text';
import shiki from 'shiki';
import { removePosition } from 'unist-util-remove-position';
import rehypeParse from 'rehype-parse';
import { unified } from 'unified';

const highlighter = await shiki.getHighlighter({ theme: 'nord' });
const languages = highlighter.getLoadedLanguages();

const parse = unified().use(rehypeParse, { fragment: true }).parse;

const highlightCode = () => {
  return (tree) => {
    visit(tree, { type: 'element', tagName: 'pre' }, (element) => {
      if (!element.children[0]?.tagName === 'code') {
        return;
      }

      const code = toText(element, { whitespace: 'pre' }).trim();
      const lang = element.children[0].properties.className?.[0]?.startsWith(
        'language-',
      )
        ? element.children[0].properties.className[0].slice(9).toLowerCase()
        : '';

      if (!languages.includes(lang)) {
        element.properties = {
          style: 'background-color: #2e3440ff; color: #d8dee9;',
        };
        return;
      }

      const result = highlighter.codeToHtml(code, { lang });

      const parsed = removePosition(parse(result)).children[0];

      element.properties = parsed.properties;
      element.children = parsed.children;
    });
  };
};

export default highlightCode;
