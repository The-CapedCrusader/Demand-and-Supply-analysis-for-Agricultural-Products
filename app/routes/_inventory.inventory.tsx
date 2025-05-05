import { Button } from '~/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { Badge } from '~/components/ui/badge';
import {
  Search,
  Plus,
  Edit,
  Trash,
  Package,
  MapPin,
  TruckIcon,
  ClockIcon,
} from 'lucide-react';
import { DashboardCard } from '~/components/dashboard-card';
import { AppSidebar } from '~/components/navigation/app-sidebar';
import { SidebarProvider } from '~/components/ui/sidebar';
import { SiteHeader } from '~/components/site-header';
import { SidebarInset } from '~/components/ui/sidebar';
import type { Route } from './+types/_inventory.inventory';
import { DeleteDialog } from '~/components/delete-dialog';
import { UpdateStatusDialog } from '~/components/update-status-dialog';
import { TrackShipmentDialog } from '~/components/track-shipment-dialog';

const shipments = [
  {
    id: 'SH-1001',
    product: 'Organic Tomatoes',
    quantity: '2,500 lbs',
    origin: 'Green Valley Farms, CA',
    destination: 'Central Distribution Center, Chicago',
    departureDate: 'May 2, 2025',
    estimatedArrival: 'May 3, 2025',
    status: 'In Transit',
    carrier: 'EcoFreight Logistics',
  },
  {
    id: 'SH-1002',
    product: 'Sweet Corn',
    quantity: '3,200 lbs',
    origin: 'Heartland Farms, IA',
    destination: 'East Coast Facility, Newark',
    departureDate: 'May 1, 2025',
    estimatedArrival: 'May 2, 2025',
    status: 'Delivered',
    carrier: 'Farm Express',
  },
  {
    id: 'SH-1003',
    product: 'Fresh Apples',
    quantity: '4,000 lbs',
    origin: 'Orchard Valley, WA',
    destination: 'Southern Distribution Center, Atlanta',
    departureDate: 'May 3, 2025',
    estimatedArrival: 'May 5, 2025',
    status: 'Scheduled',
    carrier: 'Fresh Route Shipping',
  },
  {
    id: 'SH-1004',
    product: 'Organic Lettuce',
    quantity: '1,800 lbs',
    origin: 'Sunshine Organics, FL',
    destination: 'West Coast Hub, Oakland',
    departureDate: 'May 2, 2025',
    estimatedArrival: 'May 4, 2025',
    status: 'Delayed',
    carrier: 'Green Transit Co.',
  },
];

type ShipmentType = (typeof shipments)[number];

export async function loader() {
  return { shipments: shipments as ShipmentType[] };
}

export default function WarehousesPage(props: Route.ComponentProps) {
  const { shipments } = props.loaderData;

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
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">
              Inventory & Deliveries
            </h1>
            <div className="flex items-center gap-2">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Delivery
              </Button>
            </div>
          </div>

          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All Shipments</TabsTrigger>
              <TabsTrigger value="in-transit">In Transit</TabsTrigger>
              <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
              <TabsTrigger value="delivered">Delivered</TabsTrigger>
              <TabsTrigger value="delayed">Delayed</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
                {shipments.map((shipment) => (
                  <ShipmentCard key={shipment.id} shipment={shipment} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="in-transit" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
                {shipments
                  .filter((shipment) => shipment.status === 'In Transit')
                  .map((shipment) => (
                    <ShipmentCard key={shipment.id} shipment={shipment} />
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="scheduled" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
                {shipments
                  .filter((shipment) => shipment.status === 'Scheduled')
                  .map((shipment) => (
                    <ShipmentCard key={shipment.id} shipment={shipment} />
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="delivered" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
                {shipments
                  .filter((shipment) => shipment.status === 'Delivered')
                  .map((shipment) => (
                    <ShipmentCard key={shipment.id} shipment={shipment} />
                  ))}
              </div>
            </TabsContent>
            <TabsContent value="delayed" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
                {shipments
                  .filter((shipment) => shipment.status === 'Delayed')
                  .map((shipment) => (
                    <ShipmentCard key={shipment.id} shipment={shipment} />
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

type ShipmentCardProps = {
  shipment: ShipmentType;
};

function ShipmentCard(props: ShipmentCardProps) {
  const { shipment } = props;

  let statusColor = 'bg-blue-50 text-blue-700 border-blue-200';
  if (shipment.status === 'Delivered') {
    statusColor = 'bg-green-50 text-green-700 border-green-200';
  } else if (shipment.status === 'Delayed') {
    statusColor = 'bg-red-50 text-red-700 border-red-200';
  } else if (shipment.status === 'Scheduled') {
    statusColor = 'bg-purple-50 text-purple-700 border-purple-200';
  }

  return (
    <DashboardCard>
      <div className="flex h-full flex-col">
        <div className="mb-2 flex items-start justify-between">
          <div>
            <h3 className="font-semibold">{shipment.product}</h3>
            <p className="text-muted-foreground text-sm">ID: {shipment.id}</p>
          </div>
          <Badge variant="outline" className={statusColor}>
            {shipment.status}
          </Badge>
        </div>
        <div className="mt-2 mb-4 space-y-2">
          <div className="flex items-start">
            <MapPin className="text-muted-foreground mt-0.5 mr-2 h-4 w-4" />
            <div>
              <p className="text-sm font-medium">Origin</p>
              <p className="text-muted-foreground text-sm">{shipment.origin}</p>
            </div>
          </div>
          <div className="flex items-start">
            <MapPin className="text-muted-foreground mt-0.5 mr-2 h-4 w-4" />
            <div>
              <p className="text-sm font-medium">Destination</p>
              <p className="text-muted-foreground text-sm">
                {shipment.destination}
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <TruckIcon className="text-muted-foreground mt-0.5 mr-2 h-4 w-4" />
            <div>
              <p className="text-sm font-medium">Carrier</p>
              <p className="text-muted-foreground text-sm">
                {shipment.carrier}
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <ClockIcon className="text-muted-foreground mt-0.5 mr-2 h-4 w-4" />
            <div>
              <p className="text-sm font-medium">ETA</p>
              <p className="text-muted-foreground text-sm">
                {shipment.estimatedArrival}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-auto flex flex-wrap gap-2 pt-4">
          <TrackShipmentDialog shipment={shipment}>
            <Button size="sm" variant="outline">
              <MapPin className="mr-1 h-4 w-4" />
              Track
            </Button>
          </TrackShipmentDialog>
          <UpdateStatusDialog shipment={shipment}>
            <Button size="sm" variant="outline">
              <Edit className="mr-1 h-4 w-4" />
              Update
            </Button>
          </UpdateStatusDialog>
          <DeleteDialog
            title="Cancel Shipment"
            description={`Are you sure you want to cancel shipment ${shipment.id}? This action cannot be undone.`}
            onDelete={() => {
              console.log('cancel shipment');
            }}
          >
            <Button
              size="sm"
              variant="outline"
              className="text-red-500 hover:text-red-700"
            >
              <Trash className="mr-1 h-4 w-4" />
              Cancel
            </Button>
          </DeleteDialog>
        </div>
      </div>
    </DashboardCard>
  );
}
