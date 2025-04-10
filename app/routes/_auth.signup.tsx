import { IconLeaf } from '@tabler/icons-react';
import { Link, redirect } from 'react-router';
import { SignupForm } from '~/components/auth/signup-form';
import { isLoggedIn, userDetailsCookie } from '~/lib/password.server';
import { MOCK_USERS, type MockUser } from '~/lib/dummy-users.server';
import type { Route } from './+types/_auth.signup';

export async function action(args: Route.ActionArgs) {
  const { request } = args;

  const formData = await request.formData();
  const firstName = formData.get('firstName');
  const lastName = formData.get('lastName');
  const email = formData.get('email');
  const password = formData.get('password');
  const confirmPassword = formData.get('confirmPassword');

  if (password !== confirmPassword) {
    return { error: 'Passwords do not match' };
  }

  const associatedUser = MOCK_USERS.find((user) => user.email === email);
  if (associatedUser) {
    return { error: 'Email already exists' };
  }

  if (!password || typeof password !== 'string') {
    return { error: 'Password is required' };
  }

  if (!email || typeof email !== 'string') {
    return { error: 'Email is required' };
  }

  const id = crypto.randomUUID();
  const name = `${firstName} ${lastName}`;
  const role = 'farmer';

  const newUser: MockUser = {
    id,
    email,
    name,
    role,
    password,
  };

  MOCK_USERS.push(newUser);

  const cookieHeader = request.headers.get('Cookie');
  const cookie = (await userDetailsCookie.parse(cookieHeader)) ?? {};
  cookie.id = newUser.id;
  cookie.email = newUser.email;
  cookie.name = newUser.name;
  cookie.role = newUser.role;

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
    return redirect('/dashboard');
  }

  return null;
}

export default function SignupPage() {
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
          <div className="w-full max-w-sm">
            <SignupForm />
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
