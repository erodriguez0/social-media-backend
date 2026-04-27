import { createAccessControl } from 'better-auth/plugins/access';

const statement = {
  subreddit: ['update'],
  post: ['create', 'update', 'delete'],
  comment: ['create', 'update', 'delete'],
  user: ['ban'],
} as const;

export const ac = createAccessControl(statement);

export const roles = {
  owner: ac.newRole({
    subreddit: ['update'],
    post: ['create', 'update', 'delete'],
    comment: ['create', 'update', 'delete'],
    user: ['ban'],
  }),
  mod: ac.newRole({
    post: ['create', 'update', 'delete'],
    comment: ['create', 'update', 'delete'],
    user: ['ban'],
  }),
  member: ac.newRole({
    post: ['create'],
    comment: ['create'],
  }),
};
