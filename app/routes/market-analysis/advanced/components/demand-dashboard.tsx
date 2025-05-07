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
import { IconUsersGroup, IconTrendingUp, IconTrendingDown } from '@tabler/icons-react';

interface DemandDashboardProps {
  demand: any[];
  supplyDemandBalance: any[];
  selectedYear: string;
  selectedProduct: string;
  selectedRegion: string;
  onAddData: () => void;
}

export function DemandDashboard({ 
  demand, 
  supplyDemandBalance,
  selectedYear,
  selectedProduct,
  selectedRegion,
  onAddData
}: DemandDashboardProps) {
  // Transform data for quarterly demand chart
  const quarterlyDemandData = demand.reduce((acc: any[], curr: any) => {
    const quarter = `Q${curr.Quarter}`;
    const demographic = curr.DemographicGroup;
    
    // Find if we already have an entry for this quarter
    const existingQuarter = acc.find(item => item.quarter === quarter);
    
    if (existingQuarter) {
      // Add or update the demographic consumption
      existingQuarter[demographic.toLowerCase()] = curr.ConsumptionPerCapita;
    } else {
      // Create a new quarter entry
      const newQuarterEntry: any = { quarter };
      newQuarterEntry[demographic.toLowerCase()] = curr.ConsumptionPerCapita;
      acc.push(newQuarterEntry);
    }
    
    return acc;
  }, []);
  
  // Sort by quarter
  quarterlyDemandData.sort((a, b) => {
    return parseInt(a.quarter.substring(1)) - parseInt(b.quarter.substring(1));
  });
  
  // Transform data for elasticity comparison
  const elasticityData = demand.map(item => ({
    product: item.ProductName,
    demographic: item.DemographicGroup,
    priceElasticity: Math.abs(parseFloat(item.PriceElasticity)),
    incomeElasticity: parseFloat(item.IncomeElasticity),
    substitutionIndex: parseFloat(item.SubstitutionIndex)
  }));
  
  // Calculate average consumption
  const avgConsumption = demand.reduce((sum, item) => sum + parseFloat(item.ConsumptionPerCapita), 0) / (demand.length || 1);
  
  // Calculate average elasticities
  const avgPriceElasticity = demand.reduce((sum, item) => sum + Math.abs(parseFloat(item.PriceElasticity)), 0) / (demand.length || 1);
  const avgIncomeElasticity = demand.reduce((sum, item) => sum + parseFloat(item.IncomeElasticity), 0) / (demand.length || 1);
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Average Consumption</CardTitle>
            <CardDescription>Per capita consumption</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-bold">{avgConsumption.toFixed(2)}</p>
                <p className="text-muted-foreground text-sm">units per person</p>
              </div>
              <div className="rounded-full bg-primary/10 p-3">
                <IconUsersGroup className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Price Elasticity</CardTitle>
            <CardDescription>Sensitivity to price changes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-bold">{avgPriceElasticity.toFixed(2)}</p>
                <p className="text-muted-foreground text-sm">lower means less sensitive</p>
              </div>
              <div className="rounded-full bg-amber-100 p-3">
                <IconTrendingDown className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Income Elasticity</CardTitle>
            <CardDescription>Response to income changes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-bold">{avgIncomeElasticity.toFixed(2)}</p>
                <p className="text-muted-foreground text-sm">
                  {avgIncomeElasticity > 0 ? 'Normal good' : 'Inferior good'}
                </p>
              </div>
              <div className="rounded-full bg-green-100 p-3">
                <IconTrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Market Demand Status</CardTitle>
            <CardDescription>Current market conditions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-bold">
                  <Badge className={
                    avgConsumption > 30 ? 'bg-green-100 text-green-800' :
                    avgConsumption > 20 ? 'bg-amber-100 text-amber-800' :
                    'bg-red-100 text-red-800'
                  }>
                    {avgConsumption > 30 ? 'Strong' :
                     avgConsumption > 20 ? 'Moderate' :
                     'Weak'}
                  </Badge>
                </p>
                <p className="text-muted-foreground text-sm mt-2">based on consumption levels</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quarterly Consumption Patterns</CardTitle>
            <CardDescription>Consumption per capita by demographic group</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={quarterlyDemandData} margin={{ top: 5, right: 30, left: 20, bottom: 25 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="quarter" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {quarterlyDemandData.length > 0 && Object.keys(quarterlyDemandData[0])
                    .filter(key => key !== 'quarter')
                    .map((key, index) => (
                      <Bar
                        key={key}
                        dataKey={key}
                        name={key.charAt(0).toUpperCase() + key.slice(1)}
                        fill={['#8884d8', '#82ca9d'][index % 2]}
                        radius={[4, 4, 0, 0]}
                      />
                    ))}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Supply-Demand Balance</CardTitle>
            <CardDescription>Supply vs estimated demand by product</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={supplyDemandBalance} margin={{ top: 5, right: 30, left: 20, bottom: 25 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="ProductName" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="CurrentSupply" name="Current Supply" fill="#82ca9d" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="EstimatedDemand" name="Estimated Demand" fill="#8884d8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Price & Income Elasticity Analysis</CardTitle>
          <CardDescription>Consumer sensitivity to price and income changes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={elasticityData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="demographic" />
                <Tooltip />
                <Legend />
                <Bar dataKey="priceElasticity" name="Price Elasticity" fill="#8884d8" />
                <Bar dataKey="incomeElasticity" name="Income Elasticity" fill="#82ca9d" />
                <Bar dataKey="substitutionIndex" name="Substitution Index" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <div>
            <CardTitle>Consumer Demand Data</CardTitle>
            <CardDescription>Detailed demand metrics by demographic group</CardDescription>
          </div>
          <Button onClick={onAddData}>
            Add Demand Data
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-3 text-left font-medium">Product</th>
                  <th className="px-4 py-3 text-left font-medium">Year</th>
                  <th className="px-4 py-3 text-left font-medium">Quarter</th>
                  <th className="px-4 py-3 text-left font-medium">Demographic</th>
                  <th className="px-4 py-3 text-left font-medium">Consumption Per Capita</th>
                  <th className="px-4 py-3 text-left font-medium">Price Elasticity</th>
                  <th className="px-4 py-3 text-left font-medium">Income Elasticity</th>
                </tr>
              </thead>
              <tbody>
                {demand.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-muted/50">
                    <td className="px-4 py-3">{item.ProductName}</td>
                    <td className="px-4 py-3">{item.Year}</td>
                    <td className="px-4 py-3">Q{item.Quarter}</td>
                    <td className="px-4 py-3">{item.DemographicGroup}</td>
                    <td className="px-4 py-3">{parseFloat(item.ConsumptionPerCapita).toFixed(2)}</td>
                    <td className="px-4 py-3">{parseFloat(item.PriceElasticity).toFixed(2)}</td>
                    <td className="px-4 py-3">{parseFloat(item.IncomeElasticity).toFixed(2)}</td>
                  </tr>
                ))}
                {demand.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-6 text-center text-muted-foreground">
                      No demand data available for the selected filters.
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