'use client';

import type React from 'react';

import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { toast } from '~/components/ui/use-toast';

// Define the form schema with Zod
const productFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Product name must be at least 2 characters.' }),
  type: z.string().min(1, { message: 'Please select a product type.' }),
  variety: z.string().min(1, { message: 'Please enter a variety.' }),
  seasonality: z.string().min(1, { message: 'Please select a seasonality.' }),
  price: z.string().min(1, { message: 'Please enter a price.' }),
  inventory: z.string().refine((val) => !isNaN(Number(val)), {
    message: 'Inventory must be a number.',
  }),
  status: z.string().min(1, { message: 'Please select a status.' }),
});

type ProductFormValues = z.infer<typeof productFormSchema>;

export function AddProductDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  // Initialize the form
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: '',
      type: '',
      variety: '',
      seasonality: '',
      price: '',
      inventory: '',
      status: '',
    },
  });

  // Handle form submission
  function onSubmit(data: ProductFormValues) {
    // In a real app, you would send this data to your API
    console.log(data);

    // Show success message
    toast({
      title: 'Product added',
      description: `${data.name} has been added to your product catalog.`,
    });

    // Close the dialog and reset the form
    setOpen(false);
    form.reset();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-neutral-700 dark:text-neutral-200">
            Add New Product
          </DialogTitle>
          <DialogDescription className="text-neutral-500 dark:text-neutral-400">
            Fill in the details to add a new product to your catalog.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-neutral-700 dark:text-neutral-300">
                    Product Name
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter product name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-neutral-700 dark:text-neutral-300">
                      Product Type
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Vegetable">Vegetable</SelectItem>
                        <SelectItem value="Fruit">Fruit</SelectItem>
                        <SelectItem value="Grain">Grain</SelectItem>
                        <SelectItem value="Dairy">Dairy</SelectItem>
                        <SelectItem value="Meat">Meat</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="variety"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-neutral-700 dark:text-neutral-300">
                      Variety
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter variety" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="seasonality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-neutral-700 dark:text-neutral-300">
                      Seasonality
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select season" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Spring">Spring</SelectItem>
                        <SelectItem value="Summer">Summer</SelectItem>
                        <SelectItem value="Fall">Fall</SelectItem>
                        <SelectItem value="Winter">Winter</SelectItem>
                        <SelectItem value="Year-round">Year-round</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-neutral-700 dark:text-neutral-300">
                      Price
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="$0.00/unit" {...field} />
                    </FormControl>
                    <FormDescription className="text-xs">
                      Include unit (e.g., $2.99/lb)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="inventory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-neutral-700 dark:text-neutral-300">
                      Inventory
                    </FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-neutral-700 dark:text-neutral-300">
                      Status
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="In Season">In Season</SelectItem>
                        <SelectItem value="Coming Soon">Coming Soon</SelectItem>
                        <SelectItem value="Limited">Limited</SelectItem>
                        <SelectItem value="Out of Season">
                          Out of Season
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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
                type="submit"
                className="bg-primary-500 hover:bg-primary-600 text-white"
              >
                Add Product
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
