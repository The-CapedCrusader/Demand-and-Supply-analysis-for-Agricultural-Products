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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { useState } from 'react';

interface ManageInventoryDialogProps {
  warehouse: {
    id: string;
    name: string;
    products?: Array<{
      id: string;
      name: string;
      quantity: number;
      unit: string;
    }>;
  };
  children: React.ReactNode;
}

export function ManageInventoryDialog({
  warehouse,
  children,
}: ManageInventoryDialogProps) {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState(
    warehouse?.products || [
      { id: '1', name: 'Organic Tomatoes', quantity: 1200, unit: 'lbs' },
      { id: '2', name: 'Sweet Corn', quantity: 850, unit: 'lbs' },
      { id: '3', name: 'Fresh Apples', quantity: 2000, unit: 'lbs' },
    ]
  );
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct || !quantity) return;

    // Update the quantity of the selected product
    setProducts(
      products.map((product) =>
        product.id === selectedProduct
          ? { ...product, quantity: Number.parseInt(quantity) }
          : product
      )
    );

    // Reset form
    setSelectedProduct('');
    setQuantity('');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Manage Inventory</DialogTitle>
          <DialogDescription>
            Update inventory levels for products in {warehouse.name}.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="product">Product</Label>
              <Select
                value={selectedProduct}
                onValueChange={setSelectedProduct}
              >
                <SelectTrigger id="product">
                  <SelectValue placeholder="Select a product" />
                </SelectTrigger>
                <SelectContent>
                  {products.map((product) => (
                    <SelectItem key={product.id} value={product.id}>
                      {product.name} (Current: {product.quantity} {product.unit}
                      )
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity">New Quantity</Label>
              <Input
                id="quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Enter new quantity"
              />
            </div>

            <div className="space-y-2">
              <Label>Current Inventory</Label>
              <div className="divide-y rounded-md border">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-2"
                  >
                    <span>{product.name}</span>
                    <span className="font-medium">
                      {product.quantity} {product.unit}
                    </span>
                  </div>
                ))}
              </div>
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
            <Button type="submit">Update Inventory</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
