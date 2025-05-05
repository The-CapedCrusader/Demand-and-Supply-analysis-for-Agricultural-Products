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

          <Separator className="my-4" />

          <h3 className="mb-4 text-lg font-medium">Tracking Timeline</h3>
          <div className="space-y-4">
            {trackingData.map((event, index) => (
              <div key={index} className="flex items-start">
                <div className="mt-0.5 mr-3">
                  {event.completed ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <Clock className="h-5 w-5 text-gray-400" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="font-medium">{event.status}</p>
                    <p className="text-muted-foreground text-sm">
                      {event.date}, {event.time}
                    </p>
                  </div>
                  <p className="text-sm">{event.location}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-lg border border-blue-100 bg-blue-50 p-3">
            <div className="flex items-start">
              <Truck className="mt-0.5 mr-2 h-5 w-5 text-blue-500" />
              <div>
                <h4 className="font-medium text-blue-800">Current Location</h4>
                <p className="text-sm text-blue-700">
                  Your shipment is currently at Local Distribution Center,
                  Columbus and is expected to arrive at the destination by 4:00
                  PM today.
                </p>
              </div>
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
