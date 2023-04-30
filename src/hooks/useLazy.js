import { createElement } from 'react';

let postList = null;

export const useLazyPostList = () => {
  if (postList) {
    return postList;
  }

  throw import('virtual:postList').then((imported) => {
    postList = imported.default;
  });
};

let latexList = null;

export const useLazyLatexList = () => {
  if (latexList) {
    return latexList;
  }

  throw import('virtual:latexList').then((imported) => {
    latexList = imported.default;
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
