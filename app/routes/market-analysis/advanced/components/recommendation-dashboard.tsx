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
  LineChart, Line, BarChart, Bar, RadarChart, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, Radar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { IconLeaf } from '@tabler/icons-react';

interface RecommendationDashboardProps {
  recommendations: any[];
  policyImpact: any[];
  selectedProduct: string;
  selectedRegion: string;
  onAddData: () => void;
}

export function RecommendationDashboard({ 
  recommendations, 
  policyImpact,
  selectedProduct,
  selectedRegion,
  onAddData
}: RecommendationDashboardProps) {
  // Transform data for product comparison
  const productRiskData = recommendations.map(item => ({
    product: item.ProductName,
    region: item.Region,
    profitability: parseFloat(item.ProfitabilityIndex),
    risk: parseFloat(item.RiskIndex),
    sustainability: parseFloat(item.SustainabilityScore)
  }));
  
  // Transform data for policy impact analysis
  const policyData = policyImpact.map(item => ({
    policy: item.PolicyName,
    type: item.PolicyType,
    supply: parseFloat(item.ImpactOnSupplyPercent),
    demand: parseFloat(item.ImpactOnDemandPercent),
    price: parseFloat(item.ImpactOnPricePercent)
  }));
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Crop Risk vs. Profitability</CardTitle>
            <CardDescription>Comparison of risk and profit potential</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={productRiskData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="product" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="profitability" name="Profitability Index" fill="#82ca9d" />
                  <Bar dataKey="risk" name="Risk Index" fill="#8884d8" />
                  <Bar dataKey="sustainability" name="Sustainability Score" fill="#ffc658" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Policy Impact Analysis</CardTitle>
            <CardDescription>How policies affect supply, demand, and prices</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={policyData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="policy" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="supply" name="Supply Impact %" fill="#8884d8" />
                  <Bar dataKey="demand" name="Demand Impact %" fill="#82ca9d" />
                  <Bar dataKey="price" name="Price Impact %" fill="#ffc658" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <div>
            <CardTitle>Product Recommendations</CardTitle>
            <CardDescription>Optimized crop selection based on region and conditions</CardDescription>
          </div>
          <Button onClick={onAddData}>
            Add Recommendation
          </Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-3 text-left font-medium">Product</th>
                  <th className="px-4 py-3 text-left font-medium">Region</th>
                  <th className="px-4 py-3 text-left font-medium">Soil Type</th>
                  <th className="px-4 py-3 text-left font-medium">Water Requirement</th>
                  <th className="px-4 py-3 text-left font-medium">Profitability</th>
                  <th className="px-4 py-3 text-left font-medium">Risk</th>
                  <th className="px-4 py-3 text-left font-medium">Sustainability</th>
                  <th className="px-4 py-3 text-left font-medium">Planting Month</th>
                </tr>
              </thead>
              <tbody>
                {recommendations.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-muted/50">
                    <td className="px-4 py-3">{item.ProductName}</td>
                    <td className="px-4 py-3">{item.Region}</td>
                    <td className="px-4 py-3">{item.SoilType}</td>
                    <td className="px-4 py-3">{parseFloat(item.WaterRequirement).toFixed(0)} mm</td>
                    <td className="px-4 py-3">
                      <Badge className="bg-green-100 text-green-800">
                        {parseFloat(item.ProfitabilityIndex).toFixed(1)}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Badge className="bg-red-100 text-red-800">
                        {parseFloat(item.RiskIndex).toFixed(1)}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Badge className="bg-blue-100 text-blue-800">
                        {parseFloat(item.SustainabilityScore).toFixed(1)}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      {new Date(2000, item.RecommendedPlantingMonth - 1, 1).toLocaleString('default', { month: 'long' })}
                    </td>
                  </tr>
                ))}
                {recommendations.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-4 py-6 text-center text-muted-foreground">
                      No recommendation data available for the selected filters.
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