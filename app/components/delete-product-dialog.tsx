'use client';

import type React from 'react';

import { useState } from 'react';
import { useFetcher } from 'react-router';
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
import { toast } from '~/components/ui/use-toast';

interface DeleteDialogProps {
  id: string;
  title: string;
  description: string;
  children: React.ReactNode;
}

export function DeleteDialog({
  id,
  title,
  children,
  description,
}: DeleteDialogProps) {
  const [open, setOpen] = useState(false);
  const fetcher = useFetcher();

  const handleDelete = async () => {
    try {
      fetcher.submit(
        { ProductID: parseInt(id, 10) },
        {
          method: 'DELETE',
          action: '/products',
          encType: 'application/json',
        }
      );

      toast({
        title: 'Item deleted',
        description: 'The item has been successfully deleted.',
      });
      setOpen(false);
    } catch (error) {
      toast({
        title: 'Error',
        variant: 'destructive',
        description: 'Failed to delete item.',
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-neutral-700 dark:text-neutral-200">
            {title}
          </DialogTitle>
          <DialogDescription className="text-neutral-500 dark:text-neutral-400">
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            className="border-secondary-300 hover:bg-secondary-100 dark:border-neutral-600 dark:hover:bg-neutral-700"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleDelete}
            className="bg-accent-500 hover:bg-accent-600 text-white"
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
