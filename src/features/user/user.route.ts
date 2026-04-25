import { Hono } from 'hono';

import { InternalServerException } from '@/core/exceptions/http';
import { customZValidator } from '@/core/lib/validator';
import { authMiddleware } from '@/core/middleware/auth';
import { isSelf } from '@/core/middleware/is-self';
import { UsernameParamsSchema } from '@/core/schemas/params';

import { ChangeUsernameSchema, UserResponseSchema } from '@/features/user/user.schema';
import { userService } from '@/features/user/user.service';

const userRoute = new Hono();

userRoute.get('/:username', customZValidator('param', UsernameParamsSchema), async (c) => {
  const params = c.req.valid('param');

  const user = await userService.getUser(params.username);
  const parsedUser = UserResponseSchema.parse({ user });

  return c.json(parsedUser, 200);
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
