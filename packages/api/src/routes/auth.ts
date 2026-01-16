import { Hono } from 'hono';
import type { HonoEnv } from '../types';

export const authRoutes = new Hono<HonoEnv>()
  .get('/github', (c) => {
    return c.json({ status: 'not-implemented' }, 501);
  })
  .get('/callback', (c) => {
    return c.json({ status: 'not-implemented' }, 501);
  });
