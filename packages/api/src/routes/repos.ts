import { Hono } from 'hono';
import type { HonoEnv } from '../types';
import { GitHubIntegration } from '@inspect/github-integration';

export const repoRoutes = new Hono<HonoEnv>().get('/', async (c) => {
  const installationId = c.req.query('installationId');
  if (!installationId) {
    return c.json({ error: 'Missing installationId' }, 400);
  }

  const github = new GitHubIntegration({
    appId: c.env.GITHUB_APP_ID,
    privateKey: c.env.GITHUB_PRIVATE_KEY
  });

  const repos = await github.listRepositories(Number(installationId));
  return c.json({ repos });
});
