import { IconLeaf } from '@tabler/icons-react';
import { Link, redirect } from 'react-router';
import { LoginForm } from '~/components/auth/login-form';
import type { Route } from './+types/_auth.login';
import { MOCK_USERS } from '~/lib/dummy-users.server';
import {
  hashPassword,
  isLoggedIn,
  userDetailsCookie,
  verifyPassword,
} from '~/lib/password.server';

export async function action(args: Route.ActionArgs) {
  const { request } = args;

  const formData = await request.formData();
  const email = formData.get('email');
  const password = formData.get('password');

  console.log(email, password);

  const associatedUser = MOCK_USERS.find((user) => user.email === email);
  if (!associatedUser) {
    return { error: 'Invalid email or password' };
  }

  if (!password || typeof password !== 'string') {
    return { error: 'Password is required' };
  }

  // TODO: we will save hashed password in the database
  // it's just a mockup for now
  const secretPassword = await hashPassword(associatedUser.password);

  const isPasswordValid = await verifyPassword(password, secretPassword);
  if (!isPasswordValid) {
    return { error: 'Invalid email or password' };
  }

  const cookieHeader = request.headers.get('Cookie');
  const cookie = (await userDetailsCookie.parse(cookieHeader)) ?? {};
  cookie.id = associatedUser.id;
  cookie.email = associatedUser.email;
  cookie.name = associatedUser.name;
  cookie.role = associatedUser.role;

  return redirect('/dashboard', {
    headers: {
      'Set-Cookie': await userDetailsCookie.serialize(cookie),
    },
  });
}

export async function loader(args: Route.LoaderArgs) {
  const { request } = args;
  const isAuthenticated = await isLoggedIn(request);
  if (isAuthenticated) {
    return redirect('/');
  }

  return null;
}

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link to="/" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex h-6 w-6 items-center justify-center rounded-md">
              <IconLeaf className="size-4" />
            </div>
            Krishok's
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="/farm.gif"
          alt="Farm landscape"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
