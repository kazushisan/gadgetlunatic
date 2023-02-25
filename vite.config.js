import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mdx from './lib/mdx';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), mdx()],
  build: {
    manifest: true,
  },
});
