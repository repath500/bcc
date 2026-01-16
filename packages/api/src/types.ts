import type { DatabaseClient } from './db/client';

export interface Env {
  SESSION_DO: DurableObjectNamespace;
  SANDBOX_SERVICE: Fetcher;
  DB: D1Database;
  ENVIRONMENT: string;
  OPENCODE_SERVER_PASSWORD: string;
  GITHUB_APP_ID: string;
  GITHUB_PRIVATE_KEY: string;
  GITHUB_CLIENT_ID: string;
  GITHUB_CLIENT_SECRET: string;
  APP_BASE_URL: string;
}

export interface Variables {
  userId: string;
  username: string;
  db: DatabaseClient;
}

export type HonoEnv = {
  Bindings: Env;
  Variables: Variables;
};
