import { User } from 'better-auth';

import { prisma } from '@/core/lib/prisma';

import { ConflictException } from '@/core/exceptions/http';

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

    const subreddit = await prisma.subreddit.create({
      data: {
        name: input.name,
        foundedById: user.id,
      },
      include: {
        foundedBy: true,
      },
      omit: {
        foundedById: true,
      },
    });

    return subreddit;
  },
};
