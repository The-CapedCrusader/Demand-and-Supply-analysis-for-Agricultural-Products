import { AppSidebar } from "@/components/app-sidebar"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { IconPlant2, IconCloudRain, IconSun, IconTemperature } from "@tabler/icons-react"

export default function MyFarmPage() {
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
                <h1 className="text-2xl font-bold mb-2">My Farm Dashboard</h1>
                <p className="text-muted-foreground mb-6">Monitor your farm's performance, crop health, and weather conditions</p>

                <Tabs defaultValue="overview" className="mb-6">
                  <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="crops">Crops</TabsTrigger>
                    <TabsTrigger value="weather">Weather</TabsTrigger>
                    <TabsTrigger value="equipment">Equipment</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg flex items-center">
                            <IconPlant2 className="mr-2 h-5 w-5 text-primary" />
                            Active Crops
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-3xl font-bold">12</div>
                          <p className="text-sm text-muted-foreground mt-2">4 ready for harvest</p>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg flex items-center">
                            <IconCloudRain className="mr-2 h-5 w-5 text-primary" />
                            Rainfall
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-3xl font-bold">24mm</div>
                          <p className="text-sm text-muted-foreground mt-2">Last 7 days</p>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg flex items-center">
                            <IconSun className="mr-2 h-5 w-5 text-primary" />
                            Sunlight
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-3xl font-bold">8.5 hrs</div>
                          <p className="text-sm text-muted-foreground mt-2">Daily average</p>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg flex items-center">
                            <IconTemperature className="mr-2 h-5 w-5 text-primary" />
                            Soil Temperature
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-3xl font-bold">18°C</div>
                          <p className="text-sm text-muted-foreground mt-2">Optimal for growth</p>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                  <TabsContent value="crops">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
                      <Card>
                        <CardHeader>
                          <CardTitle>Crop Health Overview</CardTitle>
                          <CardDescription>Status of your current crops</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex justify-between items-center">
                              <span>Rice</span>
                              <div className="w-2/3 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div className="bg-green-500 h-full rounded-full" style={{ width: '85%' }}></div>
                              </div>
                              <span className="font-medium">85%</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span>Wheat</span>
                              <div className="w-2/3 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div className="bg-green-500 h-full rounded-full" style={{ width: '78%' }}></div>
                              </div>
                              <span className="font-medium">78%</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span>Corn</span>
                              <div className="w-2/3 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div className="bg-amber-500 h-full rounded-full" style={{ width: '62%' }}></div>
                              </div>
                              <span className="font-medium">62%</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span>Tomatoes</span>
                              <div className="w-2/3 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div className="bg-green-500 h-full rounded-full" style={{ width: '92%' }}></div>
                              </div>
                              <span className="font-medium">92%</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle>Upcoming Tasks</CardTitle>
                          <CardDescription>Scheduled farming activities</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="bg-muted p-3 rounded-lg">
                              <div className="font-medium">Irrigate Corn Fields</div>
                              <div className="text-sm text-muted-foreground">Today</div>
                            </div>
                            <div className="bg-muted p-3 rounded-lg">
                              <div className="font-medium">Apply Fertilizer to Wheat</div>
                              <div className="text-sm text-muted-foreground">Tomorrow</div>
                            </div>
                            <div className="bg-muted p-3 rounded-lg">
                              <div className="font-medium">Harvest Tomatoes</div>
                              <div className="text-sm text-muted-foreground">In 3 days</div>
                            </div>
                            <div className="bg-muted p-3 rounded-lg">
                              <div className="font-medium">Pest Control for Rice</div>
                              <div className="text-sm text-muted-foreground">In 5 days</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                  <TabsContent value="weather">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
                      <Card className="lg:col-span-2">
                        <CardHeader>
                          <CardTitle>7-Day Weather Forecast</CardTitle>
                          <CardDescription>Plan your farming activities accordingly</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex gap-4 overflow-x-auto py-2">
                            {[
                              { day: "Today", icon: IconSun, temp: "28°C", rain: "0%" },
                              { day: "Tue", icon: IconSun, temp: "30°C", rain: "0%" },
                              { day: "Wed", icon: IconCloudRain, temp: "25°C", rain: "60%" },
                              { day: "Thu", icon: IconCloudRain, temp: "23°C", rain: "80%" },
                              { day: "Fri", icon: IconCloudRain, temp: "22°C", rain: "40%" },
                              { day: "Sat", icon: IconSun, temp: "26°C", rain: "10%" },
                              { day: "Sun", icon: IconSun, temp: "29°C", rain: "0%" },
                            ].map((item, index) => {
                              const Icon = item.icon;
                              return (
                                <div key={index} className="flex flex-col items-center min-w-[80px] p-2 border rounded-lg">
                                  <div className="font-medium">{item.day}</div>
                                  <Icon className="h-8 w-8 my-2" />
                                  <div className="font-bold">{item.temp}</div>
                                  <div className="text-xs text-muted-foreground">Rain: {item.rain}</div>
                                </div>
                              );
                            })}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                  <TabsContent value="equipment">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
                      <Card>
                        <CardHeader>
                          <CardTitle>Equipment Status</CardTitle>
                          <CardDescription>Maintenance information</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex justify-between items-center p-3 border rounded-lg">
                              <span className="font-medium">Tractor #1</span>
                              <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Operational</span>
                            </div>
                            <div className="flex justify-between items-center p-3 border rounded-lg">
                              <span className="font-medium">Irrigation System</span>
                              <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Operational</span>
                            </div>
                            <div className="flex justify-between items-center p-3 border rounded-lg">
                              <span className="font-medium">Harvester</span>
                              <span className="px-2 py-1 text-xs bg-amber-100 text-amber-800 rounded-full">Maintenance Due</span>
                            </div>
                            <div className="flex justify-between items-center p-3 border rounded-lg">
                              <span className="font-medium">Drone</span>
                              <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">Needs Repair</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle>Upcoming Maintenance</CardTitle>
                          <CardDescription>Scheduled equipment maintenance</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="bg-muted p-3 rounded-lg">
                              <div className="font-medium">Harvester Service</div>
                              <div className="text-sm text-muted-foreground">Next Week</div>
                            </div>
                            <div className="bg-muted p-3 rounded-lg">
                              <div className="font-medium">Tractor Oil Change</div>
                              <div className="text-sm text-muted-foreground">In 3 weeks</div>
                            </div>
                            <div className="bg-muted p-3 rounded-lg">
                              <div className="font-medium">Irrigation System Check</div>
                              <div className="text-sm text-muted-foreground">In 1 month</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
} 