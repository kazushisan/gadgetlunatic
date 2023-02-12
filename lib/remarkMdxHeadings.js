import { name as isValidIdentifierName } from 'estree-util-is-identifier-name';
import { valueToEstree } from 'estree-util-value-to-estree';

// based on https://github.com/remcohaszing/remark-mdx-frontmatter/blob/fa93b864749f1994a82211a07b18bc5e922becfc/index.ts#L38
const createExport = (object) => {
  return {
    type: 'mdxjsEsm',
    value: '',
    data: {
      estree: {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportNamedDeclaration',
            specifiers: [],
            declaration: {
              type: 'VariableDeclaration',
              kind: 'const',
              declarations: Object.entries(object).map(([identifier, val]) => {
                if (!isValidIdentifierName(identifier)) {
                  throw new Error(
                    `Frontmatter keys should be valid identifiers, got: ${JSON.stringify(
                      identifier,
                    )}`,
                  );
                }
                return {
                  type: 'VariableDeclarator',
                  id: { type: 'Identifier', name: identifier },
                  init: valueToEstree(val),
                };
              }),
            },
          },
        ],
      },
    },
  };
}

const remarkMdxHeadings = () => {
	return (ast) => {
		const headings = [];
		for (const node of ast.children) {
			if (node.type === 'heading' && node.children[0]?.type === 'text') {
				const heading = {
					value: node.children[0].value,
					depth: node.depth
				}

				headings.push(heading);
			}
		}

		ast.children.unshift(createExport({ headings }))
	}
}

export default remarkMdxHeadings;
