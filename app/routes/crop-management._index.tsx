'use client';

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
import { Progress } from '~/components/ui/progress';
import { IconPlant2, IconChevronRight } from '@tabler/icons-react';

export default function CropManagementPage() {
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
          role: 'farmer',
          name: 'John Doe',
          email: 'john.doe@example.com',
          avatar: '/avatars/farmer.jpg',
        }}
      />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="px-4 lg:px-6">
                <h1 className="mb-2 text-2xl font-bold">Crop Management</h1>
                <p className="text-muted-foreground mb-6">
                  Monitor and manage your crops efficiently
                </p>
              </div>

              <Tabs defaultValue="active" className="px-4 lg:px-6">
                <TabsList className="mb-4">
                  <TabsTrigger value="active">Active Crops</TabsTrigger>
                  <TabsTrigger value="planning">Crop Planning</TabsTrigger>
                  <TabsTrigger value="history">Crop History</TabsTrigger>
                </TabsList>

                <TabsContent value="active" className="mt-0">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <IconPlant2 className="text-primary h-5 w-5" />
                          Rice (Jasmine)
                        </CardTitle>
                        <CardDescription>
                          Field A1 - Planted: March 15, 2024
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <div className="mb-1 flex justify-between text-sm">
                              <span>Growth Progress</span>
                              <span className="font-medium">65%</span>
                            </div>
                            <Progress value={65} className="h-2" />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-muted-foreground text-sm">
                                Est. Harvest
                              </p>
                              <p className="font-medium">July 20, 2024</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground text-sm">
                                Est. Yield
                              </p>
                              <p className="font-medium">4.8 tons/acre</p>
                            </div>
                          </div>

                          <div>
                            <p className="mb-2 text-sm font-medium">
                              Recent Activities
                            </p>
                            <ul className="text-muted-foreground space-y-1 text-sm">
                              <li>Fertilizer application (Apr 20)</li>
                              <li>Pest control treatment (May 5)</li>
                              <li>Irrigation maintenance (May 15)</li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="border-t pt-4">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button className="ml-auto" size="sm">
                          Record Activity
                        </Button>
                      </CardFooter>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <IconPlant2 className="text-primary h-5 w-5" />
                          Wheat (Hard Red)
                        </CardTitle>
                        <CardDescription>
                          Field B2 - Planted: April 2, 2024
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <div className="mb-1 flex justify-between text-sm">
                              <span>Growth Progress</span>
                              <span className="font-medium">45%</span>
                            </div>
                            <Progress value={45} className="h-2" />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-muted-foreground text-sm">
                                Est. Harvest
                              </p>
                              <p className="font-medium">August 10, 2024</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground text-sm">
                                Est. Yield
                              </p>
                              <p className="font-medium">3.2 tons/acre</p>
                            </div>
                          </div>

                          <div>
                            <p className="mb-2 text-sm font-medium">
                              Upcoming Tasks
                            </p>
                            <ul className="text-muted-foreground space-y-1 text-sm">
                              <li>Fertilizer application (May 28)</li>
                              <li>Weed control (June 10)</li>
                              <li>Field inspection (June 15)</li>
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="border-t pt-4">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button className="ml-auto" size="sm">
                          Record Activity
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="planning" className="mt-0">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Crop Planning</CardTitle>
                      <CardDescription>
                        Plan your upcoming crop rotations and schedules
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="bg-muted/20 rounded-lg p-4">
                          <h3 className="mb-2 font-medium">
                            Field C3 - Next Planting
                          </h3>
                          <div className="mb-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                            <div>
                              <p className="text-muted-foreground text-sm">
                                Field Size
                              </p>
                              <p className="font-medium">12 acres</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground text-sm">
                                Last Crop
                              </p>
                              <p className="font-medium">Soybeans</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground text-sm">
                                Soil Health
                              </p>
                              <p className="font-medium">Good</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground text-sm">
                                Suggested Crop
                              </p>
                              <p className="font-medium">Corn</p>
                            </div>
                          </div>
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm">
                              Cancel Plan
                            </Button>
                            <Button
                              variant="default"
                              size="sm"
                              className="gap-1"
                            >
                              Start Planting
                              <IconChevronRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        <div className="bg-muted/20 rounded-lg p-4">
                          <h3 className="mb-2 font-medium">
                            Field D1 - Rotation Schedule
                          </h3>
                          <div className="mb-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                            <div>
                              <p className="text-muted-foreground text-sm">
                                Field Size
                              </p>
                              <p className="font-medium">8 acres</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground text-sm">
                                Current Crop
                              </p>
                              <p className="font-medium">Wheat</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground text-sm">
                                Harvest Date
                              </p>
                              <p className="font-medium">July 15, 2024</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground text-sm">
                                Next Crop
                              </p>
                              <p className="font-medium">Soybeans</p>
                            </div>
                          </div>
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm">
                              Modify Plan
                            </Button>
                            <Button variant="default" size="sm">
                              Confirm Schedule
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="history" className="mt-0">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Crop History</CardTitle>
                      <CardDescription>
                        Review past crop performance and yields
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-muted/20 rounded-lg p-4">
                        <p className="text-muted-foreground text-center">
                          Crop history charts and data would be displayed here
                        </p>
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
  );
}
