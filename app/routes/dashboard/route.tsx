import { useLoaderData, Link } from 'react-router';
import { SiteHeader } from '~/components/site-header';
import { SectionCards } from '~/components/section-cards';
import { AppSidebar } from '~/components/navigation/app-sidebar';
import { SidebarInset, SidebarProvider } from '~/components/ui/sidebar';
import { ChartAreaInteractive } from '~/components/chart-area-interactive';
import { Card, CardHeader, CardTitle, CardContent } from '~/components/ui/card';

import { loader } from './route.loader';
export { loader };

import {
  IconUsers,
  IconPlant2,
  IconBarcode,
  IconTractor,
  IconChartBar,
  IconDatabase,
} from '@tabler/icons-react';

export default function DashboardPage() {
  const { user } = useLoaderData() as {
    user: {
      id: number;
      name: string;
      role: string;
      email: string;
    };
  };

  console.log('user', user);
  

  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 72)',
          '--header-height': 'calc(var(--spacing) * 12)',
        } as React.CSSProperties
      }
    >
      <AppSidebar
        variant="inset"
        user={{ ...user, avatar: '/avatars/farmer.jpg' }}
      />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="px-4 lg:px-6">
                <h1 className="mb-2 text-2xl font-bold">
                  Agricultural Demand & Supply Analysis
                </h1>
                <p className="text-muted-foreground mb-6">
                  Monitor crop prices, market trends, and optimize your farm's
                  production
                </p>
              </div>
              <SectionCards />
              <div className="px-4 lg:px-6">
                <h2 className="mb-4 text-xl font-semibold">
                  Dashboard Sections
                </h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Link to="/my-farm" className="block">
                    <Card className="hover:bg-muted/50 transition-colors">
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2">
                          <IconTractor className="text-primary h-5 w-5" />
                          My Farm
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground text-sm">
                          Monitor your farm's performance, crop health, and
                          weather conditions
                        </p>
                      </CardContent>
                    </Card>
                  </Link>

                  <Link to="/market-analysis" className="block">
                    <Card className="hover:bg-muted/50 transition-colors">
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2">
                          <IconChartBar className="text-primary h-5 w-5" />
                          Market Analysis
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground text-sm">
                          Track price trends, market demand, and make
                          data-driven decisions
                        </p>
                      </CardContent>
                    </Card>
                  </Link>

                  <Link to="/crop-management" className="block">
                    <Card className="hover:bg-muted/50 transition-colors">
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2">
                          <IconPlant2 className="text-primary h-5 w-5" />
                          Crop Management
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground text-sm">
                          Monitor and manage your crops efficiently
                        </p>
                      </CardContent>
                    </Card>
                  </Link>

                  <Link to="/buyers-sellers" className="block">
                    <Card className="hover:bg-muted/50 transition-colors">
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2">
                          <IconUsers className="text-primary h-5 w-5" />
                          Buyers & Sellers
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground text-sm">
                          Connect with potential buyers and sellers in your
                          region
                        </p>
                      </CardContent>
                    </Card>
                  </Link>

                  <Link to="/crop-database" className="block">
                    <Card className="hover:bg-muted/50 transition-colors">
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2">
                          <IconDatabase className="text-primary h-5 w-5" />
                          Crop Database
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground text-sm">
                          Comprehensive information about various crops
                        </p>
                      </CardContent>
                    </Card>
                  </Link>

                  <Link to="/inventory-scanner" className="block">
                    <Card className="hover:bg-muted/50 transition-colors">
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2">
                          <IconBarcode className="text-primary h-5 w-5" />
                          Inventory Scanner
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground text-sm">
                          Track and monitor your agricultural inventory
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              </div>

              <div className="mt-4 px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
