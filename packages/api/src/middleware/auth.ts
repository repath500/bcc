import { createMiddleware } from 'hono/factory';
import type { HonoEnv } from '../types';

export const authMiddleware = createMiddleware<HonoEnv>(async (c, next) => {
  const query = c.req.query();
  const userId = c.req.header('x-user-id') ?? query.userId ?? 'anonymous';
  const username = c.req.header('x-username') ?? query.username ?? 'Anonymous';

  c.set('userId', userId);
  c.set('username', username);

  await next();
});
