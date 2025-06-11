## [Version or Date] - [Brief, Descriptive Title]

| Metadata      | Value                               |
|---------------|-------------------------------------|
| **Pull Request** | `[Link to the Merged PR]`            |
| **Issue**        | `[Link to the Closed Issue]`         |

---

### 🌟 High-Level Summary

> Provide a one-paragraph overview of what this release contains. This should be clear enough for someone (or an AI) to quickly grasp the purpose of the update without digging into the details.

---

### 📦 Changes by Package

> Detail the changes for each package affected in this release. This is critical for AI agents to understand the blast radius of a change.

#### `platform-core`
- **Added**
  - New `calculatePrice` utility for shared business logic.
- **Fixed**
  - Resolved an off-by-one error in the `date-formatter`.

#### `platform-ui`
- **Changed**
  - The primary `Button` component now uses the new `calculatePrice` utility from `platform-core`.
  - Updated the color palette to match the new design system.
- **Removed**
  - Deprecated `OldButton` component.

#### `platform-app`
- **Added**
  - Integrated the updated `Button` from `platform-ui` into the main checkout form.

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

---

### ⚙️ Developer Setup (if applicable)

> Mention any setup steps or dependency changes developers need to run:
> 
- [ ]  Run `pnpm install` to update workspace links
- [ ]  Ensure `pnpm` is installed globally (`npm i -g pnpm`)
- [ ]  If new scripts were added, run `pnpm dev` or `pnpm build` inside updated packages
- [ ]  If Turbo is now used, run `npx turbo run build --filter=<package>`

---

### 🧪 Validation Steps

> Outline how the change was verified:
> 
- Manual test: confirmed imports from shared packages work
- Ran `pnpm install` and verified no workspace errors
- Ran `ts-node src/index.ts` in each package

---

### 🔮 Follow-ups

> List any TODOs or next expected PRs/tasks:
> 
- [ ]  Integrate `turbo` pipeline
- [ ]  Add Prisma and DB migrations in `platform-db`
- [ ]  Create dev/start scripts per app/server

---