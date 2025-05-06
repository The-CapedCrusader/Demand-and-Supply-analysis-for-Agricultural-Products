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
import { useFetcher } from 'react-router';
import { Switch } from './ui/switch';

type AddWarehouseDialogProps = {
  children: React.ReactNode;
};

export function AddWarehouseDialog(props: AddWarehouseDialogProps) {
  const { children } = props;

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
          <DialogTitle>Add New Warehouse</DialogTitle>
          <DialogDescription>
            Enter the details for the new warehouse. Click save when you're
            done.
          </DialogDescription>
        </DialogHeader>
        <fetcher.Form method="post">
          <input type="hidden" name="intent" value="create" />

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" name="name" className="col-span-3" required />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Type
              </Label>
              <Input id="type" name="type" className="col-span-3" required />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">
                Location
              </Label>
              <Input
                id="location"
                name="location"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="capacity" className="text-right">
                Capacity
              </Label>
              <Input
                id="capacity"
                name="capacity"
                className="col-span-3"
                placeholder="e.g., 50,000 sq ft"
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="temperatureControlled" className="text-right">
                Temperature Controlled
              </Label>
              <Switch id="temperatureControlled" name="temperatureControlled" />
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
            <Button type="submit">Add Warehouse</Button>
          </DialogFooter>
        </fetcher.Form>
      </DialogContent>
    </Dialog>
  );
}
