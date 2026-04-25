import { auth } from '@/features/auth/auth';
import { SignInInput, SignUpInput } from '@/features/auth/auth.schema';

export const authService = {
  async signUp(data: SignUpInput) {
    const res = await auth.api.signUpEmail({
      body: {
        name: data.username,
        email: data.email || data.username + '@example.com',
        username: data.username,
        password: data.password,
      },
    });

    return res;
  },

  async signIn(data: SignInInput) {
    const res = await auth.api.signInUsername({
      body: {
        username: data.username,
        password: data.password,
      },
    });

    return res;
  },
};
