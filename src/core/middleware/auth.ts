import { createMiddleware } from 'hono/factory';

import { UnauthenticatedException } from '@/core/exceptions/http';
import { HonoEnv } from '@/core/types/hono';

import { auth } from '@/features/auth/auth';

export const authMiddleware = createMiddleware<HonoEnv>(async (c, next) => {
  const session = await auth.api.getSession({
    headers: c.req.raw.headers,
  });

  if (!session) {
    throw new UnauthenticatedException();
  }

  c.set('user', session.user);
  c.set('session', session.session);

  await next();
});
