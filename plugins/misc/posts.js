// for vite-plugin-posts, used only for development
import pageInfoList from 'virtual:pageInfoList';

const posts = pageInfoList
  .filter((item) => item.path.startsWith('/post'))
  .sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

export default posts;
