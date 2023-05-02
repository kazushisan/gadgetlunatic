import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mdx from './plugins/rollup-plugin-mdx';
import ssg from './plugins/vite-plugin-ssg';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    mdx(),
    ssg({
      postList: './ssg/postList.js',
      latexList: './ssg/latexList.js',
    }),
  ],
});
