import { Hono } from 'hono';

import { errorHandler } from '@/core/middleware/error-handler';

import { HonoEnv } from '@/core/types/hono';

import authRoute from '@/features/auth/auth.route';
import userRoute from '@/features/user/user.route';

const app = new Hono<HonoEnv>().basePath('/api');

app.get('/', (c) => {
  return c.text('Hello');
});

app.route('/auth', authRoute);
app.route('/user', userRoute);

app.onError(errorHandler);

export default {
  fetch: app.fetch,
  port: process.env.APP_PORT || 5000,
};
