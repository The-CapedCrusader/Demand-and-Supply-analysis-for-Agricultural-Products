import crypto from 'node:crypto';
import { createCookie, redirect } from 'react-router';
import { cookieSecret } from './secret.server';
import { MOCK_USERS } from './dummy-users.server';

export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('hex');

  return `${salt}$${hash}`;
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  const [salt, hash] = hashedPassword.split('$');
  const newHash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
    .toString('hex');

  return newHash === hash;
}

export const userDetailsCookie = createCookie('__user_details__', {
  maxAge: 60 * 60 * 24 * 30, // 30 days
  secrets: [cookieSecret],
});

export async function isLoggedIn(request: Request) {
  const cookieHeader = request.headers.get('Cookie');
  const cookie = (await userDetailsCookie.parse(cookieHeader)) ?? {};
  const { id, email, name, role } = cookie;

  if (!id || !email || !name || !role) {
    return false;
  }

//   const associatedUser = MOCK_USERS.find(
//     (user) =>
//       user.id === id &&
//       user.email === email &&
//       user.name === name &&
//       user.role === role
//   );

//   if (!associatedUser) {
//     return false;
//   }

  return true;
}

export async function redirectWithClearedCookie(): Promise<Response> {
  return redirect('/', {
    headers: {
      'Set-Cookie': await userDetailsCookie.serialize(null, {
        expires: new Date(0),
      }),
    },
  });
}
