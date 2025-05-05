import { Button } from '~/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { Badge } from '~/components/ui/badge';
import { Search, Plus, Edit, Trash, Package } from 'lucide-react';
import { AddWarehouseDialog } from '~/components/add-warehouse-dialog';
import { EditWarehouseDialog } from '~/components/edit-warehouse-dialog';
import { ManageInventoryDialog } from '~/components/manage-inventory-dialog';
import { DeleteDialog } from '~/components/delete-dialog';
import { DashboardCard } from '~/components/dashboard-card';
import { cn } from '~/lib/utils';
import { AppSidebar } from '~/components/navigation/app-sidebar';
import { SidebarProvider } from '~/components/ui/sidebar';
import { SiteHeader } from '~/components/site-header';
import { SidebarInset } from '~/components/ui/sidebar';
import type { Route } from './+types/_warehouse.warehouses';

export type WarehouseType = {
  WarehouseID: number;
  WarehouseName: string;
  WarehouseType: string;
  AddressLine1: string;
  AddressLine2: string;
  Zip: string;
  Capacity: number;
  TemperatureControlled: number;
  created_at: Date;
  updated_at: Date;
};

export type DBWarehouseType = Pick<
  WarehouseType,
  'WarehouseID' | 'WarehouseName' | 'AddressLine1' | 'Capacity'
> & {
  Utilization: number;
};

const warehouses = [
  {
    WarehouseID: 1,
    WarehouseName: 'Central Distribution Center',
    AddressLine1: 'Chicago, IL',
    Capacity: 50000,
    Utilization: 78,
  },
  {
    WarehouseID: 2,
    WarehouseName: 'East Coast Facility',
    AddressLine1: 'Newark, NJ',
    Capacity: 35000,
    Utilization: 92,
  },
  {
    WarehouseID: 3,
    WarehouseName: 'West Coast Hub',
    AddressLine1: 'Oakland, CA',
    Capacity: 45000,
    Utilization: 65,
  },
  {
    WarehouseID: 4,
    WarehouseName: 'Southern Distribution Center',
    AddressLine1: 'Atlanta, GA',
    Capacity: 40000,
    Utilization: 81,
  },
];

// Mock data for utilization chart
const utilizationData = {
  labels: ['Used', 'Available'],
  datasets: [
    {
      data: [78, 22],
      backgroundColor: ['rgb(75, 192, 75)', 'rgb(234, 236, 239)'],
      borderWidth: 0,
    },
  ],
};

export async function loader() {
  // const conn = await getDatabaseConnection();
  // const [rows] = await conn.execute('SELECT * FROM WAREHOUSE_T');

  // const [rows] = await conn.execute(
  //   `SELECT w.WarehouseID, w.WarehouseName, w.Capacity, (w.Capacity - SUM(wp.ProductCapacity)) as Utilization
  //   FROM WAREHOUSE_T as w, WAREHOUSE_PRODUCT_T as wp
  //   WHERE wp.WarehouseID = w.WarehouseID
  //   GROUP BY w.WarehouseID`
  // );
  // console.log('-'.repeat(20));
  // console.log(rows);
  // console.log('-'.repeat(20));

  // return { warehouses: rows as WarehouseType[] };

  return { warehouses };
}

export default function WarehousesPage(props: Route.ComponentProps) {
  const { warehouses } = props.loaderData;

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

        <div className="p-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Warehouses</h1>
            <div className="flex items-center gap-2">
              <AddWarehouseDialog>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Warehouse
                </Button>
              </AddWarehouseDialog>
            </div>
          </div>

          <Tabs defaultValue="all" className="mt-6">
            <TabsList>
              <TabsTrigger value="all">All Warehouses</TabsTrigger>
              <TabsTrigger value="high-utilization">
                High Utilization
              </TabsTrigger>
              <TabsTrigger value="low-utilization">Low Utilization</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {warehouses.map((warehouse) => (
                  <WarehouseCard key={warehouse.id} warehouse={warehouse} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="high-utilization" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {warehouses
                  .filter((warehouse) => warehouse.Utilization >= 80)
                  .map((warehouse) => (
                    <WarehouseCard
                      key={warehouse.WarehouseID}
                      warehouse={warehouse}
                    />
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="low-utilization" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {warehouses
                  .filter((warehouse) => warehouse.Utilization < 80)
                  .map((warehouse) => (
                    <WarehouseCard
                      key={warehouse.WarehouseID}
                      warehouse={warehouse}
                    />
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

function UtilizationBadge({ utilization }: { utilization: number }) {
  return (
    <Badge
      variant="outline"
      className={cn(
        utilization >= 90
          ? 'border-red-200/20 text-red-300'
          : utilization >= 75
            ? 'border-yellow-200/20 text-yellow-300'
            : 'border-green-200/20 text-green-300'
      )}
    >
      {utilization}% Full
    </Badge>
  );
}

type WarehouseCardProps = {
  warehouse: DBWarehouseType;
};

export function WarehouseCard(props: WarehouseCardProps) {
  const { warehouse } = props;

  return (
    <DashboardCard>
      <div className="flex h-full flex-col">
        <div className="mb-2 flex items-start justify-between">
          <div>
            <h3 className="font-semibold">{warehouse.WarehouseName}</h3>
            <p className="text-muted-foreground mt-1 text-sm">
              {warehouse.AddressLine1}
            </p>
          </div>
          <UtilizationBadge utilization={warehouse.Utilization} />
        </div>
        <div className="my-6">
          <div className="mb-1 flex justify-between text-sm">
            <span>Capacity:</span>
            <span>{warehouse.Capacity} sq ft</span>
          </div>
        </div>
        <div className="mt-auto flex flex-wrap gap-2">
          <EditWarehouseDialog warehouse={warehouse}>
            <Button size="sm" variant="outline">
              <Edit className="mr-1 h-4 w-4" />
              Edit
            </Button>
          </EditWarehouseDialog>

          <ManageInventoryDialog
            // FIXME: warehouse types and products
            warehouse={warehouse}
          >
            <Button size="sm" variant="outline">
              <Package className="mr-1 h-4 w-4" />
              Inventory
            </Button>
          </ManageInventoryDialog>
          <DeleteDialog
            title="Delete Warehouse"
            description={`Are you sure you want to delete ${warehouse.WarehouseName}? This action cannot be undone.`}
          >
            <Button
              size="sm"
              variant="outline"
              className="text-red-500 hover:text-red-700"
            >
              <Trash className="mr-1 h-4 w-4" />
              Delete
            </Button>
          </DeleteDialog>
        </div>
      </div>
    </DashboardCard>
  );
}
