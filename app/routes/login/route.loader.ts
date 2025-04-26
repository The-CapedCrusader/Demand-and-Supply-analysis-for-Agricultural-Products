import { redirect } from 'react-router';
import type { Route } from './+types/route';
import { isLoggedIn } from '~/lib/password.server';

export async function loader(args: Route.LoaderArgs) {
  const { request } = args;
  const isAuthenticated = await isLoggedIn(request);
  if (isAuthenticated) return redirect('/dashboard');

  return null;
}
