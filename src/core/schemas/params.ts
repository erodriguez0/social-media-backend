import { z } from '@hono/zod-openapi';

import { username } from '@/core/schemas/common';

export const UsernameParamsSchema = z.object({
  username: username,
});
