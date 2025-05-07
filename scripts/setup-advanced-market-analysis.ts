import { getDatabaseConnection } from '~/lib/database.server';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function executeStatement(connection: any, sql: string, description: string) {
  try {
    // Skip comments and empty lines
    if (sql.trim().startsWith('--') || !sql.trim()) {
      return true;
    }
    
    console.log(`Executing ${description}: ${sql.substring(0, 100)}...`);
    await connection.query(sql);
    return true;
  } catch (error) {
    console.error(`Error executing statement: ${sql.substring(0, 100)}...`);
    console.error(error);
    return false;
  }
}

async function setupAdvancedMarketAnalysis() {
  console.log('🔌 Connecting to database...');
  let connection;
  try {
    connection = await getDatabaseConnection();
    console.log('✅ Connected to database');
    
    // Create tables one by one
    console.log('Creating Product Seasonality table...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS PRODUCT_SEASONALITY_T (
        SeasonalityID INT PRIMARY KEY AUTO_INCREMENT,
        SeasonalityName VARCHAR(100) NOT NULL,
        StartMonth INT,
        EndMonth INT,
        Description TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    
    console.log('Altering Product table...');
    await connection.query(`
      ALTER TABLE PRODUCT_T 
      ADD COLUMN IF NOT EXISTS SeasonalityID INT,
      ADD COLUMN IF NOT EXISTS ShelfLifeDays INT,
      ADD COLUMN IF NOT EXISTS StorageRequirements TEXT
    `);
    
    try {
      await connection.query(`
        ALTER TABLE PRODUCT_T 
        ADD CONSTRAINT FK_PRODUCT_SEASONALITY FOREIGN KEY (SeasonalityID) REFERENCES PRODUCT_SEASONALITY_T(SeasonalityID)
      `);
    } catch (error) {
      console.warn('Could not add foreign key constraint. This is expected if it already exists.');
    }
    
    console.log('Creating Historical Production table...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS HISTORICAL_PRODUCTION_T (
        ProductionID INT PRIMARY KEY AUTO_INCREMENT,
        ProductID INT NOT NULL,
        Year YEAR NOT NULL,
        TotalAcreage DECIMAL(12,2),
        AverageYield DECIMAL(10,2),
        ProductionCost DECIMAL(12,2),
        TotalProduction DECIMAL(15,2),
        Region VARCHAR(100),
        Notes TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT FK_HISTORICAL_PRODUCTION_PRODUCT FOREIGN KEY (ProductID) REFERENCES PRODUCT_T(ProductID)
      )
    `);
    
    console.log('Creating Consumer Demand table...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS CONSUMER_DEMAND_T (
        DemandID INT PRIMARY KEY AUTO_INCREMENT,
        ProductID INT NOT NULL,
        Year YEAR NOT NULL,
        Quarter TINYINT,
        DemographicGroup VARCHAR(100),
        ConsumptionPerCapita DECIMAL(10,2),
        PriceElasticity DECIMAL(5,2),
        IncomeElasticity DECIMAL(5,2),
        SubstitutionIndex DECIMAL(5,2),
        Region VARCHAR(100),
        Notes TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT FK_CONSUMER_DEMAND_PRODUCT FOREIGN KEY (ProductID) REFERENCES PRODUCT_T(ProductID)
      )
    `);
    
    console.log('Creating Supply Inventory table...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS SUPPLY_INVENTORY_T (
        InventoryID INT PRIMARY KEY AUTO_INCREMENT,
        ProductID INT NOT NULL,
        WarehouseID INT,
        CurrentStock DECIMAL(15,2),
        MinimumStock DECIMAL(15,2),
        MaximumCapacity DECIMAL(15,2),
        LastUpdated DATETIME,
        ExpiryDate DATE,
        QualityGrade VARCHAR(50),
        StorageCondition VARCHAR(100),
        Notes TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT FK_SUPPLY_INVENTORY_PRODUCT FOREIGN KEY (ProductID) REFERENCES PRODUCT_T(ProductID)
      )
    `);
    
    console.log('Creating Supply Chain table...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS SUPPLY_CHAIN_T (
        SupplyChainID INT PRIMARY KEY AUTO_INCREMENT,
        ProductID INT NOT NULL,
        SourceRegion VARCHAR(100),
        DestinationRegion VARCHAR(100),
        TransportationCost DECIMAL(10,2),
        TransportTime INT,
        DistanceKm DECIMAL(10,2),
        BottleneckRisk DECIMAL(5,2),
        TransportMode VARCHAR(50),
        Notes TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT FK_SUPPLY_CHAIN_PRODUCT FOREIGN KEY (ProductID) REFERENCES PRODUCT_T(ProductID)
      )
    `);
    
    console.log('Creating Weather Impact table...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS WEATHER_IMPACT_T (
        WeatherImpactID INT PRIMARY KEY AUTO_INCREMENT,
        ProductID INT NOT NULL,
        Region VARCHAR(100),
        WeatherType VARCHAR(100),
        Year YEAR,
        Month TINYINT,
        YieldImpactPercent DECIMAL(5,2),
        PriceImpactPercent DECIMAL(5,2),
        Notes TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT FK_WEATHER_IMPACT_PRODUCT FOREIGN KEY (ProductID) REFERENCES PRODUCT_T(ProductID)
      )
    `);
    
    console.log('Creating Product Recommendation table...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS PRODUCT_RECOMMENDATION_T (
        RecommendationID INT PRIMARY KEY AUTO_INCREMENT,
        ProductID INT NOT NULL,
        Region VARCHAR(100),
        SoilType VARCHAR(100),
        WaterRequirement DECIMAL(10,2),
        ProfitabilityIndex DECIMAL(5,2),
        RiskIndex DECIMAL(5,2),
        SustainabilityScore DECIMAL(5,2),
        RecommendedPlantingMonth TINYINT,
        RecommendedHarvestMonth TINYINT,
        Notes TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT FK_PRODUCT_RECOMMENDATION_PRODUCT FOREIGN KEY (ProductID) REFERENCES PRODUCT_T(ProductID)
      )
    `);
    
    console.log('Creating Trade Analytics table...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS TRADE_ANALYTICS_T (
        TradeID INT PRIMARY KEY AUTO_INCREMENT,
        ProductID INT NOT NULL,
        ExportingCountry VARCHAR(100),
        ImportingCountry VARCHAR(100),
        Year YEAR,
        Quarter TINYINT,
        TradeVolume DECIMAL(15,2),
        AveragePrice DECIMAL(10,2),
        TariffPercent DECIMAL(5,2),
        TradeBalance DECIMAL(15,2),
        Notes TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT FK_TRADE_ANALYTICS_PRODUCT FOREIGN KEY (ProductID) REFERENCES PRODUCT_T(ProductID)
      )
    `);
    
    console.log('Creating Policy Impact table...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS POLICY_IMPACT_T (
        PolicyImpactID INT PRIMARY KEY AUTO_INCREMENT,
        ProductID INT NOT NULL,
        PolicyName VARCHAR(200),
        PolicyType VARCHAR(100),
        ImplementationDate DATE,
        ImpactOnSupplyPercent DECIMAL(5,2),
        ImpactOnDemandPercent DECIMAL(5,2),
        ImpactOnPricePercent DECIMAL(5,2),
        Region VARCHAR(100),
        Notes TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT FK_POLICY_IMPACT_PRODUCT FOREIGN KEY (ProductID) REFERENCES PRODUCT_T(ProductID)
      )
    `);
    
    // Create indexes
    console.log('Creating indexes...');
    await connection.query(`CREATE INDEX IF NOT EXISTS idx_historical_production_product_year ON HISTORICAL_PRODUCTION_T(ProductID, Year)`);
    await connection.query(`CREATE INDEX IF NOT EXISTS idx_consumer_demand_product_year ON CONSUMER_DEMAND_T(ProductID, Year)`);
    await connection.query(`CREATE INDEX IF NOT EXISTS idx_supply_inventory_product ON SUPPLY_INVENTORY_T(ProductID)`);
    await connection.query(`CREATE INDEX IF NOT EXISTS idx_weather_impact_product_region ON WEATHER_IMPACT_T(ProductID, Region)`);
    await connection.query(`CREATE INDEX IF NOT EXISTS idx_product_recommendation_region ON PRODUCT_RECOMMENDATION_T(Region)`);
    await connection.query(`CREATE INDEX IF NOT EXISTS idx_trade_analytics_product_year ON TRADE_ANALYTICS_T(ProductID, Year)`);
    
    console.log('✅ Advanced market analysis schema created successfully');
    
    // Insert seed data
    console.log('Seeding Product Seasonality data...');
    await connection.query(`
      INSERT INTO PRODUCT_SEASONALITY_T (SeasonalityID, SeasonalityName, StartMonth, EndMonth, Description) VALUES
      (1, 'Year-round', 1, 12, 'Available throughout the year'),
      (2, 'Spring-Summer', 3, 8, 'Primary growing season from March to August'),
      (3, 'Summer-Fall', 6, 11, 'Growing season from June to November'),
      (4, 'Winter', 11, 2, 'Winter crop with planting in November and harvest by February')
    `);
    
    console.log('Updating Product table with seasonality information...');
    await connection.query(`UPDATE PRODUCT_T SET SeasonalityID = 1, ShelfLifeDays = 365, StorageRequirements = 'Store in cool, dry place' WHERE ProductID = 1`);
    await connection.query(`UPDATE PRODUCT_T SET SeasonalityID = 4, ShelfLifeDays = 730, StorageRequirements = 'Store in dry, ventilated silos' WHERE ProductID = 2`);
    await connection.query(`UPDATE PRODUCT_T SET SeasonalityID = 2, ShelfLifeDays = 180, StorageRequirements = 'Refrigerate for best freshness' WHERE ProductID = 3`);
    await connection.query(`UPDATE PRODUCT_T SET SeasonalityID = 3, ShelfLifeDays = 270, StorageRequirements = 'Store in cool, dry conditions' WHERE ProductID = 4`);
    
    console.log('Seeding Historical Production data...');
    // Add some seed data for historical production
    await connection.query(`
      INSERT INTO HISTORICAL_PRODUCTION_T (ProductID, Year, TotalAcreage, AverageYield, ProductionCost, TotalProduction, Region, Notes) VALUES
      (1, 2020, 120000.00, 5.20, 180.00, 624000.00, 'North', 'Good year with favorable weather'),
      (1, 2021, 125000.00, 5.35, 190.00, 668750.00, 'North', 'Expanded acreage with maintained yield'),
      (1, 2022, 128000.00, 5.15, 210.00, 659200.00, 'North', 'Slight yield reduction due to pest issues'),
      (1, 2023, 130000.00, 5.40, 220.00, 702000.00, 'North', 'Recovery with improved pest management')
    `);
    
    console.log('Seeding Consumer Demand data...');
    // Add some seed data for consumer demand
    await connection.query(`
      INSERT INTO CONSUMER_DEMAND_T (ProductID, Year, Quarter, DemographicGroup, ConsumptionPerCapita, PriceElasticity, IncomeElasticity, SubstitutionIndex, Region, Notes) VALUES
      (1, 2023, 1, 'Urban', 35.60, -0.25, 0.10, 0.30, 'National', 'Urban consumers show less price sensitivity'),
      (1, 2023, 1, 'Rural', 42.80, -0.45, 0.30, 0.20, 'National', 'Rural consumers more sensitive to price changes'),
      (1, 2023, 2, 'Urban', 34.90, -0.25, 0.10, 0.30, 'National', 'Slight seasonal decrease in consumption'),
      (1, 2023, 2, 'Rural', 43.50, -0.45, 0.30, 0.20, 'National', 'Increased rural consumption during planting season')
    `);
    
    console.log('Seeding Supply Inventory data...');
    await connection.query(`
      INSERT INTO SUPPLY_INVENTORY_T (ProductID, WarehouseID, CurrentStock, MinimumStock, MaximumCapacity, LastUpdated, ExpiryDate, QualityGrade, StorageCondition, Notes) VALUES
      (1, 1, 12500.00, 5000.00, 25000.00, NOW(), DATE_ADD(NOW(), INTERVAL 11 MONTH), 'A', 'Temperature: 15-20°C, Humidity: 40-60%', 'Basmati rice in good condition'),
      (1, 2, 18000.00, 7500.00, 30000.00, NOW(), DATE_ADD(NOW(), INTERVAL 10 MONTH), 'A', 'Temperature: 15-20°C, Humidity: 40-60%', 'Basmati rice well-maintained')
    `);
    
    console.log('Seeding Weather Impact data...');
    await connection.query(`
      INSERT INTO WEATHER_IMPACT_T (ProductID, Region, WeatherType, Year, Month, YieldImpactPercent, PriceImpactPercent, Notes) VALUES
      (1, 'South', 'Flood', 2023, 7, -15.20, 8.50, 'Monsoon flooding affected southern rice production'),
      (1, 'North', 'Drought', 2023, 5, -8.40, 5.20, 'Moderate drought impacted northern rice production')
    `);
    
    console.log('Seeding Product Recommendation data...');
    await connection.query(`
      INSERT INTO PRODUCT_RECOMMENDATION_T (ProductID, Region, SoilType, WaterRequirement, ProfitabilityIndex, RiskIndex, SustainabilityScore, RecommendedPlantingMonth, RecommendedHarvestMonth, Notes) VALUES
      (1, 'South', 'Clay Loam', 1200.00, 4.20, 2.30, 3.80, 6, 11, 'Highly suitable for southern region with good irrigation'),
      (1, 'North', 'Silty Clay', 1100.00, 3.90, 2.50, 3.70, 5, 10, 'Good fit for northern region with adequate water management')
    `);
    
    console.log('Seeding Trade Analytics data...');
    await connection.query(`
      INSERT INTO TRADE_ANALYTICS_T (ProductID, ExportingCountry, ImportingCountry, Year, Quarter, TradeVolume, AveragePrice, TariffPercent, TradeBalance, Notes) VALUES
      (1, 'Local', 'Foreign', 2023, 1, 25000.00, 460.00, 2.50, 11500000.00, 'Strong Q1 rice exports'),
      (1, 'Local', 'Foreign', 2023, 2, 28000.00, 480.00, 2.50, 13440000.00, 'Increased Q2 rice exports with rising prices')
    `);
    
    console.log('Seeding Policy Impact data...');
    await connection.query(`
      INSERT INTO POLICY_IMPACT_T (ProductID, PolicyName, PolicyType, ImplementationDate, ImpactOnSupplyPercent, ImpactOnDemandPercent, ImpactOnPricePercent, Region, Notes) VALUES
      (1, 'Rice Export Promotion', 'Trade', '2023-01-15', 5.20, 2.80, 3.50, 'National', 'Government initiative to boost rice exports through incentives'),
      (1, 'Sustainable Rice Farming Subsidy', 'Subsidy', '2023-03-10', 3.80, 0.50, -2.30, 'National', 'Subsidies for environmentally sustainable rice farming practices')
    `);
    
    console.log('✅ Advanced market analysis seed data inserted successfully');
    
    // Verify data was inserted correctly
    const [seasonalityCount] = await connection.query('SELECT COUNT(*) as count FROM PRODUCT_SEASONALITY_T');
    const [productionCount] = await connection.query('SELECT COUNT(*) as count FROM HISTORICAL_PRODUCTION_T');
    const [demandCount] = await connection.query('SELECT COUNT(*) as count FROM CONSUMER_DEMAND_T');
    const [inventoryCount] = await connection.query('SELECT COUNT(*) as count FROM SUPPLY_INVENTORY_T');
    const [weatherCount] = await connection.query('SELECT COUNT(*) as count FROM WEATHER_IMPACT_T');
    const [recommendationCount] = await connection.query('SELECT COUNT(*) as count FROM PRODUCT_RECOMMENDATION_T');
    const [tradeCount] = await connection.query('SELECT COUNT(*) as count FROM TRADE_ANALYTICS_T');
    const [policyCount] = await connection.query('SELECT COUNT(*) as count FROM POLICY_IMPACT_T');
    
    console.log('Seasonality records:', seasonalityCount[0].count);
    console.log('Production records:', productionCount[0].count);
    console.log('Demand records:', demandCount[0].count);
    console.log('Inventory records:', inventoryCount[0].count);
    console.log('Weather impact records:', weatherCount[0].count);
    console.log('Recommendation records:', recommendationCount[0].count);
    console.log('Trade analytics records:', tradeCount[0].count);
    console.log('Policy impact records:', policyCount[0].count);
    
    console.log('✅ Advanced market analysis setup completed successfully!');
  } catch (error) {
    console.error('❌ Error setting up advanced market analysis:', error);
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
  } finally {
    if (connection) {
      console.log('Closing database connection...');
      await connection.end();
    }
  }
}

setupAdvancedMarketAnalysis().catch(console.error); 