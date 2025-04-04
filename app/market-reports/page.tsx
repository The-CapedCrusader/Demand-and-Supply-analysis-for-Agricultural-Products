"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { 
  IconDownload, 
  IconFileAnalytics, 
  IconFileChart, 
  IconFileDollar, 
  IconFileReport, 
  IconFileStar, 
  IconFileText,
  IconCalendar,
  IconUser
} from "@tabler/icons-react"

export default function MarketReportsPage() {
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
                <h1 className="text-2xl font-bold mb-2">Market Reports</h1>
                <p className="text-muted-foreground mb-6">Access comprehensive agricultural market analysis and reports</p>
              </div>
              
              <Tabs defaultValue="weekly" className="px-4 lg:px-6">
                <TabsList className="mb-4">
                  <TabsTrigger value="weekly">Weekly Reports</TabsTrigger>
                  <TabsTrigger value="monthly">Monthly Insights</TabsTrigger>
                  <TabsTrigger value="quarterly">Quarterly Analysis</TabsTrigger>
                  <TabsTrigger value="yearly">Annual Reports</TabsTrigger>
                </TabsList>
                
                <TabsContent value="weekly" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <IconFileChart className="h-5 w-5 text-primary" />
                          Weekly Price Trends
                        </CardTitle>
                        <CardDescription>Week 32, 2023</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-2">Analysis of commodity price movements over the past week with forecasts for the coming week.</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <IconCalendar className="h-3.5 w-3.5" />
                          <span>Updated: August 12, 2023</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                          <IconUser className="h-3.5 w-3.5" />
                          <span>Author: Market Analysis Team</span>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <Button variant="outline" size="sm" className="gap-1">
                          <IconDownload className="h-3.5 w-3.5" />
                          Download (PDF)
                        </Button>
                      </CardFooter>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <IconFileDollar className="h-5 w-5 text-primary" />
                          Market Demand Report
                        </CardTitle>
                        <CardDescription>Week 32, 2023</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-2">Comprehensive review of current market demand by region and product category.</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <IconCalendar className="h-3.5 w-3.5" />
                          <span>Updated: August 11, 2023</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                          <IconUser className="h-3.5 w-3.5" />
                          <span>Author: Regional Analysts</span>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <Button variant="outline" size="sm" className="gap-1">
                          <IconDownload className="h-3.5 w-3.5" />
                          Download (PDF)
                        </Button>
                      </CardFooter>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <IconFileText className="h-5 w-5 text-primary" />
                          Weather Impact Analysis
                        </CardTitle>
                        <CardDescription>Week 32, 2023</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-2">Assessment of weather patterns and their projected impact on crop production and prices.</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <IconCalendar className="h-3.5 w-3.5" />
                          <span>Updated: August 10, 2023</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                          <IconUser className="h-3.5 w-3.5" />
                          <span>Author: Meteorological Team</span>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <Button variant="outline" size="sm" className="gap-1">
                          <IconDownload className="h-3.5 w-3.5" />
                          Download (PDF)
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="monthly" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <IconFileAnalytics className="h-5 w-5 text-primary" />
                          Monthly Market Overview
                        </CardTitle>
                        <CardDescription>August 2023</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-2">Comprehensive analysis of agricultural market trends, price fluctuations, and forecasts.</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <IconCalendar className="h-3.5 w-3.5" />
                          <span>Updated: August 5, 2023</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                          <IconUser className="h-3.5 w-3.5" />
                          <span>Author: Senior Analyst Team</span>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <Button variant="outline" size="sm" className="gap-1">
                          <IconDownload className="h-3.5 w-3.5" />
                          Download (PDF)
                        </Button>
                      </CardFooter>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <IconFileReport className="h-5 w-5 text-primary" />
                          Regional Supply Analysis
                        </CardTitle>
                        <CardDescription>August 2023</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-2">Detailed assessment of supply conditions across different agricultural regions and products.</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <IconCalendar className="h-3.5 w-3.5" />
                          <span>Updated: August 3, 2023</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                          <IconUser className="h-3.5 w-3.5" />
                          <span>Author: Supply Chain Experts</span>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <Button variant="outline" size="sm" className="gap-1">
                          <IconDownload className="h-3.5 w-3.5" />
                          Download (PDF)
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="quarterly" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <IconFileAnalytics className="h-5 w-5 text-primary" />
                          Q3 Comprehensive Review
                        </CardTitle>
                        <CardDescription>Q3 2023</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-2">Complete analysis of Q3 agricultural markets, including seasonal comparisons and future outlook.</p>
                        <Badge className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 mb-2">Premium Report</Badge>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <IconCalendar className="h-3.5 w-3.5" />
                          <span>Updated: July 15, 2023</span>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <Button variant="outline" size="sm" className="gap-1">
                          <IconDownload className="h-3.5 w-3.5" />
                          Download (PDF)
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="yearly" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <IconFileAnalytics className="h-5 w-5 text-primary" />
                          Annual Agricultural Market Report
                        </CardTitle>
                        <CardDescription>2022</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-2">Comprehensive annual review of global and regional agricultural markets, trends, and forecasts.</p>
                        <Badge className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 mb-2">Official Report</Badge>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <IconCalendar className="h-3.5 w-3.5" />
                          <span>Published: January 15, 2023</span>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <Button variant="outline" size="sm" className="gap-1">
                          <IconDownload className="h-3.5 w-3.5" />
                          Download (PDF)
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
} 