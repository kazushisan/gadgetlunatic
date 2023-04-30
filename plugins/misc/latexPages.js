// for vite-plugin-posts, used only for development
import pageInfoList from 'virtual:pageInfoList';

const latexPages = pageInfoList
  .filter((item) => item.path.startsWith('/latex'))
  .sort((a, b) => a.weight - b.weight)
  .map((item) => ({ title: item.title, path: item.path }));

export default latexPages;
