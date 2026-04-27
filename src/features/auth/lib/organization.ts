import type { OrganizationOptions } from 'better-auth/plugins';

import { prisma } from '@/core/lib/prisma';

import { UnauthorizedException } from '@/core/exceptions/http';

import { ac, roles } from '@/features/auth/lib/access';

export const orgConfig = {
  ac: ac,
  roles: roles,
  allowUserToCreateOrganization: true,
  schema: {
    organization: {
      modelName: 'subreddit',
      additionalFields: {
        creatorId: {
          type: 'string',
          input: false,
          required: false,
          references: {
            model: 'user',
            field: 'id',
            onDelete: 'set null',
          },
        },
        updatedAt: {
          type: 'date',
          input: false,
          required: true,
        },
      },
    },
    member: {
      modelName: 'subscription',
      fields: {
        organizationId: 'subredditId',
      },
      additionalFields: {
        banned: {
          type: 'boolean',
          defaultValue: false,
          required: false,
          input: false,
        },
        banReason: {
          type: 'string',
          required: false,
        },
        banExpires: {
          type: 'date',
          required: false,
        },
      },
    },
    invitation: {
      fields: {
        organizationId: 'subredditId',
      },
    },
  },
  organizationHooks: {
    beforeCreateOrganization: async (data) => {
      const user = data.user;

      if (!user) {
        throw new UnauthorizedException();
      }

      return {
        data: {
          ...data,
          creatorId: user.id,
        },
      };
    },
  },
} satisfies OrganizationOptions;
