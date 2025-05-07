import { useLoaderData, useNavigate, Form, useNavigation } from 'react-router';
import { loader, action } from './route.server';
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
import { Button } from '~/components/ui/button';
import { Badge } from '~/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import { 
  IconChartBar, IconChartLine, IconTemperature, IconCloudRain, 
  IconLeaf, IconTractor, IconUsersGroup, IconBuildingStore,
  IconTruckDelivery, IconWorldWww, IconCoins, IconPlus 
} from '@tabler/icons-react';
import { useState } from 'react';
import { ProductionDashboard } from './components/production-dashboard';
import { DemandDashboard } from './components/demand-dashboard';
import { SupplyDashboard } from './components/supply-dashboard';
import { WeatherDashboard } from './components/weather-dashboard';
import { RecommendationDashboard } from './components/recommendation-dashboard';
import { AddDataDialog } from './components/add-data-dialog';

export { loader, action };

export default function AdvancedMarketAnalysis() {
  const { 
    products, 
    regions, 
    production, 
    demand, 
    inventory, 
    weatherImpact, 
    recommendations, 
    tradeAnalytics, 
    policyImpact, 
    supplyChain,
    aggregatedData,
    filters,
    error
  } = useLoaderData<{
    products: any[];
    regions: any[];
    production: any[];
    demand: any[];
    inventory: any[];
    weatherImpact: any[];
    recommendations: any[];
    tradeAnalytics: any[];
    policyImpact: any[];
    supplyChain: any[];
    aggregatedData: {
      productionTrends: any[];
      regionalProduction: any[];
      supplyDemandBalance: any[];
      priceImpact: any[];
    };
    filters: {
      selectedYear: string;
      selectedProduct: string;
      selectedRegion: string;
      selectedAnalysisType: string;
    };
    error?: string;
  }>();
  
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  
  const [isAddDataModalOpen, setIsAddDataModalOpen] = useState(false);
  const [addDataType, setAddDataType] = useState<string>('production');
  
  // Handler for filter changes
  const handleYearChange = (newYear: string) => {
    navigate(`/market-analysis/advanced?year=${newYear}&product=${filters.selectedProduct}&region=${filters.selectedRegion}&type=${filters.selectedAnalysisType}`);
  };
  
  const handleProductChange = (newProduct: string) => {
    navigate(`/market-analysis/advanced?year=${filters.selectedYear}&product=${newProduct}&region=${filters.selectedRegion}&type=${filters.selectedAnalysisType}`);
  };
  
  const handleRegionChange = (newRegion: string) => {
    navigate(`/market-analysis/advanced?year=${filters.selectedYear}&product=${filters.selectedProduct}&region=${newRegion}&type=${filters.selectedAnalysisType}`);
  };
  
  const handleAnalysisTypeChange = (newType: string) => {
    navigate(`/market-analysis/advanced?year=${filters.selectedYear}&product=${filters.selectedProduct}&region=${filters.selectedRegion}&type=${newType}`);
  };
  
  // Helper function to open the add data modal with the correct type
  const openAddDataModal = (type: string) => {
    setAddDataType(type);
    setIsAddDataModalOpen(true);
  };

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
                <div className="flex items-center justify-between mb-2">
                  <h1 className="text-2xl font-bold">Advanced Market Analysis</h1>
                  <Button onClick={() => openAddDataModal(filters.selectedAnalysisType)}>
                    <IconPlus className="mr-2 h-4 w-4" />
                    Add Data
                  </Button>
                </div>
                <p className="text-muted-foreground mb-6">
                  In-depth analysis of agricultural production, demand, and market dynamics
                </p>
                
                {error && (
                  <div className="mb-4 rounded-md bg-red-50 p-4 text-red-700">
                    <p>{error}</p>
                    <p className="mt-2 text-sm">Using sample data for display.</p>
                  </div>
                )}
                
                <div className="mb-6 flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Year:</span>
                    <Select defaultValue={filters.selectedYear} onValueChange={handleYearChange}>
                      <SelectTrigger className="w-[100px]">
                        <SelectValue placeholder="Year" />
                      </SelectTrigger>
                      <SelectContent>
                        {['2020', '2021', '2022', '2023', '2024'].map((year) => (
                          <SelectItem key={year} value={year}>{year}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Product:</span>
                    <Select defaultValue={filters.selectedProduct} onValueChange={handleProductChange}>
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Select product" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Products</SelectItem>
                        {products.map((prod) => (
                          <SelectItem key={prod.ProductID} value={prod.ProductID.toString()}>
                            {prod.ProductName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Region:</span>
                    <Select defaultValue={filters.selectedRegion} onValueChange={handleRegionChange}>
                      <SelectTrigger className="w-[150px]">
                        <SelectValue placeholder="Select region" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Regions</SelectItem>
                        {regions.map((region: {Region: string}) => (
                          <SelectItem key={region.Region} value={region.Region}>
                            {region.Region}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              <Tabs defaultValue={filters.selectedAnalysisType} className="px-4 lg:px-6" onValueChange={handleAnalysisTypeChange}>
                <TabsList className="mb-4">
                  <TabsTrigger value="production">
                    <IconTractor className="mr-2 h-4 w-4" />
                    <span>Production</span>
                  </TabsTrigger>
                  <TabsTrigger value="demand">
                    <IconUsersGroup className="mr-2 h-4 w-4" />
                    <span>Demand</span>
                  </TabsTrigger>
                  <TabsTrigger value="supply">
                    <IconBuildingStore className="mr-2 h-4 w-4" />
                    <span>Supply Chain</span>
                  </TabsTrigger>
                  <TabsTrigger value="weather">
                    <IconCloudRain className="mr-2 h-4 w-4" />
                    <span>Weather Impact</span>
                  </TabsTrigger>
                  <TabsTrigger value="recommendations">
                    <IconLeaf className="mr-2 h-4 w-4" />
                    <span>Recommendations</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="production" className="mt-0">
                  <ProductionDashboard
                    production={production}
                    productionTrends={aggregatedData.productionTrends}
                    regionalProduction={aggregatedData.regionalProduction}
                    selectedYear={filters.selectedYear}
                    selectedProduct={filters.selectedProduct}
                    selectedRegion={filters.selectedRegion}
                    onAddData={() => openAddDataModal('production')}
                  />
                </TabsContent>
                
                <TabsContent value="demand" className="mt-0">
                  <DemandDashboard
                    demand={demand}
                    supplyDemandBalance={aggregatedData.supplyDemandBalance}
                    selectedYear={filters.selectedYear}
                    selectedProduct={filters.selectedProduct}
                    selectedRegion={filters.selectedRegion}
                    onAddData={() => openAddDataModal('demand')}
                  />
                </TabsContent>
                
                <TabsContent value="supply" className="mt-0">
                  <SupplyDashboard
                    inventory={inventory}
                    supplyChain={supplyChain}
                    tradeAnalytics={tradeAnalytics}
                    selectedProduct={filters.selectedProduct}
                    onAddData={() => openAddDataModal('supply')}
                  />
                </TabsContent>
                
                <TabsContent value="weather" className="mt-0">
                  <WeatherDashboard
                    weatherImpact={weatherImpact}
                    priceImpact={aggregatedData.priceImpact}
                    selectedYear={filters.selectedYear}
                    selectedProduct={filters.selectedProduct}
                    selectedRegion={filters.selectedRegion}
                    onAddData={() => openAddDataModal('weather')}
                  />
                </TabsContent>
                
                <TabsContent value="recommendations" className="mt-0">
                  <RecommendationDashboard
                    recommendations={recommendations}
                    policyImpact={policyImpact}
                    selectedProduct={filters.selectedProduct}
                    selectedRegion={filters.selectedRegion}
                    onAddData={() => openAddDataModal('recommendation')}
                  />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </SidebarInset>
      
      <AddDataDialog
        isOpen={isAddDataModalOpen}
        onClose={() => setIsAddDataModalOpen(false)}
        dataType={addDataType}
        products={products}
        regions={regions}
        isSubmitting={isSubmitting}
      />
    </SidebarProvider>
  );
} 