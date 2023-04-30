// for vite-plugin-posts, used only for development
import routeInfoList from 'virtual:routeInfoList';

const posts = routeInfoList
  .filter((item) => item.path.startsWith('/post'))
  .sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

export default posts;
