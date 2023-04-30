// for vite-plugin-posts, used only for development
const files = import.meta.glob('/content/**/*.{md,mdx}', { eager: true });
const routeInfoList = Object.entries(files).map(([key, value]) => {
  if (typeof value.title === 'undefined') {
    throw new Error(`title not found for ${key}`);
  }

  if (typeof value.draft === 'undefined') {
    throw new Error(`draft not found for ${key}`);
  }

  if (typeof value.date === 'undefined') {
    throw new Error(`date not found for ${key}`);
  }

  console.log(key);

  const path = key.replace(/^\/content(.+?)(\/index|)\.(md|mdx)$/, '$1');

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

export default routeInfoList;
