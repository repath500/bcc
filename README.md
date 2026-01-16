# Inspect Clone

Sandbox-based coding agent system with OpenCode CLI + E2B, GitHub App integration, and a ChatGPT-style UI.

## Repo Layout
- `apps/web`: Next.js frontend
- `apps/slack-bot`: Slack integration
- `apps/chrome-extension`: Chrome sidebar extension
- `packages/api`: Cloudflare Workers + Durable Objects
- `packages/sandbox-manager`: E2B orchestration
- `packages/opencode-client`: OpenCode SDK wrapper
- `packages/github-integration`: GitHub App integration
- `packages/shared`: Shared types and utils

## Getting Started
```bash
pnpm install
pnpm dev
```

## Env
Copy `.env.example` to `.env` and fill in values.
