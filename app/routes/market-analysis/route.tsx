import { AppSidebar } from '~/components/navigation/app-sidebar';
import { SiteHeader } from '~/components/site-header';
import { SidebarInset, SidebarProvider } from '~/components/ui/sidebar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
  //fixed
} from '~/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { IconChartBar, IconChartRadar, IconGrain, IconChartLine, IconBuildingBank, IconPlus } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useLoaderData, useNavigate, Form, useActionData, useNavigation, Link } from 'react-router';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, RadarChart, 
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  Cell
} from 'recharts';
import { loader, action } from './route.server';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogClose
} from '~/components/ui/dialog';
import { Label } from '~/components/ui/label';
import { Input } from '~/components/ui/input';
import { Textarea } from '~/components/ui/textarea';
import { toast } from 'sonner';

export { loader, action };

export default function MarketAnalysisPage() {
  const { 
    priceTrends, 
    chartData, 
    demandSupply, 
    regionalStats, 
    gdpData, 
    forecast, 
    demandProjection,
    products,
    years,
    selectedYear,
    selectedCrop,
    error
  } = useLoaderData<{
    priceTrends: any[];
    chartData: any[];
    demandSupply: any[];
    regionalStats: any[];
    gdpData: any[];
    forecast: any[];
    demandProjection: any[];
    products: {ProductName: string}[];
    years: {Year: number}[];
    selectedYear: string;
    selectedCrop: string;
    error?: string;
  }>();
  
  const actionData = useActionData<{ success?: boolean; error?: string; redirect?: string }>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  const navigate = useNavigate();
  const [year, setYear] = useState(selectedYear);
  const [crop, setCrop] = useState(selectedCrop);
  const [isAddDataModalOpen, setIsAddDataModalOpen] = useState(false);
  
  // Handle successful submission
  useEffect(() => {
    if (actionData?.success) {
      setIsAddDataModalOpen(false);
      toast.success('Market data added successfully');
      
      // Redirect if needed
      if (actionData.redirect) {
        navigate(actionData.redirect);
      }
    } else if (actionData?.error) {
      toast.error(actionData.error);
    }
  }, [actionData, navigate]);
  
  // Calculate necessary derived data
  const avgPriceForSelectedCrop = chartData
    .filter(item => item[crop])
    .reduce((acc, item) => acc + Number(item[crop]), 0) / 
    chartData.filter(item => item[crop]).length || 0;
  
  const priceVolatility = crop === 'rice' ? '4.2%' : 
                           crop === 'wheat' ? '3.8%' : 
                           crop === 'corn' ? '2.5%' : '3.7%';
  
  const totalDemand = demandSupply.reduce((acc, item) => acc + Number(item.Demand), 0);
  const totalSupply = demandSupply.reduce((acc, item) => acc + Number(item.Supply), 0);
  const supplyGap = totalDemand > 0 ? ((totalDemand - totalSupply) / totalDemand * 100).toFixed(1) : '0.0';
  
  // Handler for filter changes
  const handleYearChange = (newYear: string) => {
    setYear(newYear);
    navigate(`/market-analysis?year=${newYear}&crop=${crop}`);
  };
  
  const handleCropChange = (newCrop: string) => {
    setCrop(newCrop);
    navigate(`/market-analysis?year=${year}&crop=${newCrop}`);
  };
  
  // Define radar data based on products
  const radarData = [
    { category: 'Yield', rice: 85, wheat: 70, corn: 65, soybeans: 60 },
    { category: 'Profit Margin', rice: 65, wheat: 60, corn: 55, soybeans: 70 },
    { category: 'Water Usage', rice: 90, wheat: 60, corn: 50, soybeans: 40 },
    { category: 'Market Demand', rice: 80, wheat: 75, corn: 60, soybeans: 70 },
    { category: 'Export Value', rice: 75, wheat: 80, corn: 50, soybeans: 65 },
  ];

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
        user={{
          id: 1,
          role: 'admin',
          name: 'Admin User',
          email: 'admin@example.com',
          avatar: '/avatars/admin.jpg',
        }}
      />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="px-4 lg:px-6">
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-bold">Market Analysis</h1>
                  <div className="flex gap-4">
                    <Button variant="outline" onClick={() => setIsAddDataModalOpen(true)}>
                      <IconPlus className="mr-2 h-4 w-4" />
                      Add Data
                    </Button>
                    <Button asChild>
                      <Link to="/market-analysis/calculator">
                        <IconBuildingBank className="mr-2 h-4 w-4" />
                        GDP & Nutrition Calculator
                      </Link>
                    </Button>
                  </div>
                </div>
                
                {error && (
                  <div className="mb-4 rounded-md bg-red-50 p-4 text-red-700">
                    <p>{error}</p>
                    <p className="mt-2 text-sm">Using sample data for display.</p>
                  </div>
                )}
                
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Year:</span>
                      <Select defaultValue={year} onValueChange={handleYearChange}>
                        <SelectTrigger className="w-[100px]">
                          <SelectValue placeholder="Year" />
                        </SelectTrigger>
                        <SelectContent>
                          {years.map((yr: {Year: number}) => (
                            <SelectItem key={yr.Year} value={yr.Year.toString()}>
                              {yr.Year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Crop:</span>
                      <Select defaultValue={crop} onValueChange={handleCropChange}>
                        <SelectTrigger className="w-[150px]">
                          <SelectValue placeholder="Select crop" />
                        </SelectTrigger>
                        <SelectContent>
                          {products.map((prod: {ProductName: string}) => (
                            <SelectItem key={prod.ProductName} value={prod.ProductName}>
                              {prod.ProductName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <Button onClick={() => setIsAddDataModalOpen(true)}>
                    <IconPlus className="mr-2 h-4 w-4" />
                    Add Market Data
                  </Button>
                </div>
              </div>
              
              <Tabs defaultValue="overview" className="px-4 lg:px-6">
                <TabsList className="mb-4">
                  <TabsTrigger value="overview">Market Overview</TabsTrigger>
                  <TabsTrigger value="price">Price Trends</TabsTrigger>
                  <TabsTrigger value="demand">Demand Analysis</TabsTrigger>
                  <TabsTrigger value="gdp">GDP & Nutrition</TabsTrigger>
                  <TabsTrigger value="forecast">Forecasting</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="mt-0">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <IconGrain className="text-primary h-5 w-5" />
                          {crop.charAt(0).toUpperCase() + crop.slice(1)} Market Summary
                        </CardTitle>
                        <CardDescription>Current market status</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="mt-2 grid grid-cols-2 gap-4">
                          <div className="rounded-lg border p-3">
                            <h4 className="text-sm font-medium">Current Price</h4>
                            <p className="text-2xl font-bold">
                              ${isNaN(avgPriceForSelectedCrop) ? '--' : Math.round(avgPriceForSelectedCrop)}
                            </p>
                            <p className="text-muted-foreground text-xs">per ton</p>
                          </div>
                          <div className="rounded-lg border p-3">
                            <h4 className="text-sm font-medium">Supply Gap</h4>
                            <p className="text-2xl font-bold">{supplyGap}%</p>
                            <p className="text-muted-foreground text-xs">demand vs supply</p>
                          </div>
                          <div className="rounded-lg border p-3">
                            <h4 className="text-sm font-medium">Total Demand</h4>
                            <p className="text-2xl font-bold">{totalDemand.toLocaleString()}</p>
                            <p className="text-muted-foreground text-xs">tons</p>
                          </div>
                          <div className="rounded-lg border p-3">
                            <h4 className="text-sm font-medium">Total Supply</h4>
                            <p className="text-2xl font-bold">{totalSupply.toLocaleString()}</p>
                            <p className="text-muted-foreground text-xs">tons</p>
                          </div>
                        </div>
                        <div className="mt-4">
                          <h3 className="text-sm font-medium">Market Insights</h3>
                          <p className="text-muted-foreground mt-2 text-sm">
                            {crop === 'rice' 
                              ? 'Rice markets continue to show strong growth potential, with increasing demand in both domestic and export markets. Supply constraints are leading to steady price increases.'
                              : crop === 'wheat'
                              ? 'Wheat markets have stabilized after early year fluctuations, with good harvest prospects balancing increased global demand. Prices show moderate growth.'
                              : crop === 'corn'
                              ? 'Corn markets experienced some volatility early in the year but have begun to stabilize. Production increases have put downward pressure on prices.'
                              : 'Soybean markets remain strong with steady price increases driven by protein demand and exports to Asian markets.'}
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="md:col-span-2">
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <IconChartLine className="text-primary h-5 w-5" />
                          {year} Price Trends
                        </CardTitle>
                        <CardDescription>
                          Monthly price movements of major agricultural products
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[300px] w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="month" />
                              <YAxis />
                              <Tooltip />
                              <Legend />
                              {chartData.length > 0 && Object.keys(chartData[0])
                                .filter(key => key !== 'month')
                                .map((productName, idx) => (
                                  <Line 
                                    key={productName}
                                    type="monotone" 
                                    dataKey={productName} 
                                    name={productName.charAt(0).toUpperCase() + productName.slice(1)}
                                    stroke={['#8884d8', '#82ca9d', '#ffc658', '#ff8042'][idx % 4]} 
                                  />
                                ))}
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="price" className="mt-0">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Price Trends Analysis</CardTitle>
                      <CardDescription>
                        Historical data on agricultural commodity prices
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4 flex items-center justify-between">
                        <p className="text-muted-foreground">
                          Interactive price trends for major agricultural products
                        </p>
                      </div>
                      <div className="h-[400px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line 
                              type="monotone" 
                              dataKey={crop} 
                              stroke="#8884d8" 
                              strokeWidth={2}
                              activeDot={{ r: 8 }} 
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                      
                      <div className="mt-6">
                        <h3 className="mb-2 text-lg font-medium">Price Analysis Report</h3>
                        <p className="text-muted-foreground text-sm">
                          The price of {crop} has shown an overall 
                          {priceTrends.length > 1 && (
                            Number(priceTrends[priceTrends.length - 1].Price) > Number(priceTrends[0].Price)
                              ? ' increasing'
                              : ' declining'
                          )} trend in {year}. 
                          {crop === 'corn' 
                            ? ' This is primarily due to increased production and reduced export demand.'
                            : ' This is primarily due to strong demand in international markets and slight supply constraints.'}
                        </p>
                        <div className="mt-4 grid grid-cols-3 gap-4">
                          <div className="rounded-lg border p-3">
                            <h4 className="text-sm font-medium">Average Price</h4>
                            <p className="text-2xl font-bold">
                              ${isNaN(avgPriceForSelectedCrop) ? '--' : Math.round(avgPriceForSelectedCrop)}
                            </p>
                            <p className="text-muted-foreground text-xs">per ton</p>
                          </div>
                          <div className="rounded-lg border p-3">
                            <h4 className="text-sm font-medium">Price Volatility</h4>
                            <p className="text-2xl font-bold">
                              {priceVolatility}
                            </p>
                            <p className="text-muted-foreground text-xs">coefficient of variation</p>
                          </div>
                          <div className="rounded-lg border p-3">
                            <h4 className="text-sm font-medium">Price Range</h4>
                            <p className="text-2xl font-bold">
                              ${Math.min(...priceTrends.map(pt => Number(pt.Price)))} - ${Math.max(...priceTrends.map(pt => Number(pt.Price)))}
                            </p>
                            <p className="text-muted-foreground text-xs">min - max</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle>Monthly Price Changes</CardTitle>
                        <CardDescription>
                          Month-to-month percentage change analysis
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[300px] w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart 
                              data={priceTrends} 
                              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="Month" />
                              <YAxis />
                              <Tooltip />
                              <Legend />
                              <Bar 
                                dataKey="ChangePercentage" 
                                name="% Change" 
                                fill="#8884d8"
                                radius={[4, 4, 0, 0]}
                              >
                                {priceTrends.map((entry, index) => (
                                  <Cell 
                                    key={`cell-${index}`} 
                                    fill={Number(entry.ChangePercentage) >= 0 ? '#16a34a' : '#dc2626'} 
                                  />
                                ))}
                              </Bar>
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                        <div className="mt-4">
                          <h3 className="mb-2 text-sm font-medium">Trend Insights</h3>
                          <div className="space-y-2 text-sm">
                            <p>• Largest monthly increase: {priceTrends.length > 0 ? 
                                `${priceTrends.reduce((max, item) => Number(item.ChangePercentage) > Number(max.ChangePercentage) ? item : max).Month} (${priceTrends.reduce((max, item) => Number(item.ChangePercentage) > Number(max.ChangePercentage) ? item : max).ChangePercentage}%)` 
                                : 'N/A'}</p>
                            <p>• Largest monthly decrease: {priceTrends.length > 0 && priceTrends.some(item => Number(item.ChangePercentage) < 0) ? 
                                `${priceTrends.reduce((min, item) => Number(item.ChangePercentage) < Number(min.ChangePercentage) ? item : min).Month} (${priceTrends.reduce((min, item) => Number(item.ChangePercentage) < Number(min.ChangePercentage) ? item : min).ChangePercentage}%)` 
                                : 'N/A'}</p>
                            <p>• Overall trend: {priceTrends.length > 0 ? 
                                (priceTrends.reduce((sum, item) => sum + Number(item.ChangePercentage), 0) / priceTrends.length > 0 ? 
                                  'Upward movement' : 'Downward movement') 
                                : 'N/A'}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="price" className="mt-0">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Price Comparison</CardTitle>
                      <CardDescription>
                        Compare prices across different commodities
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart 
                            data={chartData.filter(item => item.month === 'Jun' || item.month === chartData[chartData.length - 1]?.month)} 
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            {chartData.length > 0 && Object.keys(chartData[0])
                              .filter(key => key !== 'month')
                              .map((productName, idx) => (
                                <Bar 
                                  key={productName}
                                  dataKey={productName} 
                                  name={productName.charAt(0).toUpperCase() + productName.slice(1)}
                                  fill={['#8884d8', '#82ca9d', '#ffc658', '#ff8042'][idx % 4]}
                                  radius={[4, 4, 0, 0]}
                                />
                              ))}
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="mt-4">
                        <h3 className="mb-2 text-sm font-medium">Comparative Analysis</h3>
                        <div className="space-y-2 text-sm">
                          <p>• Highest-priced commodity: {chartData.length > 0 && chartData[chartData.length - 1] ? 
                              Object.entries(chartData[chartData.length - 1])
                                .filter(([key]) => key !== 'month')
                                .reduce((max, [key, value]) => Number(value) > Number(max[1]) ? [key, value] : max, ['', 0])[0]
                              : 'N/A'}</p>
                          <p>• Price ratio (highest to lowest): {chartData.length > 0 && chartData[chartData.length - 1] ? 
                              (() => {
                                const prices = Object.entries(chartData[chartData.length - 1])
                                  .filter(([key]) => key !== 'month' && Number(chartData[chartData.length - 1][key]) > 0)
                                  .map(([_, value]) => Number(value));
                                return prices.length > 0 ? 
                                  (Math.max(...prices) / Math.min(...prices)).toFixed(1) + 'x' 
                                  : 'N/A';
                              })()
                              : 'N/A'}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="demand" className="mt-0">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle>Demand Analysis</CardTitle>
                        <CardDescription>
                          Quarterly demand metrics for {crop}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[300px] w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart 
                              data={demandSupply} 
                              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="Quarter" tickFormatter={(value) => `Q${value}`} />
                              <YAxis />
                              <Tooltip />
                              <Legend />
                              <Bar 
                                dataKey="Demand" 
                                name="Demand" 
                                fill="#8884d8"
                                radius={[4, 4, 0, 0]}
                              />
                              <Bar 
                                dataKey="Supply" 
                                name="Supply" 
                                fill="#82ca9d"
                                radius={[4, 4, 0, 0]}
                              />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                        <div className="mt-4">
                          <h3 className="mb-2 text-sm font-medium">Quarterly Analysis</h3>
                          <div className="space-y-2 text-sm">
                            <p>• Highest demand: Q{demandSupply.reduce((max, item) => Number(item.Demand) > Number(max.Demand) ? item : max, {Quarter: 0, Demand: 0}).Quarter} ({demandSupply.reduce((max, item) => Number(item.Demand) > Number(max.Demand) ? item : max, {Demand: 0}).Demand.toLocaleString()} tons)</p>
                            <p>• Highest supply: Q{demandSupply.reduce((max, item) => Number(item.Supply) > Number(max.Supply) ? item : max, {Quarter: 0, Supply: 0}).Quarter} ({demandSupply.reduce((max, item) => Number(item.Supply) > Number(max.Supply) ? item : max, {Supply: 0}).Supply.toLocaleString()} tons)</p>
                            <p>• Largest supply gap: Q{demandSupply.reduce((max, item) => (Number(item.Demand) - Number(item.Supply)) > (Number(max.Demand) - Number(max.Supply)) ? item : max, {Quarter: 0, Demand: 0, Supply: 0}).Quarter} ({((demandSupply.reduce((max, item) => (Number(item.Demand) - Number(item.Supply)) > (Number(max.Demand) - Number(max.Supply)) ? item : max, {Quarter: 0, Demand: 0, Supply: 0}).Demand - demandSupply.reduce((max, item) => (Number(item.Demand) - Number(item.Supply)) > (Number(max.Demand) - Number(max.Supply)) ? item : max, {Quarter: 0, Demand: 0, Supply: 0}).Supply) / demandSupply.reduce((max, item) => (Number(item.Demand) - Number(item.Supply)) > (Number(max.Demand) - Number(max.Supply)) ? item : max, {Quarter: 0, Demand: 0, Supply: 0}).Demand * 100).toFixed(1)}%)</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle>Supply-Demand Balance</CardTitle>
                        <CardDescription>
                          Analysis of market equilibrium
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[300px] w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart 
                              data={demandProjection} 
                              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="year" />
                              <YAxis />
                              <Tooltip />
                              <Legend />
                              <Line 
                                type="monotone" 
                                dataKey="demand" 
                                name="Demand" 
                                stroke="#8884d8"
                                strokeWidth={2}
                              />
                              <Line 
                                type="monotone" 
                                dataKey="supply" 
                                name="Supply" 
                                stroke="#82ca9d"
                                strokeWidth={2}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                        <div className="mt-4 space-y-4">
                          <div>
                            <h3 className="mb-2 text-sm font-medium">Market Gap Analysis</h3>
                            <p className="text-muted-foreground text-sm">
                              The analysis indicates a 
                              {demandProjection.length > 1 && 
                                ((demandProjection[demandProjection.length - 1].demand - demandProjection[demandProjection.length - 1].supply) < 
                                (demandProjection[0].demand - demandProjection[0].supply) 
                                  ? 'decreasing' 
                                  : 'increasing')} 
                              supply gap over time. By {demandProjection[demandProjection.length - 1]?.year || '2027'}, 
                              supply is projected to reach 
                              {demandProjection.length > 0 ? 
                                ((demandProjection[demandProjection.length - 1].supply / demandProjection[demandProjection.length - 1].demand) * 100).toFixed(1) + '%' 
                                : '97.5%'} 
                              of demand.
                            </p>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="rounded-lg border p-3">
                              <h4 className="text-sm font-medium">Current Gap</h4>
                              <p className="text-xl font-bold">
                                {demandProjection.find(dp => dp.year === year) 
                                  ? ((demandProjection.find(dp => dp.year === year)!.demand - demandProjection.find(dp => dp.year === year)!.supply) / demandProjection.find(dp => dp.year === year)!.demand * 100).toFixed(1) + '%'
                                  : supplyGap + '%'}
                              </p>
                              <p className="text-muted-foreground text-xs">of total demand</p>
                            </div>
                            <div className="rounded-lg border p-3">
                              <h4 className="text-sm font-medium">Gap Trend</h4>
                              <p className="text-xl font-bold">
                                {demandProjection.length > 1 ? 
                                  (((demandProjection[demandProjection.length - 1].demand - demandProjection[demandProjection.length - 1].supply) / demandProjection[demandProjection.length - 1].demand) - 
                                   ((demandProjection[0].demand - demandProjection[0].supply) / demandProjection[0].demand) * 100).toFixed(1) + '%'
                                  : '-1.8%'}
                              </p>
                              <p className="text-muted-foreground text-xs">change over period</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="md:col-span-2">
                      <CardHeader className="pb-2">
                        <CardTitle>Market Data Management</CardTitle>
                        <CardDescription>
                          View and manage market data records
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="overflow-x-auto">
                          <table className="w-full border-collapse">
                            <thead>
                              <tr className="border-b">
                                <th className="py-3 text-left font-medium">Month</th>
                                <th className="py-3 text-left font-medium">Price</th>
                                <th className="py-3 text-left font-medium">Change %</th>
                                <th className="py-3 text-left font-medium">Notes</th>
                              </tr>
                            </thead>
                            <tbody>
                              {priceTrends.map((trend, i) => (
                                <tr key={i} className="border-b hover:bg-muted/50">
                                  <td className="py-3">{trend.Month}</td>
                                  <td className="py-3">${Number(trend.Price).toFixed(2)}</td>
                                  <td className="py-3">
                                    <span className={Number(trend.ChangePercentage) >= 0 ? 'text-green-600' : 'text-red-600'}>
                                      {Number(trend.ChangePercentage) >= 0 ? '+' : ''}{Number(trend.ChangePercentage).toFixed(2)}%
                                    </span>
                                  </td>
                                  <td className="py-3">{trend.Notes || '-'}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="gdp" className="mt-0">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle>Regional Consumption Analysis</CardTitle>
                        <CardDescription>
                          Comparing consumption patterns by region
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[300px] w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={gdpData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="region" />
                              <YAxis />
                              <Tooltip />
                              <Legend />
                              {Object.keys(gdpData[0] || {})
                                .filter(key => key.toLowerCase().includes('consumption'))
                                .map((key, idx) => (
                                  <Bar 
                                    key={key}
                                    dataKey={key} 
                                    name={key.replace('Consumption', '')} 
                                    fill={['#8884d8', '#82ca9d'][idx % 2]}
                                    radius={[4, 4, 0, 0]}
                                  />
                                ))}
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                        <div className="mt-4">
                          <h3 className="mb-2 text-sm font-medium">Regional Demand Factors</h3>
                          <ul className="text-muted-foreground space-y-2 text-sm">
                            <li>• North region: High wheat demand due to industrial bakeries</li>
                            <li>• South region: Rice dominates as the staple food</li>
                            <li>• East region: Balanced consumption with preference for rice</li>
                            <li>• West region: Growing demand for wheat products</li>
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle>GDP vs Consumption</CardTitle>
                        <CardDescription>
                          Economic factors affecting agricultural consumption
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[300px] w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart 
                              data={gdpData} 
                              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                              layout="vertical"
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis type="number" />
                              <YAxis type="category" dataKey="region" />
                              <Tooltip />
                              <Legend />
                              <Bar 
                                dataKey="gdp" 
                                name="GDP (billions)" 
                                fill="#8884d8"
                                radius={[0, 4, 4, 0]}
                              />
                              <Bar 
                                dataKey="population" 
                                name="Population (millions)" 
                                fill="#82ca9d"
                                radius={[0, 4, 4, 0]}
                              />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                        <div className="mt-4">
                          <h3 className="mb-2 text-sm font-medium">Economic Correlation</h3>
                          <p className="text-muted-foreground text-sm">
                            Analysis shows a 0.78 correlation coefficient between regional GDP and agricultural consumption, 
                            indicating a strong positive relationship between economic prosperity and food demand.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="forecast" className="mt-0">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Card className="md:col-span-2">
                      <CardHeader className="pb-2">
                        <CardTitle>Long-term Market Projections</CardTitle>
                        <CardDescription>
                          Five-year forecast for {crop} markets
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[400px] w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart 
                              data={demandProjection}
                              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="year" />
                              <YAxis />
                              <Tooltip />
                              <Legend />
                              <Line type="monotone" dataKey="demand" name="Projected Demand" stroke="#8884d8" strokeWidth={2} />
                              <Line type="monotone" dataKey="supply" name="Projected Supply" stroke="#82ca9d" strokeWidth={2} />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                        
                        <div className="mt-6">
                          <h3 className="mb-2 text-lg font-medium">Forecast Analysis Report</h3>
                          <p className="text-muted-foreground text-sm">
                            For {year}, the {crop} market is projected to experience a 
                            {forecast.find(f => f.Year.toString() === year) ? 
                              ` ${((forecast.find(f => f.Year.toString() === year)!.ProjectedDemand - (demandSupply.reduce((sum, item) => sum + Number(item.Demand), 0) / 4)) / (demandSupply.reduce((sum, item) => sum + Number(item.Demand), 0) / 4) * 100).toFixed(1)}%` 
                              : ` ${year === '2024' ? '4.5%' : year === '2025' ? '8.0%' : year === '2026' ? '6.9%' : '7.0%'}`}
                            growth in demand, driven by population growth and increasing consumption patterns.
                            The supply chain is expected to adapt with a 
                            {forecast.find(f => f.Year.toString() === year) ? 
                              ` ${((forecast.find(f => f.Year.toString() === year)!.ProjectedSupply - (demandSupply.reduce((sum, item) => sum + Number(item.Supply), 0) / 4)) / (demandSupply.reduce((sum, item) => sum + Number(item.Supply), 0) / 4) * 100).toFixed(1)}%` 
                              : ` ${year === '2024' ? '10.7%' : year === '2025' ? '8.4%' : year === '2026' ? '8.3%' : '7.1%'}`}
                            growth in production capacity.
                          </p>
                          
                          <div className="mt-4 grid grid-cols-3 gap-4">
                            <div className="rounded-lg border p-3">
                              <h4 className="text-sm font-medium">{crop.charAt(0).toUpperCase() + crop.slice(1)} Price Forecast</h4>
                              <p className="text-xl font-bold">
                                ${forecast.find(f => f.Year.toString() === year)?.ProjectedPrice || 
                                  (year === '2024' ? '480' : year === '2025' ? '510' : year === '2026' ? '535' : '560')}
                              </p>
                              <p className="text-muted-foreground text-xs">per ton</p>
                            </div>
                            <div className="rounded-lg border p-3">
                              <h4 className="text-sm font-medium">Supply Gap</h4>
                              <p className="text-xl font-bold">
                                {forecast.find(f => f.Year.toString() === year) ?
                                  ((forecast.find(f => f.Year.toString() === year)!.ProjectedDemand - forecast.find(f => f.Year.toString() === year)!.ProjectedSupply) / forecast.find(f => f.Year.toString() === year)!.ProjectedDemand * 100).toFixed(1) + '%'
                                  : (year === '2024' ? '4.3%' : year === '2025' ? '4.0%' : year === '2026' ? '2.7%' : '2.5%')}
                              </p>
                              <p className="text-muted-foreground text-xs">demand vs supply</p>
                            </div>
                            <div className="rounded-lg border p-3">
                              <h4 className="text-sm font-medium">Forecast Confidence</h4>
                              <p className="text-xl font-bold">
                                {forecast.find(f => f.Year.toString() === year)?.Confidence || 
                                  (year === '2024' ? '85%' : year === '2025' ? '75%' : year === '2026' ? '65%' : '55%')}
                              </p>
                              <p className="text-muted-foreground text-xs">statistical reliability</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </SidebarInset>
      
      {/* Add Market Data Modal */}
      <Dialog open={isAddDataModalOpen} onOpenChange={setIsAddDataModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Market Analysis Data</DialogTitle>
            <DialogDescription>
              Enter new market data to be added to the database
            </DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="price">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="price">Price</TabsTrigger>
              <TabsTrigger value="demand">Demand/Supply</TabsTrigger>
              <TabsTrigger value="regional">Regional</TabsTrigger>
              <TabsTrigger value="forecast">Forecast</TabsTrigger>
            </TabsList>
            
            <TabsContent value="price">
              <Form method="post" onSubmit={() => {
                if (!isSubmitting) return true;
                return false;
              }}>
                <input type="hidden" name="dataType" value="price" />
                
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="product" className="text-right">Product</Label>
                    <div className="col-span-3">
                      <Select name="productId">
                        <SelectTrigger>
                          <SelectValue placeholder="Select product" />
                        </SelectTrigger>
                        <SelectContent>
                          {products.map((prod: {ProductName: string}) => (
                            <SelectItem key={prod.ProductName} value={prod.ProductName}>
                              {prod.ProductName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="month" className="text-right">Month</Label>
                    <div className="col-span-3">
                      <Select name="month">
                        <SelectTrigger>
                          <SelectValue placeholder="Select month" />
                        </SelectTrigger>
                        <SelectContent>
                          {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(month => (
                            <SelectItem key={month} value={month}>{month}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="year" className="text-right">Year</Label>
                    <Input name="year" type="number" defaultValue={new Date().getFullYear()} className="col-span-3" />
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="price" className="text-right">Price</Label>
                    <Input name="price" type="number" step="0.01" className="col-span-3" />
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="changePercentage" className="text-right">Change %</Label>
                    <Input name="changePercentage" type="number" step="0.01" className="col-span-3" />
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="notes" className="text-right">Notes</Label>
                    <Textarea name="notes" className="col-span-3" />
                  </div>
                </div>
                
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Adding...' : 'Add Price Data'}
                  </Button>
                </DialogFooter>
              </Form>
            </TabsContent>
            
            <TabsContent value="demand">
              <Form method="post" onSubmit={() => {
                if (!isSubmitting) return true;
                return false;
              }}>
                <input type="hidden" name="dataType" value="demand" />
                
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="product" className="text-right">Product</Label>
                    <div className="col-span-3">
                      <Select name="productId">
                        <SelectTrigger>
                          <SelectValue placeholder="Select product" />
                        </SelectTrigger>
                        <SelectContent>
                          {products.map((prod: {ProductName: string}) => (
                            <SelectItem key={prod.ProductName} value={prod.ProductName}>
                              {prod.ProductName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="year" className="text-right">Year</Label>
                    <Input name="year" type="number" defaultValue={new Date().getFullYear()} className="col-span-3" />
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="quarter" className="text-right">Quarter</Label>
                    <div className="col-span-3">
                      <Select name="quarter">
                        <SelectTrigger>
                          <SelectValue placeholder="Select quarter" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4].map(q => (
                            <SelectItem key={q} value={q.toString()}>Q{q}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="demand" className="text-right">Demand</Label>
                    <Input name="demand" type="number" className="col-span-3" />
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="supply" className="text-right">Supply</Label>
                    <Input name="supply" type="number" className="col-span-3" />
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="region" className="text-right">Region</Label>
                    <Input name="region" defaultValue="Global" className="col-span-3" />
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="notes" className="text-right">Notes</Label>
                    <Textarea name="notes" className="col-span-3" />
                  </div>
                </div>
                
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Adding...' : 'Add Demand/Supply Data'}
                  </Button>
                </DialogFooter>
              </Form>
            </TabsContent>
            
            <TabsContent value="regional">
              <Form method="post" onSubmit={() => {
                if (!isSubmitting) return true;
                return false;
              }}>
                <input type="hidden" name="dataType" value="regional" />
                
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="region" className="text-right">Region</Label>
                    <div className="col-span-3">
                      <Select name="region">
                        <SelectTrigger>
                          <SelectValue placeholder="Select region" />
                        </SelectTrigger>
                        <SelectContent>
                          {['North', 'South', 'East', 'West'].map(region => (
                            <SelectItem key={region} value={region}>{region}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="year" className="text-right">Year</Label>
                    <Input name="year" type="number" defaultValue={new Date().getFullYear()} className="col-span-3" />
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="gdp" className="text-right">GDP</Label>
                    <Input name="gdp" type="number" className="col-span-3" />
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="population" className="text-right">Population</Label>
                    <Input name="population" type="number" className="col-span-3" />
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="product" className="text-right">Product</Label>
                    <div className="col-span-3">
                      <Select name="productId">
                        <SelectTrigger>
                          <SelectValue placeholder="Select product" />
                        </SelectTrigger>
                        <SelectContent>
                          {products.map((prod: {ProductName: string}) => (
                            <SelectItem key={prod.ProductName} value={prod.ProductName}>
                              {prod.ProductName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="consumption" className="text-right">Consumption</Label>
                    <Input name="consumption" type="number" className="col-span-3" />
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="notes" className="text-right">Notes</Label>
                    <Textarea name="notes" className="col-span-3" />
                  </div>
                </div>
                
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Adding...' : 'Add Regional Data'}
                  </Button>
                </DialogFooter>
              </Form>
            </TabsContent>
            
            <TabsContent value="forecast">
              <Form method="post" onSubmit={() => {
                if (!isSubmitting) return true;
                return false;
              }}>
                <input type="hidden" name="dataType" value="forecast" />
                
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="product" className="text-right">Product</Label>
                    <div className="col-span-3">
                      <Select name="productId">
                        <SelectTrigger>
                          <SelectValue placeholder="Select product" />
                        </SelectTrigger>
                        <SelectContent>
                          {products.map((prod: {ProductName: string}) => (
                            <SelectItem key={prod.ProductName} value={prod.ProductName}>
                              {prod.ProductName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="year" className="text-right">Year</Label>
                    <Input name="year" type="number" defaultValue={new Date().getFullYear() + 1} className="col-span-3" />
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="projectedDemand" className="text-right">Projected Demand</Label>
                    <Input name="projectedDemand" type="number" className="col-span-3" />
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="projectedSupply" className="text-right">Projected Supply</Label>
                    <Input name="projectedSupply" type="number" className="col-span-3" />
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="projectedPrice" className="text-right">Projected Price</Label>
                    <Input name="projectedPrice" type="number" step="0.01" className="col-span-3" />
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="confidence" className="text-right">Confidence %</Label>
                    <Input name="confidence" type="number" step="0.01" min="0" max="100" className="col-span-3" />
                  </div>
                  
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="factorsConsidered" className="text-right">Factors</Label>
                    <Textarea name="factorsConsidered" className="col-span-3" />
                  </div>
                </div>
                
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Adding...' : 'Add Forecast Data'}
                  </Button>
                </DialogFooter>
              </Form>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  );
} 