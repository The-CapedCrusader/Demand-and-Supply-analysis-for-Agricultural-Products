import { useLoaderData } from 'react-router';

import type { LoaderFunctionArgs } from 'react-router';

export async function loader({ params }: LoaderFunctionArgs) {
  const { productId } = params;
  if (!productId) throw new Response('Product ID is required', { status: 400 });

  try {
    const product = await fetchProductById(productId);
    if (!product) throw new Response('Product not found', { status: 404 });

    return product;
  } catch (error) {
    throw new Response('Error loading product', { status: 500 });
  }
}

async function fetchProductById(id: string) {
  return {
    id,
    price: 99.99,
    name: 'Sample Product',
    image: '/images/sample-product.jpg',
    description: 'This is a sample product description',
  };
}

import type { ActionFunctionArgs } from 'react-router';

export async function action({ request, params }: ActionFunctionArgs) {
  const { productId } = params;
  if (!productId) throw new Response('Product ID is required', { status: 400 });

  const formData = await request.formData();
  const intent = formData.get('intent');

  switch (intent) {
    case 'update-product':
      return handleProductUpdate(productId, formData);

    case 'delete-product':
      return handleProductDeletion(productId);

    default:
      throw new Response('Invalid action', { status: 400 });
  }
}

async function handleProductUpdate(productId: string, formData: FormData) {
  // Implement your product update logic here
  return JSON.stringify({
    success: true,
    message: 'Product updated successfully',
  });
}

async function handleProductDeletion(productId: string) {
  // Implement your product deletion logic here
  return JSON.stringify({
    success: true,
    message: 'Product deleted successfully',
  });
}

import { DashboardCard } from '~/components/dashboard-card';
import { Button } from '~/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import {
  LineChart,
  BarChart,
  ChartContainer,
  ChartTooltip,
  ChartLegend,
} from '~/components/ui/chart';
import { Badge } from '~/components/ui/badge';
import { Download, ArrowRight, Leaf, Sun, Cloud, Droplets } from 'lucide-react';
import { Card, CardContent } from '~/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';

export default function ProductDetailsPage() {
  // Sample data for price history chart
  const priceHistoryData = {
    labels: [
      'Jan 2022',
      'Feb 2022',
      'Mar 2022',
      'Apr 2022',
      'May 2022',
      'Jun 2022',
      'Jul 2022',
      'Aug 2022',
      'Sep 2022',
      'Oct 2022',
      'Nov 2022',
      'Dec 2022',
      'Jan 2023',
      'Feb 2023',
      'Mar 2023',
      'Apr 2023',
      'May 2023',
      'Jun 2023',
      'Jul 2023',
      'Aug 2023',
      'Sep 2023',
    ],
    datasets: [
      {
        label: 'Wheat Price ($/ton)',
        data: [
          310, 315, 320, 325, 330, 335, 330, 325, 320, 315, 320, 325, 330, 335,
          340, 345, 350, 345, 340, 335, 330,
        ],
        borderColor: 'rgb(75, 192, 75)',
        backgroundColor: 'rgba(75, 192, 75, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  // Sample data for seasonal production chart
  const seasonalProductionData = {
    labels: ['Winter', 'Spring', 'Summer', 'Fall'],
    datasets: [
      {
        label: 'Production Volume (tons)',
        data: [12500, 8500, 5000, 10000],
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(75, 192, 75, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
        borderColor: [
          'rgb(54, 162, 235)',
          'rgb(75, 192, 75)',
          'rgb(255, 206, 86)',
          'rgb(255, 159, 64)',
        ],
        borderWidth: 2,
      },
    ],
  };

  // Sample data for demand vs supply chart
  const demandSupplyData = {
    labels: [
      'Jan 2023',
      'Feb 2023',
      'Mar 2023',
      'Apr 2023',
      'May 2023',
      'Jun 2023',
      'Jul 2023',
      'Aug 2023',
      'Sep 2023',
    ],
    datasets: [
      {
        label: 'Demand (tons)',
        data: [8500, 8200, 8400, 8600, 8800, 9000, 9200, 9000, 8800],
        borderColor: 'rgb(75, 192, 75)',
        backgroundColor: 'rgba(75, 192, 75, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Supply (tons)',
        data: [8000, 7800, 8100, 8300, 8500, 8700, 8900, 8700, 8500],
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.1)',
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Wheat</h1>
          <p className="text-muted-foreground">
            Comprehensive product information and analysis
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="hard-red-winter">
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select Variety" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hard-red-winter">Hard Red Winter</SelectItem>
              <SelectItem value="hard-red-spring">Hard Red Spring</SelectItem>
              <SelectItem value="soft-red-winter">Soft Red Winter</SelectItem>
              <SelectItem value="white">White Wheat</SelectItem>
              <SelectItem value="durum">Durum</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">
                  Current Price
                </p>
                <h3 className="mt-1 text-2xl font-bold">$330/ton</h3>
                <div className="mt-2 flex items-center">
                  <span className="text-xs font-medium text-red-600">
                    -1.5% from last month
                  </span>
                </div>
              </div>
              <div className="bg-primary/10 rounded-full p-3">
                <Leaf className="text-primary h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">
                  Current Supply
                </p>
                <h3 className="mt-1 text-2xl font-bold">8,500 tons</h3>
                <div className="mt-2 flex items-center">
                  <span className="text-xs font-medium text-green-600">
                    +3.2% from last month
                  </span>
                </div>
              </div>
              <div className="bg-primary/10 rounded-full p-3">
                <Sun className="text-primary h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">
                  Current Demand
                </p>
                <h3 className="mt-1 text-2xl font-bold">8,800 tons</h3>
                <div className="mt-2 flex items-center">
                  <span className="text-xs font-medium text-red-600">
                    -2.2% from last month
                  </span>
                </div>
              </div>
              <div className="bg-primary/10 rounded-full p-3">
                <Cloud className="text-primary h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="md:col-span-2">
          <DashboardCard
            title="Product Information"
            description="Hard Red Winter Wheat"
          >
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="mb-2 text-sm font-medium">Basic Information</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground text-sm">
                      Category
                    </span>
                    <span className="text-sm">Grains</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground text-sm">
                      Variety
                    </span>
                    <span className="text-sm">Hard Red Winter</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground text-sm">
                      Protein Content
                    </span>
                    <span className="text-sm">11-12%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground text-sm">
                      Moisture Content
                    </span>
                    <span className="text-sm">13.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground text-sm">
                      Test Weight
                    </span>
                    <span className="text-sm">60 lbs/bushel</span>
                  </div>
                </div>

                <h4 className="mt-4 mb-2 text-sm font-medium">
                  Growing Information
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground text-sm">
                      Growing Season
                    </span>
                    <span className="text-sm">Fall to Summer</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground text-sm">
                      Planting Time
                    </span>
                    <span className="text-sm">September-October</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground text-sm">
                      Harvest Time
                    </span>
                    <span className="text-sm">June-July</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground text-sm">
                      Yield Potential
                    </span>
                    <span className="text-sm">40-60 bushels/acre</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="mb-2 text-sm font-medium">Seasonality</h4>
                <div className="mb-4 grid grid-cols-4 gap-2">
                  <div className="rounded-lg border border-blue-100 bg-blue-50 p-2 text-center">
                    <p className="text-xs font-medium text-blue-800">Winter</p>
                    <Badge className="mt-1 bg-blue-100 text-blue-800 hover:bg-blue-100">
                      Growing
                    </Badge>
                  </div>
                  <div className="rounded-lg border border-green-100 bg-green-50 p-2 text-center">
                    <p className="text-xs font-medium text-green-800">Spring</p>
                    <Badge className="mt-1 bg-green-100 text-green-800 hover:bg-green-100">
                      Growing
                    </Badge>
                  </div>
                  <div className="rounded-lg border border-yellow-100 bg-yellow-50 p-2 text-center">
                    <p className="text-xs font-medium text-yellow-800">
                      Summer
                    </p>
                    <Badge className="mt-1 bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                      Harvest
                    </Badge>
                  </div>
                  <div className="rounded-lg border border-orange-100 bg-orange-50 p-2 text-center">
                    <p className="text-xs font-medium text-orange-800">Fall</p>
                    <Badge className="mt-1 bg-orange-100 text-orange-800 hover:bg-orange-100">
                      Planting
                    </Badge>
                  </div>
                </div>

                <h4 className="mt-4 mb-2 text-sm font-medium">
                  Market Information
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground text-sm">
                      Price Elasticity
                    </span>
                    <span className="text-sm">0.35 (Inelastic)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground text-sm">
                      Major Producers
                    </span>
                    <span className="text-sm">Kansas, Oklahoma, Texas</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground text-sm">
                      Major Consumers
                    </span>
                    <span className="text-sm">Flour Mills, Bakeries</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground text-sm">
                      Storage Life
                    </span>
                    <span className="text-sm">12-18 months</span>
                  </div>
                </div>
              </div>
            </div>
          </DashboardCard>
        </div>

        <div>
          <DashboardCard
            title="Seasonal Production"
            description="Production volume by season"
          >
            <div className="h-64">
              <ChartContainer>
                <BarChart
                  data={seasonalProductionData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        title: {
                          display: true,
                          text: 'Production (tons)',
                        },
                      },
                    },
                  }}
                />
                <ChartTooltip />
              </ChartContainer>
            </div>
          </DashboardCard>
        </div>
      </div>

      <Tabs defaultValue="price-history">
        <TabsList className="mb-4 grid w-full grid-cols-3">
          <TabsTrigger value="price-history">Price History</TabsTrigger>
          <TabsTrigger value="demand-supply">Demand vs Supply</TabsTrigger>
          <TabsTrigger value="production-data">Production Data</TabsTrigger>
        </TabsList>

        <TabsContent value="price-history">
          <DashboardCard
            title="Historical Price Trends"
            description="21-month price history"
          >
            <div className="h-80">
              <ChartContainer>
                <LineChart
                  data={priceHistoryData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'top',
                      },
                      tooltip: {
                        mode: 'index',
                        intersect: false,
                      },
                    },
                    scales: {
                      y: {
                        beginAtZero: false,
                        title: {
                          display: true,
                          text: 'Price ($/ton)',
                        },
                      },
                      x: {
                        title: {
                          display: true,
                          text: 'Month',
                        },
                      },
                    },
                  }}
                />
                <ChartLegend />
                <ChartTooltip />
              </ChartContainer>
            </div>
          </DashboardCard>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <DashboardCard title="Price Factors">
              <div className="space-y-4">
                <div className="rounded-lg border border-green-100 bg-green-50 p-3">
                  <h4 className="mb-1 font-medium text-green-800">
                    Supply Factors
                  </h4>
                  <p className="text-sm text-green-700">
                    Global wheat production is expected to decrease by 2.5% this
                    year due to drought conditions in major producing regions,
                    potentially driving prices higher.
                  </p>
                </div>
                <div className="rounded-lg border border-blue-100 bg-blue-50 p-3">
                  <h4 className="mb-1 font-medium text-blue-800">
                    Demand Factors
                  </h4>
                  <p className="text-sm text-blue-700">
                    Increasing global population and rising incomes in
                    developing countries are driving steady growth in wheat
                    demand at approximately 1.8% annually.
                  </p>
                </div>
                <div className="rounded-lg border border-yellow-100 bg-yellow-50 p-3">
                  <h4 className="mb-1 font-medium text-yellow-800">
                    Market Factors
                  </h4>
                  <p className="text-sm text-yellow-700">
                    Trade policies and export restrictions in major
                    wheat-producing countries can cause significant price
                    volatility in the global market.
                  </p>
                </div>
              </div>
            </DashboardCard>

            <DashboardCard title="Price Forecasting">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">
                    Short-term (1-3 months)
                  </span>
                  <span className="text-sm text-green-600">
                    $335-345/ton (+1.5-4.5%)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">
                    Medium-term (3-6 months)
                  </span>
                  <span className="text-sm text-green-600">
                    $345-360/ton (+4.5-9.1%)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">
                    Long-term (6-12 months)
                  </span>
                  <span className="text-sm text-yellow-600">
                    $320-370/ton (-3.0-12.1%)
                  </span>
                </div>
                <div className="bg-primary/5 border-primary/20 mt-2 rounded-lg border p-3">
                  <h4 className="mb-1 font-medium">Forecast Confidence</h4>
                  <div className="flex items-center gap-2">
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
                      <div
                        className="bg-primary h-full rounded-full"
                        style={{ width: '75%' }}
                      ></div>
                    </div>
                    <span className="text-xs font-medium">75%</span>
                  </div>
                  <p className="text-muted-foreground mt-2 text-xs">
                    Forecast based on historical trends, current market
                    conditions, and predictive modeling.
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <Button variant="outline" size="sm" className="w-full">
                  View Detailed Price Analysis
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </DashboardCard>
          </div>
        </TabsContent>

        <TabsContent value="demand-supply">
          <DashboardCard
            title="Demand vs Supply Analysis"
            description="9-month trend analysis"
          >
            <div className="h-80">
              <ChartContainer>
                <LineChart
                  data={demandSupplyData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'top',
                      },
                      tooltip: {
                        mode: 'index',
                        intersect: false,
                      },
                    },
                    scales: {
                      y: {
                        beginAtZero: false,
                        title: {
                          display: true,
                          text: 'Volume (tons)',
                        },
                      },
                      x: {
                        title: {
                          display: true,
                          text: 'Month',
                        },
                      },
                    },
                  }}
                />
                <ChartLegend />
                <ChartTooltip />
              </ChartContainer>
            </div>
          </DashboardCard>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <DashboardCard title="Demand Analysis">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Current Demand</span>
                  <span className="text-sm">8,800 tons/month</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">YoY Demand Growth</span>
                  <span className="text-sm text-green-600">+3.5%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">
                    Peak Demand Season
                  </span>
                  <span className="text-sm">Fall (Sep-Nov)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Low Demand Season</span>
                  <span className="text-sm">Spring (Mar-May)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Price Elasticity</span>
                  <span className="text-sm">0.35 (Inelastic)</span>
                </div>
                <div className="mt-2 rounded-lg border border-blue-100 bg-blue-50 p-3">
                  <h4 className="mb-1 font-medium text-blue-800">
                    Consumer Trends
                  </h4>
                  <p className="text-sm text-blue-700">
                    Increasing consumer preference for whole grain and artisanal
                    bread products is driving demand for high-protein wheat
                    varieties.
                  </p>
                </div>
              </div>
            </DashboardCard>

            <DashboardCard title="Supply Analysis">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Current Supply</span>
                  <span className="text-sm">8,500 tons/month</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">YoY Supply Growth</span>
                  <span className="text-sm text-green-600">+2.8%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">
                    Peak Supply Season
                  </span>
                  <span className="text-sm">Summer (Jun-Aug)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Low Supply Season</span>
                  <span className="text-sm">Winter (Dec-Feb)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Current Inventory</span>
                  <span className="text-sm">32,500 tons</span>
                </div>
                <div className="mt-2 rounded-lg border border-green-100 bg-green-50 p-3">
                  <h4 className="mb-1 font-medium text-green-800">
                    Production Factors
                  </h4>
                  <p className="text-sm text-green-700">
                    Weather conditions in major wheat-growing regions have been
                    favorable this year, leading to above-average yields in most
                    areas.
                  </p>
                </div>
              </div>
            </DashboardCard>
          </div>
        </TabsContent>

        <TabsContent value="production-data">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="md:col-span-3">
              <DashboardCard
                title="Historical Production Data"
                description="Yields, acreage, and costs"
              >
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="px-4 py-2 text-left font-medium">
                          Year
                        </th>
                        <th className="px-4 py-2 text-right font-medium">
                          Acreage (acres)
                        </th>
                        <th className="px-4 py-2 text-right font-medium">
                          Yield (bushels/acre)
                        </th>
                        <th className="px-4 py-2 text-right font-medium">
                          Production (tons)
                        </th>
                        <th className="px-4 py-2 text-right font-medium">
                          Cost ($/acre)
                        </th>
                        <th className="px-4 py-2 text-right font-medium">
                          Price ($/ton)
                        </th>
                        <th className="px-4 py-2 text-right font-medium">
                          Revenue ($/acre)
                        </th>
                        <th className="px-4 py-2 text-right font-medium">
                          Profit ($/acre)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          year: 2023,
                          acreage: 45800,
                          yield: 52.5,
                          production: 120050,
                          cost: 425,
                          price: 330,
                          revenue: 577.5,
                          profit: 152.5,
                        },
                        {
                          year: 2022,
                          acreage: 44500,
                          yield: 50.2,
                          production: 111695,
                          cost: 410,
                          price: 325,
                          revenue: 543.0,
                          profit: 133.0,
                        },
                        {
                          year: 2021,
                          acreage: 46200,
                          yield: 48.7,
                          production: 112547,
                          cost: 395,
                          price: 315,
                          revenue: 511.4,
                          profit: 116.4,
                        },
                        {
                          year: 2020,
                          acreage: 43800,
                          yield: 49.1,
                          production: 107629,
                          cost: 385,
                          price: 305,
                          revenue: 499.0,
                          profit: 114.0,
                        },
                        {
                          year: 2019,
                          acreage: 45100,
                          yield: 47.8,
                          production: 107789,
                          cost: 375,
                          price: 295,
                          revenue: 469.7,
                          profit: 94.7,
                        },
                      ].map((row) => (
                        <tr
                          key={row.year}
                          className="hover:bg-muted/50 border-b"
                        >
                          <td className="px-4 py-2">{row.year}</td>
                          <td className="px-4 py-2 text-right">
                            {row.acreage.toLocaleString()}
                          </td>
                          <td className="px-4 py-2 text-right">{row.yield}</td>
                          <td className="px-4 py-2 text-right">
                            {row.production.toLocaleString()}
                          </td>
                          <td className="px-4 py-2 text-right">${row.cost}</td>
                          <td className="px-4 py-2 text-right">${row.price}</td>
                          <td className="px-4 py-2 text-right">
                            ${row.revenue}
                          </td>
                          <td className="px-4 py-2 text-right font-medium text-green-600">
                            ${row.profit}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </DashboardCard>
            </div>

            <div className="md:col-span-2">
              <DashboardCard
                title="Production Requirements"
                description="Optimal growing conditions"
              >
                <div className="grid grid-cols-3 gap-4">
                  <div className="rounded-lg border border-blue-100 bg-blue-50 p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <Droplets className="h-5 w-5 text-blue-600" />
                      <h4 className="font-medium text-blue-800">
                        Water Requirements
                      </h4>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-blue-700">
                          Annual Rainfall
                        </span>
                        <span className="text-sm text-blue-700">
                          16-24 inches
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-blue-700">
                          Irrigation
                        </span>
                        <span className="text-sm text-blue-700">
                          Supplemental
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-blue-700">
                          Critical Period
                        </span>
                        <span className="text-sm text-blue-700">
                          Heading stage
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg border border-yellow-100 bg-yellow-50 p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <Sun className="h-5 w-5 text-yellow-600" />
                      <h4 className="font-medium text-yellow-800">
                        Climate Requirements
                      </h4>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-yellow-700">
                          Temperature
                        </span>
                        <span className="text-sm text-yellow-700">
                          60-75°F optimal
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-yellow-700">
                          Frost Tolerance
                        </span>
                        <span className="text-sm text-yellow-700">High</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-yellow-700">
                          Growing Days
                        </span>
                        <span className="text-sm text-yellow-700">
                          240-280 days
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg border border-green-100 bg-green-50 p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <Leaf className="h-5 w-5 text-green-600" />
                      <h4 className="font-medium text-green-800">
                        Soil Requirements
                      </h4>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-green-700">
                          Soil Type
                        </span>
                        <span className="text-sm text-green-700">
                          Loam, Clay Loam
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-green-700">pH Level</span>
                        <span className="text-sm text-green-700">6.0-7.5</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-green-700">Drainage</span>
                        <span className="text-sm text-green-700">
                          Well-drained
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-primary/5 border-primary/20 mt-4 rounded-lg border p-4">
                  <h4 className="mb-2 font-medium">Fertilizer Requirements</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex items-start gap-2">
                      <span className="text-sm font-medium">Nitrogen (N):</span>
                      <span className="text-sm">80-120 lbs/acre</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-sm font-medium">
                        Phosphorus (P):
                      </span>
                      <span className="text-sm">30-50 lbs/acre</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-sm font-medium">
                        Potassium (K):
                      </span>
                      <span className="text-sm">20-40 lbs/acre</span>
                    </div>
                  </div>
                </div>
              </DashboardCard>
            </div>

            <div>
              <DashboardCard
                title="Production Trends"
                description="5-year analysis"
              >
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Acreage Trend</span>
                    <span className="text-sm text-green-600">
                      +4.6% (5-year)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Yield Trend</span>
                    <span className="text-sm text-green-600">
                      +9.8% (5-year)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">
                      Production Cost Trend
                    </span>
                    <span className="text-sm text-red-600">
                      +13.3% (5-year)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Price Trend</span>
                    <span className="text-sm text-green-600">
                      +11.9% (5-year)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">
                      Profit Margin Trend
                    </span>
                    <span className="text-sm text-green-600">
                      +61.0% (5-year)
                    </span>
                  </div>
                  <div className="mt-2 rounded-lg border border-green-100 bg-green-50 p-3">
                    <h4 className="mb-1 font-medium text-green-800">
                      Production Insights
                    </h4>
                    <p className="text-sm text-green-700">
                      Improved farming practices and drought-resistant varieties
                      have contributed to steady yield increases despite
                      challenging weather conditions in recent years.
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <Button variant="outline" size="sm" className="w-full">
                    View Complete Production History
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </DashboardCard>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
