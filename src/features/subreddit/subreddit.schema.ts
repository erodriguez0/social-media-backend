import { z } from '@hono/zod-openapi';

import {
  image,
  MemberSchema,
  subredditName,
  SubredditSchema,
  UserSchema,
} from '@/core/schemas/common';

export const CreateSubredditSchema = z.object({
  name: subredditName,
  logo: image,
});

export const GetSubredditResponseSchema = SubredditSchema.extend({
  creator: UserSchema,
  members: MemberSchema.array(),
  _count: z.object({
    members: z.int(),
  }),
});

export type CreateSubredditInput = z.infer<typeof CreateSubredditSchema>;
export type CreateSubredditResponseSchema = z.infer<typeof SubredditSchema>;
