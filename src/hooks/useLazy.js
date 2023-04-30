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
