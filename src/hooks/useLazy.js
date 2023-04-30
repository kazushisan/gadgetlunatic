import { createElement } from 'react';

let posts = null;

export const useLazyPosts = () => {
  if (posts) {
    return posts;
  }

  throw import('virtual:posts').then((imported) => {
    posts = imported.default;
  });
};

let latexPages = null;

export const useLazyLatexPages = () => {
  if (latexPages) {
    return latexPages;
  }

  throw import('virtual:latexPages').then((imported) => {
    latexPages = imported.default;
  });
};

const loaded = new Map();

let modules = import.meta.glob('../../content/**/*{md,mdx}');

export const useLazyPage = (file) => {
  const page = loaded.get(file);

  if (page) {
    return page;
  }

  if (file in modules) {
    throw modules[file]().then((value) => {
      if (typeof value.title === 'undefined') {
        throw new Error(`title not found for ${key}`);
      }

      if (typeof value.draft === 'undefined') {
        throw new Error(`draft not found for ${key}`);
      }

      if (typeof value.date === 'undefined') {
        throw new Error(`date not found for ${key}`);
      }

      loaded.set(file, {
        title: value.title,
        draft: value.draft,
        date: value.date,
        permalink: value.permalink,
        modifiedDate: value.modifiedDate,
        hash: value.hash,
        weight: value.weight || 0,
        headings: value.headings,
        element: createElement(value.default),
      });
    });
  }

  throw new Error(`unexpected file: ${file}`);
};
