'use client';

import type React from 'react';

import { z } from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '~/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Dialog,
  DialogTitle,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogDescription,
} from '~/components/ui/dialog';

import {
  Form,
  FormItem,
  FormLabel,
  FormField,
  FormControl,
  FormMessage,
} from '~/components/ui/form';

import { Input } from '~/components/ui/input';

import {
  Select,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectContent,
} from '~/components/ui/select';
import type {
  Product,
  ProductCategory,
  ProductSeasonality,
  ProductVariety,
} from '~/types/product';
import { toast } from '~/components/ui/use-toast';

// Define the form schema with Zod
const productFormSchema = z.object({
  ProductName: z
    .string()
    .min(2, { message: 'Product name must be at least 2 characters.' }),
  Quantity: z.coerce
    .number()
    .min(0, { message: 'Quantity must be a positive number.' }),
  VarietyID: z.coerce.number().min(1, { message: 'Please enter a variety.' }),
  CategoryID: z.coerce
    .number()
    .min(1, { message: 'Please select a product type.' }),
  SeasonalityID: z.coerce
    .number()
    .min(1, { message: 'Please select a seasonality.' }),
  ShelfLifeDays: z.coerce
    .number()
    .min(0, { message: 'Shelf life(days) must be a positive number.' }),
});

type ProductFormValues = z.infer<typeof productFormSchema>;

type AddProductDialogProps = {
  children: React.ReactNode;
  varieties: ProductVariety[];
  categories: ProductCategory[];
  seasonalities: ProductSeasonality[];
};

export function AddProductDialog({
  children,
  varieties,
  categories,
  seasonalities,
}: AddProductDialogProps) {
  const [open, setOpen] = useState(false);

  // Initialize the form with product data
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      ProductName: '',
      Quantity: 0,
      VarietyID: 0,
      CategoryID: 0,
      SeasonalityID: 0,
      ShelfLifeDays: 0,
    },
  });

  const selectedCategoryID = form.watch('CategoryID');
  const filteredVarieties = varieties.filter(
    (variety) => variety.CategoryID === Number(selectedCategoryID)
  );

  // Handle form submission
  async function onSubmit(data: ProductFormValues) {
    try {
      console.log('Submitting product data:', data);

      await fetch('/products', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      });

      toast({
        title: 'Product added',
        description: `${data.ProductName} has been added successfully.`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        variant: 'destructive',
        description: 'Failed to add product.',
      });
    } finally {
      setOpen(false);
    }
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
              name="ProductName"
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
                name="CategoryID"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-neutral-700 dark:text-neutral-300">
                      Product Category
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field?.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category, index) => (
                          <SelectItem
                            key={index}
                            value={category.CategoryID.toString()}
                          >
                            {category.CategoryName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="VarietyID"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-neutral-700 dark:text-neutral-300">
                      Product Variety
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field?.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {filteredVarieties.map((variety) => (
                          <SelectItem
                            key={variety.VarietyID}
                            value={variety.VarietyID.toString()}
                          >
                            {variety.VarietyName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="SeasonalityID"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-neutral-700 dark:text-neutral-300">
                      Seasonality
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field?.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select season" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {seasonalities.map((seasonality) => (
                          <SelectItem
                            key={seasonality?.SeasonalityID}
                            value={seasonality?.SeasonalityID?.toString()}
                          >
                            {seasonality.SeasonalityName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ShelfLifeDays"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-neutral-700 dark:text-neutral-300">
                      Shelf Life (Days)
                    </FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="Quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-neutral-700 dark:text-neutral-300">
                      Quantity
                    </FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0" {...field} />
                    </FormControl>
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
