import { createMiddleware } from 'hono/factory';
import type { HonoEnv } from '../types';
import { DatabaseClient } from '../db/client';

let dbClientCache: DatabaseClient | null = null;
let dbInitialized = false;

export const dbMiddleware = createMiddleware<HonoEnv>(async (c, next) => {
  if (!dbClientCache) {
    dbClientCache = new DatabaseClient(c.env.DB);
  }

  if (!dbInitialized) {
    await dbClientCache.initialize();
    dbInitialized = true;
  }

  c.set('db', dbClientCache);
  await next();
});

export const authMiddleware = createMiddleware<HonoEnv>(async (c, next) => {
  const query = c.req.query();
  const userId = c.req.header('x-user-id') ?? query.userId ?? 'anonymous';
  const username = c.req.header('x-username') ?? query.username ?? 'Anonymous';

  c.set('userId', userId);
  c.set('username', username);

  const db = c.get('db');
  if (db && userId !== 'anonymous') {
    await db.getOrCreateUser(userId, username);
  }

  await next();
});
