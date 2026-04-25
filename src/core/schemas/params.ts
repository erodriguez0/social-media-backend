import { z } from '@hono/zod-openapi';

import { username } from '@/core/schemas/common';

export const UsernameParamSchema = z.object({
  username: username,
});
