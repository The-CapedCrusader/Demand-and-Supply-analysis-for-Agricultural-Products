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
  IconStar,
  IconMessage,
  IconPhone,
} from '@tabler/icons-react';

export default function BuyersAndSellersPage() {
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
                <h1 className="mb-2 text-2xl font-bold">Buyers & Sellers</h1>
                <p className="text-muted-foreground mb-6">
                  Connect with buyers and suppliers in your network
                </p>
              </div>

              <Tabs defaultValue="buyers" className="px-4 lg:px-6">
                <TabsList className="mb-4">
                  <TabsTrigger value="buyers">Buyers</TabsTrigger>
                  <TabsTrigger value="sellers">Suppliers</TabsTrigger>
                  <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
                </TabsList>

                <TabsContent value="buyers" className="mt-0">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Input
                        placeholder="Search buyers..."
                        className="max-w-sm"
                      />
                      <Button variant="outline">
                        <IconSearch className="mr-2 h-4 w-4" />
                        Search
                      </Button>
                    </div>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle>Active Buyers</CardTitle>
                        <CardDescription>
                          Companies and individuals interested in your products
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="bg-muted/20 rounded-lg p-4">
                            <div className="mb-2 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <h3 className="font-medium">
                                  Green Valley Organics
                                </h3>
                                <Badge className="border-0 bg-green-100 text-green-800">
                                  Verified
                                </Badge>
                              </div>
                              <div className="flex text-amber-500">
                                <IconStar className="h-4 w-4" />
                                <IconStar className="h-4 w-4" />
                                <IconStar className="h-4 w-4" />
                                <IconStar className="h-4 w-4" />
                                <IconStar
                                  className="h-4 w-4"
                                  fill="currentColor"
                                />
                              </div>
                            </div>
                            <div className="mb-2 grid grid-cols-1 gap-4 md:grid-cols-3">
                              <div>
                                <p className="text-muted-foreground text-sm">
                                  Interested In
                                </p>
                                <p className="font-medium">
                                  Organic Rice, Wheat
                                </p>
                              </div>
                              <div>
                                <p className="text-muted-foreground text-sm">
                                  Last Purchase
                                </p>
                                <p className="font-medium">April 10, 2024</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground text-sm">
                                  Location
                                </p>
                                <p className="font-medium">Portland, OR</p>
                              </div>
                            </div>
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="gap-1"
                              >
                                <IconPhone className="h-4 w-4" />
                                Call
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="gap-1"
                              >
                                <IconMessage className="h-4 w-4" />
                                Message
                              </Button>
                              <Button variant="default" size="sm">
                                View Details
                              </Button>
                            </div>
                          </div>

                          <div className="bg-muted/20 rounded-lg p-4">
                            <div className="mb-2 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <h3 className="font-medium">
                                  Midwest Grain Processing
                                </h3>
                                <Badge className="border-0 bg-green-100 text-green-800">
                                  Verified
                                </Badge>
                              </div>
                              <div className="flex text-amber-500">
                                <IconStar className="h-4 w-4" />
                                <IconStar className="h-4 w-4" />
                                <IconStar className="h-4 w-4" />
                                <IconStar className="h-4 w-4" />
                                <IconStar className="h-4 w-4" />
                              </div>
                            </div>
                            <div className="mb-2 grid grid-cols-1 gap-4 md:grid-cols-3">
                              <div>
                                <p className="text-muted-foreground text-sm">
                                  Interested In
                                </p>
                                <p className="font-medium">
                                  Corn, Soybeans, Wheat
                                </p>
                              </div>
                              <div>
                                <p className="text-muted-foreground text-sm">
                                  Last Purchase
                                </p>
                                <p className="font-medium">March 25, 2024</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground text-sm">
                                  Location
                                </p>
                                <p className="font-medium">Des Moines, IA</p>
                              </div>
                            </div>
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="gap-1"
                              >
                                <IconPhone className="h-4 w-4" />
                                Call
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="gap-1"
                              >
                                <IconMessage className="h-4 w-4" />
                                Message
                              </Button>
                              <Button variant="default" size="sm">
                                View Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="sellers" className="mt-0">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Input
                        placeholder="Search suppliers..."
                        className="max-w-sm"
                      />
                      <Button variant="outline">
                        <IconSearch className="mr-2 h-4 w-4" />
                        Search
                      </Button>
                    </div>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle>Trusted Suppliers</CardTitle>
                        <CardDescription>
                          Companies that provide seeds, fertilizers and
                          equipment
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="bg-muted/20 rounded-lg p-4">
                            <div className="mb-2 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <h3 className="font-medium">AgriSupply Co.</h3>
                                <Badge className="border-0 bg-green-100 text-green-800">
                                  Verified
                                </Badge>
                              </div>
                              <div className="flex text-amber-500">
                                <IconStar className="h-4 w-4" />
                                <IconStar className="h-4 w-4" />
                                <IconStar className="h-4 w-4" />
                                <IconStar className="h-4 w-4" />
                                <IconStar className="h-4 w-4" />
                              </div>
                            </div>
                            <div className="mb-2 grid grid-cols-1 gap-4 md:grid-cols-3">
                              <div>
                                <p className="text-muted-foreground text-sm">
                                  Products
                                </p>
                                <p className="font-medium">
                                  Seeds, Fertilizers, Tools
                                </p>
                              </div>
                              <div>
                                <p className="text-muted-foreground text-sm">
                                  Last Order
                                </p>
                                <p className="font-medium">April 5, 2024</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground text-sm">
                                  Location
                                </p>
                                <p className="font-medium">Lincoln, NE</p>
                              </div>
                            </div>
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="gap-1"
                              >
                                <IconPhone className="h-4 w-4" />
                                Call
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="gap-1"
                              >
                                <IconMessage className="h-4 w-4" />
                                Message
                              </Button>
                              <Button variant="default" size="sm">
                                Shop Now
                              </Button>
                            </div>
                          </div>

                          <div className="bg-muted/20 rounded-lg p-4">
                            <div className="mb-2 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <h3 className="font-medium">
                                  Farm Equipment Inc.
                                </h3>
                                <Badge className="border-0 bg-green-100 text-green-800">
                                  Verified
                                </Badge>
                              </div>
                              <div className="flex text-amber-500">
                                <IconStar className="h-4 w-4" />
                                <IconStar className="h-4 w-4" />
                                <IconStar className="h-4 w-4" />
                                <IconStar className="h-4 w-4" />
                                <IconStar
                                  className="h-4 w-4"
                                  fill="currentColor"
                                />
                              </div>
                            </div>
                            <div className="mb-2 grid grid-cols-1 gap-4 md:grid-cols-3">
                              <div>
                                <p className="text-muted-foreground text-sm">
                                  Products
                                </p>
                                <p className="font-medium">
                                  Tractors, Irrigation Systems
                                </p>
                              </div>
                              <div>
                                <p className="text-muted-foreground text-sm">
                                  Last Order
                                </p>
                                <p className="font-medium">February 18, 2024</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground text-sm">
                                  Location
                                </p>
                                <p className="font-medium">Kansas City, MO</p>
                              </div>
                            </div>
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="gap-1"
                              >
                                <IconPhone className="h-4 w-4" />
                                Call
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="gap-1"
                              >
                                <IconMessage className="h-4 w-4" />
                                Message
                              </Button>
                              <Button variant="default" size="sm">
                                Shop Now
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="marketplace" className="mt-0">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Agriculture Marketplace</CardTitle>
                      <CardDescription>
                        Connect with new buyers and sellers in your area
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-muted/20 rounded-lg p-8 text-center">
                        <p className="text-muted-foreground mb-4">
                          Marketplace data would be displayed here
                        </p>
                        <Button>Browse Marketplace</Button>
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
