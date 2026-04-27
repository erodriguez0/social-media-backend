import { z } from '@hono/zod-openapi';

import { subredditName, username } from '@/core/schemas/common';

export const UsernameParamSchema = z.object({
  username: username,
});

export const SubredditParamSchema = z.object({
  subreddit: subredditName,
});
