# [Brief, Imperative Title of the PR]

| Metadata      | Value                               |
|---------------|-------------------------------------|
| **Issue №**   | `[NUMBER]`                          |
| **Issue Title** | `[TITLE OF THE ISSUE]`              |
| **Issue Link**  | `[LINK TO THE GITHUB/JIRA ISSUE]` |

---

## 🌟 User Story

> As a [user persona],  
> I want to [accomplish something],  
> So that I can [achieve some value].

---

## 🚀 Summary for AI & Human Reviewers

> Provide a concise, one-paragraph summary explaining the **what** and **why** of this change. This should be clear enough for an AI to understand the core intent without reading the entire implementation.

---

## 🧱 Architectural Impact

> This section helps an AI understand how the monorepo's structure is affected. Please be precise.

**Modified Packages:**
- `[ ] platform-core`
- `[ ] platform-ui`
- `[ ] platform-app`
- `[ ] platform-exec`
- `[ ] platform-server`
- `[ ] platform-dev`
- `[ ] platform-db`

**Dependency Changes (per package):**
*   **`package-name`**:
    *   Added: `dependency-name@version`
    *   Removed: `dependency-name@version`
    *   Updated: `dependency-name@version`

---

## ✅ Pre-flight Checklist for the AI Co-Pilot

> This checklist helps the AI agent verify the PR's health.

- [ ] **Dependencies**: All new dependencies have been added to the correct `package.json` files.
- [ ] **Installation**: I have run `pnpm install` locally and it completes without errors.
- [ ] **Build**: All modified packages build successfully (`pnpm build`, `tsc`, etc.).
- [ ] **Linting & Formatting**: Code is free of linting errors and formatted correctly.
- [ ] **Runtime**: The application runs without new console errors or warnings.
- [ ] **Cross-Package Contracts**: Imports between packages are updated and contracts (e.g., function signatures, types) are respected.

---

## 🧪 Automated & Manual Test Plan

> This section guides the AI (and human reviewers) on how to validate the changes.

**Automated Tests:**
*   **Command**: `pnpm test --filter [package-name]`
*   **Expected Outcome**: All tests pass.

**Manual Validation Steps:**
1.  **Setup**: `[Any setup required, e.g., seed database]`
2.  **Action**: `[e.g., Navigate to http://localhost:3000/some-feature]`
3.  **Observation**: `[e.g., The new button should be visible and clickable.]`
4.  **Action**: `[e.g., Click the button.]`
5.  **Observation**: `[e.g., A modal should appear with the correct data.]`

---

## 📸 Screenshots / Demos

> Visual evidence is extremely helpful for AI and human reviewers.

| Before | After |
| :----: | :---: |
|        |       |

---

## 📝 Implementation Notes for the Reviewer

> Provide any context that is not immediately obvious from the code.
> - Why was a particular design pattern or library chosen?
> - Are there any known limitations or follow-up tasks (e.g., link to a new ticket for tech debt)?