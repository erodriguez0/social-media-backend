import { z } from '@hono/zod-openapi';

import { username } from '@/core/schemas/common';
import { user } from '@/core/schemas/user';

export const UserResponseSchema = z.object({
  user: user,
});

export const ChangeUsernameSchema = z.object({
  username: username,
});

export type UserResponse = z.infer<typeof UserResponseSchema>;
export type ChangeUsername = z.infer<typeof ChangeUsernameSchema>;
