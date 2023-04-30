// for vite-plugin-posts, used only for development
import routeInfoList from 'virtual:routeInfoList';

const latexPages = routeInfoList
  .filter((item) => item.path.startsWith('/latex'))
  .sort((a, b) => a.weight - b.weight)
  .map((item) => ({ title: item.title, path: item.path }));

export default latexPages;
