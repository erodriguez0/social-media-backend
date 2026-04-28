import { User } from 'better-auth';

import { prisma } from '@/core/lib/prisma';

import { ConflictException, NotFoundException } from '@/core/exceptions/http';

import { auth } from '@/features/auth/lib/auth';
import { CreateSubredditInput } from '@/features/subreddit/subreddit.schema';

export const subredditService = {
  async createSubreddit(input: CreateSubredditInput, user: User) {
    const subredditExists = await prisma.subreddit.findFirst({
      where: {
        name: {
          equals: input.name,
          mode: 'insensitive',
        },
      },
      select: {
        name: true,
      },
    });

    if (subredditExists) {
      throw new ConflictException('Subreddit already exists');
    }

    const subreddit = await auth.api.createOrganization({
      body: {
        name: input.name,
        slug: input.name.toLowerCase(),
        logo: input.logo || undefined,
        userId: user.id,
      },
    });

    return subreddit;
  },

  async getSubreddit(subredditName: string, userId?: string) {
    const subreddit = await prisma.subreddit.findFirst({
      where: {
        name: {
          equals: subredditName,
          mode: 'insensitive',
        },
      },
      include: {
        creator: true,
        members: {
          where: {
            userId: userId,
          },
        },
        _count: {
          select: {
            members: true,
          },
        },
      },
      omit: {
        creatorId: true,
      },
    });

    if (!subreddit) {
      throw new NotFoundException('Subreddit');
    }

    return subreddit;
  },
};
