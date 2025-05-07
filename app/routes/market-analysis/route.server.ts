import { getDatabaseConnection } from '~/lib/database.server';

// Define types for loader arguments
export interface RouteArgs {
  request: Request;
  params: Record<string, string>;
  context: any;
}

// Types for market analysis data
export interface PriceTrend {
  ProductID: number;
  ProductName: string;
  Month: string;
  Year: number;
  Price: number;
  ChangePercentage: number;
  Notes?: string;
}

export interface DemandSupply {
  ProductID: number;
  ProductName: string;
  Year: number;
  Quarter: number;
  Demand: number;
  Supply: number;
  Region: string;
  Notes?: string;
}

export interface RegionalStat {
  Region: string;
  Year: number;
  GDP: number;
  Population: number;
  ProductID: number;
  ProductName: string;
  Consumption: number;
  Notes?: string;
}

export interface MarketForecast {
  ProductID: number;
  ProductName: string;
  Year: number;
  ProjectedDemand: number;
  ProjectedSupply: number;
  ProjectedPrice: number;
  Confidence: number;
  FactorsConsidered?: string;
}

// Add these interfaces at the top with the other interfaces
interface ProductGroups {
  [key: string]: {
    [month: string]: number;
  };
}

interface ChartDataPoint {
  month: string;
  [productName: string]: string | number | null;
}

interface RegionalDataPoint {
  region: string;
  gdp: number;
  population: number;
  [key: string]: string | number;
}

// Add these type definitions at the top with other interfaces
interface QueryResult<T> {
  [key: number]: T;
  length: number;
}

interface FieldPacket {
  // Add any necessary field packet properties here
}

// Helper function to safely cast database results
function castQueryResult<T>(result: unknown): T[] {
  if (Array.isArray(result)) {
    return result as T[];
  }
  return [];
}

// Loader function to get market analysis data
export async function loader({ request }: RouteArgs) {
  const db = await getDatabaseConnection();
  const url = new URL(request.url);
  
  // Get filter parameters
  const year = url.searchParams.get('year') || '2024';
  const crop = url.searchParams.get('crop') || 'rice';
  
  try {
    // First, let's get all available products
    const [allProductsResult] = await db.query(`
      SELECT ProductID, ProductName 
      FROM PRODUCT_T 
      ORDER BY ProductName
    `);
    
    const allProducts = castQueryResult<{ProductID: number, ProductName: string}>(allProductsResult);
    console.log('Available products:', allProducts);

    console.log('Fetching data for year:', year, 'crop:', crop);

    // Get price trends data
    const [priceTrendsResult] = await db.query(`
      SELECT mpt.ProductID, p.ProductName, mpt.Month, mpt.Year, mpt.Price, mpt.ChangePercentage, mpt.Notes
      FROM MARKET_PRICE_TREND_T mpt
      JOIN PRODUCT_T p ON mpt.ProductID = p.ProductID
      WHERE mpt.Year = ? AND p.ProductName = ?
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
        END
    `, [year, crop]);
    
    const priceTrends = castQueryResult<PriceTrend>(priceTrendsResult);
    console.log('Price trends result:', priceTrends);

    // Get all price trends for comparison charts
    const [allPriceTrendsResult] = await db.query(`
      SELECT mpt.ProductID, p.ProductName, mpt.Month, mpt.Year, mpt.Price
      FROM MARKET_PRICE_TREND_T mpt
      JOIN PRODUCT_T p ON mpt.ProductID = p.ProductID
      WHERE mpt.Year = ?
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
        END
    `, [year]);
    
    const allPriceTrends = castQueryResult<any>(allPriceTrendsResult);
    console.log('All price trends result:', allPriceTrends);

    // Get demand-supply data
    const [demandSupplyResult] = await db.query(`
      SELECT mds.ProductID, p.ProductName, mds.Year, mds.Quarter, mds.Demand, mds.Supply, mds.Region, mds.Notes
      FROM MARKET_DEMAND_SUPPLY_T mds
      JOIN PRODUCT_T p ON mds.ProductID = p.ProductID
      WHERE mds.Year = ? AND p.ProductName = ?
      ORDER BY mds.Quarter
    `, [year, crop]);
    
    const demandSupply = castQueryResult<DemandSupply>(demandSupplyResult);
    console.log('Demand supply result:', demandSupply);

    // Get all demand-supply data for projection
    const [allDemandSupplyResult] = await db.query(`
      SELECT mds.Year, SUM(mds.Demand) as TotalDemand, SUM(mds.Supply) as TotalSupply
      FROM MARKET_DEMAND_SUPPLY_T mds
      JOIN PRODUCT_T p ON mds.ProductID = p.ProductID
      WHERE p.ProductName = ?
      GROUP BY mds.Year
      ORDER BY mds.Year
    `, [crop]);
    
    const allDemandSupply = castQueryResult<any>(allDemandSupplyResult);
    console.log('All demand supply result:', allDemandSupply);

    // Get regional statistics
    const [regionalStatsResult] = await db.query(`
      SELECT rms.Region, rms.Year, rms.GDP, rms.Population, rms.ProductID, p.ProductName, rms.Consumption, rms.Notes
      FROM REGIONAL_MARKET_STAT_T rms
      JOIN PRODUCT_T p ON rms.ProductID = p.ProductID
      WHERE rms.Year = ?
      ORDER BY rms.Region
    `, [year]);
    
    const regionalStats = castQueryResult<RegionalStat>(regionalStatsResult);
    console.log('Regional stats result:', regionalStats);

    // Get market forecast data
    const [forecastResult] = await db.query(`
      SELECT mf.ProductID, p.ProductName, mf.Year, mf.ProjectedDemand, mf.ProjectedSupply, 
             mf.ProjectedPrice, mf.Confidence, mf.FactorsConsidered
      FROM MARKET_FORECAST_T mf
      JOIN PRODUCT_T p ON mf.ProductID = p.ProductID
      WHERE p.ProductName = ?
      ORDER BY mf.Year
    `, [crop]);
    
    const forecast = castQueryResult<MarketForecast>(forecastResult);
    console.log('Forecast result:', forecast);

    // Get available products for the dropdown
    const [productsResult] = await db.query(`
      SELECT DISTINCT p.ProductName
      FROM PRODUCT_T p
      JOIN MARKET_PRICE_TREND_T mpt ON p.ProductID = mpt.ProductID
      ORDER BY p.ProductName
    `);
    
    const products = castQueryResult<{ProductName: string}>(productsResult);
    console.log('Products result:', products);

    // Get available years for the dropdown
    const [yearsResult] = await db.query(`
      SELECT DISTINCT Year
      FROM MARKET_PRICE_TREND_T
      ORDER BY Year
    `);
    
    const years = castQueryResult<{Year: number}>(yearsResult);
    console.log('Years result:', years);

    // Process the data for charts
    const chartData = processChartData(allPriceTrends);
    const demandProjection = processDemandProjection(allDemandSupply);
    const regionalData = processRegionalData(regionalStats);

    return { 
      priceTrends,
      chartData,
      demandSupply,
      regionalStats,
      gdpData: regionalData,
      forecast,
      demandProjection,
      products,
      years,
      selectedYear: year,
      selectedCrop: crop
    };
  } catch (error) {
    console.error('Error fetching market analysis data:', error);
    return { 
      error: 'Failed to fetch market analysis data: ' + (error as Error).message,
      priceTrends: [],
      chartData: [],
      demandSupply: [],
      regionalStats: [],
      gdpData: [],
      forecast: [],
      demandProjection: [],
      products: [],
      years: [],
      selectedYear: year,
      selectedCrop: crop
    };
  }
}

// Helper function to process chart data
function processChartData(allPriceTrendsResult: any[]) {
  const chartData: ChartDataPoint[] = [];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const productGroups: ProductGroups = {};
  
  // Group by month and collect prices for each product
  allPriceTrendsResult.forEach(item => {
    const productName = item.ProductName.toLowerCase();
    if (!productGroups[productName]) {
      productGroups[productName] = {};
    }
    productGroups[productName][item.Month] = item.Price;
  });
  
  // Create chart data array
  months.forEach(month => {
    const dataPoint: ChartDataPoint = { month };
    Object.keys(productGroups).forEach(productName => {
      dataPoint[productName] = productGroups[productName][month] || null;
    });
    if (Object.values(dataPoint).some(value => value !== null && value !== month)) {
      chartData.push(dataPoint);
    }
  });
  
  return chartData;
}

// Helper function to process demand projection data
function processDemandProjection(allDemandSupplyResult: any[]) {
  return allDemandSupplyResult.map(item => ({
    year: item.Year.toString(),
    demand: item.TotalDemand,
    supply: item.TotalSupply
  }));
}

// Helper function to process regional data
function processRegionalData(regionalStatsResult: any[]) {
  const regionalData: RegionalDataPoint[] = [];
  const regions = [...new Set(regionalStatsResult.map(item => item.Region))];
  
  regions.forEach(region => {
    const regionItems = regionalStatsResult.filter(item => item.Region === region);
    const dataPoint: RegionalDataPoint = { 
      region,
      gdp: regionItems[0]?.GDP || 0,
      population: regionItems[0]?.Population || 0
    };
    
    regionItems.forEach(item => {
      const productKey = item.ProductName.toLowerCase().replace(/\s+/g, '') + 'Consumption';
      dataPoint[productKey] = item.Consumption;
    });
    
    regionalData.push(dataPoint);
  });
  
  return regionalData;
}

export async function action({ request }: RouteArgs) {
  try {
    const db = await getDatabaseConnection();
    const formData = await request.formData();
    const dataType = formData.get('dataType');

    // First get the ProductID from the ProductName
    const productName = formData.get('productId');
    const [productResult] = (await db.query(`
      SELECT ProductID FROM PRODUCT_T WHERE ProductName = ?
    `, [productName])) as unknown as [QueryResult<{ProductID: number}>, FieldPacket[]];

    if (!productResult || productResult.length === 0) {
      throw new Error('Invalid product selected');
    }

    const productId = productResult[0].ProductID;

    switch (dataType) {
      case 'price': {
        const month = formData.get('month');
        const year = formData.get('year');
        const price = formData.get('price');
        const changePercentage = formData.get('changePercentage');
        const notes = formData.get('notes') || '';

        // Add to MARKET_PRICE_TREND_T table
        await db.query(`
          INSERT INTO MARKET_PRICE_TREND_T (ProductID, Month, Year, Price, ChangePercentage, Notes)
          VALUES (?, ?, ?, ?, ?, ?)
        `, [productId, month, year, price, changePercentage, notes]);
        
        break;
      }
      case 'demand': {
        const year = formData.get('year');
        const quarter = formData.get('quarter');
        const demand = formData.get('demand');
        const supply = formData.get('supply');
        const region = formData.get('region') || 'Global';
        const notes = formData.get('notes') || '';

        // Add to MARKET_DEMAND_SUPPLY_T table
        await db.query(`
          INSERT INTO MARKET_DEMAND_SUPPLY_T (ProductID, Year, Quarter, Demand, Supply, Region, Notes)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `, [productId, year, quarter, demand, supply, region, notes]);
        
        break;
      }
      case 'regional': {
        const region = formData.get('region');
        const year = formData.get('year');
        const gdp = formData.get('gdp');
        const population = formData.get('population');
        const consumption = formData.get('consumption');
        const notes = formData.get('notes') || '';

        // Add to REGIONAL_MARKET_STAT_T table
        await db.query(`
          INSERT INTO REGIONAL_MARKET_STAT_T (Region, Year, GDP, Population, ProductID, Consumption, Notes)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `, [region, year, gdp, population, productId, consumption, notes]);
        
        break;
      }
      case 'forecast': {
        const year = formData.get('year');
        const projectedDemand = formData.get('projectedDemand');
        const projectedSupply = formData.get('projectedSupply');
        const projectedPrice = formData.get('projectedPrice');
        const confidence = formData.get('confidence');
        const factorsConsidered = formData.get('factorsConsidered') || '';

        // Add to MARKET_FORECAST_T table
        await db.query(`
          INSERT INTO MARKET_FORECAST_T (ProductID, Year, ProjectedDemand, ProjectedSupply, ProjectedPrice, Confidence, FactorsConsidered)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `, [productId, year, projectedDemand, projectedSupply, projectedPrice, confidence, factorsConsidered]);
        
        break;
      }
      default:
        throw new Error('Invalid data type');
    }

    // Return to the same page with the current filters
    const url = new URL(request.url);
    const year = url.searchParams.get('year') || '2024';
    const crop = url.searchParams.get('crop') || 'rice';
    
    return { success: true, redirect: `/market-analysis?year=${year}&crop=${crop}` };
  } catch (error) {
    console.error('Error adding market data:', error);
    return { success: false, error: 'Failed to add market data: ' + (error as Error).message };
  }
} 