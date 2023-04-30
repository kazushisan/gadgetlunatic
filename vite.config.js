import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mdx from './plugins/rollup-plugin-mdx';
import virtual from './plugins/vite-plugin-virtual';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), mdx(), virtual()],
});
