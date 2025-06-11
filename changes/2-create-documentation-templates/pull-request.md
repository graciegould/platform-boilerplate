# feat: Create documentation templates

| Metadata      | Value                               |
|---------------|-------------------------------------|
| **Issue №**   | `N/A`                               |
| **Issue Title** | `N/A`                               |
| **Issue Link**  | `N/A`                               |

---

## 🌟 User Story

> As a developer,
> I want to have standardized templates for pull requests, issues, and changelogs,
> So that I can ensure all contributions are well-documented and consistent.

---

## 🚀 Summary for AI & Human Reviewers

> This pull request introduces three new documentation templates to the `platform-dev` package: `PULL_REQUEST_TEMPLATE.md`, `CHANGELOG_ENTRY_TEMPLATE.md`, and `ISSUE_TEMPLATE.md`. The goal is to standardize contribution guidelines, improve clarity for reviewers (both human and AI), and ensure that all necessary information is captured consistently across the project.

---

## 🧱 Architectural Impact

> This section helps an AI understand how the monorepo's structure is affected. Please be precise.

**Modified Packages:**
- `[ ] platform-core`
- `[ ] platform-ui`
- `[ ] platform-app`
- `[ ] platform-exec`
- `[ ] platform-server`
- `[x] platform-dev`
- `[ ] platform-db`

**Dependency Changes (per package):**
*   **`platform-dev`**:
    *   No dependency changes.

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
*   Not applicable for documentation changes.

**Manual Validation Steps:**
1.  **Setup**: `cd platform-dev/src/templates`
2.  **Action**: `ls -1`
3.  **Observation**: Verify that `CHANGELOG_ENTRY_TEMPLATE.md`, `ISSUE_TEMPLATE.md`, and `PULL_REQUEST_TEMPLATE.md` are listed.
4.  **Action**: Open each file.
5.  **Observation**: Confirm the content of each file matches the new templates.

---

## 📸 Screenshots / Demos

> Visual evidence is extremely helpful for AI and human reviewers.

| Before | After |
| :----: | :---: |
| No templates existed. | New templates are available in `platform-dev/src/templates`. |

---

## 📝 Implementation Notes for the Reviewer

> - These templates are currently stored in `platform-dev`. A future task will involve moving them to a root-level `.github` directory to enable automatic integration with the GitHub UI.
