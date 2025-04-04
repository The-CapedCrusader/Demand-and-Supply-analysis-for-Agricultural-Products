import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { IconPlant2, IconChartBar, IconTractor, IconUsers, IconDatabase, IconBarcode, IconFileAnalytics } from "@tabler/icons-react"
import Link from "next/link"

import data from "./data.json"

export default function DashboardPage() {
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
                <h1 className="text-2xl font-bold mb-2">Agricultural Demand & Supply Analysis</h1>
                <p className="text-muted-foreground mb-6">Monitor crop prices, market trends, and optimize your farm's production</p>
              </div>
              <SectionCards />
              <div className="px-4 lg:px-6">
                <h2 className="text-xl font-semibold mb-4">Dashboard Sections</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Link href="/my-farm" className="block">
                    <Card className="hover:bg-muted/50 transition-colors">
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2">
                          <IconTractor className="h-5 w-5 text-primary" />
                          My Farm
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">Monitor your farm's performance, crop health, and weather conditions</p>
                      </CardContent>
                    </Card>
                  </Link>
                  
                  <Link href="/market-analysis" className="block">
                    <Card className="hover:bg-muted/50 transition-colors">
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2">
                          <IconChartBar className="h-5 w-5 text-primary" />
                          Market Analysis
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">Track price trends, market demand, and make data-driven decisions</p>
                      </CardContent>
                    </Card>
                  </Link>
                  
                  <Link href="/crop-management" className="block">
                    <Card className="hover:bg-muted/50 transition-colors">
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2">
                          <IconPlant2 className="h-5 w-5 text-primary" />
                          Crop Management
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">Monitor and manage your crops efficiently</p>
                      </CardContent>
                    </Card>
                  </Link>
                  
                  <Link href="/buyers-sellers" className="block">
                    <Card className="hover:bg-muted/50 transition-colors">
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2">
                          <IconUsers className="h-5 w-5 text-primary" />
                          Buyers & Sellers
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">Connect with potential buyers and sellers in your region</p>
                      </CardContent>
                    </Card>
                  </Link>
                  
                  <Link href="/crop-database" className="block">
                    <Card className="hover:bg-muted/50 transition-colors">
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2">
                          <IconDatabase className="h-5 w-5 text-primary" />
                          Crop Database
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">Comprehensive information about various crops</p>
                      </CardContent>
                    </Card>
                  </Link>
                  
                  <Link href="/inventory-scanner" className="block">
                    <Card className="hover:bg-muted/50 transition-colors">
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2">
                          <IconBarcode className="h-5 w-5 text-primary" />
                          Inventory Scanner
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">Track and monitor your agricultural inventory</p>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              </div>
              
              <div className="px-4 lg:px-6 mt-4">
                <ChartAreaInteractive />
              </div>
              <DataTable data={data} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
