import { auth, AuthType } from '@/features/auth/lib/auth';

export type HonoEnv = {
  Variables: {} & AuthType;
};
