import { prisma } from '@/core/lib/prisma';

import { NotFoundException } from '@/core/exceptions/http';

import { auth } from '@/features/auth/lib/auth';

export const userService = {
  async getUsers(page = 1, limit = 10) {
    const users = await prisma.user.findMany({});

    return users;
  },

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

  async changeUsername(username: string, userId: string) {
    const res = await auth.api.adminUpdateUser({
      body: {
        userId: userId,
        data: {
          displayUsername: username,
          username: username,
          name: username,
        },
      },
    });

    return res;
  },
};
