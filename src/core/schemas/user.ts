import { z } from '@hono/zod-openapi';

import { image, username } from '@/core/schemas/common';

export const user = z.object({
  username: username,
  displayUsername: username,
  image: image,
  createdAt: z.date(),
  updatedAt: z.date(),
});
