import { Hono } from 'hono';
import type { HonoEnv } from '../types';
import { GitHubIntegration } from '@inspect/github-integration';

export const repoRoutes = new Hono<HonoEnv>().get('/', async (c) => {
  const userId = c.get('userId');
  const db = c.get('db');
  const installationIdParam = c.req.query('installationId');

  let installationId: number;

  if (installationIdParam) {
    installationId = Number(installationIdParam);
  } else {
    const primaryAccount = await db.getPrimaryGitHubAccount(userId);
    if (!primaryAccount) {
      return c.json(
        { error: 'GitHub not connected. Please connect your GitHub account first.', repos: [] },
        401
      );
    }
    installationId = primaryAccount.github_installation_id;
  }

  const github = new GitHubIntegration({
    appId: c.env.GITHUB_APP_ID,
    privateKey: c.env.GITHUB_PRIVATE_KEY
  });

  try {
    const repos = await github.listRepositories(installationId);
    return c.json({ repos, installationId });
  } catch (error) {
    return c.json(
      { error: 'Failed to fetch repositories', details: String(error), repos: [] },
      500
    );
  }
});
