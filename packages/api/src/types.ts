export interface Env {
  SESSION_DO: DurableObjectNamespace;
  SANDBOX_SERVICE: Fetcher;
  ENVIRONMENT: string;
  OPENCODE_SERVER_PASSWORD: string;
  GITHUB_APP_ID: string;
  GITHUB_PRIVATE_KEY: string;
}

export interface Variables {
  userId: string;
  username: string;
}

export type HonoEnv = {
  Bindings: Env;
  Variables: Variables;
};
