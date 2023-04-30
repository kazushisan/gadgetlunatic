// for vite-plugin-virtual, used only for vite serve mode
import pageInfoList from 'virtual:pageInfoList';

const postList = pageInfoList
  .filter((item) => item.path.startsWith('/post'))
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export default postList;
