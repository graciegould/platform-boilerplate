import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import path from "path";
import { createServer as createViteServer } from "vite";
import { fileURLToPath } from "url";

dotenv.config();

const APP_PORT = process.env.APP_PORT ? Number(process.env.APP_PORT) : 3000;
const EXEC_PORT = process.env.EXEC_PORT ? Number(process.env.EXEC_PORT) : 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
  // platform-app
  const appServer = express();
  const viteApp = await createViteServer({
    root: path.resolve(__dirname, '../../apps/platform-app'),
    server: { middlewareMode: true, hmr: { port: 24678 } }
  });
  appServer.use(viteApp.middlewares);
  appServer.listen(APP_PORT, "localhost", () => {
    console.log(`[platform-app] listening on http://localhost:${APP_PORT}`);
  });

  // platform-exec
  const execServer = express();
  const viteExec = await createViteServer({
    root: path.resolve(__dirname, '../../apps/platform-exec'),
    server: { middlewareMode: true, hmr: { port: 24679 } }
  });

  // Middleware to ensure we only serve on exec.localhost
  execServer.use((req: Request, res: Response, next: NextFunction) => {
    if (req.hostname !== 'exec.localhost') {
      res.status(404).send('Not Found');
      return;
    }
    next();
  });

  execServer.use(viteExec.middlewares);
  execServer.listen(EXEC_PORT, "localhost", () => {
    console.log(`[platform-exec] listening on http://exec.localhost:${EXEC_PORT}`);
  });
})();
