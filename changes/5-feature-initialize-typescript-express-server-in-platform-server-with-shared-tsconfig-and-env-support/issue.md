# [Feature]: Initialize TypeScript Express Server in `platform-server` with Shared TSConfig and .env Support

| Metadata            | Value                                                 |
|---------------------|-------------------------------------------------------|
| **Issue Type**      | `Feature`                                             |
| **Affected Packages**| `platform-server`                                    |
| **Priority**        | `High`                                                |

---

## 🌟 User Story

> As a developer,  
> I want a robust, type-safe Express server running in the `platform-server` package with a dedicated `server.ts` entrypoint and environment variable support,  
> So that the backend is easy to develop, restart automatically with Nodemon, use shared TypeScript configuration, and allow local customization via environment variables.

---

## 🧩 Context & Business Rules

> - The `platform-server` package serves as the main backend service for the platform.  
> - It must use TypeScript for type safety, Express for HTTP, and Nodemon for auto-restart during development, even with TypeScript source.  
> - All TypeScript configuration should cascade from a root-level `tsconfig.base.json`, with package-level overrides in `platform-server/tsconfig.json` (using `extends`).  
> - The server should be started from `src/server.ts`.  
> - No endpoints should be hosted except a `/test` endpoint for initial validation.  
> - Scripts must be provided for development (`dev`), build (`build`), and production (`start`).  
> - Development should use Nodemon and ts-node for live reloads.  
> - The server should use a `.env` file for configuration, with a `.env.example` committed to the repo.  
> - At minimum, the environment should support a `PORT` variable for local configuration and demonstration.

---

## ✅ Acceptance Criteria & Task List

- [ ] **Task 1**: Create a new Node.js project with TypeScript in `platform-server`.
- [ ] **Task 2**: Add and configure Express, TypeScript, Nodemon, ts-node, dotenv, and types as dependencies and devDependencies.
  ```json
  // Example dependencies in platform-server/package.json
  {
    "dependencies": {
      "express": "^4.19.2",
      "dotenv": "^16.4.5"
    },
    "devDependencies": {
      "typescript": "^5.4.0",
      "nodemon": "^3.0.0",
      "ts-node": "^10.9.2",
      "@types/express": "^4.17.21",
      "@types/node": "^20.11.30"
    }
  }
  ```
- [ ] **Task 3**: Set up a `tsconfig.json` in `platform-server` that extends from the root-level `tsconfig.base.json`. Any project-specific overrides should be minimal.
  ```json
  // platform-server/tsconfig.json
  {
    "extends": "../../tsconfig.base.json",
    "compilerOptions": {
      "outDir": "./dist",
      "rootDir": "./src"
    },
    "include": ["src"]
  }
  ```
- [ ] **Task 4**: Implement `src/server.ts` to launch an Express server with only a `/test` endpoint that returns 200 and a message. The server must read the port from `process.env.PORT` with a fallback default.
  ```typescript
  // src/server.ts
  import express from "express";
  import dotenv from "dotenv";
  dotenv.config();

  const app = express();
  app.get("/test", (req, res) => res.status(200).send("Test OK"));

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`[platform-server] listening on port ${PORT}`);
  });
  ```
- [ ] **Task 5**: Add scripts in `package.json` for:
    - `"dev"`: `"nodemon --watch src --ext ts --exec ts-node src/server.ts"`
    - `"build"`: `"tsc"`
    - `"start"`: `"node dist/server.js"`
- [ ] **Task 6**: Add a minimal README.md to `platform-server` describing how to run and develop the server.
- [ ] **Task 7**: Ensure `platform-server` is included in `pnpm-workspace.yaml`.
- [ ] **Task 8**: Add a `.env.example` file in `platform-server` with at least `PORT=3000` and instructions to copy/rename for local usage.

---

## 📂 Target Files & Directory Structure

**Files to Create:**
- `platform-server/package.json`
- `platform-server/tsconfig.json`
- `platform-server/src/server.ts`
- `platform-server/README.md`
- `platform-server/.env.example`

**Files to Modify:**
- `pnpm-workspace.yaml` (ensure `platform-server` is included)
- `tsconfig.base.json` at repo root (if not already present; or ensure structure supports cascading)

**Example Directory Tree:**
```
/platform-boilerplate/
├── apps/
├── packages/
├── platform-server/
│   ├── src/
│   │   └── server.ts
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env.example
│   └── README.md
├── pnpm-workspace.yaml  // <-- MODIFIED
├── tsconfig.base.json   // <-- SHARED BASE
```

---

## 💡 Suggested Technical Approach (for AI)

> 1. Scaffold a new Node.js project with TypeScript in `platform-server`.
> 2. Install and configure dependencies (express, dotenv, types, nodemon, ts-node, typescript).
> 3. Set up scripts for type-checking, running in dev mode (with Nodemon + ts-node), and production.
> 4. Implement a simple Express app in `src/server.ts` with a `/test` endpoint and dynamic port from `.env`.
> 5. Ensure TypeScript config extends from the root and supports cascading.
> 6. Add documentation and `.env.example` file.

---

## 🚫 Out of Scope

> - Do not implement any business logic or additional endpoints.
> - Do not add database integration.
> - No Docker or deployment configuration at this stage.

---

## 🧪 Validation & Test Plan

**Automated Tests:**
- **Command**: `pnpm --filter platform-server run build`
- **Expected Outcome**: No TypeScript errors.

**Manual Validation Steps:**
1.  **Command**: `cp platform-server/.env.example platform-server/.env`
2.  **Command**: `pnpm --filter platform-server run dev`
3.  **Expected Output**: Console logs `[platform-server] listening on port 3000` (or the value set in `.env`)
4.  **Action**: Visit `http://localhost:3000/test`
5.  **Expected Output**: Response status is 200 with body `Test OK`

---

## ⚙️ System Dependencies & Prerequisites

> - `pnpm` must be installed globally.
> - Node.js >= 18 must be installed locally.
> - No other dependencies required for this task.
> - Developers should copy `.env.example` to `.env` before starting the server.
