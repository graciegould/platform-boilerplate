# Workspace Change Summary (as of 2025-06-11)

## Major Features Implemented
- **Scaffolded Vite-powered React apps** in `/apps/platform-app` and `/apps/platform-exec` with TypeScript support.
- **Centralized all React, Vite, and related dependencies** in `/packages/platform-ui/package.json` for deduplication and workspace linking.
- **Created a shared UI component** (`HelloShared`) in `platform-ui` and used it in both apps.
- **Configured Vite and TypeScript path aliases** in both apps to resolve shared UI imports from `platform-ui` source in development.
- **Removed duplicate React/ReactDOM/type dependencies** from app-level `package.json` files.
- **Updated Express server (`platform-server/src/server.ts`)** to:
  - Use Vite middleware for both apps in development, with unique HMR ports to avoid conflicts.
  - Serve static builds for both apps in production.
  - Host `platform-app` at `/` and `platform-exec` at `/admin` and on the `exec.localhost` subdomain using the `vhost` middleware.
- **Added and configured `vhost` and its types** for subdomain-based routing.
- **Updated `.env.example`** to include `APP_PORT` and `EXEC_PORT`.

## Key Files Changed or Added
- `apps/platform-app/vite.config.ts`, `apps/platform-exec/vite.config.ts`: Vite/React/TypeScript setup, aliasing for shared UI.
- `apps/platform-app/package.json`, `apps/platform-exec/package.json`: Removed duplicate React/ReactDOM/type dependencies.
- `packages/platform-ui/package.json`, `tsconfig.json`, `src/HelloShared.tsx`, `src/index.ts`: Centralized dependencies and shared UI export.
- `platform-server/src/server.ts`: Unified dev/prod hosting, subdomain routing, Vite middleware, static serving, and SPA fallback.
- `.env.example`: Documented new ports.

## Usage Notes
- In dev, visit `http://localhost:3000/` for `platform-app` and `http://exec.localhost:3000/` or `/admin` for `platform-exec` (add `127.0.0.1 exec.localhost` to `/etc/hosts`).
- In prod, static assets are served from the respective `dist` folders.
- All React and Vite dependencies are deduped and managed via `platform-ui`.

---

This context file summarizes all major changes and configuration for the multi-app, shared-UI, unified-hosting setup in this monorepo.
