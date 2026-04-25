import { Hono } from 'hono';

import { customZValidator } from '@/core/lib/validator';

import { auth } from '@/features/auth/auth';
import { AuthResponseSchema, SignInSchema, SignUpSchema } from '@/features/auth/auth.schema';
import { authService } from '@/features/auth/auth.service';

const authRoute = new Hono();

authRoute.post('/sign-up/*', customZValidator('json', SignUpSchema), async (c) => {
  const data = c.req.valid('json');

  const user = await authService.signUp(data);
  const parsedUser = AuthResponseSchema.parse(user);

  return c.json(parsedUser, 201);
});

authRoute.post('/sign-in/*', customZValidator('json', SignInSchema), async (c) => {
  const data = c.req.valid('json');

  const user = await authService.signIn(data);
  const parsedUser = AuthResponseSchema.parse(user);

  return c.json(parsedUser, 201);
});

authRoute.on(['POST', 'GET'], '/*', (c) => {
  return auth.handler(c.req.raw);
});

export default authRoute;
