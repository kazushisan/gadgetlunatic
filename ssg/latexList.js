import { extract } from './extract.js';

const transformer = (list) => list.map(extract)
  .filter((item) => item.path.startsWith('/latex'))
  .sort((a, b) => a.weight - b.weight)
  .map((item) => ({ title: item.title, path: item.path }));

export default transformer;
