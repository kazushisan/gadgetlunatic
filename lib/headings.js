import { valueToEstree } from 'estree-util-value-to-estree';
import { visit } from 'unist-util-visit';
import { toString } from 'hast-util-to-string';

const exportValue = (name, value) => {
  return {
    type: 'mdxjsEsm',
    value: '',
    data: {
      estree: {
        type: 'Program',
        body: [
          {
            type: 'ExportNamedDeclaration',
            declaration: {
              type: 'VariableDeclaration',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  id: {
                    type: 'Identifier',
                    name,
                  },
                  init: valueToEstree(value),
                },
              ],
              kind: 'const',
            },
            specifiers: [],
            source: null,
          },
        ],
        sourceType: 'module',
      },
    },
  };
};

const test = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].map((tagName) => ({
  type: 'element',
  tagName,
}));

const headings = () => {
  return (ast) => {
    const headings = [];

    visit(ast, test, (node) => {
      const value = toString(node);
      const id = node.properties?.id;
      const depth = parseInt(node.tagName.slice(1, 2), 10);

      if (!id || !value || isNaN(depth)) {
        return;
      }

      headings.push({ value, id, depth });
    });

    console.log(headings);

    ast.children.unshift(exportValue('headings', headings));
  };
};

export default headings;
