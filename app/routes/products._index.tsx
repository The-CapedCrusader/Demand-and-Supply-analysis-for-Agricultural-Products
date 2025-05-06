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

import { SidebarInset, SidebarProvider } from '~/components/ui/sidebar';
import { AppSidebar } from '~/components/navigation/app-sidebar';
import { SiteHeader } from '~/components/site-header';

import type {
  Product,
  ProductVariety,
  ProductCategory,
  ProductSeasonality,
  ProductRequestBody,
} from '~/types/product';

import { getDatabaseConnection } from '~/lib/database.server';
import type { Route } from './+types/products._index';

export async function loader(args: Route.LoaderArgs) {
  const db = await getDatabaseConnection({ init: false });

  const [productRows] = await db.query(`
		SELECT
				p.ProductID,
				p.ProductName,
				p.Quantity,
				pv.VarietyName,
				pc.CategoryName,
				ps.SeasonalityName,
				p.ShelfLifeDays
			FROM PRODUCT_T p
			JOIN PRODUCT_VARIETY_T pv ON p.VarietyID = pv.VarietyID
			JOIN PRODUCT_CATEGORY_T pc ON pv.CategoryID = pc.CategoryID
			JOIN PRODUCT_SEASONALITY_T ps ON p.SeasonalityID = ps.SeasonalityID
	`);

  const [productCategoryRows] = await db.query(
    `SELECT * FROM PRODUCT_CATEGORY_T`
  );

  const [productVarietyRows] = await db.query(
    `SELECT * FROM PRODUCT_VARIETY_T`
  );

  const [productSeasonalityRows] = await db.query(
    `SELECT * FROM PRODUCT_SEASONALITY_T`
  );

  const products = productRows as Product[];
  const productVarieties = productVarietyRows as ProductVariety[];
  const productCategories = productCategoryRows as ProductCategory[];
  const productSeasonalities = productSeasonalityRows as ProductSeasonality[];

  return {
    products,
    productVarieties,
    productCategories,
    productSeasonalities,
  };
}

export const action = async (args: Route.ActionArgs) => {
  const { request } = args;
  const formData = (await request.json()) as ProductRequestBody;

  const { Quantity, VarietyID, ProductName, SeasonalityID, ShelfLifeDays } =
    formData;

  const conn = await getDatabaseConnection({ init: false });

  if (args.request.method === 'POST') {
    const [existingProductRows] = await conn.query(
      `SELECT * FROM PRODUCT_T WHERE ProductName = ?`,
      [ProductName]
    );

    const result = existingProductRows as Array<Product>;

    if (result.length > 0) {
      return { error: 'Product already exists' };
    }

    const [createProductRows] = await conn.query(
      `INSERT INTO PRODUCT_T (ProductName, Quantity, VarietyID, SeasonalityID, ShelfLifeDays) VALUES (?, ?, ?, ?, ?)`,
      [ProductName, Quantity, VarietyID, SeasonalityID, ShelfLifeDays]
    );

    const createProductResult = createProductRows as unknown as {
      insertId: number;
      affectedRows: number;
    };

    if (createProductResult?.affectedRows === 0) {
      return { error: 'Failed to create product' };
    }

    const [newProductRows] = await conn.query(
      `SELECT * FROM PRODUCT_T WHERE ProductID = ?`,
      [createProductResult.insertId]
    );

    const newProduct = newProductRows as Array<Product>;

    if (newProduct.length === 0) {
      return { error: 'Failed to fetch new product' };
    }

    return { product: newProduct[0] };
  } else if (args.request.method === 'PUT') {
    const { ProductID } = formData;

    console.log('ProductID', ProductID);

    if (!ProductID || typeof ProductID !== 'number') {
      return { error: 'Product ID is required' };
    }

    const [updateProductRows] = await conn.query(
      `UPDATE PRODUCT_T SET ProductName = ?, Quantity = ?, VarietyID = ?, SeasonalityID = ?, ShelfLifeDays = ? WHERE ProductID = ?`,
      [
        ProductName,
        Quantity,
        VarietyID,
        SeasonalityID,
        ShelfLifeDays,
        ProductID,
      ]
    );

    const updateProductResult = updateProductRows as unknown as {
      affectedRows: number;
    };

    if (updateProductResult?.affectedRows === 0) {
      return { error: 'Failed to update product' };
    }

    const [updatedProductRows] = await conn.query(
      `SELECT * FROM PRODUCT_T WHERE ProductID = ?`,
      [ProductID]
    );

    const updatedProduct = updatedProductRows as Array<Product>;

    if (updatedProduct.length === 0) {
      return { error: 'Failed to fetch updated product' };
    }

    return { product: updatedProduct[0] };
  } else if (args.request.method === 'DELETE') {
    const { ProductID } = formData;
    console.log('ProductID', ProductID);

    if (!ProductID || typeof ProductID !== 'number') {
      return { error: 'Product ID is required' };
    }

    const [deleteProductRows] = await conn.query(
      `DELETE FROM PRODUCT_T WHERE ProductID = ?`,
      [ProductID]
    );

    const deleteProductResult = deleteProductRows as unknown as {
      affectedRows: number;
    };

    if (deleteProductResult?.affectedRows === 0) {
      return { error: 'Failed to delete product' };
    }

    return { success: true };
  }
};

export default function ProductsPage() {
  const productData = useLoaderData<typeof loader>();

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
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Product
              </Button>
            </AddProductDialog>
          </div>

          <Card className="border-secondary-200 dark:border-neutral-700">
            <CardHeader>
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
      </SidebarInset>
    </SidebarProvider>
  );
}
