"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { IconChartBar } from "@tabler/icons-react"

export default function MarketAnalysisPage() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
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
                <h1 className="text-2xl font-bold mb-2">Market Analysis</h1>
                <p className="text-muted-foreground mb-6">Track price trends, market demands, and make data-driven decisions</p>
              </div>
              
              <Tabs defaultValue="overview" className="px-4 lg:px-6">
                <TabsList className="mb-4">
                  <TabsTrigger value="overview">Market Overview</TabsTrigger>
                  <TabsTrigger value="price">Price Trends</TabsTrigger>
                  <TabsTrigger value="demand">Demand Analysis</TabsTrigger>
                  <TabsTrigger value="forecast">Forecasting</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <IconChartBar className="h-5 w-5 text-primary" />
                          Current Market Trends
                        </CardTitle>
                        <CardDescription>April 2024</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-2">Overview of the agricultural market trends affecting farmers this month.</p>
                        <div className="grid grid-cols-2 gap-4 mt-4">
                          <div>
                            <h3 className="text-sm font-medium">Rising Commodities</h3>
                            <div className="mt-2 space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="text-sm">Rice</span>
                                <Badge className="bg-green-100 text-green-700">+5.2%</Badge>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm">Wheat</span>
                                <Badge className="bg-green-100 text-green-700">+3.8%</Badge>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm">Soybeans</span>
                                <Badge className="bg-green-100 text-green-700">+2.1%</Badge>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium">Declining Commodities</h3>
                            <div className="mt-2 space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="text-sm">Corn</span>
                                <Badge className="bg-red-100 text-red-700">-1.5%</Badge>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm">Potatoes</span>
                                <Badge className="bg-red-100 text-red-700">-2.3%</Badge>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm">Onions</span>
                                <Badge className="bg-red-100 text-red-700">-3.1%</Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2 text-lg">
                          Market Insights
                        </CardTitle>
                        <CardDescription>Key factors affecting agricultural markets</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-sm font-medium mb-1">Supply Chain Constraints</h3>
                            <p className="text-sm text-muted-foreground">Shipping costs have increased by 12% year-over-year, affecting export pricing.</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium mb-1">Weather Patterns</h3>
                            <p className="text-sm text-muted-foreground">Favorable weather conditions in major growing regions predicted for the next month.</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium mb-1">Policy Changes</h3>
                            <p className="text-sm text-muted-foreground">New agricultural subsidies expected to impact market prices in Q3 2024.</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="price" className="mt-0">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Price Trends Analysis</CardTitle>
                      <CardDescription>Historical data on agricultural commodity prices</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">This section would contain interactive charts showing price trends over time.</p>
                      <div className="h-[300px] bg-muted/20 rounded-lg flex items-center justify-center">
                        <p className="text-muted-foreground">Price trend chart placeholder</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="demand" className="mt-0">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Market Demand Analysis</CardTitle>
                      <CardDescription>Current and projected demand for agricultural products</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">This section would contain analyses of market demand patterns.</p>
                      <div className="h-[300px] bg-muted/20 rounded-lg flex items-center justify-center">
                        <p className="text-muted-foreground">Demand analysis chart placeholder</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="forecast" className="mt-0">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Market Forecasts</CardTitle>
                      <CardDescription>Predictions for future market conditions</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">This section would contain forecasting models and predictions.</p>
                      <div className="h-[300px] bg-muted/20 rounded-lg flex items-center justify-center">
                        <p className="text-muted-foreground">Forecast model placeholder</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
} 