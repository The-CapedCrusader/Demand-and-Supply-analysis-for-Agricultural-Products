import type { Route } from './+types/route';
import { getDatabaseConnection } from '~/lib/database.server';
import type { Product, ProductRequestBody } from '~/types/product';

export const action = async (args: Route.ActionArgs) => {
  const { request } = args;
  const formData = (await request.json()) as ProductRequestBody;

  const {
    Quantity,
    VarietyID,
    CategoryID,
    ProductName,
    SeasonalityID,
    ShelfLifeDays,
  } = formData;

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
