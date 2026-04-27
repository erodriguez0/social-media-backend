import { Hono } from 'hono';

import { customZValidator } from '@/core/lib/validator';

import { SubredditSchema } from '@/core/schemas/common';
import { SubredditParamSchema } from '@/core/schemas/params';

import { authMiddleware } from '@/core/middleware/auth';
import { isBanned } from '@/core/middleware/is-banned';

import {
  CreateSubredditSchema,
  GetSubredditResponseSchema,
} from '@/features/subreddit/subreddit.schema';
import { subredditService } from '@/features/subreddit/subreddit.service';

const subredditRoute = new Hono();

subredditRoute.post(
  '/',
  authMiddleware,
  isBanned,
  customZValidator('json', CreateSubredditSchema),
  async (c) => {
    const input = c.req.valid('json');
    const user = c.var.user!;

    const subreddit = await subredditService.createSubreddit(input, user, c.req.raw.headers);
    const data = SubredditSchema.parse(subreddit);

    return c.json(data, 201);
  }
);

subredditRoute.get('/:subreddit', customZValidator('param', SubredditParamSchema), async (c) => {
  const { subreddit } = c.req.valid('param');

  const res = await subredditService.getSubreddit(subreddit);
  const data = GetSubredditResponseSchema.parse(res);

  return c.json(data, 200);
});

export default subredditRoute;
