# [Feature]: React/Vite Apps for platform-app & platform-exec, Shared UI, and Unified Hosting in platform-server

| Metadata | Value |
| --- | --- |
| **Issue Type** | Feature |
| **Affected Packages** | platform-app, platform-exec, platform-ui, platform-server |
| **Priority** | High |

---

## 🌟 User Story

> As a developer,
> 
> 
> I want to build and serve two distinct React apps (`platform-app` and `platform-exec`) using Vite in development mode, sharing React and UI dependencies from `platform-ui`,
> 
> `platform-app` should be hosted at localhost
> 
> `platform-exec` should be hosted at exec.localhost (subdomain exec)
> 
> So that I can maintain DRY, scalable frontends, and serve both apps on different routes/ports via the Express server in `platform-server`.
> 

---

## 🧩 Context & Business Rules

- Both `/apps/platform-app` and `/apps/platform-exec` should be full React apps, bootstrapped with Vite.
- All React, Vite, and related dependencies should be declared in `/packages/platform-ui` and reused via workspace linking.
- UI components are developed in `platform-ui` and imported into both apps.
- The Express server (`platform-server/src/server.ts`) must proxy or serve both apps to their correct ports APP_PORT=3000 and EXEC_PORT=3001 (add those to the .env.example)
- Development should support hot reload for both apps, possibly using Vite's middleware or proxies.
- Production build should enable static asset serving for both apps via Express.

---

## ✅ Acceptance Criteria & Task List

- [ ]  **Task 1**: Scaffold Vite-powered React apps in `/apps/platform-app` and `/apps/platform-exec`.
    - Each has its own `index.html`, entry point, and Vite config. (remember to install vite types if necessary and keep typing as much as possible)
- [ ]  **Task 2**: Move all React/Vite dependencies (e.g., `react`, `react-dom`, `vite`, etc.) to `/packages/platform-ui/package.json`.
    - Both apps should use workspace linking to resolve these dependencies.
- [ ]  **Task 3**: Refactor `/packages/platform-ui` to export shared React components.
- [ ]  **Task 4**: Update both apps to import and use at least one component from `platform-ui`.
- [ ]  **Task 5**: Update `platform-server/src/server.ts` to:
    - In development: proxy or use Vite dev middleware to serve both apps on different routes/ports.
    - In production: serve static builds for both apps using Express static middleware.
    - Ensure `/` serves `platform-app` and `/admin` (or `/exec`) serves `platform-exec`.
- [ ]  **Task 6**: Update scripts in relevant `package.json` files for dev to run both app and exec out of the server.ts, you will want to use the vite middleware most likely
- [ ]  **Task 7**: Update docs and `.env.example` as needed for new ports/routes.

---

## 📂 Target Files & Directory Structure

**Files to Create/Modify:**

- `apps/platform-app/` (Vite + React app)
- `apps/platform-exec/` (Vite + React app)
- `packages/platform-ui/package.json` (shared dependencies)
- `packages/platform-ui/src/` (shared React components)
- `platform-server/src/server.ts` (Express proxy/static serving logic)
- `apps/platform-app/vite.config.ts`
- `apps/platform-exec/vite.config.ts`
- `.env.example`

**Example Directory Tree:**

```
/platform-boilerplate/
├── apps/
│   ├── platform-app/
│   │   ├── src/
│   │   ├── index.html
│   │   └── vite.config.ts
│   └── platform-exec/
│       ├── src/
│       ├── index.html
│       └── vite.config.ts
├── packages/
│   └── platform-ui/
│       ├── package.json
│       └── src/ (shared React components)
├── platform-server/
│   └── src/server.ts

```

---

## 💡 Suggested Technical Approach

1. Use Vite to scaffold React apps in both `apps/platform-app` and `apps/platform-exec`.
2. Move all frontend dependencies (React, Vite, related plugins) to `platform-ui/package.json` for deduplication and workspace linking.
3. Implement at least one shared UI component in `platform-ui/src/` and use it in both apps.
4. For dev mode, configure the Express server to proxy or use Vite middlewares for both apps, or run them on different ports and proxy.
5. For production, after building both apps (`vite build`), serve their static assets from Express on `/` and `/admin`.
6. Update scripts and environment docs for developer clarity.

---

## 🚫 Out of Scope

- Do not implement authentication, advanced routing, or backend logic beyond serving the static files/proxying Vite.
- No deployment/Docker setup in this story.

---

## 🧪 Validation & Test Plan

**Automated Tests:**

- **Command**: `pnpm --filter platform-app run build`
- **Command**: `pnpm --filter platform-exec run build`
- **Expected Outcome**: Both apps build and output static assets.

**Manual Validation Steps:**

1. `pnpm --filter platform-server run dev`
2. Visit `http://localhost:3000/` → See `platform-app` with shared UI component.
3. Visit `http://localhost:3001/` or `http://localhost:3000/admin` → See `platform-exec` with shared UI component.
4. In production: `pnpm --filter platform-app run build`, `pnpm --filter platform-exec run build`, `pnpm --filter platform-server run start`. Both apps are served correctly.

---

## ⚙️ System Dependencies & Prerequisites

- `pnpm` must be installed globally.
- Node.js >= 18 must be installed locally.
- Developers should copy `.env.example` to `.env` and set the relevant ports.