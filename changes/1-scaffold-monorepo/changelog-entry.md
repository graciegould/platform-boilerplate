## 0.1.0 Scaffold Monorepo - 2023-10-27

| Metadata      | Value                               |
|---------------|-------------------------------------|
| **Pull Request** | `https://github.com/graciegould/platform-boilerplate/pull/3` |
| **Issue**        | `https://github.com/graciegould/platform-boilerplate/issues/1`                |

---

### 🌟 High-Level Summary

This Scaffold Monorepo establishes the foundational PNPM-based monorepo structure. It includes seven workspace packages with a clearly defined dependency hierarchy, enabling shared logic and types across applications and services. This sets the stage for scalable development and future integration with CI/CD and task runners.

---

### 📦 Changes by Package

#### `(root)`
- **Added**
  - `pnpm-workspace.yaml` to define the monorepo structure.
  - Root `package.json` with `typescript` and `ts-node` for development.
  - Run scripts (`app`, `exec`, `server`, etc.) for easy package execution.

#### `platform-core`
- **Added**
  - Initial package setup with `package.json`.
  - `src/index.ts` exporting a `coreLogic` function for downstream consumption.

#### `platform-ui`
- **Added**
  - Initial package setup with a dependency on `platform-core`.
  - `src/index.ts` exporting a `uiComponent` function that consumes `coreLogic`.

#### `platform-app`
- **Added**
  - Initial package setup with a dependency on `platform-ui`.
  - `src/index.ts` that consumes `uiComponent` to demonstrate nested dependency resolution.

#### `platform-exec`
- **Added**
  - Initial package setup with a dependency on `platform-ui`.
  - `src/index.ts` that also consumes `uiComponent`.

#### `platform-server`
- **Added**
  - Initial package setup with a direct dependency on `platform-core`.
  - `src/index.ts` that consumes `coreLogic`, remaining decoupled from the UI layer.

#### `platform-dev` & `platform-db`
- **Added**
  - Placeholder packages with basic `package.json` and `src/index.ts` files for future development.
---

### 🔑 Key for Change Types
- `Added` for new features.
