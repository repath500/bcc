# Inspect Clone — Status & Next Steps

## What’s Done

### Monorepo & Tooling
- pnpm workspace + turbo config + base TS config
- Shared types + utilities package

### API (Cloudflare Workers + Durable Objects)
- Session routes: create, status, send, queue, stop, delete
- WebSocket upgrade path to SessionDO
- Durable Object with:
  - SQLite storage for messages + queue
  - WebSocket broadcast + typing events
  - OpenCode streaming integration
- Repo listing route wired to GitHub App

### Sandbox Manager (Worker)
- E2B sandbox orchestration
- OpenCode install/config/start
- VS Code server start
- Repo cloning via GitHub App installation token

### OpenCode Client SDK
- Session create + streaming message wrapper

### Web UI (Next.js)
- Session control panel
- Realtime chat stream with queue
- WebSocket subscription
- Links to OpenCode + VS Code

### GitHub Integration
- Installation token + repo listing helpers

---

## What’s Not Done (Yet)

### Auth & GitHub App UX
- GitHub OAuth/login flow in API routes
- App installation UX and repo picker in UI

### Slack Bot & Chrome Extension
- Only placeholders exist (no API wiring)

### Image Builder & Warm Pool
- Snapshot build pipeline not implemented

### Observability / Testing / Deployment
- Metrics, tracing, tests, CI/CD, and prod deploy scripts still pending

---

## How to Run (Dev)

1. Fill `.env` using `.env.example`
2. Install deps:
   ```bash
   pnpm install
   ```
3. Run services:
   ```bash
   pnpm --filter @inspect/api dev
   pnpm --filter @inspect/sandbox-manager dev
   pnpm --filter @inspect/web dev
   ```

---

## Summary: How It All Works Together

### The Magic
- OpenCode CLI is already an HTTP server (no CLI wrapping needed!)
- We run it in cloud sandbox (E2B)
- Build web UI that talks to OpenCode HTTP API
- Cloudflare Durable Objects handle multiplayer + real-time sync
- Pre-built images make sessions instant
- Everything streams in real-time to all clients

### The Flow
1. User → Client (Web/Slack/Chrome)
2. Client → Cloudflare Worker (session routing)
3. Worker → Durable Object (state management)
4. Durable Object → E2B Sandbox (execution)
5. Sandbox → OpenCode HTTP API
6. OpenCode → AI Model
7. Stream back through chain to all clients
