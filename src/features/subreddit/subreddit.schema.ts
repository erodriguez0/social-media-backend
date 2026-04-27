import { z } from '@hono/zod-openapi';

import { subredditName } from '@/core/schemas/common';

export const CreateSubredditSchema = z.object({
  name: subredditName,
});

export type CreateSubredditInput = z.infer<typeof CreateSubredditSchema>;
