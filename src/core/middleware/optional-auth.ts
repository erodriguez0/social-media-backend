import { createMiddleware } from 'hono/factory';

import { HonoEnv } from '@/core/types/hono';

import { auth } from '@/features/auth/lib/auth';

export const optionalAuth = createMiddleware<HonoEnv>(async (c, next) => {
  const session = await auth.api.getSession({
    headers: c.req.raw.headers,
  });

  if (session) {
    c.set('user', session.user);
    c.set('session', session.session);
  }

  await next();
});
