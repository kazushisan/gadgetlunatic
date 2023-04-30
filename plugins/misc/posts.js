// for vite-plugin-posts, used only for development
import routes from 'virtual:routes';

const posts = routes
  .filter((item) => item.path.startsWith('/post'))
  .sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

export default posts;
