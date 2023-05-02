import { extract } from './extract.js';

const transformer = (list) =>
  list
    .map(extract)
    .filter((item) => item.path.startsWith('/post'))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export default transformer;
