import { z } from '@hono/zod-openapi';

import { password, username } from '@/core/schemas/common';

export const SignUpSchema = z
  .object({
    email: z.email({ error: 'Invalid email address' }).nullish(),
    username: username,
    password: password,
    confirm: password,
  })
  .refine((data) => data.password === data.confirm, {
    error: "Passwords don't match",
    path: ['confirm'],
  });

export const SignInSchema = z.object({
  username: username,
  password: password,
});

export type SignUpInput = z.infer<typeof SignUpSchema>;
export type SignInInput = z.infer<typeof SignInSchema>;
