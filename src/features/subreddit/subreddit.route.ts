import { Hono } from 'hono';

import { customZValidator } from '@/core/lib/validator';

import { SubredditParamSchema } from '@/core/schemas/params';

import { authMiddleware } from '@/core/middleware/auth';

import { CreateSubredditSchema } from '@/features/subreddit/subreddit.schema';
import { subredditService } from '@/features/subreddit/subreddit.service';

const subredditRoute = new Hono();

subredditRoute.post(
  '/',
  authMiddleware,
  customZValidator('json', CreateSubredditSchema),
  async (c) => {
    const input = c.req.valid('json');
    const user = c.var.user!;

    const subreddit = await subredditService.createSubreddit(input, user);

    return c.json(subreddit, 201);
  }
);

subredditRoute.get('/:subreddit', customZValidator('param', SubredditParamSchema), async (c) => {
  const { subreddit } = c.req.valid('param');

  const res = await subredditService.getSubreddit(subreddit);

  return c.json(res, 200);
});

export default subredditRoute;
