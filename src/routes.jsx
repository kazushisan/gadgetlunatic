/// <reference types="vite/client" />
const files = import.meta.glob("../content/**/*.{md,mdx}", { eager: true });

export const routes = Object.entries(files).reduce((acc, [key, value]) => {
	if (!('draft' in value) || typeof value.draft !== 'boolean') {
		console.error(`missing draft in ${key}`);
		return acc;
	}

	if (!('title' in value) || typeof value.title !== 'string') {
		console.error(`missing title in ${key}`);
		return acc;
	}

	if (!('date' in value) || typeof value.date !== 'string') {
		console.error(`missing date in ${key}`);
		return acc;
	}

	return [...acc, {
		pathname: key.replace('../content', ''),
		title: value.title,
		draft: value.draft,
		date: value.date,
		element: <value.default />
	}]
}, [])
