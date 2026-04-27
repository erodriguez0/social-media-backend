import { MiddlewareHandler } from 'hono';

import { UnauthorizedException } from '@/core/exceptions/http';

import { HonoEnv } from '@/core/types/hono';

export const isBanned: MiddlewareHandler<HonoEnv> = async (c, next) => {
  const user = c.var.user;

  if (!user || user.banned) {
    throw new UnauthorizedException(`User is banned until ${user?.banExpires}`);
  }

  await next();
};
