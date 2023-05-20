import { extract } from './extract.js';

const transformer = (list) =>
  list
    .map(extract)
    .filter((item) => item.path.startsWith('/latex'))
    .sort((a, b) => a.weight - b.weight)
    .map(({ title, path, date, modifiedDate }) => ({
      title,
      path,
      date,
      modifiedDate,
    }));

export default transformer;
