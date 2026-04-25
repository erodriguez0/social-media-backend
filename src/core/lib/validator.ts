import { z } from '@hono/zod-openapi';
import { zValidator } from '@hono/zod-validator';
import { ValidationTargets } from 'hono';

import { APIException } from '@/core/exceptions/http';

export const customZValidator = <T extends z.ZodType, Target extends keyof ValidationTargets>(
  target: Target,
  schema: T
) => {
  return zValidator(target, schema, (result) => {
    if (!result.success) {
      throw APIException.fromZodErrors(result.error.issues);
    }
  });
};
