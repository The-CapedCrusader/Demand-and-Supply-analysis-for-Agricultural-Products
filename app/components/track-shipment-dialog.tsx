'use client';

import type React from 'react';

import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import { Badge } from '~/components/ui/badge';
import { Separator } from '~/components/ui/separator';
import { useState } from 'react';
import { Truck, CheckCircle, Clock } from 'lucide-react';

interface TrackShipmentDialogProps {
  shipment: {
    id: string;
    product: string;
    origin: string;
    destination: string;
    status: string;
    departureDate: string;
    estimatedArrival: string;
  };
  children: React.ReactNode;
}

export function TrackShipmentDialog({
  shipment,
  children,
}: TrackShipmentDialogProps) {
  const [open, setOpen] = useState(false);

  // Mock tracking data
  const trackingData = [
    {
      date: 'May 2, 2025',
      time: '08:30 AM',
      location: 'Central Distribution Center, Chicago',
      status: 'Departed',
      completed: true,
    },
    {
      date: 'May 2, 2025',
      time: '02:45 PM',
      location: 'Regional Hub, Indianapolis',
      status: 'In Transit',
      completed: true,
    },
    {
      date: 'May 3, 2025',
      time: '09:15 AM',
      location: 'Local Distribution Center, Columbus',
      status: 'Arrived',
      completed: true,
    },
    {
      date: 'May 3, 2025',
      time: '11:30 AM',
      location: 'Out for Delivery',
      status: 'In Transit',
      completed: false,
    },
    {
      date: 'May 3, 2025',
      time: '04:00 PM',
      location: shipment.destination,
      status: 'Estimated Delivery',
      completed: false,
    },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Track Shipment</DialogTitle>
          <DialogDescription>
            Tracking information for shipment #{shipment.id}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <h4 className="mb-1 text-sm font-medium">Product</h4>
              <p className="text-sm">{shipment.product}</p>
            </div>
            <div>
              <h4 className="mb-1 text-sm font-medium">Status</h4>
              <Badge
                variant="outline"
                className="border-blue-200 bg-blue-50 text-blue-700"
              >
                {shipment.status}
              </Badge>
            </div>
            <div>
              <h4 className="mb-1 text-sm font-medium">Origin</h4>
              <p className="text-sm">{shipment.origin}</p>
            </div>
            <div>
              <h4 className="mb-1 text-sm font-medium">Destination</h4>
              <p className="text-sm">{shipment.destination}</p>
            </div>
            <div>
              <h4 className="mb-1 text-sm font-medium">Departure Date</h4>
              <p className="text-sm">{shipment.departureDate}</p>
            </div>
            <div>
              <h4 className="mb-1 text-sm font-medium">Estimated Arrival</h4>
              <p className="text-sm">{shipment.estimatedArrival}</p>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
