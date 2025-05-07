'use client';

import { Link } from 'react-router';
import { useLoaderData } from 'react-router';
import { useState } from 'react';
import { loader } from './route.server';

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
  IconUsers,
  IconSettings,
  IconChartBar,
  IconLeaf,
  IconTag,
  IconPackage,
  IconX,
} from '@tabler/icons-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '~/components/ui/dialog';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  Cell
} from 'recharts';

// Product details modal component
interface Product {
  ProductID: number;
  ProductName: string;
  VarietyName: string;
  CategoryName: string;
}

interface ProductDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  entityName: string;
  entityType: 'buyer' | 'seller';
}

function ProductDetailsModal({ isOpen, onClose, products, entityName, entityType }: ProductDetailsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>
              {entityType === 'buyer' ? 'Products of Interest' : 'Products Offered'} - {entityName}
            </span>
            <DialogClose className="rounded-full opacity-70 ring-offset-background transition-opacity hover:opacity-100">
              <IconX className="h-4 w-4" />
            </DialogClose>
          </DialogTitle>
          <DialogDescription>
            {entityType === 'buyer' 
              ? 'Products this buyer is interested in purchasing' 
              : 'Products this seller currently offers'}
          </DialogDescription>
        </DialogHeader>
        
        {products.length === 0 ? (
          <div className="py-6 text-center">
            <p className="text-muted-foreground">No products found</p>
          </div>
        ) : (
          <div className="grid gap-4 py-4">
            {products.map((product) => (
              <div key={product.ProductID} className="rounded-lg border p-4">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="rounded bg-primary/10 p-2">
                      {product.CategoryName.includes('Fruit') ? (
                        <IconLeaf className="h-4 w-4 text-green-600" />
                      ) : product.CategoryName.includes('Vegetable') ? (
                        <IconLeaf className="h-4 w-4 text-green-500" />
                      ) : (
                        <IconPackage className="h-4 w-4 text-amber-600" />
                      )}
                    </div>
                    <h4 className="font-medium">{product.ProductName}</h4>
                  </div>
                  <Badge 
                    className="border-0" 
                    style={{
                      backgroundColor: product.CategoryName.includes('Fruit') 
                        ? 'rgba(220, 252, 231, 1)' 
                        : product.CategoryName.includes('Vegetable')
                        ? 'rgba(209, 250, 229, 1)'
                        : 'rgba(254, 243, 199, 1)',
                      color: product.CategoryName.includes('Fruit')
                        ? 'rgba(22, 101, 52, 1)'
                        : product.CategoryName.includes('Vegetable')
                        ? 'rgba(6, 95, 70, 1)'
                        : 'rgba(146, 64, 14, 1)'
                    }}
                  >
                    {product.CategoryName}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-muted-foreground text-sm">Variety</p>
                    <p className="font-medium">{product.VarietyName}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Price</p>
                    <p className="font-medium">${(Math.random() * 10 + 2).toFixed(2)}/kg</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Stock</p>
                    <p className="font-medium">{Math.floor(Math.random() * 1000) + 100} kg</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-sm">Rating</p>
                    <div className="flex text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <IconStar 
                          key={i} 
                          className="h-4 w-4"
                          fill={i < 4 ? "currentColor" : "none"}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export { loader };

export default function BuyersAndSellersPage() {
  const { 
    buyers, 
    sellers, 
    buyerProducts, 
    sellerProducts, 
    productSalesData, 
    monthlySalesData,
    marketPriceTrends,
    marketDemandSupply,
    marketRegionalStats,
    formattedPriceTrends
  } = useLoaderData<{
    buyers: any[];
    sellers: any[];
    buyerProducts: any[];
    sellerProducts: any[];
    productSalesData: any[];
    monthlySalesData: any[];
    marketPriceTrends: any[];
    marketDemandSupply: any[];
    marketRegionalStats: any[];
    formattedPriceTrends: {
      rice: {month: string, price: number, change: number}[];
      wheat: {month: string, price: number, change: number}[];
    };
  }>();

  // State for product details modal
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [selectedEntityName, setSelectedEntityName] = useState('');
  const [selectedEntityType, setSelectedEntityType] = useState<'buyer' | 'seller'>('buyer');

  // Handler for clicking on a buyer or seller name
  const handleEntityClick = (entityId: number, entityName: string, type: 'buyer' | 'seller') => {
    let products: Product[] = [];
    
    if (type === 'buyer') {
      const buyerProductData = buyerProducts.find(bp => bp.buyerId === entityId);
      products = buyerProductData ? buyerProductData.products : [];
    } else {
      const sellerProductData = sellerProducts.find(sp => sp.sellerId === entityId);
      products = sellerProductData ? sellerProductData.products : [];
    }
    
    setSelectedProducts(products);
    setSelectedEntityName(entityName);
    setSelectedEntityType(type);
    setIsProductModalOpen(true);
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
                <h1 className="mb-2 text-2xl font-bold">Buyers & Sellers</h1>
                <p className="text-muted-foreground mb-6">
                  Connect with buyers and suppliers in your network
                </p>
              </div>

              <div className="px-4 lg:px-6 flex justify-end gap-2 mb-2">
                <Button variant="outline" onClick={() => window.location.href = '/buyers'}>
                  <IconUsers className="mr-2 h-4 w-4" />
                  Manage Buyers
                </Button>
                <Button variant="outline" onClick={() => window.location.href = '/sellers'}>
                  <IconSettings className="mr-2 h-4 w-4" />
                  Manage Sellers
                </Button>
              </div>

              <Tabs defaultValue="buyers" className="px-4 lg:px-6">
                <TabsList className="mb-4">
                  <TabsTrigger value="buyers">
                    <span>Buyers</span>
                  </TabsTrigger>
                  <TabsTrigger value="sellers">
                    <span>Suppliers</span>
                  </TabsTrigger>
                  <TabsTrigger value="marketplace">
                    <span>Marketplace</span>
                  </TabsTrigger>
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

                    {/* Market analysis charts for buyers */}
                    <Card className="overflow-hidden">
                      <CardHeader>
                        <CardTitle>Buyer Market Analysis</CardTitle>
                        <CardDescription>
                          Product demand and purchase trends
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-6 lg:grid-cols-2">
                          <div>
                            <h3 className="mb-4 text-sm font-medium">Monthly Purchase Trends</h3>
                            <div className="h-80">
                              <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                  data={monthlySalesData}
                                  margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 30,
                                  }}
                                >
                                  <CartesianGrid strokeDasharray="3 3" />
                                  <XAxis dataKey="month" />
                                  <YAxis />
                                  <Tooltip />
                                  <Legend />
                                  <Line
                                    type="monotone"
                                    dataKey="fruits"
                                    name="Fruits"
                                    stroke="#16a34a"
                                    activeDot={{ r: 8 }}
                                  />
                                  <Line
                                    type="monotone"
                                    dataKey="vegetables"
                                    name="Vegetables"
                                    stroke="#059669"
                                  />
                                  <Line
                                    type="monotone"
                                    dataKey="grains"
                                    name="Grains"
                                    stroke="#d97706"
                                  />
                                </LineChart>
                              </ResponsiveContainer>
                            </div>
                          </div>
                          <div>
                            <h3 className="mb-4 text-sm font-medium">Product Category Demand</h3>
                            <div className="h-80">
                              <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                  <Pie
                                    data={productSalesData}
                                    dataKey="TotalQuantity"
                                    nameKey="CategoryName"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    label={(entry) => entry.CategoryName}
                                  >
                                    {productSalesData.map((_, index) => (
                                      <Cell 
                                        key={`cell-${index}`} 
                                        fill={[
                                          '#16a34a', '#059669', '#d97706', 
                                          '#2563eb', '#7c3aed', '#db2777'
                                        ][index % 6]} 
                                      />
                                    ))}
                                  </Pie>
                                  <Tooltip formatter={(value, name) => [`${value} units`, name]} />
                                  <Legend />
                                </PieChart>
                              </ResponsiveContainer>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>


                    <Card className="mt-6">
                      <CardHeader className="pb-2">
                        <CardTitle>Manage Buyers</CardTitle>
                        <CardDescription>
                          Add, view, update, or remove buyer relationships
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-end mb-4">
                          <Button 
                            size="sm" 
                            className="gap-1"
                            onClick={() => window.location.href = '/buyers'}
                          >
                            Add New Buyer
                          </Button>
                        </div>
                        <div className="rounded-md border">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b bg-muted/50">
                                <th className="py-3 px-4 text-left font-medium">Buyer Name</th>
                                <th className="py-3 px-4 text-left font-medium">Interested In</th>
                                <th className="py-3 px-4 text-left font-medium">Location</th>
                                <th className="py-3 px-4 text-left font-medium">Status</th>
                                <th className="py-3 px-4 text-right font-medium">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {buyers && buyers.length > 0 ? (
                                buyers.map((buyer: any) => (
                                  <tr key={buyer.UserID} className="border-b">
                                    <td className="py-3 px-4">
                                      <span 
                                        className="cursor-pointer hover:text-primary hover:underline"
                                        onClick={() => handleEntityClick(buyer.UserID, buyer.Name, "buyer")}
                                      >
                                        {buyer.Name}
                                      </span>
                                    </td>
                                    <td className="py-3 px-4">
                                      {buyerProducts.find(bp => bp.buyerId === buyer.UserID)?.products.slice(0, 2).map((p: any) => p.ProductName).join(', ')}
                                    </td>
                                    <td className="py-3 px-4">{[buyer.AddressLine1, buyer.AddressLine2, buyer.Zip].filter(Boolean).join(', ')}</td>
                                    <td className="py-3 px-4">
                                      <Badge className="border-0 bg-green-100 text-green-800">Active</Badge>
                                    </td>
                                    <td className="py-3 px-4">
                                      <div className="flex justify-end gap-2">
                                        <Button variant="outline" size="sm">View</Button>
                                        <Button variant="outline" size="sm">Edit</Button>
                                        <Button variant="destructive" size="sm">Delete</Button>
                                      </div>
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <>
                                  <tr className="border-b">
                                    <td className="py-3 px-4">
                                      <span 
                                        className="cursor-pointer hover:text-primary hover:underline"
                                        onClick={() => handleEntityClick(1, "Green Valley Organics", "buyer")}
                                      >
                                        Green Valley Organics
                                      </span>
                                    </td>
                                    <td className="py-3 px-4">Organic Rice, Wheat</td>
                                    <td className="py-3 px-4">Portland, OR</td>
                                    <td className="py-3 px-4">
                                      <Badge className="border-0 bg-green-100 text-green-800">Active</Badge>
                                    </td>
                                    <td className="py-3 px-4">
                                      <div className="flex justify-end gap-2">
                                        <Button variant="outline" size="sm">View</Button>
                                        <Button variant="outline" size="sm">Edit</Button>
                                        <Button variant="destructive" size="sm">Delete</Button>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr className="border-b">
                                    <td className="py-3 px-4">
                                      <span 
                                        className="cursor-pointer hover:text-primary hover:underline"
                                        onClick={() => handleEntityClick(2, "Midwest Grain Processing", "buyer")}
                                      >
                                        Midwest Grain Processing
                                      </span>
                                    </td>
                                    <td className="py-3 px-4">Corn, Soybeans, Wheat</td>
                                    <td className="py-3 px-4">Des Moines, IA</td>
                                    <td className="py-3 px-4">
                                      <Badge className="border-0 bg-green-100 text-green-800">Active</Badge>
                                    </td>
                                    <td className="py-3 px-4">
                                      <div className="flex justify-end gap-2">
                                        <Button variant="outline" size="sm">View</Button>
                                        <Button variant="outline" size="sm">Edit</Button>
                                        <Button variant="destructive" size="sm">Delete</Button>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="py-3 px-4">
                                      <span 
                                        className="cursor-pointer hover:text-primary hover:underline"
                                        onClick={() => handleEntityClick(3, "Farm Fresh Foods", "buyer")}
                                      >
                                        Farm Fresh Foods
                                      </span>
                                    </td>
                                    <td className="py-3 px-4">Fruits, Vegetables</td>
                                    <td className="py-3 px-4">Chicago, IL</td>
                                    <td className="py-3 px-4">
                                      <Badge className="border-0 bg-yellow-100 text-yellow-800">Pending</Badge>
                                    </td>
                                    <td className="py-3 px-4">
                                      <div className="flex justify-end gap-2">
                                        <Button variant="outline" size="sm">View</Button>
                                        <Button variant="outline" size="sm">Edit</Button>
                                        <Button variant="destructive" size="sm">Delete</Button>
                                      </div>
                                    </td>
                                  </tr>
                                </>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" size="sm">Previous</Button>
                        <div className="text-sm text-muted-foreground">
                          Page 1 of 2
                        </div>
                        <Button variant="outline" size="sm">Next</Button>
                      </CardFooter>
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

                    {/* Market analysis charts for sellers */}
                    <Card className="overflow-hidden">
                      <CardHeader>
                        <CardTitle>Supplier Market Analysis</CardTitle>
                        <CardDescription>
                          Product supply and distribution trends
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-6 lg:grid-cols-2">
                          <div>
                            <h3 className="mb-4 text-sm font-medium">Monthly Supply Volumes</h3>
                            <div className="h-80">
                              <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                  data={monthlySalesData}
                                  margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 30,
                                  }}
                                >
                                  <CartesianGrid strokeDasharray="3 3" />
                                  <XAxis dataKey="month" />
                                  <YAxis />
                                  <Tooltip />
                                  <Legend />
                                  <Bar 
                                    dataKey="fruits" 
                                    name="Fruits" 
                                    fill="#16a34a" 
                                  />
                                  <Bar 
                                    dataKey="vegetables" 
                                    name="Vegetables" 
                                    fill="#059669" 
                                  />
                                  <Bar 
                                    dataKey="grains" 
                                    name="Grains" 
                                    fill="#d97706" 
                                  />
                                </BarChart>
                              </ResponsiveContainer>
                            </div>
                          </div>
                          <div>
                            <h3 className="mb-4 text-sm font-medium">Product Category Distribution</h3>
                            <div className="h-80">
                              <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                  layout="vertical"
                                  data={productSalesData}
                                  margin={{
                                    top: 5,
                                    right: 30,
                                    left: 60,
                                    bottom: 5,
                                  }}
                                >
                                  <CartesianGrid strokeDasharray="3 3" />
                                  <XAxis type="number" />
                                  <YAxis type="category" dataKey="CategoryName" />
                                  <Tooltip />
                                  <Legend />
                                  <Bar 
                                    dataKey="ProductCount" 
                                    name="Number of Products" 
                                    fill="#2563eb" 
                                  />
                                  <Bar 
                                    dataKey="TotalQuantity" 
                                    name="Total Quantity" 
                                    fill="#7c3aed" 
                                  />
                                </BarChart>
                              </ResponsiveContainer>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

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
                                <h3 
                                  className="font-medium cursor-pointer hover:text-primary hover:underline"
                                  onClick={() => handleEntityClick(1, "AgriSupply Co.", "seller")}
                                >
                                  AgriSupply Co.
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
                                <h3 
                                  className="font-medium cursor-pointer hover:text-primary hover:underline"
                                  onClick={() => handleEntityClick(2, "Farm Equipment Inc.", "seller")}
                                >
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

                    <Card className="mt-6">
                      <CardHeader className="pb-2">
                        <CardTitle>Manage Suppliers</CardTitle>
                        <CardDescription>
                          Add, view, update, or remove supplier relationships
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-end mb-4">
                          <Button 
                            size="sm" 
                            className="gap-1"
                            onClick={() => window.location.href = '/sellers'}
                          >
                            Add New Supplier
                          </Button>
                        </div>
                        <div className="rounded-md border">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b bg-muted/50">
                                <th className="py-3 px-4 text-left font-medium">Supplier Name</th>
                                <th className="py-3 px-4 text-left font-medium">Products</th>
                                <th className="py-3 px-4 text-left font-medium">Location</th>
                                <th className="py-3 px-4 text-left font-medium">Status</th>
                                <th className="py-3 px-4 text-right font-medium">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {sellers && sellers.length > 0 ? (
                                sellers.map((seller: any) => (
                                  <tr key={seller.LicenseID} className="border-b">
                                    <td className="py-3 px-4">
                                      <span 
                                        className="cursor-pointer hover:text-primary hover:underline"
                                        onClick={() => handleEntityClick(seller.LicenseID, seller.Name, "seller")}
                                      >
                                        {seller.Name}
                                      </span>
                                    </td>
                                    <td className="py-3 px-4">
                                      {sellerProducts.find(sp => sp.sellerId === seller.LicenseID)?.products.slice(0, 2).map((p: any) => p.ProductName).join(', ')}
                                    </td>
                                    <td className="py-3 px-4">{[seller.AddressLine1, seller.AddressLine2, seller.Zip].filter(Boolean).join(', ')}</td>
                                    <td className="py-3 px-4">
                                      <Badge className="border-0 bg-green-100 text-green-800">Active</Badge>
                                    </td>
                                    <td className="py-3 px-4">
                                      <div className="flex justify-end gap-2">
                                        <Button variant="outline" size="sm">View</Button>
                                        <Button variant="outline" size="sm">Edit</Button>
                                        <Button variant="destructive" size="sm">Delete</Button>
                                      </div>
                                    </td>
                                  </tr>
                                ))
                              ) : (
                                <>
                                  <tr className="border-b">
                                    <td className="py-3 px-4">
                                      <span 
                                        className="cursor-pointer hover:text-primary hover:underline"
                                        onClick={() => handleEntityClick(1, "AgriSupply Co.", "seller")}
                                      >
                                        AgriSupply Co.
                                      </span>
                                    </td>
                                    <td className="py-3 px-4">Seeds, Fertilizers, Tools</td>
                                    <td className="py-3 px-4">Lincoln, NE</td>
                                    <td className="py-3 px-4">
                                      <Badge className="border-0 bg-green-100 text-green-800">Active</Badge>
                                    </td>
                                    <td className="py-3 px-4">
                                      <div className="flex justify-end gap-2">
                                        <Button variant="outline" size="sm">View</Button>
                                        <Button variant="outline" size="sm">Edit</Button>
                                        <Button variant="destructive" size="sm">Delete</Button>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr className="border-b">
                                    <td className="py-3 px-4">
                                      <span 
                                        className="cursor-pointer hover:text-primary hover:underline"
                                        onClick={() => handleEntityClick(2, "Farm Equipment Inc.", "seller")}
                                      >
                                        Farm Equipment Inc.
                                      </span>
                                    </td>
                                    <td className="py-3 px-4">Tractors, Irrigation Systems</td>
                                    <td className="py-3 px-4">Kansas City, MO</td>
                                    <td className="py-3 px-4">
                                      <Badge className="border-0 bg-green-100 text-green-800">Active</Badge>
                                    </td>
                                    <td className="py-3 px-4">
                                      <div className="flex justify-end gap-2">
                                        <Button variant="outline" size="sm">View</Button>
                                        <Button variant="outline" size="sm">Edit</Button>
                                        <Button variant="destructive" size="sm">Delete</Button>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="py-3 px-4">
                                      <span 
                                        className="cursor-pointer hover:text-primary hover:underline"
                                        onClick={() => handleEntityClick(3, "Organic Seed Supply", "seller")}
                                      >
                                        Organic Seed Supply
                                      </span>
                                    </td>
                                    <td className="py-3 px-4">Organic Seeds, Fertilizers</td>
                                    <td className="py-3 px-4">Portland, OR</td>
                                    <td className="py-3 px-4">
                                      <Badge className="border-0 bg-yellow-100 text-yellow-800">Pending</Badge>
                                    </td>
                                    <td className="py-3 px-4">
                                      <div className="flex justify-end gap-2">
                                        <Button variant="outline" size="sm">View</Button>
                                        <Button variant="outline" size="sm">Edit</Button>
                                        <Button variant="destructive" size="sm">Delete</Button>
                                      </div>
                                    </td>
                                  </tr>
                                </>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" size="sm">Previous</Button>
                        <div className="text-sm text-muted-foreground">
                          Page 1 of 3
                        </div>
                        <Button variant="outline" size="sm">Next</Button>
                      </CardFooter>
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
                      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="rounded-lg border p-4">
                          <h3 className="mb-3 text-lg font-medium">Market Price Trends</h3>
                          <div className="h-64 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                              <LineChart data={formattedPriceTrends.rice}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line 
                                  type="monotone" 
                                  dataKey="price" 
                                  name="Rice Price" 
                                  stroke="#8884d8" 
                                  activeDot={{ r: 8 }} 
                                />
                              </LineChart>
                            </ResponsiveContainer>
                          </div>
                          <div className="mt-3 text-sm">
                            <p className="text-muted-foreground">Current rice price trends based on market data</p>
                            <div className="mt-2 grid grid-cols-2 gap-2">
                              <div>
                                <p className="font-medium">Latest:</p>
                                <p className="text-muted-foreground">${formattedPriceTrends.rice[0]?.price || 'N/A'}</p>
                              </div>
                              <div>
                                <p className="font-medium">Change:</p>
                                <p className={`${formattedPriceTrends.rice[0]?.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                  {formattedPriceTrends.rice[0]?.change >= 0 ? '+' : ''}{formattedPriceTrends.rice[0]?.change}%
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="rounded-lg border p-4">
                          <h3 className="mb-3 text-lg font-medium">Supply & Demand</h3>
                          <div className="h-64 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                              <BarChart data={marketDemandSupply}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="ProductName" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="Demand" fill="#8884d8" />
                                <Bar dataKey="Supply" fill="#82ca9d" />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                          <div className="mt-3 text-sm">
                            <p className="text-muted-foreground">Current supply and demand for key agricultural products</p>
                            <div className="mt-2">
                              <p className="font-medium">Market Insight:</p>
                              <p className="text-muted-foreground">
                                {marketDemandSupply[0]?.SupplyGapPercent > 5
                                  ? 'Supply shortage detected. Prices expected to rise.'
                                  : marketDemandSupply[0]?.SupplyGapPercent < 0
                                  ? 'Supply surplus detected. Prices may decrease.'
                                  : 'Market is currently balanced.'}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <h3 className="mb-3 text-lg font-medium">Regional Consumption Patterns</h3>
                      <div className="mb-6 overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="border-b">
                              <th className="py-2 text-left font-medium">Region</th>
                              <th className="py-2 text-left font-medium">Product</th>
                              <th className="py-2 text-left font-medium">Consumption</th>
                              <th className="py-2 text-left font-medium">Market Opportunity</th>
                            </tr>
                          </thead>
                          <tbody>
                            {marketRegionalStats.map((stat, i) => (
                              <tr key={i} className="border-b hover:bg-muted/50">
                                <td className="py-2">{stat.Region}</td>
                                <td className="py-2">{stat.ProductName}</td>
                                <td className="py-2">{Number(stat.Consumption).toLocaleString()}</td>
                                <td className="py-2">
                                  <Badge className={
                                    Number(stat.Consumption) > 1000000 ? 'bg-green-100 text-green-800' : 
                                    Number(stat.Consumption) > 500000 ? 'bg-yellow-100 text-yellow-800' : 
                                    'bg-blue-100 text-blue-800'
                                  }>
                                    {Number(stat.Consumption) > 1000000 ? 'High' : 
                                     Number(stat.Consumption) > 500000 ? 'Medium' : 'Low'}
                                  </Badge>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      
                      <div className="mt-4 flex justify-between">
                        <Button asChild variant="outline">
                          <Link to="/market-analysis">View Full Market Analysis</Link>
                        </Button>
                        <Button>Connect With Partners</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </SidebarInset>

      {/* Render the ProductDetailsModal */}
      <ProductDetailsModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        products={selectedProducts}
        entityName={selectedEntityName}
        entityType={selectedEntityType}
      />
    </SidebarProvider>
  );
} 