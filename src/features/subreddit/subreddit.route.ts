import { Hono } from 'hono';

import { customZValidator } from '@/core/lib/validator';

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

export default subredditRoute;
