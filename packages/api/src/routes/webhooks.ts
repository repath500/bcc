import { Hono } from 'hono';
import type { HonoEnv } from '../types';

export const webhookRoutes = new Hono<HonoEnv>().post('/github', async (c) => {
  return c.json({ received: true });
});
