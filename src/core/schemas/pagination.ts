import { z } from '@hono/zod-openapi';

export const PaginationParamSchema = z.object({
  page: z.string().optional().transform(Number),
  limit: z.string().optional().transform(Number),
});

export type PaginationParam = z.infer<typeof PaginationParamSchema>;
