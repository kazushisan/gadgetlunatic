import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mdx from './plugins/rollup-plugin-mdx';
import content from './plugins/vite-plugin-content';
import sitemap from './plugins/vite-plugin-sitemap';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    mdx(),
    content({
      query: {
        postList: './query/PostQuery.bs.js',
        latexList: './query/LatexQuery.bs.js',
      },
    }),
    sitemap(),
  ],
});
