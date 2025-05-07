import { useLoaderData, Link } from 'react-router';
import { SiteHeader } from '~/components/site-header';
import { SectionCards } from '~/components/section-cards';
import { AppSidebar } from '~/components/navigation/app-sidebar';
import { SidebarInset, SidebarProvider } from '~/components/ui/sidebar';
import { ChartAreaInteractive } from '~/components/chart-area-interactive';
//hello

import { loader } from './route.loader';
export { loader };

import {
  Card,
  CardTitle,
  CardHeader,
  CardFooter,
  CardContent,
  CardDescription,
} from '~/components/ui/card';

import {
  IconUsers,
  IconPlant2,
  IconTractor,
  IconBarcode,
  IconChartBar,
  IconDatabase,
  IconTrendingUp,
  IconArrowUpRight,
  IconArrowDownRight,
} from '@tabler/icons-react';
import { Progress } from '~/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';

// Mock components for charts and data visualizations
const PriceComparisonChart = () => (
  <div className="flex h-80 w-full items-center justify-center rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50">
    <span className="text-muted-foreground">Price Comparison Chart</span>
  </div>
);

const WeatherForecast = () => (
  <div className="flex h-64 w-full items-center justify-center rounded-lg bg-gradient-to-r from-amber-50 to-yellow-50">
    <span className="text-muted-foreground">
      Weather Forecast Visualization
    </span>
  </div>
);

const CropYieldChart = () => (
  <div className="flex h-64 w-full items-center justify-center rounded-lg bg-gradient-to-r from-green-50 to-emerald-50">
    <span className="text-muted-foreground">Crop Yield Comparison</span>
  </div>
);

const MarketTrends = () => (
  <div className="flex h-64 w-full items-center justify-center rounded-lg bg-gradient-to-r from-purple-50 to-fuchsia-50">
    <span className="text-muted-foreground">Market Trends Analysis</span>
  </div>
);

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
                <h1 className="text-primary mb-2 text-3xl font-bold tracking-tight">
                  Agricultural Demand & Supply Analysis
                </h1>
                <p className="text-muted-foreground mb-4">
                  Monitor crop prices, market trends, and optimize your farm's
                  production
                </p>

                {/* Dashboard Summary Cards */}
                <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                  <Card className="border-l-4 border-l-green-500">
                    <CardHeader className="pb-2">
                      <CardDescription>Current Revenue</CardDescription>
                      <CardTitle className="text-2xl">$24,563</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex items-center text-sm text-green-500">
                        <IconArrowUpRight className="mr-1 h-4 w-4" />
                        <span>+12.5% from last month</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-blue-500">
                    <CardHeader className="pb-2">
                      <CardDescription>Average Crop Price</CardDescription>
                      <CardTitle className="text-2xl">$3.42/kg</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex items-center text-sm text-red-500">
                        <IconArrowDownRight className="mr-1 h-4 w-4" />
                        <span>-2.3% from last week</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-amber-500">
                    <CardHeader className="pb-2">
                      <CardDescription>Harvest Forecast</CardDescription>
                      <CardTitle className="text-2xl">87%</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <Progress value={87} className="h-2" />
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-purple-500">
                    <CardHeader className="pb-2">
                      <CardDescription>Market Demand</CardDescription>
                      <CardTitle className="text-2xl">High</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex items-center text-sm text-green-500">
                        <IconTrendingUp className="mr-1 h-4 w-4" />
                        <span>Rising trend in 3 crops</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <SectionCards />

              {/* Charts and visualizations */}
              <div className="px-4 lg:px-6">
                <Tabs defaultValue="market" className="mb-6">
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-semibold">
                      Analytics Overview
                    </h2>
                    <TabsList>
                      <TabsTrigger value="market">Market</TabsTrigger>
                      <TabsTrigger value="crops">Crops</TabsTrigger>
                      <TabsTrigger value="weather">Weather</TabsTrigger>
                    </TabsList>
                  </div>

                  <TabsContent value="market" className="mt-0">
                    <div className="grid gap-4 md:grid-cols-2">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">
                            Market Prices
                          </CardTitle>
                          <CardDescription>
                            Compare crop prices over time
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <PriceComparisonChart />
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">
                            Market Trends
                          </CardTitle>
                          <CardDescription>
                            Recent market movement analysis
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <MarketTrends />
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="crops" className="mt-0">
                    <div className="grid gap-4 md:grid-cols-2">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">
                            Crop Yield Comparison
                          </CardTitle>
                          <CardDescription>
                            Compare yields across different crops
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <CropYieldChart />
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">
                            Harvest Projections
                          </CardTitle>
                          <CardDescription>
                            Projected yields for next harvest
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ChartAreaInteractive />
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="weather" className="mt-0">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">
                          Weather Forecast
                        </CardTitle>
                        <CardDescription>
                          7-day forecast for your region
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <WeatherForecast />
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Dashboard navigation sections */}
              <div className="px-4 lg:px-6">
                <h2 className="mb-4 text-xl font-semibold">
                  Dashboard Sections
                </h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Link to="/my-farm" className="block">
                    <Card className="hover:bg-muted/50 border-l-4 border-l-green-500 transition-colors">
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
                      <CardFooter className="pt-0">
                        <span className="text-primary text-sm">
                          View details →
                        </span>
                      </CardFooter>
                    </Card>
                  </Link>

                  <Link to="/market-analysis" className="block">
                    <Card className="hover:bg-muted/50 border-l-4 border-l-blue-500 transition-colors">
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
                      <CardFooter className="pt-0">
                        <span className="text-primary text-sm">
                          View details →
                        </span>
                      </CardFooter>
                    </Card>
                  </Link>

                  <Link to="/crop-management" className="block">
                    <Card className="hover:bg-muted/50 border-l-4 border-l-amber-500 transition-colors">
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
                      <CardFooter className="pt-0">
                        <span className="text-primary text-sm">
                          View details →
                        </span>
                      </CardFooter>
                    </Card>
                  </Link>

                  <Link to="/buyers-sellers" className="block">
                    <Card className="hover:bg-muted/50 border-l-4 border-l-purple-500 transition-colors">
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
                      <CardFooter className="pt-0">
                        <span className="text-primary text-sm">
                          View details →
                        </span>
                      </CardFooter>
                    </Card>
                  </Link>

                  <Link to="/crop-database" className="block">
                    <Card className="hover:bg-muted/50 border-l-4 border-l-indigo-500 transition-colors">
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
                      <CardFooter className="pt-0">
                        <span className="text-primary text-sm">
                          View details →
                        </span>
                      </CardFooter>
                    </Card>
                  </Link>

                  <Link to="/inventory-scanner" className="block">
                    <Card className="hover:bg-muted/50 border-l-4 border-l-rose-500 transition-colors">
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
                      <CardFooter className="pt-0">
                        <span className="text-primary text-sm">
                          View details →
                        </span>
                      </CardFooter>
                    </Card>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
