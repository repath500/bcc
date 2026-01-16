import { Hono } from 'hono';
import type { HonoEnv } from '../types';

export const statsRoutes = new Hono<HonoEnv>().get('/', (c) => {
  return c.json({ metrics: {} });
});
