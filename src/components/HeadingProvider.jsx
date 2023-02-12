import { MDXProvider } from '@mdx-js/react';
import { createElement } from 'react';
const H2 = (props) => {
  console.log('custom h2', props);
  return <h2>{props.children}</h2>;
};

const createHeadingComponent = (tag) => {
  const Component = ({ id, children }) => {
    return <a href={`#${id}`}>{createElement(tag, { id }, children)}</a>;
  };

  Component.displayName = `Heading${tag.slice(1, 2)}`;

  return Component;
};

const components = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].reduce(
  (acc, cur) => ({
    ...acc,
    [cur]: createHeadingComponent(cur),
  }),
  {},
);

export const HeadingProvider = ({ children }) => {
  return <MDXProvider components={components}>{children}</MDXProvider>;
};
