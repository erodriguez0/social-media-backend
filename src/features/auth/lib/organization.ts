import type { OrganizationOptions } from 'better-auth/plugins';

import { ac, roles } from '@/features/auth/lib/access';

export const orgConfig = {
  ac: ac,
  roles: roles,
  allowUserToCreateOrganization: true,
  schema: {
    organization: {
      modelName: 'subreddit',
    },
    member: {
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
    beforeAddMember: async ({ member, user, organization }) => {},
  },
} satisfies OrganizationOptions;
