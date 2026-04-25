import { z } from '@hono/zod-openapi';

import { username } from '@/core/schemas/common';

export const ChangeUsernameSchema = z.object({
  username: username,
});

export type ChangeUsername = z.infer<typeof ChangeUsernameSchema>;
