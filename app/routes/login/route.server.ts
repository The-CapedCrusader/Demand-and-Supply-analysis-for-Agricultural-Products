import { redirect } from 'react-router';
import type { Route } from './+types/route';
import {
  hashPassword,
  verifyPassword,
  userDetailsCookie,
} from '~/lib/password.server';
import { MOCK_USERS } from '~/lib/dummy-users.server';

export async function action(args: Route.ActionArgs) {
  const { request } = args;

  const formData = await request.formData();

  const email = formData.get('email');
  const password = formData.get('password');

  if (!email || typeof email !== 'string') {
    return { error: 'Email is required' };
  }

  if (!password || typeof password !== 'string') {
    return { error: 'Password is required' };
  }

  const user = MOCK_USERS.find((user) => user.email === email);
  if (!user) {
    return { error: 'Invalid email or password' };
  }

  const userPassword = await hashPassword(user.password);
  const isPasswordValid = await verifyPassword(password, userPassword);

  if (!isPasswordValid) {
    return { error: 'Invalid email or password' };
  }

  const cookieHeader = request.headers.get('Cookie');
  const cookie = (await userDetailsCookie.parse(cookieHeader)) ?? {};

  cookie.id = user.id;
  cookie.name = user.name;
  cookie.email = user.email;
  cookie.role = user.role;

  return redirect('/dashboard', {
    headers: {
      'Set-Cookie': await userDetailsCookie.serialize(cookie),
    },
  });
}
