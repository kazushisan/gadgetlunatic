const files = import.meta.glob('/content/**/*.{md,mdx}', { eager: true });

const routes = Object.keys(files).map((key) => {
  const path = key.replace(/^\/content(.+?)(\/index|)\.(md|mdx)$/, '$1');

  return {
    path,
    file: `../..${key}`,
  };
});

export default routes;
