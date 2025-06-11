# Issue: Scaffold Monorepo with Workspace-Linked Dependencies

## 🌟 User Story

As a full-stack platform engineer managing a modular monorepo,  
I want to scaffold the foundational structure of all workspace packages with valid `package.json` files, source directories, and clearly declared interdependencies,  
So that I can enable proper workspace linking via `pnpm`, enforce clear dependency flow across modules, and prepare the structure for integration with Turborepo task pipelines and CI/CD.

---

## 🧩 Context

This task lays the groundwork for a scalable, dependency-aware platform. The following conventions and rules will be enforced:

- Each package will define only the dependencies it **directly** uses. Shared logic flows downstream through workspace links.
- `platform-ui` consumes `platform-core`. `platform-app` and `platform-exec` consume `platform-ui`.
- `platform-server` directly consumes `platform-core`, but **not** `platform-ui` or any app code.
- This allows Turbo and CI systems to understand what packages depend on what, and what needs to rebuild or re-test when something changes.

Workspace packages are split across apps, core libraries, infrastructure, and development tools. Each must:
- Include a valid `package.json`
- Include a `src/index.ts` file for entry
- Be listed in `pnpm-workspace.yaml`
- Successfully install and link via `pnpm install`

---

## 📂 Target Locations

```
/platform-boilerplate/
├── apps/
│   ├── platform-app/        # Public-facing app (depends on ui)
│   └── platform-exec/       # Internal admin/exec app (also depends on ui)
├── packages/
│   ├── platform-core/       # Shared business logic, types, validation
│   └── platform-ui/         # Shared React UI components, imports platform-core
├── platform-server/         # Express backend using platform-core only
├── platform-dev/            # Internal dev tools, cursor hooks, CLI, automation
├── platform-db/             # Postgres + Prisma schema (not yet implemented)
```

---

## ✅ Requirements / Acceptance Criteria

- [ ] All 7 workspace folders include a valid `package.json` with:
  - `"name"` (e.g., `platform-app`)
  - `"version": "0.0.0"`
  - `"private": true`
  - `"main": "src/index.ts"`
  - `"dependencies"` that reflect intentional upstream relationships:
    - `platform-app` → `platform-ui`
    - `platform-exec` → `platform-ui`
    - `platform-ui` → `platform-core`
    - `platform-server` → `platform-core`
- [ ] Each workspace has a `src/` folder containing `index.ts` with a dummy log or export:
  ```ts
  // src/index.ts
  console.log("[platform-app] ready");
  ```
- [ ] `pnpm-workspace.yaml` is created or updated with:
  ```yaml
  packages:
    - apps/*
    - packages/*
    - platform-server
    - platform-dev
    - platform-db
  ```
- [ ] `pnpm install` runs successfully at the root
- [ ] No dependency resolution or linking errors appear in the output
- [ ] Imports between packages resolve correctly with local paths (e.g., `import { something } from 'platform-ui'` inside `platform-app`)
- [ ] create a markdown file with documentation of your changes named by the branch name, we will have a better process for changes later
---

## 📦 Dependencies

- `pnpm` must be installed globally
- No database schema or Prisma setup is needed yet — handled in a future issue

---

## 🔍 Notes / Tips

- Use "*" as the version constraint when referencing other local packages (e.g., `"platform-ui": "*"`)
- Keep `node_modules` clean: dependencies declared only where used
- Future stories will introduce `turbo`, Prisma in `platform-db`, and CI build tasks

---

## 🥺 Test Plan

- [ ] Run `pnpm install` from the root without error
- [ ] Run each package's entry point with `ts-node src/index.ts` or equivalent
- [ ] Confirm cross-package imports resolve (e.g., core → ui → app)

