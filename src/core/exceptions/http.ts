import { z } from '@hono/zod-openapi';
import { HTTPException } from 'hono/http-exception';
import { ContentfulStatusCode } from 'hono/utils/http-status';

export const APIErrorSchema = z.object({
  field: z.string().nullish(),
  code: z.string().nullish(),
  message: z.string(),
});

export type APIError = z.infer<typeof APIErrorSchema>;

export class APIException extends HTTPException {
  public errors?: APIError[];

  constructor(
    status: ContentfulStatusCode,
    options?: { message: string; errors?: APIError[]; cause?: unknown }
  ) {
    super(status, { message: options?.message, cause: options?.cause });
    this.errors = options?.errors;
  }

  // Helper to map Zod issues to APIError
  static fromZodErrors(errors: z.core.$ZodIssue[]) {
    const details: APIError[] = errors.map((issue) => ({
      // Join path (e.g., user.address.zip)
      field: issue.path.join('.') || 'root',
      message: issue.message,
      // Use standard Zod issue code
      code: issue.code.toUpperCase(),
    }));

    return new APIException(422, { message: 'Validation failed', errors: details });
  }
}

export class BadRequestException extends HTTPException {
  constructor(message?: string) {
    super(400, { message: message || 'Bad request' });
  }
}

export class UnauthenticatedException extends HTTPException {
  constructor(message?: string) {
    super(401, { message: message || 'Unauthenticated' });
  }
}

export class UnauthorizedException extends HTTPException {
  constructor(message?: string) {
    super(403, { message: message || 'Unauthorized' });
  }
}

export class NotFoundException extends HTTPException {
  constructor(resource = 'Resouce') {
    super(404, { message: `${resource} not found` });
  }
}

export class ConflictException extends HTTPException {
  constructor(message?: string) {
    super(409, { message: message || 'Conflict' });
  }
}

export class InternalServerException extends HTTPException {
  constructor(message?: string) {
    super(500, { message: message || 'Internal server error' });
  }
}
