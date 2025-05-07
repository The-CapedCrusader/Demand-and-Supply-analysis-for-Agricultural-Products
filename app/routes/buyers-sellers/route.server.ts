import { getDatabaseConnection } from '~/lib/database.server';

// Define types for loader arguments
export interface RouteArgs {
  request: Request;
  params: Record<string, string>;
  context: any;
}

export async function loader({ }: RouteArgs) {
  const db = await getDatabaseConnection();

  // Fetch buyers with their interested products
  const [buyers] = await db.query(`
    SELECT u.UserID, u.Name, u.Email, u.AddressLine1, u.AddressLine2, u.Zip
    FROM USER_T u
    WHERE u.UserType = 'customer'
  `);

  // Get products associated with each buyer (through purchase history or interests)
  // This is a sample query, in real app you'd have actual purchase records or interests
  const buyerProducts = [];
  for (const buyer of (buyers as any[])) {
    // Sample query to get products a buyer might be interested in
    const [products] = await db.query(`
      SELECT p.ProductID, p.ProductName, pv.VarietyName, pc.CategoryName
      FROM PRODUCT_T p
      JOIN PRODUCT_VARIETY_T pv ON p.VarietyID = pv.VarietyID
      JOIN PRODUCT_CATEGORY_T pc ON pv.CategoryID = pc.CategoryID
      ORDER BY RAND()
      LIMIT 3
    `);
    
    buyerProducts.push({
      buyerId: buyer.UserID,
      products: products
    });
  }

  // Fetch sellers (vendors) with their products
  const [sellers] = await db.query(`
    SELECT v.LicenseID, u.UserID, u.Name, u.Email, u.AddressLine1, u.AddressLine2, u.Zip, v.VendorType
    FROM VENDOR_T v
    JOIN USER_T u ON v.UserID = u.UserID
  `);

  // Get products associated with each seller (through inventory or sales)
  const sellerProducts = [];
  for (const seller of (sellers as any[])) {
    // Sample query to get products a seller might be offering
    const [products] = await db.query(`
      SELECT p.ProductID, p.ProductName, pv.VarietyName, pc.CategoryName
      FROM PRODUCT_T p
      JOIN PRODUCT_VARIETY_T pv ON p.VarietyID = pv.VarietyID
      JOIN PRODUCT_CATEGORY_T pc ON pv.CategoryID = pc.CategoryID
      ORDER BY RAND()
      LIMIT 4
    `);
    
    sellerProducts.push({
      sellerId: seller.LicenseID,
      products: products
    });
  }

  // Get product sales statistics for charts
  const [productSalesData] = await db.query(`
    SELECT 
      pc.CategoryName, 
      COUNT(p.ProductID) as ProductCount,
      SUM(p.Quantity) as TotalQuantity
    FROM PRODUCT_T p
    JOIN PRODUCT_VARIETY_T pv ON p.VarietyID = pv.VarietyID
    JOIN PRODUCT_CATEGORY_T pc ON pv.CategoryID = pc.CategoryID
    GROUP BY pc.CategoryName
    ORDER BY TotalQuantity DESC
    LIMIT 6
  `);

  // Get market analysis data for buyers and sellers
  let marketPriceTrends: any[] = [];
  let marketDemandSupply: any[] = [];
  let marketRegionalStats: any[] = [];
  
  try {
    // Get the latest market price trends
    const [priceTrendsResult] = await db.query(`
      SELECT mpt.Month, mpt.Year, p.ProductName, mpt.Price, mpt.ChangePercentage
      FROM MARKET_PRICE_TREND_T mpt
      JOIN PRODUCT_T p ON mpt.ProductID = p.ProductID
      WHERE mpt.Year = (SELECT MAX(Year) FROM MARKET_PRICE_TREND_T)
      ORDER BY 
        CASE mpt.Month
          WHEN 'Jan' THEN 1
          WHEN 'Feb' THEN 2
          WHEN 'Mar' THEN 3
          WHEN 'Apr' THEN 4
          WHEN 'May' THEN 5
          WHEN 'Jun' THEN 6
          WHEN 'Jul' THEN 7
          WHEN 'Aug' THEN 8
          WHEN 'Sep' THEN 9
          WHEN 'Oct' THEN 10
          WHEN 'Nov' THEN 11
          WHEN 'Dec' THEN 12
        END DESC
      LIMIT 10
    `);
    marketPriceTrends = priceTrendsResult as any[];
    
    // Get demand-supply data for market overview
    const [demandSupplyResult] = await db.query(`
      SELECT mds.Year, mds.Quarter, p.ProductName, mds.Demand, mds.Supply, 
             ((mds.Demand - mds.Supply) / mds.Demand * 100) as SupplyGapPercent
      FROM MARKET_DEMAND_SUPPLY_T mds
      JOIN PRODUCT_T p ON mds.ProductID = p.ProductID
      WHERE mds.Year = (SELECT MAX(Year) FROM MARKET_DEMAND_SUPPLY_T)
      ORDER BY mds.Quarter DESC
      LIMIT 8
    `);
    marketDemandSupply = demandSupplyResult as any[];
    
    // Get regional stats for buyer/seller insights
    const [regionalStatsResult] = await db.query(`
      SELECT rms.Region, p.ProductName, rms.Consumption
      FROM REGIONAL_MARKET_STAT_T rms
      JOIN PRODUCT_T p ON rms.ProductID = p.ProductID
      WHERE rms.Year = (SELECT MAX(Year) FROM REGIONAL_MARKET_STAT_T)
      ORDER BY rms.Consumption DESC
      LIMIT 8
    `);
    marketRegionalStats = regionalStatsResult as any[];
  } catch (error) {
    console.error('Error fetching market analysis data:', error);
    // If tables don't exist yet or other errors, provide empty arrays
    marketPriceTrends = [];
    marketDemandSupply = [];
    marketRegionalStats = [];
  }

  // Get monthly sales data for trend charts
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthlySalesData = months.map(month => {
    // Generate sample data for each month
    return {
      month,
      fruits: Math.floor(Math.random() * 1000) + 500,
      vegetables: Math.floor(Math.random() * 800) + 300,
      grains: Math.floor(Math.random() * 1200) + 600
    };
  });

  // Format price trends for chart display
  const formattedPriceTrends: Record<string, Array<{month: string, price: number, change: number}>> = {
    rice: [],
    wheat: []
  };
  
  marketPriceTrends.forEach(item => {
    const productName = item.ProductName.toLowerCase();
    if (productName.includes('rice')) {
      formattedPriceTrends['rice'].push({
        month: item.Month,
        price: item.Price,
        change: item.ChangePercentage
      });
    } else if (productName.includes('wheat')) {
      formattedPriceTrends['wheat'].push({
        month: item.Month,
        price: item.Price,
        change: item.ChangePercentage
      });
    }
  });

  return { 
    buyers, 
    sellers, 
    buyerProducts, 
    sellerProducts,
    productSalesData,
    monthlySalesData,
    marketPriceTrends,
    marketDemandSupply,
    marketRegionalStats,
    formattedPriceTrends
  };
} 