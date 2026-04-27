import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { admin, bearer, organization, username } from 'better-auth/plugins';

import { prisma } from '@/core/lib/prisma';

import { orgConfig } from '@/features/auth/lib/organization';

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      username: {
        type: 'string',
        required: true,
        input: true,
        unique: true,
      },
    },
  },
  experimental: {
    joins: true,
  },
  advanced: {
    database: {
      generateId: false,
    },
    disableOriginCheck: true,
  },
  plugins: [bearer(), username(), admin(), organization(orgConfig)],
  trustedOrigins: ['http://localhost:5000'],
});

export type AuthType = {
  user: typeof auth.$Infer.Session.user | null;
  session: typeof auth.$Infer.Session.session | null;
};
