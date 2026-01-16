export interface User {
  id: string;
  username: string;
  created_at: string;
}

export interface UserGitHubAccount {
  id: string;
  user_id: string;
  github_installation_id: number;
  github_user_id: number;
  github_username: string;
  github_avatar_url: string | null;
  created_at: string;
}

export interface UserGitHubToken {
  id: string;
  user_id: string;
  github_installation_id: number;
  access_token: string;
  expires_at: string;
  created_at: string;
}

export interface OAuthState {
  id: string;
  user_id: string;
  state: string;
  redirect_url: string | null;
  created_at: string;
  expires_at: string;
}

export const SCHEMA_SQL = `
-- Users table
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  username TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);

-- Map users to GitHub App installations
CREATE TABLE IF NOT EXISTS user_github_accounts (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  github_installation_id INTEGER NOT NULL,
  github_user_id INTEGER NOT NULL,
  github_username TEXT NOT NULL,
  github_avatar_url TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (user_id) REFERENCES users(id),
  UNIQUE(user_id, github_installation_id)
);

-- Store GitHub installation tokens (short-lived, cached)
CREATE TABLE IF NOT EXISTS user_github_tokens (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  github_installation_id INTEGER NOT NULL,
  access_token TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now')),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- OAuth state for CSRF protection
CREATE TABLE IF NOT EXISTS oauth_states (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  state TEXT NOT NULL UNIQUE,
  redirect_url TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  expires_at TEXT NOT NULL
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_github_accounts_user_id ON user_github_accounts(user_id);
CREATE INDEX IF NOT EXISTS idx_user_github_tokens_user_id ON user_github_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_oauth_states_state ON oauth_states(state);
`;
