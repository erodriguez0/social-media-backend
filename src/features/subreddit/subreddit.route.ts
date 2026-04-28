import { Hono } from 'hono';

import { customZValidator } from '@/core/lib/validator';

import { BadRequestException } from '@/core/exceptions/http';

import { MemberSchema, SubredditSchema, SubscriptionSchema } from '@/core/schemas/common';
import { SubredditParamSchema } from '@/core/schemas/params';

import { authMiddleware } from '@/core/middleware/auth';
import { isBanned } from '@/core/middleware/is-banned';
import { optionalAuth } from '@/core/middleware/optional-auth';

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

    const subreddit = await subredditService.createSubreddit(input, user);
    const data = SubredditSchema.parse(subreddit);

    return c.json(data, 201);
  }
);

subredditRoute.get(
  '/:subreddit',
  optionalAuth,
  customZValidator('param', SubredditParamSchema),
  async (c) => {
    const { subreddit } = c.req.valid('param');
    const user = c.var.user;

    const res = await subredditService.getSubreddit(subreddit, user?.id);
    const data = GetSubredditResponseSchema.parse(res);

    return c.json(data, 200);
  }
);

subredditRoute.post(
  '/:subreddit/subscribe',
  authMiddleware,
  customZValidator('param', SubredditParamSchema),
  async (c) => {
    const { subreddit } = c.req.valid('param');
    const user = c.var.user!;

    const subscription = await subredditService.subscribe(subreddit, user.id);
    const data = SubscriptionSchema.parse(subscription);

    return c.json(data, 201);
  }
);

subredditRoute.delete(
  '/:subreddit/unsubscribe',
  authMiddleware,
  customZValidator('param', SubredditParamSchema),
  async (c) => {
    const { subreddit } = c.req.valid('param');
    const user = c.var.user!;

    await subredditService.unsubscribe(subreddit, user.id);

    return c.json({ success: true }, 200);
  }
);

export default subredditRoute;
