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
import { Button } from '~/components/ui/button';
import { Badge } from '~/components/ui/badge';
import { Input } from '~/components/ui/input';
import { Progress } from '~/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import {
  IconCamera,
  IconQrcode,
  IconBarcode,
  IconListDetails,
  IconHistory,
  IconAlertTriangle,
  IconCheck,
  IconUpload,
  IconRefresh,
  IconPlus,
  IconSearch,
  IconTruckDelivery,
  IconPackage,
} from '@tabler/icons-react';

// Sample inventory data
const inventoryItems = [
  {
    id: 'INV-001',
    name: 'Rice (Jasmine)',
    category: 'Grains',
    quantity: '15.2 tons',
    location: 'Warehouse A, Section 2',
    storageDays: 45,
    maxStorageDays: 180,
    qualityStatus: 'Excellent',
    lastChecked: '2024-04-10',
    barcode: '10056782',
    expiryDate: '2024-10-15',
    price: '$420/ton',
    imageUrl: '/inventory/rice.jpg',
    notes: 'Premium quality jasmine rice from latest harvest.',
  },
  {
    id: 'INV-002',
    name: 'Wheat (Hard Red)',
    category: 'Grains',
    quantity: '25.5 tons',
    location: 'Warehouse A, Section 4',
    storageDays: 60,
    maxStorageDays: 240,
    qualityStatus: 'Good',
    lastChecked: '2024-04-05',
    barcode: '10056783',
    expiryDate: '2025-01-20',
    price: '$340/ton',
    imageUrl: '/inventory/wheat.jpg',
    notes: 'Well-stored, maintained at optimal humidity levels.',
  },
  {
    id: 'INV-003',
    name: 'Corn (Sweet)',
    category: 'Grains',
    quantity: '8.7 tons',
    location: 'Warehouse B, Section 1',
    storageDays: 30,
    maxStorageDays: 120,
    qualityStatus: 'Warning',
    lastChecked: '2024-04-12',
    barcode: '10056784',
    expiryDate: '2024-08-05',
    price: '$260/ton',
    imageUrl: '/inventory/corn.jpg',
    notes: 'Some units showing signs of moisture, needs rotation.',
  },
  {
    id: 'INV-004',
    name: 'Tomatoes (Roma)',
    category: 'Vegetables',
    quantity: '1.8 tons',
    location: 'Cold Storage, Unit 3',
    storageDays: 12,
    maxStorageDays: 21,
    qualityStatus: 'Good',
    lastChecked: '2024-04-14',
    barcode: '10056785',
    expiryDate: '2024-04-26',
    price: '$850/ton',
    imageUrl: '/inventory/tomatoes.jpg',
    notes:
      'Maintaining color and firmness well, optimal temperature maintained.',
  },
  {
    id: 'INV-005',
    name: 'Soybeans (Non-GMO)',
    category: 'Legumes',
    quantity: '12.4 tons',
    location: 'Warehouse A, Section 5',
    storageDays: 55,
    maxStorageDays: 270,
    qualityStatus: 'Excellent',
    lastChecked: '2024-04-03',
    barcode: '10056786',
    expiryDate: '2024-12-25',
    price: '$470/ton',
    imageUrl: '/inventory/soybeans.jpg',
    notes: 'Premium quality non-GMO soybeans, certified organic.',
  },
];

// Sample scan history
const scanHistory = [
  {
    id: 'SCAN-001',
    itemId: 'INV-001',
    itemName: 'Rice (Jasmine)',
    scannedBy: 'John Smith',
    timestamp: '2024-04-10 14:32',
    notes: 'Quality check complete, no issues found.',
    qualityStatus: 'Excellent',
  },
  {
    id: 'SCAN-002',
    itemId: 'INV-003',
    itemName: 'Corn (Sweet)',
    scannedBy: 'Maria Garcia',
    timestamp: '2024-04-12 10:15',
    notes:
      'Found 2 pallets with higher than normal moisture content. Flagged for rotation.',
    qualityStatus: 'Warning',
  },
  {
    id: 'SCAN-003',
    itemId: 'INV-004',
    itemName: 'Tomatoes (Roma)',
    scannedBy: 'John Smith',
    timestamp: '2024-04-14 09:45',
    notes: 'Freshness verified, temperature and humidity optimal.',
    qualityStatus: 'Good',
  },
  {
    id: 'SCAN-004',
    itemId: 'INV-002',
    itemName: 'Wheat (Hard Red)',
    scannedBy: 'Robert Chen',
    timestamp: '2024-04-05 16:20',
    notes:
      'Full inspection completed. Moisture levels within acceptable range.',
    qualityStatus: 'Good',
  },
  {
    id: 'SCAN-005',
    itemId: 'INV-005',
    itemName: 'Soybeans (Non-GMO)',
    scannedBy: 'Maria Garcia',
    timestamp: '2024-04-03 11:10',
    notes: 'Verified organic certification. Storage conditions excellent.',
    qualityStatus: 'Excellent',
  },
];

export default function InventoryScannerPage() {
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
                <h1 className="mb-2 text-2xl font-bold">Inventory Scanner</h1>
                <p className="text-muted-foreground mb-6">
                  Scan, track, and manage your farm inventory
                </p>
              </div>

              <Tabs defaultValue="scan" className="px-4 lg:px-6">
                <TabsList className="mb-4">
                  <TabsTrigger value="scan">Scan Items</TabsTrigger>
                  <TabsTrigger value="inventory">Inventory List</TabsTrigger>
                  <TabsTrigger value="equipment">Equipment</TabsTrigger>
                </TabsList>

                <TabsContent value="scan" className="mt-0">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Scan Inventory Item</CardTitle>
                      <CardDescription>
                        Use your device camera or enter barcode manually
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex w-full items-center space-x-2">
                        <Input
                          type="text"
                          placeholder="Enter barcode manually"
                        />
                        <Button type="submit" className="flex-shrink-0">
                          <IconSearch className="mr-2 h-4 w-4" />
                          Search
                        </Button>
                      </div>

                      <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-10">
                        <IconBarcode className="text-muted-foreground mb-4 h-10 w-10" />
                        <p className="text-muted-foreground mb-4 text-center">
                          Point your camera at a barcode to scan
                        </p>
                        <Button>Open Camera Scanner</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="inventory" className="mt-0">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Input
                        placeholder="Search inventory..."
                        className="max-w-sm"
                      />
                      <Button variant="outline">
                        <IconSearch className="mr-2 h-4 w-4" />
                        Search
                      </Button>
                    </div>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle>Current Inventory</CardTitle>
                        <CardDescription>
                          All farm supplies and resources
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="bg-muted/20 rounded-lg p-4">
                            <div className="mb-2 flex items-center justify-between">
                              <h3 className="font-medium">
                                Fertilizer (NPK 15-15-15)
                              </h3>
                              <Badge className="border-0 bg-green-100 text-green-800">
                                In Stock
                              </Badge>
                            </div>
                            <div className="mb-2 grid grid-cols-2 gap-4 md:grid-cols-4">
                              <div>
                                <p className="text-muted-foreground text-sm">
                                  Quantity
                                </p>
                                <p className="font-medium">15 bags</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground text-sm">
                                  Location
                                </p>
                                <p className="font-medium">Storage A</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground text-sm">
                                  Last Updated
                                </p>
                                <p className="font-medium">May 10, 2024</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground text-sm">
                                  SKU
                                </p>
                                <p className="font-medium">FRT-NPK-15</p>
                              </div>
                            </div>
                          </div>

                          <div className="bg-muted/20 rounded-lg p-4">
                            <div className="mb-2 flex items-center justify-between">
                              <h3 className="font-medium">
                                Seed (Rice, Jasmine)
                              </h3>
                              <Badge className="border-0 bg-amber-100 text-amber-800">
                                Low Stock
                              </Badge>
                            </div>
                            <div className="mb-2 grid grid-cols-2 gap-4 md:grid-cols-4">
                              <div>
                                <p className="text-muted-foreground text-sm">
                                  Quantity
                                </p>
                                <p className="font-medium">2 bags</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground text-sm">
                                  Location
                                </p>
                                <p className="font-medium">Storage B</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground text-sm">
                                  Last Updated
                                </p>
                                <p className="font-medium">April 25, 2024</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground text-sm">
                                  SKU
                                </p>
                                <p className="font-medium">SEED-RCE-JSM</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="equipment" className="mt-0">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle>Farm Equipment</CardTitle>
                      <CardDescription>
                        Tractors, tools, and machinery inventory
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="bg-muted/20 rounded-lg p-4">
                          <div className="mb-2 flex items-center justify-between">
                            <h3 className="font-medium">
                              Tractor (John Deere 5045E)
                            </h3>
                            <Badge className="border-0 bg-green-100 text-green-800">
                              Operational
                            </Badge>
                          </div>
                          <div className="mb-2 grid grid-cols-2 gap-4 md:grid-cols-4">
                            <div>
                              <p className="text-muted-foreground text-sm">
                                Asset ID
                              </p>
                              <p className="font-medium">TR-JD-5045</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground text-sm">
                                Location
                              </p>
                              <p className="font-medium">Equipment Shed</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground text-sm">
                                Last Service
                              </p>
                              <p className="font-medium">April 15, 2024</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground text-sm">
                                Next Service
                              </p>
                              <p className="font-medium">July 15, 2024</p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-muted/20 rounded-lg p-4">
                          <div className="mb-2 flex items-center justify-between">
                            <h3 className="font-medium">
                              Irrigation Pump (Honda WB30X)
                            </h3>
                            <Badge className="border-0 bg-red-100 text-red-800">
                              Maintenance
                            </Badge>
                          </div>
                          <div className="mb-2 grid grid-cols-2 gap-4 md:grid-cols-4">
                            <div>
                              <p className="text-muted-foreground text-sm">
                                Asset ID
                              </p>
                              <p className="font-medium">IR-HND-WB30</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground text-sm">
                                Location
                              </p>
                              <p className="font-medium">Storage A</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground text-sm">
                                Last Service
                              </p>
                              <p className="font-medium">March 20, 2024</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground text-sm">
                                Next Service
                              </p>
                              <p className="font-medium">May 20, 2024</p>
                            </div>
                          </div>
                        </div>
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
