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
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { IconCloudRain } from '@tabler/icons-react';

interface WeatherDashboardProps {
  weatherImpact: any[];
  priceImpact: any[];
  selectedYear: string;
  selectedProduct: string;
  selectedRegion: string;
  onAddData: () => void;
}

export function WeatherDashboard({ 
  weatherImpact, 
  priceImpact,
  selectedYear,
  selectedProduct,
  selectedRegion,
  onAddData
}: WeatherDashboardProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Weather Impact on Yield</CardTitle>
            <CardDescription>How different weather conditions affect crop yields</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={weatherImpact}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="WeatherType" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="YieldImpactPercent" name="Yield Impact %" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Weather Impact on Prices</CardTitle>
            <CardDescription>How weather events affect market prices</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={priceImpact}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="WeatherType" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="AvgPriceImpact" name="Avg Price Impact %" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <div>
            <CardTitle>Weather Impact Data</CardTitle>
            <CardDescription>Detailed records of weather impacts on crops</CardDescription>
          </div>
          <Button onClick={onAddData}>
            Add Weather Data
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-3 text-left font-medium">Product</th>
                  <th className="px-4 py-3 text-left font-medium">Region</th>
                  <th className="px-4 py-3 text-left font-medium">Weather Type</th>
                  <th className="px-4 py-3 text-left font-medium">Year</th>
                  <th className="px-4 py-3 text-left font-medium">Month</th>
                  <th className="px-4 py-3 text-left font-medium">Yield Impact (%)</th>
                  <th className="px-4 py-3 text-left font-medium">Price Impact (%)</th>
                </tr>
              </thead>
              <tbody>
                {weatherImpact.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-muted/50">
                    <td className="px-4 py-3">{item.ProductName}</td>
                    <td className="px-4 py-3">{item.Region}</td>
                    <td className="px-4 py-3">{item.WeatherType}</td>
                    <td className="px-4 py-3">{item.Year}</td>
                    <td className="px-4 py-3">{new Date(2000, item.Month - 1, 1).toLocaleString('default', { month: 'long' })}</td>
                    <td className="px-4 py-3" style={{ color: parseFloat(item.YieldImpactPercent) < 0 ? 'red' : 'green' }}>
                      {parseFloat(item.YieldImpactPercent).toFixed(2)}%
                    </td>
                    <td className="px-4 py-3" style={{ color: parseFloat(item.PriceImpactPercent) < 0 ? 'green' : 'red' }}>
                      {parseFloat(item.PriceImpactPercent).toFixed(2)}%
                    </td>
                  </tr>
                ))}
                {weatherImpact.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-6 text-center text-muted-foreground">
                      No weather impact data available for the selected filters.
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