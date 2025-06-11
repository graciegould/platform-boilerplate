# [Feature | Bug | Chore | Refactor | Documentation | Discovery]: [Brief, Clear Title of the Issue]

| Metadata            | Value                                                 |
|---------------------|-------------------------------------------------------|
| **Issue Type**      | `[Feature | Bug | Chore | Refactor | documentation | plan ]`                    |
| **Affected Packages**| `[e.g., platform-core, platform-ui]`                   |
| **Priority**        | `[High | Medium | Low]`                               |

---

## 🌟 User Story

> As a [user persona],  
> I want to [accomplish something],  
> So that I can [achieve some value].

---

## 🧩 Context & Business Rules

> Provide all necessary context for this issue. Explain the "why" behind the requirements. Define any business rules, constraints, or technical conventions the AI must follow.

---

## ✅ Acceptance Criteria & Task List

> This is a direct, machine-readable checklist for the AI agent. Each item should be a concrete, verifiable task.

- [ ] **Task 1**: A clear, imperative instruction (e.g., "Create a new file at `packages/platform-core/src/utils.ts`").
- [ ] **Task 2**: Another instruction (e.g., "Add a `sum(a, b)` function to the new `utils.ts` file").
  ```typescript
  // Example code block for the AI to use
  export const sum = (a: number, b: number): number => a + b;
  ```
- [ ] **Task 3**: "Update the `package.json` for `platform-app` to include a new dependency."
  ```json
  // Example diff for package.json
  {
    "dependencies": {
      "new-dependency": "1.2.3"
    }
  }
  ```

---

## 📂 Target Files & Directory Structure

> Explicitly list all files to be created, modified, or deleted. This helps the AI confirm its scope. Visual diagrams are highly effective.

**Files to Create:**
- `platform-dev/src/new-tool.ts`

**Files to Modify:**
- `platform-app/src/index.ts`
- `pnpm-workspace.yaml`

**Example Directory Tree:**
```
/platform-boilerplate/
├── apps/
│   └── platform-app/
│       └── src/index.ts  // <-- MODIFIED
├── packages/
//...
```

---

## 💡 Suggested Technical Approach (for AI)

> (Optional) Provide a high-level plan or pseudo-code to guide the AI's implementation. This is useful for complex tasks.
>
> 1. First, scaffold the new component file in `platform-ui`.
> 2. Then, export the component from the main `index.ts`.
> 3. Finally, import and render the new component within `platform-app`.

---

## 🚫 Out of Scope

> Clearly define what should NOT be done in this issue. This prevents scope creep and unexpected changes.
> - This issue does not include adding database migrations.
> - Do not update the styling of the main login button.

---

## 🧪 Validation & Test Plan

> Provide a clear, step-by-step plan for how the AI (or a human) should verify the changes.

**Automated Tests:**
- **Command**: `pnpm test --filter [package-name]`
- **Expected Outcome**: All new and existing tests must pass.

**Manual Validation Steps:**
1.  **Command**: `pnpm --filter platform-app exec ts-node src/index.ts`
2.  **Expected Output**: The console should log the message: `"[platform-app] ready with new feature"`.

---

## ⚙️ System Dependencies & Prerequisites

> List any tools, environment variables, or other setup required to work on this issue.
> - `pnpm` must be installed globally.
> - Requires access to a local Postgres database.
