import { isLoggedIn } from '~/lib/password.server';
import { Outlet, redirect } from 'react-router';
import type { Route } from './+types/dashboard';

export async function loader(args: Route.LoaderArgs) {
  const isAuthenticated = await isLoggedIn(args.request);
  if (!isAuthenticated) {
    return redirect('/login');
  }

  return null;
}

export default function Dashboard() {
  return <Outlet />;
}
