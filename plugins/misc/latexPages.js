// for vite-plugin-posts, used only for development
import routes from 'virtual:routes';

const latexPages = routes
  .filter((item) => item.path.startsWith('/latex'))
  .sort((a, b) => a.weight - b.weight)
  .map((item) => ({ title: item.title, path: item.path }));

export default latexPages;
