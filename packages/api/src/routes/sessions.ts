import { Hono } from 'hono';
import type { HonoEnv } from '../types';
import { generateSessionId } from '@inspect/shared';

interface SandboxCreateResponse {
  sandboxId: string;
  sandboxUrl: string;
  vscodeUrl: string;
  opencodeSessionId: string;
}

export const sessionRoutes = new Hono<HonoEnv>()
  .post('/', async (c) => {
    const userId = c.get('userId');
    const { repoUrl, branch = 'main', installationId } = await c.req.json();

    const sessionId = generateSessionId();

    const sandboxResponse = await c.env.SANDBOX_SERVICE.fetch('https://sandbox/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, repoUrl, branch, installationId, userId })
    });

    if (!sandboxResponse.ok) {
      return c.json({ error: 'Failed to create sandbox' }, 500);
    }

    const sandbox = (await sandboxResponse.json()) as SandboxCreateResponse;

    const stubId = c.env.SESSION_DO.idFromName(sessionId);
    const stub = c.env.SESSION_DO.get(stubId);

    await stub.fetch('https://session/initialize', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId,
        userId,
        repoUrl,
        branch,
        sandboxId: sandbox.sandboxId,
        sandboxUrl: sandbox.sandboxUrl,
        opencodeSessionId: sandbox.opencodeSessionId,
        installationId
      })
    });

    return c.json({
      sessionId,
      status: 'ready',
      sandboxUrl: sandbox.sandboxUrl,
      vscodeUrl: sandbox.vscodeUrl
    });
  })
  .get('/:sessionId', async (c) => {
    const sessionId = c.req.param('sessionId');
    const stubId = c.env.SESSION_DO.idFromName(sessionId);
    const stub = c.env.SESSION_DO.get(stubId);

    const response = await stub.fetch('https://session/status');
    return c.json(await response.json());
  })
  .get('/:sessionId/messages', async (c) => {
    const sessionId = c.req.param('sessionId');
    const stubId = c.env.SESSION_DO.idFromName(sessionId);
    const stub = c.env.SESSION_DO.get(stubId);

    const response = await stub.fetch(`https://session/messages${new URL(c.req.url).search}`);
    return c.json(await response.json());
  })
  .post('/:sessionId/send', async (c) => {
    const sessionId = c.req.param('sessionId');
    const userId = c.get('userId');
    const username = c.get('username');
    const { content, files } = await c.req.json();

    const stubId = c.env.SESSION_DO.idFromName(sessionId);
    const stub = c.env.SESSION_DO.get(stubId);

    const response = await stub.fetch('https://session/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, username, content, files })
    });

    return c.json(await response.json());
  })
  .get('/:sessionId/queue', async (c) => {
    const sessionId = c.req.param('sessionId');
    const stubId = c.env.SESSION_DO.idFromName(sessionId);
    const stub = c.env.SESSION_DO.get(stubId);

    const response = await stub.fetch('https://session/queue');
    return c.json(await response.json());
  })
  .post('/:sessionId/stop', async (c) => {
    const sessionId = c.req.param('sessionId');
    const stubId = c.env.SESSION_DO.idFromName(sessionId);
    const stub = c.env.SESSION_DO.get(stubId);

    const response = await stub.fetch('https://session/stop', { method: 'POST' });
    return c.json(await response.json());
  })
  .delete('/:sessionId', async (c) => {
    const sessionId = c.req.param('sessionId');

    const stubId = c.env.SESSION_DO.idFromName(sessionId);
    const stub = c.env.SESSION_DO.get(stubId);
    await stub.fetch('https://session/close', { method: 'POST' });

    await c.env.SANDBOX_SERVICE.fetch(`https://sandbox/${sessionId}`, { method: 'DELETE' });

    return c.json({ success: true });
  });
