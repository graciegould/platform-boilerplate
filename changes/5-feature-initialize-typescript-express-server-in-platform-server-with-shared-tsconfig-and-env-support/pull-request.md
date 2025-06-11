# Initialize TypeScript Express Server in platform-server with Shared TSConfig and .env Support

| Metadata      | Value                                                                 |
|---------------|-----------------------------------------------------------------------|
| **Issue №**   | 5                                                                     |
| **Issue Title** | Initialize TypeScript Express Server in `platform-server` with Shared TSConfig and .env Support |
| **Issue Link**  | https://github.com/graciegould/platform-boilerplate/issues/5         |

---

## 🌟 User Story

> As a developer,  
> I want a robust, type-safe Express server running in the `platform-server` package with a dedicated `server.ts` entrypoint and environment variable support,  
> So that the backend is easy to develop, restart automatically with Nodemon, use shared TypeScript configuration, and allow local customization via environment variables.

---

## 🚀 Summary for AI & Human Reviewers

This PR scaffolds a new TypeScript-based Express server in the `platform-server` package. It introduces a `/test` endpoint, uses a shared root `tsconfig.base.json`, supports `.env` configuration, and provides scripts for development, build, and production. All Express and dotenv dependencies are local to `platform-server`, and unnecessary Express types are removed from `platform-core`. This setup streamlines backend development and ensures type safety and environment flexibility.

---

## 🧱 Architectural Impact

**Modified Packages:**
- [x] platform-server
- [x] platform-core
- [ ] platform-ui
- [ ] platform-app
- [ ] platform-exec
- [ ] platform-dev
- [ ] platform-db

**Dependency Changes (per package):**
*   **platform-server**:
    *   Added: `express@^4.19.2`, `dotenv@^16.4.5`, `@types/express@^4.17.23`, `@types/node@^20.19.0`, `@types/dotenv@^8.2.3`, `nodemon@^3.0.0`, `ts-node@^10.9.2`, `typescript@^5.4.0`
*   **platform-core**:
    *   Removed: `@types/express@^4.17.21`

---

## ✅ Pre-flight Checklist for the AI Co-Pilot

- [x] **Dependencies**: All new dependencies have been added to the correct `package.json` files.
- [x] **Installation**: I have run `pnpm install` locally and it completes without errors.
- [x] **Build**: All modified packages build successfully (`pnpm build`, `tsc`, etc.).
- [x] **Linting & Formatting**: Code is free of linting errors and formatted correctly.
- [x] **Runtime**: The application runs without new console errors or warnings.
- [x] **Cross-Package Contracts**: Imports between packages are updated and contracts (e.g., function signatures, types) are respected.

---

## 🧪 Automated & Manual Test Plan

**Automated Tests:**
*   **Command**: `pnpm --filter platform-server run build`
*   **Expected Outcome**: No TypeScript errors.

**Manual Validation Steps:**
1.  **Setup**: Copy `.env.example` to `.env` in `platform-server`.
2.  **Action**: Run `pnpm --filter platform-server run dev`.
3.  **Observation**: Console logs `[platform-server] listening on port 3000` (or the value set in `.env`).
4.  **Action**: Visit `http://localhost:3000/test`.
5.  **Observation**: Response status is 200 with body `Test OK`.

---

## 📸 Screenshots / Demos

| Before | After |
| :----: | :---: |
|        |       |

---

## 📝 Implementation Notes for the Reviewer

- All Express and dotenv dependencies are now local to `platform-server`.
- `platform-core` no longer includes any Express types.
- The server is intentionally minimal, exposing only `/test` for validation.
- The setup is ready for further backend development and extension.
