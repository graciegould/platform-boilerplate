import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import type { Request, Response, NextFunction } from 'express';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

// Function to find an available port
async function findAvailablePort(startPort: number): Promise<number> {
  const net = await import('net');
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.unref();
    server.on('error', (err: any) => {
      if (err.code === 'EADDRINUSE') {
        resolve(findAvailablePort(startPort + 1));
      } else {
        reject(err);
      }
    });
    server.listen(startPort, () => {
      server.close(() => {
        resolve(startPort);
      });
    });
  });
}

async function startServer() {
  app.use(express.json({ limit: '10mb' }));

  if (process.env.NODE_ENV === 'development') {
    try {
      const { createServer: createViteServer } = await import('vite');
      
      // Find available ports for HMR
      const mainHmrPort = await findAvailablePort(3001);
      const execHmrPort = await findAvailablePort(3002);
      
      console.log('Using HMR ports:', { mainHmrPort, execHmrPort });

      // Create Vite server for main app
      const mainVite = await createViteServer({
        server: { 
          middlewareMode: true,
          hmr: {
            port: mainHmrPort,
            protocol: 'ws'
          }
        },
        appType: 'custom',
        root: path.resolve(__dirname, '../../apps/platform-app'),
      });

      // Create Vite server for exec app
      const execVite = await createViteServer({
        server: { 
          middlewareMode: true,
          hmr: {
            port: execHmrPort,
            protocol: 'ws'
          }
        },
        appType: 'custom',
        root: path.resolve(__dirname, '../../apps/platform-exec'),
      });

      // Debug middleware to log all requests
      app.use((req: Request, res: Response, next: NextFunction) => {
        console.log('Incoming request:', {
          method: req.method,
          url: req.url,
          host: req.get('host'),
          headers: req.headers
        });
        next();
      });

      // Use Vite's middleware first for static assets and HMR
      app.use((req: Request, res: Response, next: NextFunction) => {
        const host = req.get('host');
        const isExec = host?.startsWith('exec.');
        const vite = isExec ? execVite : mainVite;
        console.log('Using Vite middleware for:', isExec ? 'exec app' : 'main app');
        vite.middlewares(req, res, next);
      });

      // Handle all routes for SPA
      app.use(async (req: Request, res: Response, next: NextFunction) => {
        const url = req.originalUrl;
        const host = req.get('host');
        console.log('SPA route handler - Host:', host, 'URL:', url);

        const isExec = host?.startsWith('exec.');
        const vite = isExec ? execVite : mainVite;
        const appRoot = isExec ? '../../apps/platform-exec' : '../../apps/platform-app';

        try {
          // Read index.html
          const indexPath = path.resolve(__dirname, appRoot, 'index.html');
          console.log('Reading index.html from:', indexPath);
          
          const template = await fs.readFile(indexPath, 'utf-8');
          console.log('Successfully read index.html');

          // Transform the HTML
          const transformedTemplate = await vite.transformIndexHtml(url, template);
          console.log('Successfully transformed index.html');

          // Send the transformed HTML
          res.status(200).set({ 'Content-Type': 'text/html' }).end(transformedTemplate);
        } catch (e: any) {
          console.error('Error processing request:', e);
          console.error('Error stack:', e.stack);
          vite.ssrFixStacktrace(e);
          next(e);
        }
      });

    } catch (e) {
      console.error('Error initializing Vite servers:', e);
      process.exit(1);
    }
  } else {
    // TODO: Production
  }

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('Server Error:', err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  });

  // Find an available port for the main server
  const PORT = await findAvailablePort(parseInt(process.env.PORT || '3000'));
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Main app: http://localhost:${PORT}`);
    console.log(`Exec app: http://exec.localhost:${PORT}`);
  });
}

startServer().catch(e => {
  console.error('Failed to start server:', e);
  process.exit(1);
});