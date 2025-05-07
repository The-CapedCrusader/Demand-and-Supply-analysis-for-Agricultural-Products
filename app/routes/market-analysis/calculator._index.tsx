import { json, type LoaderFunctionArgs, type ActionFunctionArgs } from "react-router";
import { useLoaderData, useActionData, Form } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Button } from "~/components/ui/button";
import { db } from "~/db.server";
import { AppSidebar } from "~/components/navigation/app-sidebar";
import { SiteHeader } from "~/components/site-header";
import { SidebarInset, SidebarProvider } from "~/components/ui/sidebar";

export async function loader({ request }: LoaderFunctionArgs) {
  const products = await db.query(`
    SELECT p.*, n.* 
    FROM PRODUCT_T p 
    LEFT JOIN PRODUCT_NUTRITIONAL_INFO_T n ON p.ProductID = n.ProductID
  `);
  
  const regions = await db.query(`
    SELECT DISTINCT Region FROM REGIONAL_MARKET_STAT_T
  `);

  const requirements = await db.query(`
    SELECT * FROM DAILY_NUTRITIONAL_REQUIREMENTS_T
  `);

  return json({ products, regions, requirements });
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const region = formData.get("region") as string;
  const gdp = parseFloat(formData.get("gdp") as string);
  const population = parseInt(formData.get("population") as string);
  const year = parseInt(formData.get("year") as string);
  const ageGroup = formData.get("ageGroup") as string;
  const gender = formData.get("gender") as string;
  const activityLevel = formData.get("activityLevel") as string;

  // Get nutritional requirements based on demographics
  const requirements = await db.query(`
    SELECT * FROM DAILY_NUTRITIONAL_REQUIREMENTS_T 
    WHERE AgeGroup = ? AND Gender = ? AND ActivityLevel = ?
  `, [ageGroup, gender, activityLevel]);

  if (!requirements.length) {
    return json({ error: "No nutritional requirements found for the selected demographics" });
  }

  const dailyRequirements = requirements[0];

  // Get products with their nutritional information
  const products = await db.query(`
    SELECT p.*, n.* 
    FROM PRODUCT_T p 
    LEFT JOIN PRODUCT_NUTRITIONAL_INFO_T n ON p.ProductID = n.ProductID
  `);

  // Calculate demand based on nutritional requirements and GDP
  const gdpFactor = gdp / 1000; // Normalize GDP to a factor
  const results = products.map(product => {
    const caloriesNeeded = dailyRequirements.DailyCalories * population * 365;
    const proteinNeeded = dailyRequirements.DailyProtein * population * 365;
    const carbsNeeded = dailyRequirements.DailyCarbohydrates * population * 365;
    const fatNeeded = dailyRequirements.DailyFat * population * 365;
    const fiberNeeded = dailyRequirements.DailyFiber * population * 365;

    // Calculate demand based on nutritional content and GDP
    const demand = Math.ceil(
      (caloriesNeeded / product.CaloriesPerUnit) * 
      (1 + (gdpFactor * 0.1)) // GDP impact on demand
    );

    // Save to database
    db.query(`
      INSERT INTO MARKET_DEMAND_SUPPLY_T 
      (ProductID, Region, Year, Demand, Supply, PricePerUnit, created_at, updated_at)
      VALUES (?, ?, ?, ?, 0, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    `, [product.ProductID, region, year, demand, product.PricePerUnit]);

    return {
      productName: product.ProductName,
      demand,
      totalValue: demand * product.PricePerUnit,
      nutritionalContribution: {
        calories: (product.CaloriesPerUnit * demand) / caloriesNeeded * 100,
        protein: (product.ProteinPerUnit * demand) / proteinNeeded * 100,
        carbs: (product.CarbohydratesPerUnit * demand) / carbsNeeded * 100,
        fat: (product.FatPerUnit * demand) / fatNeeded * 100,
        fiber: (product.FiberPerUnit * demand) / fiberNeeded * 100
      }
    };
  });

  return json({ results });
}

export default function MarketAnalysisCalculator() {
  const { products, regions, requirements } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

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
        <div className="container mx-auto p-6">
          <h1 className="text-2xl font-bold mb-6">Market Analysis Calculator</h1>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Calculate Demand Based on GDP and Nutrition</CardTitle>
            </CardHeader>
            <CardContent>
              <Form method="post" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="region">Region</Label>
                    <Select name="region" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select region" />
                      </SelectTrigger>
                      <SelectContent>
                        {regions.map((region: any) => (
                          <SelectItem key={region.Region} value={region.Region}>
                            {region.Region}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="year">Year</Label>
                    <Input
                      type="number"
                      name="year"
                      required
                      min={2024}
                      max={2030}
                      defaultValue={2024}
                    />
                  </div>

                  <div>
                    <Label htmlFor="gdp">GDP per Capita (USD)</Label>
                    <Input
                      type="number"
                      name="gdp"
                      required
                      min={0}
                      step="0.01"
                    />
                  </div>

                  <div>
                    <Label htmlFor="population">Population</Label>
                    <Input
                      type="number"
                      name="population"
                      required
                      min={0}
                    />
                  </div>

                  <div>
                    <Label htmlFor="ageGroup">Age Group</Label>
                    <Select name="ageGroup" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select age group" />
                      </SelectTrigger>
                      <SelectContent>
                        {requirements.map((req: any) => (
                          <SelectItem key={req.AgeGroup} value={req.AgeGroup}>
                            {req.AgeGroup}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="gender">Gender</Label>
                    <Select name="gender" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="activityLevel">Activity Level</Label>
                    <Select name="activityLevel" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select activity level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Sedentary">Sedentary</SelectItem>
                        <SelectItem value="Moderate">Moderate</SelectItem>
                        <SelectItem value="Active">Active</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button type="submit">Calculate Demand</Button>
              </Form>
            </CardContent>
          </Card>

          {actionData?.results && (
            <Card>
              <CardHeader>
                <CardTitle>Demand Analysis Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {actionData.results.map((result: any) => (
                    <Card key={result.productName} className="p-4">
                      <h3 className="font-semibold">{result.productName}</h3>
                      <div className="grid grid-cols-2 gap-4 mt-2">
                        <div>
                          <p>Demand: {result.demand.toLocaleString()} units</p>
                          <p>Total Value: ${result.totalValue.toLocaleString()}</p>
                        </div>
                        <div>
                          <p>Nutritional Contribution:</p>
                          <ul className="list-disc list-inside">
                            <li>Calories: {result.nutritionalContribution.calories.toFixed(1)}%</li>
                            <li>Protein: {result.nutritionalContribution.protein.toFixed(1)}%</li>
                            <li>Carbs: {result.nutritionalContribution.carbs.toFixed(1)}%</li>
                            <li>Fat: {result.nutritionalContribution.fat.toFixed(1)}%</li>
                            <li>Fiber: {result.nutritionalContribution.fiber.toFixed(1)}%</li>
                          </ul>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
} 