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
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { useEffect, useState } from 'react';
import type { DBWarehouseType } from '~/routes/_warehouse.warehouses';
import { useFetcher } from 'react-router';
import { Switch } from '~/components/ui/switch';

interface EditWarehouseDialogProps {
  warehouse: DBWarehouseType;
  children: React.ReactNode;
}

export function EditWarehouseDialog({
  warehouse,
  children,
}: EditWarehouseDialogProps) {
  const fetcher = useFetcher();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (fetcher.data?.success) {
      setOpen(false);
    }
  }, [fetcher.data]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Warehouse</DialogTitle>
          <DialogDescription>
            Update the warehouse details. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <fetcher.Form method="post">
          <input type="hidden" name="intent" value="update" />
          <input
            type="hidden"
            name="warehouseId"
            value={warehouse.WarehouseID}
          />

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                defaultValue={warehouse.WarehouseName}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Type
              </Label>
              <Input
                id="type"
                name="type"
                defaultValue={warehouse.WarehouseType}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">
                Location
              </Label>
              <Input
                id="location"
                name="location"
                defaultValue={warehouse.Location}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="capacity" className="text-right">
                Capacity
              </Label>
              <Input
                id="capacity"
                name="capacity"
                defaultValue={warehouse.Capacity}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="temperatureControlled" className="text-right">
                Temperature Controlled
              </Label>
              <Switch
                id="temperatureControlled"
                name="temperatureControlled"
                defaultChecked={warehouse.TemperatureControlled}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </fetcher.Form>
      </DialogContent>
    </Dialog>
  );
}
