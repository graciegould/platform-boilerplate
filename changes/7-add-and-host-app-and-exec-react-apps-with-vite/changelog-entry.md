## [Date] - feat: Initial React/Vite Frontend Architecture

| Metadata      | Value                               |
|---------------|-------------------------------------|
| **Pull Request** | `[Link to the Merged PR]`            |
| **Issue**        | `changes/7-add-and-host-app-and-exec-react-apps-with-vite/issue.md`         |

---

### 🌟 High-Level Summary

> This release establishes the foundational frontend architecture for the platform. It introduces two distinct Vite-powered React applications (`platform-app` and `platform-exec`), two shared library packages (`@platform/core` and `@platform/ui`), and a unified development server (`platform-server`). The server was upgraded to TypeScript 5.8 and converted to a native ES Module to resolve a series of startup errors. The entire workspace now uses `pnpm` for efficient dependency management and supports scoped path aliases for clean, maintainable imports between packages.

---

### 📦 Changes by Package

> Detail the changes for each package affected in this release. This is critical for AI agents to understand the blast radius of a change.

#### `platform-app` & `platform-exec`
- **Added**
  - Scaffolding as new Vite + React applications.
  - Added dependencies for `react`, `react-dom`, and their corresponding TypeScript types.
  - Configured `vite.config.ts` to use `vite-tsconfig-paths` for alias resolution.

#### `platform-ui` & `platform-core`
- **Changed**
  - Renamed from `platform-ui` to `@platform/ui` and `platform-core` to `@platform/core`.
- **Added**
  - `@types/react` to `platform-ui` to support TypeScript in shared components.

#### `platform-server`
- **Changed**
  - Refactored server to run two separate Vite/Express development servers.
  - The server now hosts `platform-app` on `localhost:3000` and `platform-exec` on `exec.localhost:3001`.
- **Fixed**
  - Converted the server to a native ES Module (`"type": "module"`) to resolve `SyntaxError: Cannot use import statement outside a module`.
  - Updated the `dev` script to use `node --loader ts-node/esm` to correctly handle `.ts` files in an ESM context.
  - Resolved `ReferenceError: __dirname is not defined` by replacing it with an `import.meta.url`-based equivalent.
- **Removed**
  - Removed the `vhost` dependency in favor of the multi-server setup.

#### `platform-boilerplate` (Root)
- **Added**
  - Centralized shared development dependencies: `vite`, `@vitejs/plugin-react`, and `vite-tsconfig-paths`.
  - Configured `pnpm-workspace.yaml` to define the monorepo structure.
  - Added path aliases to `tsconfig.base.json` for `@platform/*` packages.
- **Fixed**
  - Upgraded `typescript` to `v5.8.3` to resolve `Unknown compiler option 'erasableSyntaxOnly'` error.
  - Resolved `EUNSUPPORTEDPROTOCOL` error by switching to `pnpm`.

---

### 🔑 Key for Change Types
- `Added` for new features.
- `Changed` for changes in existing functionality.
- `Deprecated` for soon-to-be-removed features.
- `Removed` for now-removed features.
- `Fixed` for any bug fixes.
- `Security` in case of vulnerabilities.

---

### 🗂 Affected Workspaces

- `apps/platform-app`
- `apps/platform-exec`
- `packages/platform-ui`
- `packages/platform-core`
- `platform-server`
- `pnpm-workspace.yaml`
- `package.json` (root)
- `tsconfig.base.json`

---

### ⚙️ Developer Setup (if applicable)

> Mention any setup steps or dependency changes developers need to run:
> 
- [x]  Run `pnpm install` to update workspace links and install all dependencies.
- [x]  Ensure `pnpm` is installed globally (`npm i -g pnpm`).
- [x]  To run the development environment, execute `pnpm --filter platform-server run dev`.

---

### 🧪 Validation Steps

> Outline how the change was verified:
> 
- Manual test: Confirmed applications are served correctly on `http://localhost:3000` and `http://exec.localhost:3001` (after updating `/etc/hosts`).
- Ran `pnpm install` and verified no workspace errors.
- Verified that scoped imports (`@platform/ui`) work correctly in the applications.

---

### 🔮 Follow-ups

> List any TODOs or next expected PRs/tasks:
> 
- [ ]  Add a shared UI component back into `@platform/ui` to be consumed by the apps.
- [ ]  Implement production build and serving logic in `platform-server`.
