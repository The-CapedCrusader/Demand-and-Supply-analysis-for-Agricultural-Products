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
import { Input } from '~/components/ui/input';
import {
  IconSearch,
  IconPlant2,
  IconDroplet,
  IconSun,
  IconTemperature,
} from '@tabler/icons-react';

export default function CropDatabasePage() {
  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 72)',
          '--header-height': 'calc(var(--spacing) * 12)',
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
                <h1 className="mb-2 text-2xl font-bold">Crop Database</h1>
                <p className="text-muted-foreground mb-6">
                  Comprehensive information on various crop types and growing
                  conditions
                </p>
              </div>

              <div className="mb-6 px-4 lg:px-6">
                <div className="flex w-full max-w-sm items-center space-x-2">
                  <Input type="text" placeholder="Search crops..." />
                  <Button type="submit">
                    <IconSearch className="mr-2 h-4 w-4" />
                    Search
                  </Button>
                </div>
              </div>

              <Tabs defaultValue="grains" className="px-4 lg:px-6">
                <TabsList className="mb-4">
                  <TabsTrigger value="grains">Grains</TabsTrigger>
                  <TabsTrigger value="vegetables">Vegetables</TabsTrigger>
                  <TabsTrigger value="fruits">Fruits</TabsTrigger>
                  <TabsTrigger value="legumes">Legumes</TabsTrigger>
                </TabsList>

                <TabsContent value="grains" className="mt-0">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Card>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="flex items-center gap-2">
                            <IconPlant2 className="text-primary h-5 w-5" />
                            Rice (Oryza sativa)
                          </CardTitle>
                          <Badge className="border-0 bg-green-100 text-green-800">
                            High Profit
                          </Badge>
                        </div>
                        <CardDescription>
                          Cereal grain, widely cultivated across Asia
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-2">
                              <IconSun className="h-4 w-4 text-amber-500" />
                              <div>
                                <p className="text-muted-foreground text-sm">
                                  Sunlight
                                </p>
                                <p className="font-medium">
                                  Full sun (6-8 hours)
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <IconDroplet className="h-4 w-4 text-blue-500" />
                              <div>
                                <p className="text-muted-foreground text-sm">
                                  Water Needs
                                </p>
                                <p className="font-medium">
                                  High (flooded fields)
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <IconTemperature className="h-4 w-4 text-red-500" />
                              <div>
                                <p className="text-muted-foreground text-sm">
                                  Temperature
                                </p>
                                <p className="font-medium">20-35°C (68-95°F)</p>
                              </div>
                            </div>
                            <div>
                              <p className="text-muted-foreground text-sm">
                                Soil Type
                              </p>
                              <p className="font-medium">Clay or silt loam</p>
                            </div>
                          </div>

                          <div>
                            <p className="mb-2 text-sm font-medium">
                              Growing Season
                            </p>
                            <p className="text-muted-foreground text-sm">
                              Rice typically requires 3-6 months from planting
                              to harvest, depending on the variety and growing
                              conditions.
                            </p>
                          </div>

                          <div>
                            <p className="mb-2 text-sm font-medium">
                              Common Varieties
                            </p>
                            <div className="flex flex-wrap gap-2">
                              <Badge variant="outline">Jasmine</Badge>
                              <Badge variant="outline">Basmati</Badge>
                              <Badge variant="outline">Arborio</Badge>
                              <Badge variant="outline">Short-grain</Badge>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="border-t pt-4">
                        <Button variant="outline" size="sm">
                          Growing Guide
                        </Button>
                        <Button className="ml-auto" size="sm">
                          View Full Details
                        </Button>
                      </CardFooter>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="flex items-center gap-2">
                            <IconPlant2 className="text-primary h-5 w-5" />
                            Wheat (Triticum)
                          </CardTitle>
                          <Badge className="border-0 bg-green-100 text-green-800">
                            High Demand
                          </Badge>
                        </div>
                        <CardDescription>
                          Cereal grain, staple food worldwide
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-2">
                              <IconSun className="h-4 w-4 text-amber-500" />
                              <div>
                                <p className="text-muted-foreground text-sm">
                                  Sunlight
                                </p>
                                <p className="font-medium">
                                  Full sun (6+ hours)
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <IconDroplet className="h-4 w-4 text-blue-500" />
                              <div>
                                <p className="text-muted-foreground text-sm">
                                  Water Needs
                                </p>
                                <p className="font-medium">
                                  Moderate (12-15 inches)
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <IconTemperature className="h-4 w-4 text-red-500" />
                              <div>
                                <p className="text-muted-foreground text-sm">
                                  Temperature
                                </p>
                                <p className="font-medium">15-30°C (59-86°F)</p>
                              </div>
                            </div>
                            <div>
                              <p className="text-muted-foreground text-sm">
                                Soil Type
                              </p>
                              <p className="font-medium">Well-drained loam</p>
                            </div>
                          </div>

                          <div>
                            <p className="mb-2 text-sm font-medium">
                              Growing Season
                            </p>
                            <p className="text-muted-foreground text-sm">
                              Winter wheat is planted in fall and harvested in
                              early summer. Spring wheat is planted in spring
                              and harvested in late summer.
                            </p>
                          </div>

                          <div>
                            <p className="mb-2 text-sm font-medium">
                              Common Varieties
                            </p>
                            <div className="flex flex-wrap gap-2">
                              <Badge variant="outline">Hard Red</Badge>
                              <Badge variant="outline">Soft White</Badge>
                              <Badge variant="outline">Durum</Badge>
                              <Badge variant="outline">Spelt</Badge>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="border-t pt-4">
                        <Button variant="outline" size="sm">
                          Growing Guide
                        </Button>
                        <Button className="ml-auto" size="sm">
                          View Full Details
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="vegetables" className="mt-0">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Vegetables</CardTitle>
                      <CardDescription>
                        Various vegetable crops information
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-muted/20 rounded-lg p-8 text-center">
                        <p className="text-muted-foreground mb-4">
                          Detailed information about vegetable crops would be
                          displayed here.
                        </p>
                        <Button>Browse Vegetables</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="fruits" className="mt-0">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Fruits</CardTitle>
                      <CardDescription>
                        Fruit crop varieties and growing information
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-muted/20 rounded-lg p-8 text-center">
                        <p className="text-muted-foreground mb-4">
                          Detailed information about fruit crops would be
                          displayed here.
                        </p>
                        <Button>Browse Fruits</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="legumes" className="mt-0">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Legumes</CardTitle>
                      <CardDescription>
                        Legume crop varieties and growing information
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-muted/20 rounded-lg p-8 text-center">
                        <p className="text-muted-foreground mb-4">
                          Detailed information about legume crops would be
                          displayed here.
                        </p>
                        <Button>Browse Legumes</Button>
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
