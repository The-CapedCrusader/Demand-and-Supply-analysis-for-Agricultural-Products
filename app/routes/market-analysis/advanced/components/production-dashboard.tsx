import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { Badge } from '~/components/ui/badge';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  Cell
} from 'recharts';
import { IconTractor, IconSeedingOff, IconSeeding, IconTrendingUp, IconTrendingDown } from '@tabler/icons-react';

interface ProductionDashboardProps {
  production: any[];
  productionTrends: any[];
  regionalProduction: any[];
  selectedYear: string;
  selectedProduct: string;
  selectedRegion: string;
  onAddData: () => void;
}

export function ProductionDashboard({ 
  production, 
  productionTrends, 
  regionalProduction,
  selectedYear,
  selectedProduct,
  selectedRegion,
  onAddData
}: ProductionDashboardProps) {
  // Transform data for charts
  
  // Production trend over years
  const productionTrendData = productionTrends.reduce((acc: any[], curr: any) => {
    // Only include data for the selected product if one is selected
    if (selectedProduct !== 'all' && curr.ProductID !== parseInt(selectedProduct)) {
      return acc;
    }
    
    // Check if we already have an entry for this year
    const existingYear = acc.find(item => item.year === curr.Year.toString());
    
    if (existingYear) {
      // Add the product to the existing year entry
      existingYear[curr.ProductName.toLowerCase().replace(/\s+/g, '')] = curr.TotalProduction;
    } else {
      // Create a new year entry
      const newYearEntry: any = { year: curr.Year.toString() };
      newYearEntry[curr.ProductName.toLowerCase().replace(/\s+/g, '')] = curr.TotalProduction;
      acc.push(newYearEntry);
    }
    
    return acc;
  }, []);
  
  // Sort by year
  productionTrendData.sort((a, b) => parseInt(a.year) - parseInt(b.year));
  
  // Regional production comparison
  const regionalComparisonData = regionalProduction.map(item => ({
    region: item.Region,
    production: item.TotalProduction,
    product: item.ProductName
  }));
  
  // Production efficiency (yield vs cost)
  const efficiencyData = production.map(item => ({
    region: item.Region,
    yield: item.AverageYield,
    cost: item.ProductionCost,
    product: item.ProductName
  }));
  
  // Calculate production summary
  const totalProduction = production.reduce((sum, item) => sum + parseFloat(item.TotalProduction), 0);
  const avgYield = production.reduce((sum, item) => sum + parseFloat(item.AverageYield), 0) / (production.length || 1);
  const avgCost = production.reduce((sum, item) => sum + parseFloat(item.ProductionCost), 0) / (production.length || 1);
  
  // Calculate year-over-year changes if possible
  const previousYearProduction = productionTrends.filter((item: any) => item.Year.toString() === (parseInt(selectedYear) - 1).toString());
  const currentYearProduction = productionTrends.filter((item: any) => item.Year.toString() === selectedYear);
  
  let yoyChange = 0;
  let yoyDirection = 'neutral';
  
  if (previousYearProduction.length > 0 && currentYearProduction.length > 0) {
    const prevTotalProduction = previousYearProduction.reduce((sum: number, item: any) => sum + parseFloat(item.TotalProduction), 0);
    const currTotalProduction = currentYearProduction.reduce((sum: number, item: any) => sum + parseFloat(item.TotalProduction), 0);
    
    if (prevTotalProduction > 0) {
      yoyChange = ((currTotalProduction - prevTotalProduction) / prevTotalProduction) * 100;
      yoyDirection = yoyChange >= 0 ? 'up' : 'down';
    }
  }
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Total Production</CardTitle>
            <CardDescription>Current year output</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-bold">{totalProduction.toLocaleString()} tons</p>
                <p className="text-muted-foreground text-sm">
                  {yoyDirection === 'up' ? (
                    <span className="flex items-center text-green-600">
                      <IconTrendingUp className="mr-1 h-4 w-4" /> +{Math.abs(yoyChange).toFixed(1)}%
                    </span>
                  ) : yoyDirection === 'down' ? (
                    <span className="flex items-center text-red-600">
                      <IconTrendingDown className="mr-1 h-4 w-4" /> -{Math.abs(yoyChange).toFixed(1)}%
                    </span>
                  ) : (
                    <span>Year-over-year change</span>
                  )}
                </p>
              </div>
              <div className="rounded-full bg-primary/10 p-3">
                <IconTractor className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Average Yield</CardTitle>
            <CardDescription>Per hectare</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-bold">{avgYield.toFixed(2)}</p>
                <p className="text-muted-foreground text-sm">tons per hectare</p>
              </div>
              <div className="rounded-full bg-green-100 p-3">
                <IconSeeding className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Production Cost</CardTitle>
            <CardDescription>Average per unit</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-bold">${avgCost.toFixed(2)}</p>
                <p className="text-muted-foreground text-sm">per ton</p>
              </div>
              <div className="rounded-full bg-amber-100 p-3">
                <IconSeedingOff className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Efficiency Index</CardTitle>
            <CardDescription>Yield to cost ratio</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-bold">{(avgYield / avgCost * 100).toFixed(2)}</p>
                <p className="text-muted-foreground text-sm">higher is better</p>
              </div>
              <div className="rounded-full bg-blue-100 p-3">
                <IconTrendingUp className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Production Trends</CardTitle>
            <CardDescription>Historical production volume by product</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={productionTrendData} margin={{ top: 5, right: 30, left: 20, bottom: 25 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {productionTrendData.length > 0 && Object.keys(productionTrendData[0])
                    .filter(key => key !== 'year')
                    .map((key, index) => (
                      <Line
                        key={key}
                        type="monotone"
                        dataKey={key}
                        name={key.charAt(0).toUpperCase() + key.slice(1)}
                        stroke={['#8884d8', '#82ca9d', '#ffc658', '#ff8042'][index % 4]}
                        activeDot={{ r: 8 }}
                      />
                    ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              <p>Production trend analysis shows patterns of growth and stability over the selected time period.</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Regional Production</CardTitle>
            <CardDescription>Comparison by region for {selectedYear}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={regionalComparisonData} margin={{ top: 5, right: 30, left: 20, bottom: 25 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="region" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar 
                    dataKey="production" 
                    name="Production Volume" 
                    fill="#8884d8"
                    radius={[4, 4, 0, 0]} 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-sm text-muted-foreground">
              <p>Regional production highlights the geographical distribution of agricultural output.</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Production Efficiency Analysis</CardTitle>
          <CardDescription>Comparing yield vs. cost across regions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={efficiencyData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="region" />
                <Tooltip />
                <Legend />
                <Bar dataKey="yield" name="Yield (tons/ha)" fill="#82ca9d" />
                <Bar dataKey="cost" name="Production Cost ($/ton)" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <div>
            <CardTitle>Historical Production Data</CardTitle>
            <CardDescription>Detailed records by year and region</CardDescription>
          </div>
          <Button onClick={onAddData}>
            Add Production Data
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-3 text-left font-medium">Product</th>
                  <th className="px-4 py-3 text-left font-medium">Year</th>
                  <th className="px-4 py-3 text-left font-medium">Region</th>
                  <th className="px-4 py-3 text-left font-medium">Acreage (ha)</th>
                  <th className="px-4 py-3 text-left font-medium">Yield (t/ha)</th>
                  <th className="px-4 py-3 text-left font-medium">Cost ($/t)</th>
                  <th className="px-4 py-3 text-left font-medium">Total Production (t)</th>
                </tr>
              </thead>
              <tbody>
                {production.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-muted/50">
                    <td className="px-4 py-3">{item.ProductName}</td>
                    <td className="px-4 py-3">{item.Year}</td>
                    <td className="px-4 py-3">{item.Region}</td>
                    <td className="px-4 py-3">{parseFloat(item.TotalAcreage).toLocaleString()}</td>
                    <td className="px-4 py-3">{parseFloat(item.AverageYield).toFixed(2)}</td>
                    <td className="px-4 py-3">${parseFloat(item.ProductionCost).toFixed(2)}</td>
                    <td className="px-4 py-3">{parseFloat(item.TotalProduction).toLocaleString()}</td>
                  </tr>
                ))}
                {production.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-6 text-center text-muted-foreground">
                      No production data available for the selected filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 