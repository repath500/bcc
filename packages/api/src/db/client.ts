import type {
  User,
  UserGitHubAccount,
  UserGitHubToken,
  OAuthState
} from './schema';

export class DatabaseClient {
  constructor(private db: D1Database) {}

  async initialize(): Promise<void> {
    const { SCHEMA_SQL } = await import('./schema');
    const statements = SCHEMA_SQL.split(';').filter((s) => s.trim());
    for (const statement of statements) {
      await this.db.exec(statement);
    }
  }

  async getOrCreateUser(userId: string, username: string): Promise<User> {
    const existing = await this.db
      .prepare('SELECT * FROM users WHERE id = ?')
      .bind(userId)
      .first<User>();

    if (existing) {
      return existing;
    }

    await this.db
      .prepare('INSERT INTO users (id, username) VALUES (?, ?)')
      .bind(userId, username)
      .run();

    return { id: userId, username, created_at: new Date().toISOString() };
  }

  async getUserGitHubAccounts(userId: string): Promise<UserGitHubAccount[]> {
    const result = await this.db
      .prepare('SELECT * FROM user_github_accounts WHERE user_id = ?')
      .bind(userId)
      .all<UserGitHubAccount>();

    return result.results;
  }

  async getPrimaryGitHubAccount(userId: string): Promise<UserGitHubAccount | null> {
    const result = await this.db
      .prepare(
        'SELECT * FROM user_github_accounts WHERE user_id = ? ORDER BY created_at ASC LIMIT 1'
      )
      .bind(userId)
      .first<UserGitHubAccount>();

    return result ?? null;
  }

  async linkGitHubAccount(
    userId: string,
    installationId: number,
    githubUserId: number,
    githubUsername: string,
    githubAvatarUrl: string | null
  ): Promise<UserGitHubAccount> {
    const id = crypto.randomUUID();

    await this.db
      .prepare(
        `INSERT INTO user_github_accounts 
         (id, user_id, github_installation_id, github_user_id, github_username, github_avatar_url)
         VALUES (?, ?, ?, ?, ?, ?)
         ON CONFLICT(user_id, github_installation_id) 
         DO UPDATE SET github_username = excluded.github_username,
                       github_avatar_url = excluded.github_avatar_url`
      )
      .bind(id, userId, installationId, githubUserId, githubUsername, githubAvatarUrl)
      .run();

    return {
      id,
      user_id: userId,
      github_installation_id: installationId,
      github_user_id: githubUserId,
      github_username: githubUsername,
      github_avatar_url: githubAvatarUrl,
      created_at: new Date().toISOString()
    };
  }

  async unlinkGitHubAccount(userId: string, installationId: number): Promise<void> {
    await this.db
      .prepare('DELETE FROM user_github_accounts WHERE user_id = ? AND github_installation_id = ?')
      .bind(userId, installationId)
      .run();

    await this.db
      .prepare('DELETE FROM user_github_tokens WHERE user_id = ? AND github_installation_id = ?')
      .bind(userId, installationId)
      .run();
  }

  async getCachedToken(
    userId: string,
    installationId: number
  ): Promise<UserGitHubToken | null> {
    const result = await this.db
      .prepare(
        `SELECT * FROM user_github_tokens 
         WHERE user_id = ? AND github_installation_id = ? 
         AND expires_at > datetime('now')
         ORDER BY created_at DESC LIMIT 1`
      )
      .bind(userId, installationId)
      .first<UserGitHubToken>();

    return result ?? null;
  }

  async cacheToken(
    userId: string,
    installationId: number,
    accessToken: string,
    expiresAt: Date
  ): Promise<void> {
    const id = crypto.randomUUID();

    await this.db
      .prepare('DELETE FROM user_github_tokens WHERE user_id = ? AND github_installation_id = ?')
      .bind(userId, installationId)
      .run();

    await this.db
      .prepare(
        `INSERT INTO user_github_tokens 
         (id, user_id, github_installation_id, access_token, expires_at)
         VALUES (?, ?, ?, ?, ?)`
      )
      .bind(id, userId, installationId, accessToken, expiresAt.toISOString())
      .run();
  }

  async createOAuthState(
    userId: string,
    state: string,
    redirectUrl: string | null
  ): Promise<OAuthState> {
    const id = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 min expiry

    await this.db
      .prepare(
        `INSERT INTO oauth_states (id, user_id, state, redirect_url, expires_at)
         VALUES (?, ?, ?, ?, ?)`
      )
      .bind(id, userId, state, redirectUrl, expiresAt.toISOString())
      .run();

    return {
      id,
      user_id: userId,
      state,
      redirect_url: redirectUrl,
      created_at: new Date().toISOString(),
      expires_at: expiresAt.toISOString()
    };
  }

  async validateAndConsumeOAuthState(state: string): Promise<OAuthState | null> {
    const result = await this.db
      .prepare(
        `SELECT * FROM oauth_states 
         WHERE state = ? AND expires_at > datetime('now')`
      )
      .bind(state)
      .first<OAuthState>();

    if (result) {
      await this.db.prepare('DELETE FROM oauth_states WHERE state = ?').bind(state).run();
    }

    return result ?? null;
  }

  async cleanupExpiredStates(): Promise<void> {
    await this.db.exec("DELETE FROM oauth_states WHERE expires_at < datetime('now')");
  }

  async cleanupExpiredTokens(): Promise<void> {
    await this.db.exec("DELETE FROM user_github_tokens WHERE expires_at < datetime('now')");
  }
}
