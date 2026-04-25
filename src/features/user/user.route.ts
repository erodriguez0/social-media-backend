import { Hono } from 'hono';

import { customZValidator } from '@/core/lib/validator';

import { InternalServerException } from '@/core/exceptions/http';

import { PaginationParamSchema } from '@/core/schemas/pagination';
import { UsernameParamSchema } from '@/core/schemas/params';

import { authMiddleware } from '@/core/middleware/auth';
import { isSelf } from '@/core/middleware/is-self';

import { ChangeUsernameSchema } from '@/features/user/user.schema';
import { userService } from '@/features/user/user.service';

const userRoute = new Hono();

userRoute.get('/', customZValidator('param', PaginationParamSchema), async (c) => {
  const params = c.req.valid('param');

  const users = await userService.getUsers(params.page, params.limit);

  return c.json({ users }, 200);
});

userRoute.get('/:username', customZValidator('param', UsernameParamSchema), async (c) => {
  const params = c.req.valid('param');

  const user = await userService.getUser(params.username);

  return c.json(user, 200);
});

userRoute.patch(
  '/:username/username',
  authMiddleware,
  isSelf,
  customZValidator('json', ChangeUsernameSchema),
  async (c) => {
    const body = c.req.valid('json');
    const headers = c.req.raw.headers;

    const res = await userService.changeUsername(body.username, headers);

    if (!res.status) {
      throw new InternalServerException();
    }

    return c.json({ user: { username: body.username } }, 200);
  }
);

export default userRoute;
