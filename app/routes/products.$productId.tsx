import { useLoaderData, useFetcher } from 'react-router';
import type { LoaderFunctionArgs } from 'react-router';

import { Button } from '~/components/ui/button';
import { DashboardCard } from '~/components/dashboard-card';
import { getDatabaseConnection } from '~/lib/database.server';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';

import { SiteHeader } from '~/components/site-header';
import type { ActionFunctionArgs } from 'react-router';
import type {
  ProductuctionHistory,
  SeasonalProductionHistory,
} from '~/types/product';
import { AppSidebar } from '~/components/navigation/app-sidebar';
import { SidebarInset, SidebarProvider } from '~/components/ui/sidebar';

import {
  LineChart,
  BarChart,
  ChartLegend,
  ChartTooltip,
  ChartContainer,
} from '~/components/ui/chart-new';

import { Badge } from '~/components/ui/badge';
import { Card, CardContent } from '~/components/ui/card';
import {
  Download,
  Leaf,
  Sun,
  Cloud,
  Droplets,
  Plus,
  Pencil,
  Trash2,
} from 'lucide-react';

import {
  Select,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectContent,
} from '~/components/ui/select';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';

import { Input } from '~/components/ui/input';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

export async function loader({ params }: LoaderFunctionArgs) {
  const { productId } = params;
  if (!productId) throw new Response('Product ID is required', { status: 400 });

  const db = await getDatabaseConnection({ init: false });

  const [productionHistoryRows] = await db.query(
    `
		SELECT
			p.ProductID,
			p.ProductName,
			p.Quantity,
			pv.VarietyName,
			ps.SeasonalityName,
			pc.CategoryName,
			ph.HistoryID,
			ph.Year,
			ph.Acreage,
			ph.Yield,
			ph.CostPerAcre,
			ph.PricePerTon
		FROM
			PRODUCTION_HISTORY_T ph
		JOIN
			PRODUCT_T p ON ph.ProductID = p.ProductID
		JOIN
			PRODUCT_VARIETY_T pv ON p.VarietyID = pv.VarietyID
		JOIN
			PRODUCT_CATEGORY_T pc ON pv.CategoryID = pc.CategoryID
		JOIN
			PRODUCT_SEASONALITY_T ps ON p.SeasonalityID = ps.SeasonalityID
		WHERE
			ph.ProductID = ?
		ORDER BY
			year DESC;
	`,
    [productId]
  );

  const [seasonalProductionRows] = await db.query(
    `SELECT Season, SUM(ProductionVolume) AS Volume
		FROM SEASONAL_PRODUCTION_T
		WHERE ProductID = ?
		GROUP BY Season;
		`,
    [productId]
  );

  const productionHistory = productionHistoryRows as ProductuctionHistory[];

  const seasonalProduction =
    seasonalProductionRows as SeasonalProductionHistory[];

  if (!productionHistory || productionHistory.length === 0) {
    throw new Response('No production history found', { status: 404 });
  }

  if (!seasonalProduction || seasonalProduction.length === 0) {
    throw new Response('No seasonal production data found', { status: 404 });
  }

  const productionHistoryData = {
    ProductID: productionHistory[0].ProductID,
    ProductName: productionHistory[0].ProductName,
    Quantity: productionHistory[0].Quantity,
    VarietyName: productionHistory[0].VarietyName,
    CategoryName: productionHistory[0].CategoryName,
    SeasonalityName: productionHistory[0].SeasonalityName,
    ProductionData: productionHistory.map((row) => ({
      HistoryID: row.HistoryID,
      Year: row.Year,
      Acreage: row.Acreage,
      Yield: row.Yield,
      CostPerAcre: row.CostPerAcre,
      PricePerTon: row.PricePerTon,
    })),
  };

  const seasonalProductionData = seasonalProduction.map((row) => ({
    Season: row.Season,
    Volume: row.Volume,
  }));

  return {
    productionHistoryData,
    seasonalProductionData,
  };
}

export async function action({ request, params }: ActionFunctionArgs) {
  const { productId } = params;
  if (!productId) throw new Response('Product ID is required', { status: 400 });

  const formData = await request.formData();
  const intent = formData.get('intent');

  switch (intent) {
    case 'add-production-history':
      return handleAddProductionHistory(productId, formData);

    case 'update-production-history':
      return handleUpdateProductionHistory(productId, formData);

    case 'delete-production-history':
      return handleDeleteProductionHistory(productId, formData);

    default:
      throw new Response('Invalid action', { status: 400 });
  }
}

async function handleAddProductionHistory(
  productId: string,
  formData: FormData
) {
  const db = await getDatabaseConnection({ init: false });

  await db.query(
    `INSERT INTO PRODUCTION_HISTORY_T (ProductID, Year, Acreage, Yield, CostPerAcre, PricePerTon)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      productId,
      formData.get('Year'),
      formData.get('Acreage'),
      formData.get('Yield'),
      formData.get('CostPerAcre'),
      formData.get('PricePerTon'),
    ]
  );

  return JSON.stringify({
    success: true,
    message: 'Production record added successfully',
  });
}

async function handleUpdateProductionHistory(
  productId: string,
  formData: FormData
) {
  const db = await getDatabaseConnection({ init: false });
  const recordId = formData.get('recordId');

  await db.query(
    `UPDATE PRODUCTION_HISTORY_T 
     SET Year = ?, Acreage = ?, Yield = ?, CostPerAcre = ?, PricePerTon = ?
     WHERE HistoryID = ? AND ProductID = ?`,
    [
      formData.get('Year'),
      formData.get('Acreage'),
      formData.get('Yield'),
      formData.get('CostPerAcre'),
      formData.get('PricePerTon'),
      recordId,
      productId,
    ]
  );

  return JSON.stringify({
    success: true,
    message: 'Production record updated successfully',
  });
}

async function handleDeleteProductionHistory(
  productId: string,
  formData: FormData
) {
  const db = await getDatabaseConnection({ init: false });
  const recordId = formData.get('recordId');

  await db.query(
    `DELETE FROM PRODUCTION_HISTORY_T 
     WHERE HistoryID = ? AND ProductID = ?`,
    [recordId, productId]
  );

  return JSON.stringify({
    success: true,
    message: 'Production record deleted successfully',
  });
}

const seasonalityToColor = {
  Winter: 'bg-blue-100 text-blue-800',
  Spring: 'bg-green-100 text-green-800',
  Summer: 'bg-yellow-100 text-yellow-800',
  Fall: 'bg-orange-100 text-orange-800',
  'Year-Round': 'bg-gray-100 text-gray-800',
  'Spring-Summer': 'bg-red-100 text-red-800',
  'Summer-Fall': 'bg-teal-100 text-teal-800',
  'Winter-Spring': 'bg-pink-100 text-pink-800',
  'Fall-Winter': 'bg-purple-100 text-purple-800',
} as const;

const seasonalNotes = {
  Winter: 'Ideal for planting in late fall, with a focus on frost resistance.',
  Spring: 'Best for planting in early spring, with a focus on rapid growth.',
  Summer: 'Harvesting season, focus on moisture management.',
  Fall: 'Ideal for planting in late summer, with a focus on soil preparation.',
  'Spring-Summer':
    'Best for planting in early spring, with a focus on rapid growth and irrigation.',
  'Summer-Fall':
    'Harvesting season, focus on moisture management and soil preparation.',
  'Winter-Spring':
    'Ideal for planting in late fall, with a focus on frost resistance and rapid growth.',
  'Fall-Winter':
    'Ideal for planting in late summer, with a focus on soil preparation and frost resistance.',
  'Year-Round':
    'Suitable for continuous growth, with a focus on irrigation management.',
} as const;

// Add this after the existing type definitions
const productionHistorySchema = z.object({
  Year: z.string().min(1, 'Year is required'),
  Acreage: z.string().min(1, 'Acreage is required'),
  Yield: z.string().min(1, 'Yield is required'),
  CostPerAcre: z.string().min(1, 'Cost per acre is required'),
  PricePerTon: z.string().min(1, 'Price per ton is required'),
});

type ProductionHistoryFormData = z.infer<typeof productionHistorySchema>;

function AddRecordDialog({
  productId,
  children,
}: {
  productId: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const fetcher = useFetcher();
  const isLoading = fetcher.state !== 'idle';

  const form = useForm<ProductionHistoryFormData>({
    resolver: zodResolver(productionHistorySchema),
    defaultValues: {
      Year: '',
      Acreage: '',
      Yield: '',
      CostPerAcre: '',
      PricePerTon: '',
    },
  });

  const onSubmit = (data: ProductionHistoryFormData) => {
    fetcher.submit(
      {
        intent: 'add-production-history',
        ...data,
      },
      { method: 'POST' }
    );
    setOpen(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Production Record</DialogTitle>
          <DialogDescription>
            Add a new production record for this product.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="Year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="2024" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Acreage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Acreage</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="100" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Yield"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Yield (bushels/acre)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="50" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="CostPerAcre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cost per Acre ($)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="200" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="PricePerTon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price per Ton ($)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="300" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Adding...' : 'Add Record'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

function UpdateRecordDialog({
  record,
  productId,
  children,
}: {
  record: {
    HistoryID: number;
    Year: number;
    Acreage: number;
    Yield: number;
    CostPerAcre: number;
    PricePerTon: number;
  };
  productId: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const fetcher = useFetcher();
  const isLoading = fetcher.state !== 'idle';

  const form = useForm<ProductionHistoryFormData>({
    resolver: zodResolver(productionHistorySchema),
    defaultValues: {
      Year: record.Year.toString(),
      Acreage: record.Acreage.toString(),
      Yield: record.Yield.toString(),
      CostPerAcre: record.CostPerAcre.toString(),
      PricePerTon: record.PricePerTon.toString(),
    },
  });

  const onSubmit = (data: ProductionHistoryFormData) => {
    fetcher.submit(
      {
        intent: 'update-production-history',
        recordId: record.HistoryID.toString(),
        ...data,
      },
      { method: 'POST' }
    );
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Production Record</DialogTitle>
          <DialogDescription>
            Update the production record for {record.Year}.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="Year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Acreage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Acreage</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Yield"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Yield (bushels/acre)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="CostPerAcre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cost per Acre ($)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="PricePerTon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price per Ton ($)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Updating...' : 'Update Record'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

function DeleteRecordDialog({
  record,
  productId,
  children,
}: {
  record: {
    HistoryID: number;
    Year: number;
    Acreage: number;
    Yield: number;
    CostPerAcre: number;
    PricePerTon: number;
  };
  productId: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const fetcher = useFetcher();
  const isLoading = fetcher.state !== 'idle';

  const handleDelete = () => {
    fetcher.submit(
      {
        intent: 'delete-production-history',
        recordId: record.HistoryID.toString(),
      },
      { method: 'POST' }
    );
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Production Record</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the production record for{' '}
            {record.Year}? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? 'Deleting...' : 'Delete Record'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function ProductDetailsPage() {
  const { productionHistoryData, seasonalProductionData } =
    useLoaderData<typeof loader>();

  console.log(
    'Production History Data:',
    productionHistoryData,
    seasonalProductionData
  );

  const priceHistoryData = {
    labels: [
      'Jan 2022',
      'Feb 2022',
      'Mar 2022',
      'Apr 2022',
      'May 2022',
      'Jun 2022',
      'Jul 2022',
      'Aug 2022',
      'Sep 2022',
      'Oct 2022',
      'Nov 2022',
      'Dec 2022',
      'Jan 2023',
      'Feb 2023',
      'Mar 2023',
      'Apr 2023',
      'May 2023',
      'Jun 2023',
      'Jul 2023',
      'Aug 2023',
      'Sep 2023',
    ],
    datasets: [
      {
        label: 'Wheat Price ($/ton)',
        data: [
          310, 315, 320, 325, 330, 335, 330, 325, 320, 315, 320, 325, 330, 335,
          340, 345, 350, 345, 340, 335, 330,
        ],
        borderColor: 'rgb(75, 192, 75)',
        backgroundColor: 'rgba(75, 192, 75, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  // Sample data for seasonal production chart
  const seasonalProductionChartData = {
    labels: seasonalProductionData.map((season) => season.Season),
    datasets: [
      {
        label: 'Production Volume (tons)',
        data: seasonalProductionData.map((season) => season.Volume),
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(75, 192, 75, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
        borderColor: [
          'rgb(54, 162, 235)',
          'rgb(75, 192, 75)',
          'rgb(255, 206, 86)',
          'rgb(255, 159, 64)',
        ],
        borderWidth: 2,
      },
    ],
  };

  // Sample data for demand vs supply chart
  const demandSupplyData = {
    labels: [
      'Jan 2023',
      'Feb 2023',
      'Mar 2023',
      'Apr 2023',
      'May 2023',
      'Jun 2023',
      'Jul 2023',
      'Aug 2023',
      'Sep 2023',
    ],
    datasets: [
      {
        label: 'Demand (tons)',
        data: [8500, 8200, 8400, 8600, 8800, 9000, 9200, 9000, 8800],
        borderColor: 'rgb(75, 192, 75)',
        backgroundColor: 'rgba(75, 192, 75, 0.1)',
        tension: 0.4,
      },
      {
        label: 'Supply (tons)',
        data: [8000, 7800, 8100, 8300, 8500, 8700, 8900, 8700, 8500],
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.1)',
        tension: 0.4,
      },
    ],
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
        <div className="space-y-6 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Product Details For: {productionHistoryData?.ProductName}
              </h1>
              <p className="text-muted-foreground">
                Comprehensive product information and analysis
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Select defaultValue="hard-red-winter">
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select Variety" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hard-red-winter">
                    Hard Red Winter
                  </SelectItem>
                  <SelectItem value="hard-red-spring">
                    Hard Red Spring
                  </SelectItem>
                  <SelectItem value="soft-red-winter">
                    Soft Red Winter
                  </SelectItem>
                  <SelectItem value="white">White Wheat</SelectItem>
                  <SelectItem value="durum">Durum</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export Data
              </Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Card className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm font-medium">
                      Current Price
                    </p>
                    <h3 className="mt-1 text-2xl font-bold">$330/ton</h3>
                    <div className="mt-2 flex items-center">
                      <span className="text-xs font-medium text-red-600">
                        -1.5% from last month
                      </span>
                    </div>
                  </div>
                  <div className="bg-primary/10 rounded-full p-3">
                    <Leaf className="text-primary h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm font-medium">
                      Current Supply
                    </p>
                    <h3 className="mt-1 text-2xl font-bold">8,500 tons</h3>
                    <div className="mt-2 flex items-center">
                      <span className="text-xs font-medium text-green-600">
                        +3.2% from last month
                      </span>
                    </div>
                  </div>
                  <div className="bg-primary/10 rounded-full p-3">
                    <Sun className="text-primary h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm font-medium">
                      Current Demand
                    </p>
                    <h3 className="mt-1 text-2xl font-bold">8,800 tons</h3>
                    <div className="mt-2 flex items-center">
                      <span className="text-xs font-medium text-red-600">
                        -2.2% from last month
                      </span>
                    </div>
                  </div>
                  <div className="bg-primary/10 rounded-full p-3">
                    <Cloud className="text-primary h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="md:col-span-2">
              <DashboardCard
                title="Product Information"
                description={productionHistoryData?.ProductName}
              >
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="mb-2 text-sm font-medium">
                      Basic Information
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground text-sm">
                          Category
                        </span>
                        <span className="text-sm">
                          {productionHistoryData?.CategoryName}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground text-sm">
                          Variety
                        </span>
                        <span className="text-sm">
                          {productionHistoryData?.VarietyName}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground text-sm">
                          Protein Content
                        </span>
                        <span className="text-sm">11-12%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground text-sm">
                          Moisture Content
                        </span>
                        <span className="text-sm">13.5%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground text-sm">
                          Test Weight
                        </span>
                        <span className="text-sm">60 lbs/bushel</span>
                      </div>
                    </div>

                    <h4 className="mt-4 mb-2 text-sm font-medium">
                      Growing Information
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground text-sm">
                          Growing Season
                        </span>
                        <span className="text-sm">Fall to Summer</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground text-sm">
                          Planting Time
                        </span>
                        <span className="text-sm">September-October</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground text-sm">
                          Harvest Time
                        </span>
                        <span className="text-sm">June-July</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground text-sm">
                          Yield Potential
                        </span>
                        <span className="text-sm">40-60 bushels/acre</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-2 text-sm font-medium">Seasonality</h4>
                    <div className="mb-4 grid grid-cols-4 gap-2">
                      {productionHistoryData?.SeasonalityName.split(',').map(
                        (season) => (
                          <div
                            key={season}
                            className={`rounded-lg border ${seasonalityToColor[season.trim() as keyof typeof seasonalityToColor]} p-2 text-center`}
                          >
                            <p className="text-xs font-medium">
                              {season.trim()}
                            </p>
                            <Badge
                              className={`mt-1 ${seasonalityToColor[season.trim() as keyof typeof seasonalityToColor]}`}
                            >
                              Growing
                            </Badge>
                          </div>
                        )
                      )}
                    </div>

                    <h4 className="mb-2 text-sm font-medium">Seasonal Notes</h4>
                    <div className="space-y-2">
                      <p className="text-muted-foreground text-sm">
                        {
                          seasonalNotes[
                            productionHistoryData?.SeasonalityName as keyof typeof seasonalNotes
                          ]
                        }
                      </p>
                    </div>

                    <h4 className="mt-4 mb-2 text-sm font-medium">
                      Market Information
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground text-sm">
                          Price Elasticity
                        </span>
                        <span className="text-sm">0.35 (Inelastic)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground text-sm">
                          Major Producers
                        </span>
                        <span className="text-sm">Kansas, Oklahoma, Texas</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground text-sm">
                          Major Consumers
                        </span>
                        <span className="text-sm">Flour Mills, Bakeries</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground text-sm">
                          Storage Life
                        </span>
                        <span className="text-sm">12-18 months</span>
                      </div>
                    </div>
                  </div>
                </div>
              </DashboardCard>
            </div>

            <div>
              <DashboardCard
                title="Seasonal Production"
                description="Production volume by season"
              >
                <div className="h-64">
                  <ChartContainer>
                    <BarChart
                      data={seasonalProductionChartData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            display: false,
                          },
                        },
                        scales: {
                          y: {
                            beginAtZero: true,
                            title: {
                              display: true,
                              text: 'Production (tons)',
                            },
                          },
                        },
                      }}
                    />
                    <ChartTooltip />
                  </ChartContainer>
                </div>
              </DashboardCard>
            </div>
          </div>

          <Tabs defaultValue="production-data">
            <TabsList className="mb-4 grid w-full grid-cols-3">
              <TabsTrigger value="price-history">Price History</TabsTrigger>
              <TabsTrigger value="demand-supply">Demand vs Supply</TabsTrigger>
              <TabsTrigger value="production-data">Production Data</TabsTrigger>
            </TabsList>

            <TabsContent value="price-history">
              <DashboardCard
                title="Historical Price Trends"
                description="21-month price history"
              >
                <div className="h-80">
                  <ChartContainer>
                    <LineChart
                      data={priceHistoryData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: 'top',
                          },
                          tooltip: {
                            mode: 'index',
                            intersect: false,
                          },
                        },
                        scales: {
                          y: {
                            beginAtZero: false,
                            title: {
                              display: true,
                              text: 'Price ($/ton)',
                            },
                          },
                          x: {
                            title: {
                              display: true,
                              text: 'Month',
                            },
                          },
                        },
                      }}
                    />
                    <ChartLegend />
                    <ChartTooltip />
                  </ChartContainer>
                </div>
              </DashboardCard>
            </TabsContent>

            <TabsContent value="demand-supply">
              <DashboardCard
                title="Demand vs Supply Analysis"
                description="9-month trend analysis"
              >
                <div className="h-80">
                  <ChartContainer>
                    <LineChart
                      data={demandSupplyData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: 'top',
                          },
                          tooltip: {
                            mode: 'index',
                            intersect: false,
                          },
                        },
                        scales: {
                          y: {
                            beginAtZero: false,
                            title: {
                              display: true,
                              text: 'Volume (tons)',
                            },
                          },
                          x: {
                            title: {
                              display: true,
                              text: 'Month',
                            },
                          },
                        },
                      }}
                    />
                    <ChartLegend />
                    <ChartTooltip />
                  </ChartContainer>
                </div>
              </DashboardCard>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <DashboardCard title="Demand Analysis">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">
                        Current Demand
                      </span>
                      <span className="text-sm">8,800 tons/month</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">
                        YoY Demand Growth
                      </span>
                      <span className="text-sm text-green-600">+3.5%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">
                        Peak Demand Season
                      </span>
                      <span className="text-sm">Fall (Sep-Nov)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">
                        Low Demand Season
                      </span>
                      <span className="text-sm">Spring (Mar-May)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">
                        Price Elasticity
                      </span>
                      <span className="text-sm">0.35 (Inelastic)</span>
                    </div>
                    <div className="mt-2 rounded-lg border border-blue-100 bg-blue-50 p-3">
                      <h4 className="mb-1 font-medium text-blue-800">
                        Consumer Trends
                      </h4>
                      <p className="text-sm text-blue-700">
                        Increasing consumer preference for whole grain and
                        artisanal bread products is driving demand for
                        high-protein wheat varieties.
                      </p>
                    </div>
                  </div>
                </DashboardCard>

                <DashboardCard title="Supply Analysis">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">
                        Current Supply
                      </span>
                      <span className="text-sm">8,500 tons/month</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">
                        YoY Supply Growth
                      </span>
                      <span className="text-sm text-green-600">+2.8%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">
                        Peak Supply Season
                      </span>
                      <span className="text-sm">Summer (Jun-Aug)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">
                        Low Supply Season
                      </span>
                      <span className="text-sm">Winter (Dec-Feb)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">
                        Current Inventory
                      </span>
                      <span className="text-sm">32,500 tons</span>
                    </div>
                    <div className="mt-2 rounded-lg border border-green-100 bg-green-50 p-3">
                      <h4 className="mb-1 font-medium text-green-800">
                        Production Factors
                      </h4>
                      <p className="text-sm text-green-700">
                        Weather conditions in major wheat-growing regions have
                        been favorable this year, leading to above-average
                        yields in most areas.
                      </p>
                    </div>
                  </div>
                </DashboardCard>
              </div>
            </TabsContent>

            <TabsContent value="production-data">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="md:col-span-3">
                  <DashboardCard
                    title="Historical Production Data"
                    description="Yields, acreage, and costs"
                  >
                    <div className="mb-4 flex justify-end">
                      <AddRecordDialog
                        productId={productionHistoryData.ProductID.toString()}
                      >
                        <Button>
                          <Plus className="mr-2 h-4 w-4" />
                          Add Record
                        </Button>
                      </AddRecordDialog>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b">
                            <th className="px-4 py-2 text-left font-medium">
                              Year
                            </th>
                            <th className="px-4 py-2 text-right font-medium">
                              Acreage (acres)
                            </th>
                            <th className="px-4 py-2 text-right font-medium">
                              Yield (bushels/acre)
                            </th>
                            <th className="px-4 py-2 text-right font-medium">
                              Production (tons)
                            </th>
                            <th className="px-4 py-2 text-right font-medium">
                              Cost ($/acre)
                            </th>
                            <th className="px-4 py-2 text-right font-medium">
                              Price ($/ton)
                            </th>
                            <th className="px-4 py-2 text-right font-medium">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {productionHistoryData.ProductionData.map((row) => (
                            <tr
                              key={row.HistoryID}
                              className="hover:bg-muted/50 border-b"
                            >
                              <td className="px-4 py-2">{row.Year}</td>
                              <td className="px-4 py-2 text-right">
                                {row.Acreage.toLocaleString()}
                              </td>
                              <td className="px-4 py-2 text-right">
                                {row.Yield}
                              </td>
                              <td className="px-4 py-2 text-right">
                                {(row.Acreage * row.Yield).toLocaleString()}
                              </td>
                              <td className="px-4 py-2 text-right">
                                ${row.CostPerAcre}
                              </td>
                              <td className="px-4 py-2 text-right">
                                ${row.PricePerTon}
                              </td>
                              <td className="px-4 py-2 text-right">
                                <div className="flex justify-end gap-2">
                                  <UpdateRecordDialog
                                    record={row}
                                    productId={productionHistoryData.ProductID.toString()}
                                  >
                                    <Button variant="outline" size="sm">
                                      <Pencil className="h-4 w-4" />
                                    </Button>
                                  </UpdateRecordDialog>
                                  <DeleteRecordDialog
                                    record={row}
                                    productId={productionHistoryData.ProductID.toString()}
                                  >
                                    <Button variant="destructive" size="sm">
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </DeleteRecordDialog>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </DashboardCard>
                </div>

                <div className="md:col-span-2">
                  <DashboardCard
                    title="Production Requirements"
                    description="Optimal growing conditions"
                  >
                    <div className="grid grid-cols-3 gap-4">
                      <div className="rounded-lg border border-blue-100 bg-blue-50 p-4">
                        <div className="mb-2 flex items-center gap-2">
                          <Droplets className="h-5 w-5 text-blue-600" />
                          <h4 className="font-medium text-blue-800">
                            Water Requirements
                          </h4>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-blue-700">
                              Annual Rainfall
                            </span>
                            <span className="text-sm text-blue-700">
                              16-24 inches
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-blue-700">
                              Irrigation
                            </span>
                            <span className="text-sm text-blue-700">
                              Supplemental
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-blue-700">
                              Critical Period
                            </span>
                            <span className="text-sm text-blue-700">
                              Heading stage
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-lg border border-yellow-100 bg-yellow-50 p-4">
                        <div className="mb-2 flex items-center gap-2">
                          <Sun className="h-5 w-5 text-yellow-600" />
                          <h4 className="font-medium text-yellow-800">
                            Climate Requirements
                          </h4>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-yellow-700">
                              Temperature
                            </span>
                            <span className="text-sm text-yellow-700">
                              60-75°F optimal
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-yellow-700">
                              Frost Tolerance
                            </span>
                            <span className="text-sm text-yellow-700">
                              High
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-yellow-700">
                              Growing Days
                            </span>
                            <span className="text-sm text-yellow-700">
                              240-280 days
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-lg border border-green-100 bg-green-50 p-4">
                        <div className="mb-2 flex items-center gap-2">
                          <Leaf className="h-5 w-5 text-green-600" />
                          <h4 className="font-medium text-green-800">
                            Soil Requirements
                          </h4>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-green-700">
                              Soil Type
                            </span>
                            <span className="text-sm text-green-700">
                              Loam, Clay Loam
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-green-700">
                              pH Level
                            </span>
                            <span className="text-sm text-green-700">
                              6.0-7.5
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-green-700">
                              Drainage
                            </span>
                            <span className="text-sm text-green-700">
                              Well-drained
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-primary/5 border-primary/20 mt-4 rounded-lg border p-4">
                      <h4 className="mb-2 font-medium">
                        Fertilizer Requirements
                      </h4>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="flex items-start gap-2">
                          <span className="text-sm font-medium">
                            Nitrogen (N):
                          </span>
                          <span className="text-sm">80-120 lbs/acre</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-sm font-medium">
                            Phosphorus (P):
                          </span>
                          <span className="text-sm">30-50 lbs/acre</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <span className="text-sm font-medium">
                            Potassium (K):
                          </span>
                          <span className="text-sm">20-40 lbs/acre</span>
                        </div>
                      </div>
                    </div>
                  </DashboardCard>
                </div>

                <div>
                  <DashboardCard
                    title="Production Trends"
                    description="5-year analysis"
                  >
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">
                          Acreage Trend
                        </span>
                        <span className="text-sm text-green-600">
                          +4.6% (5-year)
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Yield Trend</span>
                        <span className="text-sm text-green-600">
                          +9.8% (5-year)
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">
                          Production Cost Trend
                        </span>
                        <span className="text-sm text-red-600">
                          +13.3% (5-year)
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Price Trend</span>
                        <span className="text-sm text-green-600">
                          +11.9% (5-year)
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">
                          Profit Margin Trend
                        </span>
                        <span className="text-sm text-green-600">
                          +61.0% (5-year)
                        </span>
                      </div>
                      <div className="mt-2 rounded-lg border border-green-100 bg-green-50 p-3">
                        <h4 className="mb-1 font-medium text-green-800">
                          Production Insights
                        </h4>
                        <p className="text-sm text-green-700">
                          Improved farming practices and drought-resistant
                          varieties have contributed to steady yield increases
                          despite challenging weather conditions in recent
                          years.
                        </p>
                      </div>
                    </div>
                  </DashboardCard>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
