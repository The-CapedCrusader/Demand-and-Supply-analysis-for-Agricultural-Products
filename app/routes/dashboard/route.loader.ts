import {redirect } from 'react-router';
import type { Route } from './+types/route';

export async function loader(args: Route.LoaderArgs) {
  const { userDetailsCookie } = await import('~/lib/password.server');

  const cookieHeader = args.request.headers.get('Cookie');
  const user = await userDetailsCookie.parse(cookieHeader || '');

  if (!user) return redirect('/login');

  return { user };
}
