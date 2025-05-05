import { useLoaderData, Link } from 'react-router';

import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from '~/components/ui/card';

import { PlusCircle } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { DeleteDialog } from '~/components/delete-product-dialog';
import { AddProductDialog } from '~/components/add-product-dialog';
import { EditProductDialog } from '~/components/edit-product-dialog';

import { loader } from './route.loader';
export { loader };

import { action } from './route.server';
export { action };

export default function ProductsPage() {
  const productData = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col gap-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-700 dark:text-neutral-200">
            Products
          </h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Manage your product catalog and inventory
          </p>
        </div>
        <AddProductDialog
          varieties={productData.productVarieties}
          categories={productData.productCategories}
          seasonalities={productData.productSeasonalities}
        >
          <Button className="bg-primary-500 hover:bg-primary-600 text-white">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </AddProductDialog>
      </div>

      <Card className="border-secondary-200 dark:border-neutral-700">
        <CardHeader className="bg-secondary-50 border-secondary-200 border-b dark:border-neutral-700 dark:bg-neutral-800">
          <CardTitle className="text-neutral-700 dark:text-neutral-200">
            Product List
          </CardTitle>
          <CardDescription className="text-neutral-500 dark:text-neutral-400">
            View and manage all products in your inventory
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-secondary-200 bg-secondary-50 border-b dark:border-neutral-700 dark:bg-neutral-800">
                  <th className="px-4 py-3 text-left text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Quantity
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Category
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Variety
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Seasonality
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Shelf Life (Days)
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {productData?.products?.map((product) => (
                  <tr
                    key={product.ProductID}
                    className="border-secondary-100 hover:bg-secondary-50 border-b dark:border-neutral-700 dark:hover:bg-neutral-800"
                  >
                    <td className="px-4 py-3 text-sm">
                      <a
                        href={`/products/${product.ProductID}`}
                        className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium"
                      >
                        {product.ProductName}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-sm text-neutral-600 dark:text-neutral-300">
                      {product.Quantity}
                    </td>
                    <td className="px-4 py-3 text-sm text-neutral-600 dark:text-neutral-300">
                      {product.CategoryName}
                    </td>
                    <td className="px-4 py-3 text-sm text-neutral-600 dark:text-neutral-300">
                      {product.VarietyName}
                    </td>
                    <td className="px-4 py-3 text-sm text-neutral-600 dark:text-neutral-300">
                      {product.SeasonalityName}
                    </td>
                    <td className="px-4 py-3 text-sm text-neutral-600 dark:text-neutral-300">
                      {product.ShelfLifeDays}
                    </td>
                    <td className="px-4 py-3 text-right text-sm">
                      <div className="flex justify-end gap-2">
                        <EditProductDialog
                          product={product}
                          varieties={productData.productVarieties}
                          categories={productData.productCategories}
                          seasonalities={productData.productSeasonalities}
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-secondary-300 hover:bg-secondary-100 dark:border-neutral-600 dark:hover:bg-neutral-700"
                          >
                            Edit
                          </Button>
                        </EditProductDialog>
                        <DeleteDialog
                          title="Delete Product"
                          id={product.ProductID.toString()}
                          description={`Are you sure you want to delete ${product.ProductName}? This action cannot be undone.`}
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-accent-300 text-accent-500 hover:bg-accent-50 hover:text-accent-600 dark:border-accent-700 dark:text-accent-400 dark:hover:bg-accent-900"
                          >
                            Delete
                          </Button>
                        </DeleteDialog>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
