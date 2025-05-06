import { Button } from '~/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { Badge } from '~/components/ui/badge';
import { Search, Plus, Edit, Trash, Package } from 'lucide-react';
import { AddWarehouseDialog } from '~/components/add-warehouse-dialog';
import { EditWarehouseDialog } from '~/components/edit-warehouse-dialog';
import { DeleteDialog } from '~/components/delete-dialog';
import { DashboardCard } from '~/components/dashboard-card';
import { cn } from '~/lib/utils';
import { AppSidebar } from '~/components/navigation/app-sidebar';
import { SidebarProvider } from '~/components/ui/sidebar';
import { SiteHeader } from '~/components/site-header';
import { SidebarInset } from '~/components/ui/sidebar';
import type { Route } from './+types/_warehouse.warehouses';
import { getDatabaseConnection } from '~/lib/database.server';
import invariant from 'tiny-invariant';
import { useFetcher } from 'react-router';

import { Pie as PieChart } from 'react-chartjs-2';
import { ChartContainer } from '~/components/ui/chart-new';
import { WarehouseUtilizationChart } from '~/components/warehouse-utilization-chart';

export type WarehouseType = {
  WarehouseID: number;
  WarehouseName: string;
  WarehouseType: string;
  Location: string;
  Capacity: number;
  TemperatureControlled: boolean;
  created_at: Date;
  updated_at: Date;
};

export type DBWarehouseType = Pick<
  WarehouseType,
  | 'WarehouseID'
  | 'WarehouseName'
  | 'Location'
  | 'Capacity'
  | 'WarehouseType'
  | 'TemperatureControlled'
> & {
  Utilization: number;
};

export async function action({ request }: Route.ActionArgs) {
  try {
    const formData = await request.formData();

    const intent = formData.get('intent');
    const conn = await getDatabaseConnection();

    if (intent === 'create') {
      const warehouseName = formData.get('name');
      const warehouseLocation = formData.get('location');
      const warehouseCapacity = formData.get('capacity');
      const warehouseType = formData.get('type');
      const warehouseTemperatureControlled =
        formData.get('temperatureControlled') === 'on' ? true : false;

      const [result] = await conn.execute(
        'INSERT INTO WAREHOUSE_T (WarehouseName, Location, Capacity, WarehouseType, TemperatureControlled) VALUES (?, ?, ?, ?, ?)',
        [
          warehouseName,
          warehouseLocation,
          warehouseCapacity,
          warehouseType,
          warehouseTemperatureControlled,
        ]
      );

      const warehouseId = ((result as any).insertId ?? 1) as number;

      for (let i = 1; i <= 2; i++) {
        await conn.execute(
          'INSERT INTO WAREHOUSE_PRODUCT_T (WarehouseID, ProductID, StockQuantity, ProductCapacity) VALUES (?, ?, ?, ?)',
          [warehouseId, i, 0, 10000]
        );
      }

      return { success: true };
    } else if (intent === 'delete') {
      const warehouseId = formData.get('warehouseId');
      await conn.execute('DELETE FROM WAREHOUSE_T WHERE WarehouseID = ?', [
        warehouseId,
      ]);

      return { success: true };
    } else if (intent === 'update') {
      const warehouseId = formData.get('warehouseId');
      const warehouseName = formData.get('name');
      const warehouseLocation = formData.get('location');
      const warehouseCapacity = formData.get('capacity');
      const warehouseType = formData.get('type');
      const warehouseTemperatureControlled =
        formData.get('temperatureControlled') === 'on' ? true : false;

      await conn.execute(
        'UPDATE WAREHOUSE_T SET WarehouseName = ?, Location = ?, Capacity = ?, WarehouseType = ?, TemperatureControlled = ? WHERE WarehouseID = ?',
        [
          warehouseName,
          warehouseLocation,
          warehouseCapacity,
          warehouseType,
          warehouseTemperatureControlled,
          warehouseId,
        ]
      );

      return { success: true };
    }
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to create warehouse' };
  }
}

export async function loader() {
  const conn = await getDatabaseConnection();
  const [rows] = await conn.execute(
    `SELECT w.WarehouseID, w.WarehouseName, w.Capacity, w.TemperatureControlled, w.Location, w.WarehouseType, ROUND((w.Capacity - SUM(wp.ProductCapacity)) / w.Capacity * 100, 2) as Utilization
    FROM WAREHOUSE_T as w, WAREHOUSE_PRODUCT_T as wp
    WHERE wp.WarehouseID = w.WarehouseID
    GROUP BY w.WarehouseID
    ORDER BY w.WarehouseID DESC
    `
  );

  return { warehouses: rows as DBWarehouseType[] };
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
                  <WarehouseCard
                    key={warehouse.WarehouseID}
                    warehouse={warehouse}
                  />
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

          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <WarehouseUtilizationChart />
          </div>
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

  const fetcher = useFetcher();

  return (
    <DashboardCard>
      <div className="flex h-full flex-col">
        <div className="mb-2 flex items-start justify-between">
          <div>
            <h3 className="font-semibold">{warehouse.WarehouseName}</h3>
            <p className="text-muted-foreground mt-1 text-sm">
              {warehouse.Location}
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

          <fetcher.Form method="post">
            <input
              type="hidden"
              name="warehouseId"
              value={warehouse.WarehouseID}
            />
            <input type="hidden" name="intent" value="delete" />

            <Button
              size="sm"
              variant="outline"
              className="text-red-500 hover:text-red-700"
            >
              <Trash className="mr-1 h-4 w-4" />
              Delete
            </Button>
          </fetcher.Form>
        </div>
      </div>
    </DashboardCard>
  );
}
