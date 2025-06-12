# feat: Add and Host Vite/React Apps with Shared UI

| Metadata      | Value                               |
|---------------|-------------------------------------|
| **Issue №**   | `7`                          |
| **Issue Title** | `React/Vite Apps for platform-app & platform-exec, Shared UI, and Unified Hosting in platform-server`              |
| **Issue Link**  | `changes/7-add-and-host-app-and-exec-react-apps-with-vite/issue.md` |

---

## 🌟 User Story

> As a developer,
> I want to build and serve two distinct React apps (`platform-app` and `platform-exec`) using Vite in development mode, sharing React and UI dependencies from `platform-ui`,
> `platform-app` should be hosted at localhost
> `platform-exec` should be hosted at exec.localhost (subdomain exec)
> So that I can maintain DRY, scalable frontends, and serve both apps on different routes/ports via the Express server in `platform-server`.

---

## 🚀 Summary for AI & Human Reviewers

> This pull request establishes the foundational frontend architecture for the monorepo. It introduces two Vite-powered React applications, `platform-app` and `platform-exec`, alongside shared workspace packages `@platform/core` and `@platform/ui`. The development server in `platform-server` was upgraded to the latest TypeScript version and converted to a native ES Module to resolve a series of runtime errors. It now correctly serves both applications on their respective domains and ports (`localhost:3000` and `exec.localhost:3001`), providing an isolated yet unified development experience with hot-reloading. The entire workspace has been configured to use `pnpm` and scoped path aliases for clean, maintainable imports.

---

## 🧱 Architectural Impact

> This section helps an AI understand how the monorepo's structure is affected. Please be precise.

**Modified Packages:**
- `[x] platform-core`
- `[x] platform-ui`
- `[x] platform-app`
- `[x] platform-exec`
- `[x] platform-server`
- `[ ] platform-dev`
- `[ ] platform-db`

**Dependency Changes (per package):**
*   **`platform-boilerplate` (root)**:
    *   Added: `@vitejs/plugin-react@^4.3.1`, `vite@^5.3.1`, `vite-tsconfig-paths@^4.3.2`
    *   Updated: `typescript` to `^5.8.3`
*   **`platform-server`**:
    *   Removed: `vhost@^3.0.2`, `@types/vhost@^3.0.10`
    *   Updated: `typescript` to `^5.8.3`
    *   Added: `"type": "module"` to `package.json`
*   **`platform-ui`**:
    *   Added: `@types/react@^18.3.1`
    *   Peer Deps: `react@*`, `react-dom@*`
*   **`platform-app`**:
    *   Added: `react@^18.3.1`, `react-dom@^18.3.1`, `@types/react@^18.3.1`, `@types/react-dom@^18.3.0`
*   **`platform-exec`**:
    *   Added: `react@^18.3.1`, `react-dom@^18.3.1`, `@types/react@^18.3.1`

---

## ✅ Pre-flight Checklist for the AI Co-Pilot

> This checklist helps the AI agent verify the PR's health.

- [x] **Dependencies**: All new dependencies have been added to the correct `package.json` files.
- [x] **Installation**: I have run `pnpm install` locally and it completes without errors.
- [x] **Build**: All modified packages build successfully (`pnpm build`, `tsc`, etc.).
- [x] **Linting & Formatting**: Code is free of linting errors and formatted correctly.
- [x] **Runtime**: The application runs without new console errors or warnings.
- [x] **Cross-Package Contracts**: Imports between packages are updated and contracts (e.g., function signatures, types) are respected.

---

## 🧪 Automated & Manual Test Plan

> This section guides the AI (and human reviewers) on how to validate the changes.

**Automated Tests:**
*   N/A - No automated tests were added in this PR.

**Manual Validation Steps:**
1.  **Setup**: Ensure `pnpm` is installed globally (`npm i -g pnpm`). Run `pnpm install` from the root of the project.
2.  **Action**: Run the development server with `pnpm --filter platform-server run dev`.
3.  **Observation**: The console should output that `platform-app` is listening on `http://localhost:3000` and `platform-exec` is listening on `http://exec.localhost:3001`.
4.  **Action**: Navigate to `http://localhost:3000`.
5.  **Observation**: The `platform-app` should render with the heading "Platform App".
6.  **Action**: Add `127.0.0.1 exec.localhost` to your `/etc/hosts` file. Navigate to `http://exec.localhost:3001`.
7.  **Observation**: The `platform-exec` app should render with the heading "Platform Exec".

---

## 📸 Screenshots / Demos

> Visual evidence is extremely helpful for AI and human reviewers.

| Before | After |
| :----: | :---: |
| No frontend applications or server existed. | Two separate frontend applications are now served in development. |

---

## 📝 Implementation Notes for the Reviewer

> Provide any context that is not immediately obvious from the code.
> - The `platform-server` underwent significant refactoring to resolve a series of startup errors. This included upgrading the workspace to TypeScript 5.8 to support modern compiler options and converting the server from CommonJS to a native ES Module. This required updating Node.js execution flags (`--loader ts-node/esm`) and replacing CommonJS-specific variables like `__dirname`.
> - The initial approach considered using `vhost` to serve both apps from a single server instance. This was refactored to run two separate Express/Vite servers. This provides better isolation and a clearer development experience, though it consumes an extra port.
> - The packages were renamed to be scoped (`@platform/core`, `@platform/ui`) and path aliases were configured in `tsconfig.base.json` to allow for clean, absolute imports (e.g., `import { ... } from '@platform/ui'`).
> - Shared development dependencies like `vite` and `typescript` are intentionally placed in the root `package.json` to be available across the entire workspace, which is a standard monorepo practice.
