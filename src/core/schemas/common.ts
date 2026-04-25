import { z } from '@hono/zod-openapi';

export const username = z
  .string()
  .min(3, { error: 'Username must be at least 3 characters' })
  .max(20, { error: 'Username must be at most 20 characters' })
  .regex(/^[a-zA-Z0-9_]+$/, { error: 'Username can only be letters, number, and underscores' });

export const password = z.string().min(8, { error: 'Password must be at least 8 characters' });

export const image = z.url({ error: 'Invalid image URL' }).nullish();
