import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import { createServer as createViteServer } from 'vite';
import { createElement } from 'react';
import { renderToPipeableStream } from 'react-dom/server';

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

      const [header, footer] = transformed.split('<!--ssr-outlet-->');

      const { make: ServerRoot } = await vite.ssrLoadModule(
        'src/EntryServer.bs.js',
      );

      const context = {};

      const stream = renderToPipeableStream(
        createElement(ServerRoot, { serverUrlString: url, context }),
        {
          onShellReady() {
            res.status(200).set({ 'Content-Type': 'text/html' });
            res.write(
              header.replace(
                '<!--helmet-->',
                [
                  context.helmet.title.toString(),
                  context.helmet.meta.toString(),
                  context.helmet.link.toString(),
                ].join(''),
              ),
            );
            stream.pipe(res);
            res.end(footer);
          },
          onError(e) {
            throw e;
          },
        },
      );
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });

  app.listen(5173, () => {
    console.log('listening on port 5173');
  });
}

createServer();
