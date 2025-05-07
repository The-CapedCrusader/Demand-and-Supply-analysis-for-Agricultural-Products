import { getDatabaseConnection } from '~/lib/database.server';

// Define types for loader arguments
export interface RouteArgs {
  request: Request;
  params: Record<string, string>;
  context: any;
}

// Types for advanced market analysis data
export interface HistoricalProduction {
  ProductID: number;
  ProductName: string;
  Year: number;
  TotalAcreage: number;
  AverageYield: number;
  ProductionCost: number;
  TotalProduction: number;
  Region: string;
  Notes?: string;
}

export interface ConsumerDemand {
  ProductID: number;
  ProductName: string;
  Year: number;
  Quarter: number;
  DemographicGroup: string;
  ConsumptionPerCapita: number;
  PriceElasticity: number;
  IncomeElasticity: number;
  SubstitutionIndex: number;
  Region: string;
  Notes?: string;
}

export interface SupplyInventory {
  ProductID: number;
  ProductName: string;
  WarehouseID: number;
  CurrentStock: number;
  MinimumStock: number;
  MaximumCapacity: number;
  LastUpdated: string;
  ExpiryDate: string;
  QualityGrade: string;
  StorageCondition: string;
  StockStatus: 'Low' | 'Adequate' | 'High';
  Notes?: string;
}

export interface WeatherImpact {
  ProductID: number;
  ProductName: string;
  Region: string;
  WeatherType: string;
  Year: number;
  Month: number;
  YieldImpactPercent: number;
  PriceImpactPercent: number;
  Notes?: string;
}

export interface ProductRecommendation {
  ProductID: number;
  ProductName: string;
  Region: string;
  SoilType: string;
  WaterRequirement: number;
  ProfitabilityIndex: number;
  RiskIndex: number;
  SustainabilityScore: number;
  RecommendedPlantingMonth: number;
  RecommendedHarvestMonth: number;
  Notes?: string;
}

export interface TradeAnalytics {
  ProductID: number;
  ProductName: string;
  ExportingCountry: string;
  ImportingCountry: string;
  Year: number;
  Quarter: number;
  TradeVolume: number;
  AveragePrice: number;
  TariffPercent: number;
  TradeBalance: number;
  Notes?: string;
}

export interface PolicyImpact {
  ProductID: number;
  ProductName: string;
  PolicyName: string;
  PolicyType: string;
  ImplementationDate: string;
  ImpactOnSupplyPercent: number;
  ImpactOnDemandPercent: number;
  ImpactOnPricePercent: number;
  Region: string;
  Notes?: string;
}

export interface SupplyChain {
  ProductID: number;
  ProductName: string;
  SourceRegion: string;
  DestinationRegion: string;
  TransportationCost: number;
  TransportTime: number;
  DistanceKm: number;
  BottleneckRisk: number;
  TransportMode: string;
  Notes?: string;
}

// Loader function to get advanced market analysis data
export async function loader({ request }: RouteArgs) {
  const db = await getDatabaseConnection();
  const url = new URL(request.url);
  
  // Get filter parameters
  const year = url.searchParams.get('year') || '2023';
  const product = url.searchParams.get('product') || '1';
  const region = url.searchParams.get('region') || 'all';
  const analysisType = url.searchParams.get('type') || 'production';
  
  try {
    // Get products for dropdown selector
    const [productsResult] = await db.query(`
      SELECT p.ProductID, p.ProductName, pv.VarietyName, pc.CategoryName
      FROM PRODUCT_T p
      JOIN PRODUCT_VARIETY_T pv ON p.VarietyID = pv.VarietyID
      JOIN PRODUCT_CATEGORY_T pc ON pv.CategoryID = pc.CategoryID
      ORDER BY p.ProductName
    `);
    
    // Get regions for dropdown selector
    const [regionsResult] = await db.query(`
      SELECT DISTINCT Region FROM HISTORICAL_PRODUCTION_T
      UNION
      SELECT DISTINCT Region FROM CONSUMER_DEMAND_T
      UNION
      SELECT DISTINCT Region FROM WEATHER_IMPACT_T
      UNION
      SELECT DISTINCT Region FROM PRODUCT_RECOMMENDATION_T
      UNION
      SELECT DISTINCT Region FROM POLICY_IMPACT_T
      ORDER BY Region
    `);
    
    // Get historical production data
    const [productionResult] = await db.query(`
      SELECT hp.ProductID, p.ProductName, hp.Year, hp.TotalAcreage, hp.AverageYield, 
             hp.ProductionCost, hp.TotalProduction, hp.Region, hp.Notes
      FROM HISTORICAL_PRODUCTION_T hp
      JOIN PRODUCT_T p ON hp.ProductID = p.ProductID
      WHERE (hp.ProductID = ? OR ? = 'all')
      AND (hp.Year = ? OR ? = 'all')
      AND (hp.Region = ? OR ? = 'all')
      ORDER BY hp.Year, hp.Region
    `, [product, product, year, year, region, region]);
    
    // Get consumer demand data
    const [demandResult] = await db.query(`
      SELECT cd.ProductID, p.ProductName, cd.Year, cd.Quarter, cd.DemographicGroup, 
             cd.ConsumptionPerCapita, cd.PriceElasticity, cd.IncomeElasticity, 
             cd.SubstitutionIndex, cd.Region, cd.Notes
      FROM CONSUMER_DEMAND_T cd
      JOIN PRODUCT_T p ON cd.ProductID = p.ProductID
      WHERE (cd.ProductID = ? OR ? = 'all')
      AND (cd.Year = ? OR ? = 'all')
      AND (cd.Region = ? OR ? = 'all')
      ORDER BY cd.Year, cd.Quarter, cd.DemographicGroup
    `, [product, product, year, year, region, region]);
    
    // Get supply inventory data
    const [inventoryResult] = await db.query(`
      SELECT si.ProductID, p.ProductName, si.WarehouseID, si.CurrentStock, si.MinimumStock, 
             si.MaximumCapacity, si.LastUpdated, si.ExpiryDate, si.QualityGrade, 
             si.StorageCondition, si.Notes,
             CASE 
               WHEN si.CurrentStock <= si.MinimumStock THEN 'Low'
               WHEN si.CurrentStock >= si.MaximumCapacity * 0.8 THEN 'High'
               ELSE 'Adequate'
             END AS StockStatus
      FROM SUPPLY_INVENTORY_T si
      JOIN PRODUCT_T p ON si.ProductID = p.ProductID
      WHERE (si.ProductID = ? OR ? = 'all')
      ORDER BY si.ProductID, si.WarehouseID
    `, [product, product]);
    
    // Get weather impact data
    const [weatherResult] = await db.query(`
      SELECT wi.ProductID, p.ProductName, wi.Region, wi.WeatherType, wi.Year, wi.Month, 
             wi.YieldImpactPercent, wi.PriceImpactPercent, wi.Notes
      FROM WEATHER_IMPACT_T wi
      JOIN PRODUCT_T p ON wi.ProductID = p.ProductID
      WHERE (wi.ProductID = ? OR ? = 'all')
      AND (wi.Year = ? OR ? = 'all')
      AND (wi.Region = ? OR ? = 'all')
      ORDER BY wi.Year, wi.Month
    `, [product, product, year, year, region, region]);
    
    // Get product recommendations
    const [recommendationResult] = await db.query(`
      SELECT pr.ProductID, p.ProductName, pr.Region, pr.SoilType, pr.WaterRequirement, 
             pr.ProfitabilityIndex, pr.RiskIndex, pr.SustainabilityScore, 
             pr.RecommendedPlantingMonth, pr.RecommendedHarvestMonth, pr.Notes
      FROM PRODUCT_RECOMMENDATION_T pr
      JOIN PRODUCT_T p ON pr.ProductID = p.ProductID
      WHERE (pr.ProductID = ? OR ? = 'all')
      AND (pr.Region = ? OR ? = 'all')
      ORDER BY pr.ProductID, pr.Region
    `, [product, product, region, region]);
    
    // Get trade analytics data
    const [tradeResult] = await db.query(`
      SELECT ta.ProductID, p.ProductName, ta.ExportingCountry, ta.ImportingCountry, 
             ta.Year, ta.Quarter, ta.TradeVolume, ta.AveragePrice, 
             ta.TariffPercent, ta.TradeBalance, ta.Notes
      FROM TRADE_ANALYTICS_T ta
      JOIN PRODUCT_T p ON ta.ProductID = p.ProductID
      WHERE (ta.ProductID = ? OR ? = 'all')
      AND (ta.Year = ? OR ? = 'all')
      ORDER BY ta.Year, ta.Quarter
    `, [product, product, year, year]);
    
    // Get policy impact data
    const [policyResult] = await db.query(`
      SELECT pi.ProductID, p.ProductName, pi.PolicyName, pi.PolicyType, 
             pi.ImplementationDate, pi.ImpactOnSupplyPercent, pi.ImpactOnDemandPercent, 
             pi.ImpactOnPricePercent, pi.Region, pi.Notes
      FROM POLICY_IMPACT_T pi
      JOIN PRODUCT_T p ON pi.ProductID = p.ProductID
      WHERE (pi.ProductID = ? OR ? = 'all')
      AND (pi.Region = ? OR ? = 'all')
      ORDER BY pi.ImplementationDate DESC
    `, [product, product, region, region]);
    
    // Get supply chain data
    const [supplyChainResult] = await db.query(`
      SELECT sc.ProductID, p.ProductName, sc.SourceRegion, sc.DestinationRegion, 
             sc.TransportationCost, sc.TransportTime, sc.DistanceKm, 
             sc.BottleneckRisk, sc.TransportMode, sc.Notes
      FROM SUPPLY_CHAIN_T sc
      JOIN PRODUCT_T p ON sc.ProductID = p.ProductID
      WHERE (sc.ProductID = ? OR ? = 'all')
      ORDER BY sc.ProductID, sc.SourceRegion, sc.DestinationRegion
    `, [product, product]);
    
    // Generate aggregated statistics for dashboards
    
    // Production trends over years
    const [productionTrendsResult] = await db.query(`
      SELECT hp.Year, p.ProductName,
             SUM(hp.TotalProduction) as TotalProduction,
             AVG(hp.AverageYield) as AverageYield,
             AVG(hp.ProductionCost) as AverageProductionCost
      FROM HISTORICAL_PRODUCTION_T hp
      JOIN PRODUCT_T p ON hp.ProductID = p.ProductID
      GROUP BY hp.Year, p.ProductName
      ORDER BY hp.Year, p.ProductName
    `);
    
    // Regional production comparison
    const [regionalProductionResult] = await db.query(`
      SELECT hp.Region, p.ProductName,
             SUM(hp.TotalProduction) as TotalProduction
      FROM HISTORICAL_PRODUCTION_T hp
      JOIN PRODUCT_T p ON hp.ProductID = p.ProductID
      WHERE hp.Year = ?
      GROUP BY hp.Region, p.ProductName
      ORDER BY hp.Region, p.ProductName
    `, [year]);
    
    // Supply-demand balance
    const [supplyDemandBalanceResult] = await db.query(`
      SELECT p.ProductName, 
             SUM(si.CurrentStock) as CurrentSupply,
             SUM(cd.ConsumptionPerCapita * (SELECT SUM(Population) FROM REGIONAL_MARKET_STAT_T WHERE Year = ?)) as EstimatedDemand
      FROM PRODUCT_T p
      LEFT JOIN SUPPLY_INVENTORY_T si ON p.ProductID = si.ProductID
      LEFT JOIN CONSUMER_DEMAND_T cd ON p.ProductID = cd.ProductID AND cd.Year = ? AND cd.Quarter = QUARTER(NOW())
      GROUP BY p.ProductName
    `, [year, year]);
    
    // Price impact analysis
    const [priceImpactResult] = await db.query(`
      SELECT wi.WeatherType, AVG(wi.PriceImpactPercent) as AvgPriceImpact, COUNT(*) as OccurrenceCount
      FROM WEATHER_IMPACT_T wi
      WHERE wi.Year = ?
      GROUP BY wi.WeatherType
      ORDER BY AvgPriceImpact
    `, [year]);
    
    return { 
      products: productsResult,
      regions: regionsResult,
      production: productionResult,
      demand: demandResult,
      inventory: inventoryResult,
      weatherImpact: weatherResult,
      recommendations: recommendationResult,
      tradeAnalytics: tradeResult,
      policyImpact: policyResult,
      supplyChain: supplyChainResult,
      
      aggregatedData: {
        productionTrends: productionTrendsResult,
        regionalProduction: regionalProductionResult,
        supplyDemandBalance: supplyDemandBalanceResult,
        priceImpact: priceImpactResult
      },
      
      filters: {
        selectedYear: year,
        selectedProduct: product,
        selectedRegion: region,
        selectedAnalysisType: analysisType
      }
    };
  } catch (error) {
    console.error('Error fetching advanced market analysis data:', error);
    return { 
      error: 'Failed to fetch advanced market analysis data',
      products: [],
      regions: [],
      production: [],
      demand: [],
      inventory: [],
      weatherImpact: [],
      recommendations: [],
      tradeAnalytics: [],
      policyImpact: [],
      supplyChain: [],
      aggregatedData: {
        productionTrends: [],
        regionalProduction: [],
        supplyDemandBalance: [],
        priceImpact: []
      },
      filters: {
        selectedYear: year,
        selectedProduct: product,
        selectedRegion: region,
        selectedAnalysisType: analysisType
      }
    };
  }
}

export async function action({ request }: RouteArgs) {
  try {
    const db = await getDatabaseConnection();
    const formData = await request.formData();
    const actionType = formData.get('actionType');

    switch (actionType) {
      case 'updateProduction': {
        const productId = formData.get('productId');
        const year = formData.get('year');
        const region = formData.get('region');
        const totalAcreage = formData.get('totalAcreage');
        const averageYield = formData.get('averageYield');
        const productionCost = formData.get('productionCost');
        const totalProduction = formData.get('totalProduction');
        const notes = formData.get('notes') || '';

        await db.query(`
          INSERT INTO HISTORICAL_PRODUCTION_T (ProductID, Year, TotalAcreage, AverageYield, ProductionCost, TotalProduction, Region, Notes)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
          ON DUPLICATE KEY UPDATE
            TotalAcreage = VALUES(TotalAcreage),
            AverageYield = VALUES(AverageYield),
            ProductionCost = VALUES(ProductionCost),
            TotalProduction = VALUES(TotalProduction),
            Notes = VALUES(Notes)
        `, [productId, year, totalAcreage, averageYield, productionCost, totalProduction, region, notes]);
        
        break;
      }
      
      case 'updateInventory': {
        const productId = formData.get('productId');
        const warehouseId = formData.get('warehouseId');
        const currentStock = formData.get('currentStock');
        const minimumStock = formData.get('minimumStock');
        const maximumCapacity = formData.get('maximumCapacity');
        const qualityGrade = formData.get('qualityGrade');
        const storageCondition = formData.get('storageCondition');
        const notes = formData.get('notes') || '';

        await db.query(`
          INSERT INTO SUPPLY_INVENTORY_T (ProductID, WarehouseID, CurrentStock, MinimumStock, MaximumCapacity, LastUpdated, QualityGrade, StorageCondition, Notes)
          VALUES (?, ?, ?, ?, ?, NOW(), ?, ?, ?)
          ON DUPLICATE KEY UPDATE
            CurrentStock = VALUES(CurrentStock),
            MinimumStock = VALUES(MinimumStock),
            MaximumCapacity = VALUES(MaximumCapacity),
            LastUpdated = NOW(),
            QualityGrade = VALUES(QualityGrade),
            StorageCondition = VALUES(StorageCondition),
            Notes = VALUES(Notes)
        `, [productId, warehouseId, currentStock, minimumStock, maximumCapacity, qualityGrade, storageCondition, notes]);
        
        break;
      }
      
      case 'addWeatherImpact': {
        const productId = formData.get('productId');
        const region = formData.get('region');
        const weatherType = formData.get('weatherType');
        const year = formData.get('year');
        const month = formData.get('month');
        const yieldImpactPercent = formData.get('yieldImpactPercent');
        const priceImpactPercent = formData.get('priceImpactPercent');
        const notes = formData.get('notes') || '';

        await db.query(`
          INSERT INTO WEATHER_IMPACT_T (ProductID, Region, WeatherType, Year, Month, YieldImpactPercent, PriceImpactPercent, Notes)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `, [productId, region, weatherType, year, month, yieldImpactPercent, priceImpactPercent, notes]);
        
        break;
      }
      
      default:
        throw new Error('Invalid action type');
    }

    // Return to the same page with the current filters
    const url = new URL(request.url);
    const year = url.searchParams.get('year') || '2023';
    const product = url.searchParams.get('product') || '1';
    const region = url.searchParams.get('region') || 'all';
    const analysisType = url.searchParams.get('type') || 'production';
    
    // Return a proper redirect response
    return new Response(null, {
      status: 303, // See Other
      headers: {
        Location: `/market-analysis/advanced?year=${year}&product=${product}&region=${region}&type=${analysisType}`,
      },
    });
  } catch (error) {
    console.error('Error updating market analysis data:', error);
    return { success: false, error: 'Failed to update market analysis data' };
  }
} 