import { Hono } from 'hono';
import type { HonoEnv } from '../types';
import { GitHubIntegration } from '@inspect/github-integration';

interface GitHubTokenResponse {
  access_token: string;
  token_type: string;
  scope: string;
  error?: string;
  error_description?: string;
}

interface GitHubUserResponse {
  id: number;
  login: string;
  avatar_url: string;
}

interface GitHubInstallation {
  id: number;
  account: {
    login: string;
    id: number;
  };
}

export const authRoutes = new Hono<HonoEnv>()
  .get('/github', async (c) => {
    const userId = c.req.header('x-user-id') ?? c.req.query('userId');
    const username = c.req.header('x-username') ?? c.req.query('username');
    const redirectUrl = c.req.query('redirect') ?? '/';

    if (!userId || !username) {
      return c.json({ error: 'Missing userId or username' }, 400);
    }

    const db = c.get('db');
    const state = crypto.randomUUID();

    await db.createOAuthState(userId, state, redirectUrl);

    const authUrl = new URL('https://github.com/login/oauth/authorize');
    authUrl.searchParams.set('client_id', c.env.GITHUB_CLIENT_ID);
    authUrl.searchParams.set('redirect_uri', `${c.env.APP_BASE_URL}/auth/github/callback`);
    authUrl.searchParams.set('scope', 'read:user');
    authUrl.searchParams.set('state', state);

    return c.redirect(authUrl.toString());
  })

  .get('/github/callback', async (c) => {
    const code = c.req.query('code');
    const state = c.req.query('state');
    const installationId = c.req.query('installation_id');

    if (!code || !state) {
      return c.redirect(`${c.env.APP_BASE_URL}?error=missing_params`);
    }

    const db = c.get('db');
    const oauthState = await db.validateAndConsumeOAuthState(state);

    if (!oauthState) {
      return c.redirect(`${c.env.APP_BASE_URL}?error=invalid_state`);
    }

    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        client_id: c.env.GITHUB_CLIENT_ID,
        client_secret: c.env.GITHUB_CLIENT_SECRET,
        code,
        redirect_uri: `${c.env.APP_BASE_URL}/auth/github/callback`
      })
    });

    const tokenData = (await tokenResponse.json()) as GitHubTokenResponse;

    if (tokenData.error) {
      return c.redirect(
        `${c.env.APP_BASE_URL}?error=oauth_error&message=${encodeURIComponent(tokenData.error_description ?? tokenData.error)}`
      );
    }

    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
        Accept: 'application/vnd.github.v3+json',
        'User-Agent': 'Inspect-App'
      }
    });

    if (!userResponse.ok) {
      return c.redirect(`${c.env.APP_BASE_URL}?error=github_user_error`);
    }

    const githubUser = (await userResponse.json()) as GitHubUserResponse;

    let targetInstallationId = installationId ? Number(installationId) : null;

    if (!targetInstallationId) {
      const installationsResponse = await fetch('https://api.github.com/user/installations', {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
          Accept: 'application/vnd.github.v3+json',
          'User-Agent': 'Inspect-App'
        }
      });

      if (installationsResponse.ok) {
        const installationsData = (await installationsResponse.json()) as {
          installations: GitHubInstallation[];
        };

        if (installationsData.installations.length > 0) {
          targetInstallationId = installationsData.installations[0].id;
        }
      }
    }

    if (!targetInstallationId) {
      const appInstallUrl = `https://github.com/apps/inspect-dev/installations/new?state=${state}`;
      return c.redirect(appInstallUrl);
    }

    await db.linkGitHubAccount(
      oauthState.user_id,
      targetInstallationId,
      githubUser.id,
      githubUser.login,
      githubUser.avatar_url
    );

    const redirectUrl = oauthState.redirect_url ?? '/';
    return c.redirect(`${c.env.APP_BASE_URL}${redirectUrl}?github_connected=true`);
  })

  .get('/github/installations', async (c) => {
    const userId = c.get('userId');
    const db = c.get('db');

    const accounts = await db.getUserGitHubAccounts(userId);
    return c.json({ installations: accounts });
  })

  .delete('/github/installations/:installationId', async (c) => {
    const userId = c.get('userId');
    const installationId = Number(c.req.param('installationId'));
    const db = c.get('db');

    await db.unlinkGitHubAccount(userId, installationId);
    return c.json({ success: true });
  })

  .get('/user', async (c) => {
    const userId = c.get('userId');
    const username = c.get('username');
    const db = c.get('db');

    const githubAccounts = await db.getUserGitHubAccounts(userId);
    const primaryAccount = githubAccounts.length > 0 ? githubAccounts[0] : null;

    return c.json({
      userId,
      username,
      github: primaryAccount
        ? {
            connected: true,
            username: primaryAccount.github_username,
            avatarUrl: primaryAccount.github_avatar_url,
            installationId: primaryAccount.github_installation_id
          }
        : { connected: false }
    });
  })

  .get('/github/token', async (c) => {
    const userId = c.get('userId');
    const installationIdParam = c.req.query('installationId');
    const db = c.get('db');

    let installationId: number;

    if (installationIdParam) {
      installationId = Number(installationIdParam);
    } else {
      const primaryAccount = await db.getPrimaryGitHubAccount(userId);
      if (!primaryAccount) {
        return c.json({ error: 'No GitHub account connected' }, 401);
      }
      installationId = primaryAccount.github_installation_id;
    }

    const cachedToken = await db.getCachedToken(userId, installationId);

    if (cachedToken) {
      return c.json({ token: cachedToken.access_token, installationId });
    }

    const github = new GitHubIntegration({
      appId: c.env.GITHUB_APP_ID,
      privateKey: c.env.GITHUB_PRIVATE_KEY
    });

    try {
      const token = await github.getInstallationToken(installationId);

      const expiresAt = new Date(Date.now() + 55 * 60 * 1000);
      await db.cacheToken(userId, installationId, token, expiresAt);

      return c.json({ token, installationId });
    } catch (error) {
      return c.json(
        { error: 'Failed to get installation token', details: String(error) },
        500
      );
    }
  })

  .post('/logout', async (c) => {
    return c.json({ success: true, message: 'Logged out' });
  });
