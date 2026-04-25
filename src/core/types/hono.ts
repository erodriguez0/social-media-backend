import { auth, AuthType } from '@/features/auth/auth';

export type HonoEnv = {
  Variables: {} & AuthType;
};
