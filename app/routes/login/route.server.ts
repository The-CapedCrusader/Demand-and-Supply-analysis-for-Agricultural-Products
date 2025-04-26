import { redirect } from 'react-router';
import type { Route } from './+types/route';
import {
  hashPassword,
  verifyPassword,
  userDetailsCookie,
} from '~/lib/password.server';
import type { DBUser } from '~/types/user';
import { getDatabaseConnection } from '~/lib/database.server';

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

  const conn = await getDatabaseConnection({ init: false });
  const [existingUserRows] = await conn.query(
    `SELECT * FROM USERS WHERE email = ?`,
    [email]
  );

  const user = existingUserRows as Array<DBUser>;

  if (user.length === 0) {
    return { error: 'Email or password invalid' };
  }

  const userPassword = await hashPassword(user[0].PASSWORD as string);
  const isPasswordValid = await verifyPassword(password, userPassword);

  if (!isPasswordValid) {
    return { error: 'Invalid email or password' };
  }

  const cookieHeader = request.headers.get('Cookie');
  const cookie = (await userDetailsCookie.parse(cookieHeader)) ?? {};

  cookie.id = user[0].UserID;
  cookie.name = user[0].Name;
  cookie.email = user[0].Email;
  cookie.role = user[0].UserType;

  return redirect('/dashboard', {
    headers: {
      'Set-Cookie': await userDetailsCookie.serialize(cookie),
    },
  });
}
