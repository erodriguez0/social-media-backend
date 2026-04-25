import { Hono } from 'hono';

import { customZValidator } from '@/core/lib/validator';

import { auth } from '@/features/auth/auth';
import { SignInSchema, SignUpSchema } from '@/features/auth/auth.schema';
import { authService } from '@/features/auth/auth.service';

const authRoute = new Hono();

authRoute.post('/sign-up/*', customZValidator('json', SignUpSchema), async (c) => {
  const data = c.req.valid('json');

  const user = await authService.signUp(data);

  return c.json(user, 201);
});

authRoute.post('/sign-in/*', customZValidator('json', SignInSchema), async (c) => {
  const data = c.req.valid('json');

  const user = await authService.signIn(data);

  return c.json(user, 201);
});

authRoute.on(['POST', 'GET'], '/*', (c) => {
  return auth.handler(c.req.raw);
});

export default authRoute;
