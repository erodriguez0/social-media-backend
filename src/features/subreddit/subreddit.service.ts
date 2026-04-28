import { User } from 'better-auth';

import { prisma } from '@/core/lib/prisma';

import { BadRequestException, ConflictException, NotFoundException } from '@/core/exceptions/http';

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

  async subscribe(subredditName: string, userId: string) {
    const subreddit = await prisma.subreddit.findFirst({
      where: {
        name: subredditName,
      },
      select: {
        id: true,
        creator: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!subreddit) {
      throw new NotFoundException('Subreddit');
    }

    const sub = await auth.api.addMember({
      body: {
        organizationId: subreddit.id,
        userId: userId,
        role: subreddit.creator?.id === userId ? 'owner' : 'member',
      },
    });

    return sub;
  },

  async unsubscribe(subredditName: string, userId: string) {
    const subreddit = await prisma.subreddit.findFirst({
      where: {
        name: subredditName,
      },
      select: {
        id: true,
      },
    });

    if (!subreddit) {
      throw new NotFoundException('Subreddit');
    }

    const subExists = await prisma.subscription.findUnique({
      where: {
        subredditId_userId: {
          subredditId: subreddit.id,
          userId: userId,
        },
      },
    });

    if (!subExists) {
      throw new BadRequestException('Subscription does not exist');
    }

    const unsub = await prisma.subscription.delete({
      where: {
        subredditId_userId: {
          subredditId: subreddit.id,
          userId: userId,
        },
      },
    });

    return unsub;
  },
};
