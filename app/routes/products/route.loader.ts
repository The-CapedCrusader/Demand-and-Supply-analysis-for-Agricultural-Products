import type { Route } from './+types/route';
import type {
  Product,
  ProductCategory,
  ProductSeasonality,
  ProductVariety,
} from '~/types/product';
import { getDatabaseConnection } from '~/lib/database.server';

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
