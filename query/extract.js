export const extract = ({ path, data }) => {
  if (typeof data.title === 'undefined') {
    throw new Error(`title not found for ${path}`);
  }

  if (typeof data.date === 'undefined') {
    throw new Error(`date not found for ${path}`);
  }

  return {
    path,
    title: data.title,
    date: data.date,
    permalink: data.permalink,
    modifiedDate: data.modifiedDate,
    hash: data.hash,
    weight: data.weight || 0,
  };
};
