// for vite-plugin-posts, used only for development 
const files = import.meta.glob('/content/**/*.{md,mdx}', { eager: true });
const routes = Object.entries(files).map(([key, value]) => {
  if (typeof value.title === 'undefined') {
    throw new Error(`title not found for ${key}`);
  }

  if (typeof value.draft === 'undefined') {
    throw new Error(`draft not found for ${key}`);
  }

  if (typeof value.date === 'undefined') {
    throw new Error(`date not found for ${key}`);
  }

  const path = key.replace(/^.+?content(.+?)(\/index|)\.(md|mdx)$/, '$1');

  return {
    path,
    title: value.title,
    draft: value.draft,
    date: value.date,
    permalink: value.permalink,
    modifiedDate: value.modifiedDate,
    hash: value.hash,
    weight: value.weight || 0,
  };
});

const blog = routes
  .filter((item) => item.path.startsWith('/post'))
  .sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

export default blog;
