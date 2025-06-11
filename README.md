# Platform Boilerplate

This repository is a PNPM-based monorepo designed to serve as a scalable foundation for a full-stack platform. It includes separate packages for applications, shared UI components, core business logic, a server, and developer tooling.

## 🚀 Getting Started

1.  **Install PNPM**: If you don't have it, install it globally:
    ```sh
    npm install -g pnpm
    ```

2.  **Install Dependencies**: Clone the repository and install dependencies from the root directory. PNPM will handle linking all the local workspace packages.
    ```sh
    pnpm install
    ```

## 📦 Monorepo Structure

The repository is organized into the following main directories:

-   `apps/`: Contains consumer-facing applications (`platform-app`, `platform-exec`).
-   `packages/`: Contains shared libraries (`platform-core`, `platform-ui`).
-   `platform-server/`: A dedicated package for the backend server.
-   `platform-dev/`: Houses internal development tools and templates.
-   `platform-db/`: Reserved for database schemas and migrations.

## ▶️ Running the Packages

You can run the entry point of each primary package using the scripts in the root `package.json`:

```sh
# Run the main web application
pnpm run app

# Run the admin/exec application
pnpm run exec

# Run the backend server
pnpm run server

# Run the UI package's entry point
pnpm run ui

# Run the core library's entry point
pnpm run core
```