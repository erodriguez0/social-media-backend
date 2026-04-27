import { z } from '@hono/zod-openapi';

import { image, MemberSchema, subredditName, SubredditSchema } from '@/core/schemas/common';

export const CreateSubredditSchema = z.object({
  name: subredditName,
  logo: image,
});

export const GetSubredditResponseSchema = SubredditSchema.extend({
  members: MemberSchema.array(),
});

export type CreateSubredditInput = z.infer<typeof CreateSubredditSchema>;
export type CreateSubredditResponseSchema = z.infer<typeof SubredditSchema>;
