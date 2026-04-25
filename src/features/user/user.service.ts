import { User } from '@/generated/prisma/client';

import { NotFoundException } from '@/core/exceptions/http';
import { prisma } from '@/core/lib/prisma';

import { auth } from '@/features/auth/auth';

export const userService = {
  async getUser(username: string) {
    const user = await prisma.user.findUnique({
      where: {
        username: username.toLowerCase(),
      },
    });

    if (!user) {
      throw new NotFoundException('User');
    }

    return user;
  },

  async changeUsername(username: string, headers: Headers) {
    const res = await auth.api.updateUser({
      body: {
        displayUsername: username,
        username: username,
        name: username,
      },
      headers: headers,
    });

    return res;
  },
};
