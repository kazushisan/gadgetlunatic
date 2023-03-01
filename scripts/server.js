import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import { createServer as createViteServer } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const template = fs.readFileSync(
  path.resolve(__dirname, '../index.html'),
  'utf-8',
);

async function createServer() {
  const app = express();
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom',
  });

  app.use(vite.middlewares);

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const transformed = await vite.transformIndexHtml(url, template);

      const { render } = await vite.ssrLoadModule('src/EntryServer.bs.js');

      const appHtml = await render(url);

      const html = transformed.replace(`<!--ssr-outlet-->`, appHtml);

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
      console.log("error", e)
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });

  app.listen(5173, () => {
    console.log('listening on port 5173');
  });
}

createServer();
