import { APIError } from 'better-auth';
import { ErrorHandler } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { ContentfulStatusCode } from 'hono/utils/http-status';

import { APIException } from '@/core/exceptions/http';

export const errorHandler: ErrorHandler = (err, c) => {
  console.log(err);

  if (err instanceof APIError) {
    return c.json({ message: err.message }, err.statusCode as ContentfulStatusCode);
  }

  if (err instanceof APIException) {
    return c.json({ message: err.message, errors: err.errors }, err.status);
  }

  if (err instanceof HTTPException) {
    return c.json({ message: err.message }, err.status);
  }

  return c.json({ message: 'Internal server error' }, 500);
};
