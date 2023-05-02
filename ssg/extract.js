export const extract = ({ path, data }) => {
  if (typeof data.title === 'undefined') {
    throw new Error(`title not found for ${key}`);
  }

  if (typeof data.draft === 'undefined') {
    throw new Error(`draft not found for ${key}`);
  }

  if (typeof data.date === 'undefined') {
    throw new Error(`date not found for ${key}`);
  }

  return {
    path,
    title: data.title,
    draft: data.draft,
    date: data.date,
    permalink: data.permalink,
    modifiedDate: data.modifiedDate,
    hash: data.hash,
    weight: data.weight || 0,
  };
};
