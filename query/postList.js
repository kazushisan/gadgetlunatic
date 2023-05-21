import { extract } from './extract.js';

const query = (list) =>
  list
    .map(extract)
    .filter((item) => item.path.startsWith('/post'))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export default query;
