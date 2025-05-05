import { redirect } from 'react-router';
import type { Route } from './+types/route';
import { getDatabaseConnection } from '~/lib/database.server';
import { hashPassword, userDetailsCookie } from '~/lib/password.server';

export const action = async (args: Route.ActionArgs) => {
  const { request } = args;
  const formData = await request.formData();

  const email = formData.get('email');
  const password = formData.get('password');
  const lastName = formData.get('lastName');
  const firstName = formData.get('firstName');
  const confirmPassword = formData.get('confirmPassword');

  if (!email || typeof email !== 'string') {
    return { error: 'Email is required' };
  }

  if (!password || typeof password !== 'string') {
    return { error: 'Password is required' };
  }

  if (password !== confirmPassword) {
    return { error: 'Passwords do not match' };
  }

  const name = `${firstName} ${lastName}`;
  const role = 'farmer';

  const conn = await getDatabaseConnection({ init: false });
  const [existingUserRows] = await conn.query(
    `SELECT * FROM USER_T WHERE email = ?`,
    [email]
  );

  const result = existingUserRows as Array<{
    [key: string]: PropertyKey;
  }>;

  if (result.length > 0) {
    return { error: 'Email already exists' };
  }

  const hashedPassword = await hashPassword(password);

  const [createUserRows] = await conn.query(
    `INSERT INTO USER_T (email, name, password) VALUES (?, ?, ?)`,
    [email, name, hashedPassword]
  );

  const createUserResult = createUserRows as unknown as {
    insertId: number;
    affectedRows: number;
  };

  if (createUserResult?.affectedRows === 0) {
    return { error: 'Failed to create user' };
  }

  const cookieHeader = request.headers.get('Cookie');
  const cookie = (await userDetailsCookie.parse(cookieHeader)) ?? {};

  cookie.name = name;
  cookie.role = role;
  cookie.email = email;
  cookie.id = createUserResult.insertId;

  return redirect('/dashboard', {
    headers: {
      'Set-Cookie': await userDetailsCookie.serialize(cookie),
    },
  });
};
