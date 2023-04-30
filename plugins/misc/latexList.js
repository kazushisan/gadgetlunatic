// for vite-plugin-virtual, used only for vite serve mode
import pageInfoList from 'virtual:pageInfoList';

const latexList = pageInfoList
  .filter((item) => item.path.startsWith('/latex'))
  .sort((a, b) => a.weight - b.weight)
  .map((item) => ({ title: item.title, path: item.path }));

export default latexList;
