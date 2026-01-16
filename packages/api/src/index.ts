import { Hono } from 'hono';
import type { HonoEnv } from './types';
import { authMiddleware } from './middleware/auth';
import { authRoutes } from './routes/auth';
import { repoRoutes } from './routes/repos';
import { sessionRoutes } from './routes/sessions';
import { statsRoutes } from './routes/stats';
import { webhookRoutes } from './routes/webhooks';

export { SessionDO } from './durable-objects/SessionDO';

const app = new Hono<HonoEnv>();

app.get('/health', (c) => c.json({ status: 'ok', timestamp: Date.now() }));

app.route('/auth', authRoutes);
app.route('/webhooks', webhookRoutes);

app.use('/api/*', authMiddleware);
app.route('/api/sessions', sessionRoutes);
app.route('/api/repos', repoRoutes);
app.route('/api/stats', statsRoutes);

app.get('/ws/session/:sessionId', authMiddleware, async (c) => {
  const sessionId = c.req.param('sessionId');
  const userId = c.get('userId');
  const username = c.get('username');

  const id = c.env.SESSION_DO.idFromName(sessionId);
  const stub = c.env.SESSION_DO.get(id);

  const headers = new Headers(c.req.raw.headers);
  headers.set('X-User-ID', userId);
  headers.set('X-Username', username);

  const request = new Request(c.req.raw.url, {
    method: c.req.raw.method,
    headers
  });

  return stub.fetch(request);
});

export default app;
