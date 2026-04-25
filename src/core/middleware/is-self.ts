import { MiddlewareHandler } from 'hono';

import { UnauthorizedException } from '@/core/exceptions/http';
import type { HonoEnv } from '@/core/types/hono';

export const isSelf: MiddlewareHandler<HonoEnv> = async (c, next) => {
  const user = c.var.user;
  const username = c.req.param('username');

  if (!user || user.username !== username) {
    throw new UnauthorizedException();
  }

  await next();
};
