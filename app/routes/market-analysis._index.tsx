<TabsContent value="overview" className="mt-0"></TabsContent>

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
} from '~/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { Badge } from '~/components/ui/badge';
import { Button } from '~/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { IconChartBar, IconChartRadar, IconGrain, IconChartLine, IconBuildingBank } from '@tabler/icons-react';
import { useState } from 'react';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, RadarChart, 
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

// Sample data for charts
const priceData = [
  { month: 'Jan', rice: 420, wheat: 350, corn: 280, soybeans: 390 },
  { month: 'Feb', rice: 430, wheat: 340, corn: 290, soybeans: 400 },
  { month: 'Mar', rice: 450, wheat: 360, corn: 270, soybeans: 410 },
  { month: 'Apr', rice: 470, wheat: 380, corn: 260, soybeans: 420 },
  { month: 'May', rice: 490, wheat: 390, corn: 265, soybeans: 430 },
  { month: 'Jun', rice: 500, wheat: 400, corn: 270, soybeans: 450 },
];

const radarData = [
  { category: 'Yield', rice: 85, wheat: 70, corn: 65, soybeans: 60 },
  { category: 'Profit Margin', rice: 65, wheat: 60, corn: 55, soybeans: 70 },
  { category: 'Water Usage', rice: 90, wheat: 60, corn: 50, soybeans: 40 },
  { category: 'Market Demand', rice: 80, wheat: 75, corn: 60, soybeans: 70 },
  { category: 'Export Value', rice: 75, wheat: 80, corn: 50, soybeans: 65 },
];

const gdpData = [
  { region: 'North', gdp: 120, population: 25, riceConsumption: 1200, wheatConsumption: 800 },
  { region: 'South', gdp: 150, population: 30, riceConsumption: 1500, wheatConsumption: 700 },
  { region: 'East', gdp: 90, population: 20, riceConsumption: 900, wheatConsumption: 600 },
  { region: 'West', gdp: 110, population: 22, riceConsumption: 1000, wheatConsumption: 750 },
];

const demandProjection = [
  { year: '2023', demand: 15000, supply: 14000 },
  { year: '2024', demand: 16200, supply: 15500 },
  { year: '2025', demand: 17500, supply: 16800 },
  { year: '2026', demand: 18700, supply: 18200 },
  { year: '2027', demand: 20000, supply: 19500 },
];

export default function MarketAnalysisPage() {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedCrop, setSelectedCrop] = useState('rice');

  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 72)',
          '--header-height': 'calc(var(--spacing) * 12)',
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="px-4 lg:px-6">
                <h1 className="mb-2 text-2xl font-bold">Market Analysis</h1>
                <p className="text-muted-foreground mb-6">
                  Track price trends, market demands, and make data-driven
                  decisions for agricultural products
                </p>
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
                          <IconChartBar className="text-primary h-5 w-5" />
                          Current Market Trends
                        </CardTitle>
                        <CardDescription>April 2024</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-2 text-sm">
                          Overview of the agricultural market trends affecting
                          farmers this month.
                        </p>
                        <div className="mt-4 grid grid-cols-2 gap-4">
                          <div>
                            <h3 className="text-sm font-medium">
                              Rising Commodities
                            </h3>
                            <div className="mt-2 space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Rice</span>
                                <Badge className="">
                                  +5.2%
                                </Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Wheat</span>
                                <Badge className="">
                                  +3.8%
                                </Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Soybeans</span>
                                <Badge className="">
                                  +2.1%
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium">
                              Declining Commodities
                            </h3>
                            <div className="mt-2 space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Corn</span>
                                <Badge className="bg-red-100 !text-red-700">
                                  -1.5%
                                </Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Potatoes</span>
                                <Badge className="bg-red-100 !text-red-700">
                                  -2.3%
                                </Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm">Onions</span>
                                <Badge className="bg-red-100 !text-red-700">
                                  -3.1%
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <IconChartRadar className="text-primary h-5 w-5" />
                          Product Comparison
                        </CardTitle>
                        <CardDescription>
                          Key metrics comparison for major crops
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[300px] w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <RadarChart outerRadius={90} data={radarData}>
                              <PolarGrid />
                              <PolarAngleAxis dataKey="category" />
                              <PolarRadiusAxis angle={30} domain={[0, 100]} />
                              <Radar name="Rice" dataKey="rice" stroke="#8884d8" fill="#8884d8" fillOpacity={0.2} />
                              <Radar name="Wheat" dataKey="wheat" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.2} />
                              <Radar name="Corn" dataKey="corn" stroke="#ffc658" fill="#ffc658" fillOpacity={0.2} />
                              <Radar name="Soybeans" dataKey="soybeans" stroke="#ff8042" fill="#ff8042" fillOpacity={0.2} />
                              <Legend />
                            </RadarChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="md:col-span-2">
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <IconChartLine className="text-primary h-5 w-5" />
                          2024 Price Trends
                        </CardTitle>
                        <CardDescription>
                          Monthly price movements of major agricultural products
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[300px] w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={priceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="month" />
                              <YAxis />
                              <Tooltip />
                              <Legend />
                              <Line type="monotone" dataKey="rice" stroke="#8884d8" />
                              <Line type="monotone" dataKey="wheat" stroke="#82ca9d" />
                              <Line type="monotone" dataKey="corn" stroke="#ffc658" />
                              <Line type="monotone" dataKey="soybeans" stroke="#ff8042" />
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
                        <Select defaultValue={selectedCrop} onValueChange={setSelectedCrop}>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select crop" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="rice">Rice</SelectItem>
                            <SelectItem value="wheat">Wheat</SelectItem>
                            <SelectItem value="corn">Corn</SelectItem>
                            <SelectItem value="soybeans">Soybeans</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="h-[400px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={priceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line 
                              type="monotone" 
                              dataKey={selectedCrop} 
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
                          The price of {selectedCrop} has shown an overall {selectedCrop === 'corn' ? 'declining' : 'increasing'} trend in the first half of 2024. 
                          This is primarily due to {selectedCrop === 'corn' ? 'increased production and reduced export demand' : 'strong demand in international markets and slight supply constraints'}.
                        </p>
                        <div className="mt-4 grid grid-cols-3 gap-4">
                          <div className="rounded-lg border p-3">
                            <h4 className="text-sm font-medium">Average Price</h4>
                            <p className="text-2xl font-bold">
                              ${Math.round(priceData.reduce((acc, item) => acc + Number(item[selectedCrop as keyof typeof item]), 0) / priceData.length)}
                            </p>
                            <p className="text-muted-foreground text-xs">per ton</p>
                          </div>
                          <div className="rounded-lg border p-3">
                            <h4 className="text-sm font-medium">Price Volatility</h4>
                            <p className="text-2xl font-bold">
                              {selectedCrop === 'rice' ? '4.2%' : selectedCrop === 'wheat' ? '3.8%' : selectedCrop === 'corn' ? '2.5%' : '3.7%'}
                            </p>
                            <p className="text-muted-foreground text-xs">coefficient of variation</p>
                          </div>
                          <div className="rounded-lg border p-3">
                            <h4 className="text-sm font-medium">Price Forecast</h4>
                            <p className="text-2xl font-bold">
                              {selectedCrop === 'corn' ? '-0.8%' : '+2.3%'}
                            </p>
                            <p className="text-muted-foreground text-xs">next quarter projection</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="demand" className="mt-0">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2">
                          <IconGrain className="text-primary h-5 w-5" />
                          Crop Demand Analysis
                        </CardTitle>
                        <CardDescription>
                          Current and projected demand for agricultural products
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
                              <Bar dataKey="riceConsumption" name="Rice Consumption (tons)" fill="#8884d8" />
                              <Bar dataKey="wheatConsumption" name="Wheat Consumption (tons)" fill="#82ca9d" />
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
                        <CardTitle>Supply-Demand Balance</CardTitle>
                        <CardDescription>
                          Comparing agricultural supply with market demand
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[300px] w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={demandProjection} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="year" />
                              <YAxis />
                              <Tooltip />
                              <Legend />
                              <Line type="monotone" dataKey="demand" name="Projected Demand (tons)" stroke="#8884d8" strokeWidth={2} />
                              <Line type="monotone" dataKey="supply" name="Estimated Supply (tons)" stroke="#82ca9d" strokeWidth={2} />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                        <div className="mt-4">
                          <h3 className="mb-2 text-sm font-medium">Market Gap Analysis</h3>
                          <p className="text-muted-foreground text-sm">
                            The analysis indicates a consistent supply gap that grows smaller each year as 
                            agricultural production increases to meet demand. By 2027, supply is projected 
                            to reach 97.5% of demand, indicating improving market efficiency.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="gdp" className="mt-0">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <Card className="md:col-span-2">
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2">
                          <IconBuildingBank className="text-primary h-5 w-5" />
                          GDP-Based Demand Calculation
                        </CardTitle>
                        <CardDescription>
                          Estimating agricultural demand based on economic indicators
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[300px] w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart 
                              data={gdpData} 
                              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                              barCategoryGap={20}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="region" />
                              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                              <Tooltip />
                              <Legend />
                              <Bar yAxisId="left" dataKey="gdp" name="GDP (billions $)" fill="#8884d8" />
                              <Bar yAxisId="right" dataKey="population" name="Population (millions)" fill="#82ca9d" />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                        <div className="mt-6">
                          <h3 className="mb-2 text-lg font-medium">Nutritional Demand Calculation Model</h3>
                          <p className="text-muted-foreground text-sm">
                            Our model estimates carbohydrate requirements based on population size and economic activity levels.
                            Each region's demand is calculated using the following factors:
                          </p>
                          <ul className="text-muted-foreground mt-2 space-y-1 text-sm">
                            <li>• Population size and demographics</li>
                            <li>• Per capita carbohydrate requirement (2.1kg/week average)</li>
                            <li>• GDP as an indicator of consumption patterns</li>
                            <li>• Regional dietary preferences and traditions</li>
                          </ul>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle>Nutritional Requirements</CardTitle>
                        <CardDescription>
                          Calculated crop demand based on population nutrition needs
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[200px] w-full">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={[
                                  { name: 'Rice', value: 45 },
                                  { name: 'Wheat', value: 30 },
                                  { name: 'Corn', value: 15 },
                                  { name: 'Other', value: 10 },
                                ]}
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                              >
                              </Pie>
                              <Tooltip />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                        <div className="mt-4">
                          <h3 className="mb-2 text-sm font-medium">Carbohydrate Sources</h3>
                          <p className="text-muted-foreground text-sm">
                            The distribution shows the proportion of different crops needed 
                            to meet the population's carbohydrate requirements.
                          </p>
                          <div className="mt-4 space-y-2">
                            <div className="grid grid-cols-2 gap-2">
                              <div className="rounded-md border p-2">
                                <span className="text-sm font-medium">Total Calories Needed:</span>
                                <p className="text-lg font-bold">2.4T kcal/day</p>
                              </div>
                              <div className="rounded-md border p-2">
                                <span className="text-sm font-medium">Carbs Required:</span>
                                <p className="text-lg font-bold">360K tons/year</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <Button variant="outline" className="w-full">View Detailed Calculation</Button>
                      </CardFooter>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="forecast" className="mt-0">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Market Forecasts</CardTitle>
                      <CardDescription>
                        Predictions for future market conditions
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4 flex items-center justify-between">
                        <p className="text-muted-foreground text-sm">
                          Agricultural market forecast based on economic trends, climate predictions, and historical patterns.
                        </p>
                        <Select defaultValue={selectedYear} onValueChange={setSelectedYear}>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select year" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="2024">2024</SelectItem>
                            <SelectItem value="2025">2025</SelectItem>
                            <SelectItem value="2026">2026</SelectItem>
                            <SelectItem value="2027">2027</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
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
                          For {selectedYear}, the agricultural market is projected to experience a 
                          {selectedYear === '2024' ? ' 4.5%' : selectedYear === '2025' ? ' 8.0%' : selectedYear === '2026' ? ' 6.9%' : ' 7.0%'} 
                          growth in demand, driven by population growth and increasing consumption patterns.
                          The supply chain is expected to adapt with a 
                          {selectedYear === '2024' ? ' 10.7%' : selectedYear === '2025' ? ' 8.4%' : selectedYear === '2026' ? ' 8.3%' : ' 7.1%'} 
                          growth in production capacity.
                        </p>
                        <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
                          <div className="rounded-lg border p-3">
                            <h4 className="text-sm font-medium">Rice Price Forecast</h4>
                            <p className="text-xl font-bold">
                              {selectedYear === '2024' ? '$480' : selectedYear === '2025' ? '$510' : selectedYear === '2026' ? '$535' : '$560'}
                            </p>
                            <p className="text-muted-foreground text-xs">per ton</p>
                          </div>
                          <div className="rounded-lg border p-3">
                            <h4 className="text-sm font-medium">Wheat Price Forecast</h4>
                            <p className="text-xl font-bold">
                              {selectedYear === '2024' ? '$380' : selectedYear === '2025' ? '$395' : selectedYear === '2026' ? '$420' : '$435'}
                            </p>
                            <p className="text-muted-foreground text-xs">per ton</p>
                          </div>
                          <div className="rounded-lg border p-3">
                            <h4 className="text-sm font-medium">Supply Gap</h4>
                            <p className="text-xl font-bold">
                              {selectedYear === '2024' ? '4.3%' : selectedYear === '2025' ? '4.0%' : selectedYear === '2026' ? '2.7%' : '2.5%'}
                            </p>
                            <p className="text-muted-foreground text-xs">demand vs supply</p>
                          </div>
                          <div className="rounded-lg border p-3">
                            <h4 className="text-sm font-medium">Market Growth</h4>
                            <p className="text-xl font-bold">
                              {selectedYear === '2024' ? '+7.8%' : selectedYear === '2025' ? '+8.0%' : selectedYear === '2026' ? '+6.9%' : '+7.0%'}
                            </p>
                            <p className="text-muted-foreground text-xs">year-over-year</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
              
              {/* CRUD operations table added at the end */}
              <div className="px-4 lg:px-6 mb-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Market Data Management</CardTitle>
                    <CardDescription>
                      Create, view, update, and delete market data records
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b">
                            <th className="py-3 text-left font-medium">Product</th>
                            <th className="py-3 text-left font-medium">Region</th>
                            <th className="py-3 text-left font-medium">Current Price</th>
                            <th className="py-3 text-left font-medium">Demand</th>
                            <th className="py-3 text-left font-medium">Supply</th>
                            <th className="py-3 text-left font-medium">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {['Rice', 'Wheat', 'Corn', 'Soybeans'].map((product, i) => (
                            <tr key={i} className="border-b hover:bg-muted/50">
                              <td className="py-3">{product}</td>
                              <td className="py-3">National</td>
                              <td className="py-3">${400 + (i * 30)}</td>
                              <td className="py-3">{12000 - (i * 1000)}</td>
                              <td className="py-3">{11500 - (i * 900)}</td>
                              <td className="py-3 space-x-2">
                                <Button size="sm" variant="outline">View</Button>
                                <Button size="sm" variant="outline">Edit</Button>
                                <Button size="sm" variant="outline" className="text-red-500 hover:text-red-700">Delete</Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="mt-4 flex justify-between">
                      <Button className="bg-green-600 hover:bg-green-700 text-white">
                        Add New Record
                      </Button>
                      <div className="space-x-2">
                        <Button variant="outline">Export Data</Button>
                        <Button variant="outline">Import Data</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
