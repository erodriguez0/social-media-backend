import { z } from '@hono/zod-openapi';

export const username = z
  .string()
  .min(3, { error: 'Username must be at least 3 characters' })
  .max(20, { error: 'Username must be at most 20 characters' })
  .regex(/^[a-zA-Z0-9_]+$/, { error: 'Username can only be letters, number, and underscores' });

export const password = z.string().min(8, { error: 'Password must be at least 8 characters' });

export const image = z.url({ error: 'Invalid image URL' }).nullish();

export const UserSchema = z.object({
  id: z.cuid(),
  username: username,
  displayUsername: username,
  image: image,
  role: z.string().nullish(),
  banned: z.boolean().nullish(),
  banReason: z.string().nullish(),
  banExpires: z.date().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const subredditName = z
  .string()
  .min(3, { error: 'Subreddit must be at least 3 characters' })
  .max(20, { error: 'Subreddit must be at most 20 characters' })
  .regex(/^[a-zA-Z0-9_]+$/, { error: 'Subreddit can only be letters, number, and underscores' });

export const SubredditSchema = z.object({
  id: z.cuid(),
  name: subredditName,
  slug: subredditName,
  logo: image,
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const MemberSchema = z.object({
  userId: z.cuid(),
  subredditId: z.cuid(),
  role: z.string(),
  createdAt: z.date(),
  banned: z.boolean().nullish(),
  banReason: z.string().nullish(),
  banExpires: z.date().nullish(),
});
