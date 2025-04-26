import { redirect } from 'react-router';
import type { Route } from './+types/route';
import { isLoggedIn, redirectWithClearedCookie } from '~/lib/password.server';

export async function action(args: Route.ActionArgs) {
  const { request } = args;

  const isAuthenticated = await isLoggedIn(request);
  if (!isAuthenticated) {
    return redirect('/login');
  }

  return redirectWithClearedCookie();
}
