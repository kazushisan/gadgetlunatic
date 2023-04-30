let posts = null;

export const useLazyBlogPosts = () => {
  if (posts) {
    return posts;
  }

  throw import('posts:blog').then((imported) => {
    posts = imported.default;
  });
};
