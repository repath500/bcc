import { Hono } from 'hono';
import type { HonoEnv } from './types';
import { GitHubIntegration } from '@inspect/github-integration';
import { parseRepoUrl } from '@inspect/shared';
import { E2BProvider } from './providers/e2b-provider';
import type { SandboxInstance } from './types';

const app = new Hono<HonoEnv>();

const activeSandboxes = new Map<string, SandboxInstance>();

app.post('/create', async (c) => {
  const { sessionId, repoUrl, branch = 'main', installationId } = await c.req.json();

  const repoMeta = parseRepoUrl(repoUrl);
  if (!repoMeta) {
    return c.json({ error: 'Invalid repoUrl' }, 400);
  }

  const github = new GitHubIntegration({
    appId: c.env.GITHUB_APP_ID,
    privateKey: c.env.GITHUB_PRIVATE_KEY
  });

  const token = await github.getInstallationToken(Number(installationId));

  const provider = new E2BProvider({
    E2B_API_KEY: c.env.E2B_API_KEY,
    ZAI_API_KEY: c.env.ZAI_API_KEY,
    OPENCODE_SERVER_PASSWORD: c.env.OPENCODE_SERVER_PASSWORD,
    GITHUB_APP_ID: c.env.GITHUB_APP_ID,
    GITHUB_PRIVATE_KEY: c.env.GITHUB_PRIVATE_KEY
  });

  const instance = await provider.createSandbox({
    sessionId,
    repoUrl,
    branch,
    githubToken: token
  });

  activeSandboxes.set(sessionId, instance);

  return c.json({
    sandboxId: instance.sandboxId,
    sandboxUrl: instance.sandboxUrl,
    vscodeUrl: instance.vscodeUrl,
    opencodeSessionId: instance.opencodeSessionId
  });
});

app.delete('/:sessionId', async (c) => {
  const sessionId = c.req.param('sessionId');
  const instance = activeSandboxes.get(sessionId);

  if (!instance) {
    return c.json({ status: 'not-found' }, 404);
  }

  const provider = new E2BProvider({
    E2B_API_KEY: c.env.E2B_API_KEY,
    ZAI_API_KEY: c.env.ZAI_API_KEY,
    OPENCODE_SERVER_PASSWORD: c.env.OPENCODE_SERVER_PASSWORD,
    GITHUB_APP_ID: c.env.GITHUB_APP_ID,
    GITHUB_PRIVATE_KEY: c.env.GITHUB_PRIVATE_KEY
  });

  await provider.closeSandbox(instance);
  activeSandboxes.delete(sessionId);

  return c.json({ success: true });
});

export default app;
