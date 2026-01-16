import type { Sandbox } from 'e2b';

export interface SandboxOptions {
  sessionId: string;
  repoUrl: string;
  branch: string;
  githubToken: string;
}

export interface SandboxInstance {
  sandboxId: string;
  sandboxUrl: string;
  vscodeUrl: string;
  opencodeSessionId: string;
  sandbox: Sandbox;
}

export interface Env {
  E2B_API_KEY: string;
  ZAI_API_KEY: string;
  OPENCODE_SERVER_PASSWORD: string;
  GITHUB_APP_ID: string;
  GITHUB_PRIVATE_KEY: string;
}

export type HonoEnv = {
  Bindings: Env;
};
