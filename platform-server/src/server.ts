import express, { Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import { createServer as createViteServer } from "vite";
// @ts-ignore
import vhost from 'vhost';

dotenv.config();

const app = express();

const APP_PORT = process.env.APP_PORT ? Number(process.env.APP_PORT) : 3000;
const EXEC_PORT = process.env.EXEC_PORT ? Number(process.env.EXEC_PORT) : 3001;
const NODE_ENV = process.env.NODE_ENV || 'development';

function vhostStatic(staticMiddleware: any) {
  return (req: any, res: any, next: any) => staticMiddleware(req, res, next);
}

if (NODE_ENV === 'development') {
  // Vite dev middleware for both apps
  (async () => {
    // platform-app
    const viteApp = await createViteServer({
      root: path.resolve(__dirname, '../../apps/platform-app'),
      server: { middlewareMode: true, hmr: { port: 24678 } }
    });
    // platform-exec
    const viteExec = await createViteServer({
      root: path.resolve(__dirname, '../../apps/platform-exec'),
      server: { middlewareMode: true, hmr: { port: 24679 } }
    });
    // vhost for exec.localhost
    app.use(vhost('exec.localhost', (req, res, next) => viteExec.middlewares(req, res, next)));
    // fallback: /admin path for exec
    app.use('/admin', viteExec.middlewares);
    // all other hosts/paths: main app
    app.use(viteApp.middlewares);
  })();
} else {
  // Production: serve static builds
  const appStatic = express.static(path.resolve(__dirname, '../../apps/platform-app/dist'));
  const execStatic = express.static(path.resolve(__dirname, '../../apps/platform-exec/dist'));
  app.use(vhost('exec.localhost', vhostStatic(execStatic)));
  app.use('/admin', execStatic);
  app.use(appStatic);
  // Fallback to index.html for SPA
  app.get('*', (req, res, next) => {
    if (req.hostname === 'exec.localhost' || req.path.startsWith('/admin')) {
      res.sendFile(path.resolve(__dirname, '../../apps/platform-exec/dist/index.html'));
    } else {
      res.sendFile(path.resolve(__dirname, '../../apps/platform-app/dist/index.html'));
    }
  });
}

app.get("/test", (req: Request, res: Response) => res.status(200).send("Test OK"));

app.listen(APP_PORT, () => {
  console.log(`[platform-server] listening on port ${APP_PORT}`);
});
