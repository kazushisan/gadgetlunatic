import { toString } from 'hast-util-to-string';
import { SKIP, visit } from 'unist-util-visit';

const test = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].map((tagName) => ({
  type: 'element',
  tagName,
}));

const headingAnchor = () => {
  return (ast) => {
    visit(ast, test, (element) => {
      const id = element.properties?.id;
      const value = toString(element);

      if (!id || !value) {
        return;
      }

      const heading = { ...element };
      const anchor = {
        type: 'element',
        tagName: 'a',
        properties: { href: `#${id}`, className: ['heading-anchor'] },
        children: [heading],
      };

      element.tagName = anchor.tagName;
      element.properties = anchor.properties;
      element.children = anchor.children;

      return SKIP;
    });
  };
};

export default headingAnchor;
