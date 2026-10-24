import path from 'node:path';
import { createServer } from 'node:http';
import express from 'express';
import { createServer as createViteServer } from 'vite';
import blog from '../api/blog';
import health from '../api/health';
import catalog from '../api/catalog/[table]';
import login from '../api/auth/login';
import logout from '../api/auth/logout';
import session from '../api/auth/session';

const app = express();
const httpServer = createServer(app);
const isProduction = process.env.NODE_ENV === 'production';
const port = Number(process.env.PORT || 3000);
const distDirectory = path.resolve(process.cwd(), 'dist');

app.disable('x-powered-by');
app.use(express.json({ limit: '1mb' }));
app.all('/api/health', health);
app.all('/api/auth/session', session);
app.all('/api/auth/login', login);
app.all('/api/auth/logout', logout);
app.all('/api/catalog/:table', catalog);
app.all('/api/blog', blog);
app.use('/api', (_request, response) => response.status(404).json({ error: 'API route not found' }));

if (isProduction) {
  app.use(express.static(distDirectory));
  app.use((request, response, next) => {
    if (request.method !== 'GET') return next();
    return response.sendFile(path.join(distDirectory, 'index.html'));
  });
} else {
  const vite = await createViteServer({
    server: {
      middlewareMode: true,
      hmr: { server: httpServer },
    },
  });
  app.use(vite.middlewares);
}

httpServer.listen(port, '0.0.0.0', () => {
  console.log(`Storefront and API listening on port ${port}`);
});
