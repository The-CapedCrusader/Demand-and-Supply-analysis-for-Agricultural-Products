import type { Route } from './+types/_auth.logout';
import { isLoggedIn, redirectWithClearedCookie } from '~/lib/password.server';
import { redirect } from 'react-router';

export async function action(args: Route.ActionArgs) {
  const { request } = args;

  const isAuthenticated = await isLoggedIn(request);
  if (!isAuthenticated) {
    return redirect('/login');
  }

  return redirectWithClearedCookie();
}
