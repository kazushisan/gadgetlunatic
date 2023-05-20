import { visit } from 'unist-util-visit';
import { join } from 'node:path';

const importDefault = (identifier, path) => {
  return {
    type: 'mdxjsEsm',
    value: '',
    data: {
      estree: {
        type: 'Program',
        body: [
          {
            type: 'ImportDeclaration',
            specifiers: [
              {
                type: 'ImportDefaultSpecifier',

                local: {
                  type: 'Identifier',
                  name: identifier,
                },
              },
            ],
            source: {
              type: 'Literal',
              value: `${path}`,
              raw: `'${path}'`,
            },
          },
        ],
        sourceType: 'module',
      },
    },
  };
};

const jsxImage = (identifier, alt) => {
  return {
    type: 'mdxJsxFlowElement',
    name: 'img',
    attributes: [
      {
        type: 'mdxJsxAttribute',
        name: 'src',
        value: {
          type: 'mdxJsxAttributeValueExpression',
          value: identifier,
          data: {
            estree: {
              type: 'Program',
              body: [
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'Identifier',
                    name: identifier,
                  },
                },
              ],
              sourceType: 'module',
              comments: [],
            },
          },
        },
      },
      {
        type: 'mdxJsxAttribute',
        name: 'alt',
        value: alt,
      },
    ],
    children: [],
  };
};

const image = () => {
  const imported = [];
  return (ast) => {
    visit(ast, { type: 'element', tagName: 'img' }, (node, index, parent) => {
      const { src, alt } = node.properties;

      if (!src || !alt) {
        return;
      }

      const identifier = src.replaceAll(/([^a-zA-Z0-9])/g, '');
      const path = src.startsWith('..') ? src : `./${join(src)}`;

      if (!imported.includes(src)) {
        ast.children.unshift(importDefault(identifier, path));
      }
      parent.children.splice(index, 1, jsxImage(identifier, alt));
      imported.push(src);
    });
  };
};

export default image;
