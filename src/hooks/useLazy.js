let posts = null;

export const useLazyPosts = () => {
  if (posts) {
    return posts;
  }

  throw import('virtual:posts').then((imported) => {
    posts = imported.default;
  });
};
