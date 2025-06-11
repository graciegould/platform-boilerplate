# platform-server

A minimal TypeScript Express server for the platform backend.

## Development

1. Install dependencies (from repo root):
   ```bash
   pnpm install
   ```
2. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
3. Start the server in development mode:
   ```bash
   pnpm --filter platform-server run dev
   ```

## Scripts
- `dev`: Start with live reload (Nodemon + ts-node)
- `build`: Compile TypeScript to `dist/`
- `start`: Run compiled server from `dist/`

## Endpoints
- `GET /test` — returns `Test OK` (200)

## Environment
- `PORT` — Port to run the server (default: 3000)

---

> Copy `.env.example` to `.env` before running locally.
