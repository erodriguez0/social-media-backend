import { SignInInput, SignUpInput } from '@/features/auth/auth.schema';
import { auth } from '@/features/auth/lib/auth';

export const authService = {
  async signUp(data: SignUpInput) {
    const user = await auth.api.signUpEmail({
      body: {
        name: data.username,
        email: data.email || data.username + '@example.com',
        username: data.username,
        password: data.password,
      },
    });

    return user;
  },

  async signIn(data: SignInInput) {
    const user = await auth.api.signInUsername({
      body: {
        username: data.username,
        password: data.password,
      },
    });

    return user;
  },
};
