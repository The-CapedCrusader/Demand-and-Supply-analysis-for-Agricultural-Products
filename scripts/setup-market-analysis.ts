import { getDatabaseConnection } from '~/lib/database.server';

async function setupMarketAnalysis() {
  console.log('🔌 Connecting to database...');
  let connection;
  try {
    connection = await getDatabaseConnection();
    console.log('✅ Connected to database');
    
    // Test the connection
    const [result] = await connection.query('SELECT 1 as test');
    console.log('Connection test:', result);

    // Create the supporting tables if they don't exist
    console.log('Creating category table...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS PRODUCT_CATEGORY_T (
        CategoryID INT PRIMARY KEY AUTO_INCREMENT,
        CategoryName VARCHAR(100) NOT NULL,
        Description TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    console.log('Creating variety table...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS PRODUCT_VARIETY_T (
        VarietyID INT PRIMARY KEY AUTO_INCREMENT,
        VarietyName VARCHAR(100) NOT NULL,
        CategoryID INT,
        Description TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT FK_VARIETY_CATEGORY FOREIGN KEY (CategoryID) REFERENCES PRODUCT_CATEGORY_T(CategoryID)
      )
    `);

    console.log('Creating product table...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS PRODUCT_T (
        ProductID INT PRIMARY KEY AUTO_INCREMENT,
        ProductName VARCHAR(100) NOT NULL,
        VarietyID INT,
        Price DECIMAL(10,2),
        Quantity INT,
        UnitOfMeasure VARCHAR(50),
        Description TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT FK_PRODUCT_VARIETY FOREIGN KEY (VarietyID) REFERENCES PRODUCT_VARIETY_T(VarietyID)
      )
    `);

    // Seed sample data
    console.log('Inserting sample categories...');
    await connection.query(`
      INSERT IGNORE INTO PRODUCT_CATEGORY_T (CategoryID, CategoryName, Description) VALUES 
      (1, 'Grains', 'Various grain products including rice, wheat, and corn'),
      (2, 'Vegetables', 'Fresh vegetables of all kinds'),
      (3, 'Fruits', 'Fresh fruits of all varieties'),
      (4, 'Oilseeds', 'Oil-producing seeds like soybeans and sunflower')
    `);

    console.log('Inserting sample varieties...');
    await connection.query(`
      INSERT IGNORE INTO PRODUCT_VARIETY_T (VarietyID, VarietyName, CategoryID, Description) VALUES
      (1, 'Rice Varieties', 1, 'Different types of rice'),
      (2, 'Wheat Varieties', 1, 'Different types of wheat'),
      (3, 'Corn Varieties', 1, 'Different types of corn'),
      (4, 'Soybean Varieties', 4, 'Different types of soybeans')
    `);

    console.log('Inserting sample products...');
    await connection.query(`
      INSERT IGNORE INTO PRODUCT_T (ProductID, ProductName, VarietyID, Price, Quantity, UnitOfMeasure, Description) VALUES
      (1, 'Basmati Rice', 1, 450.00, 1000, 'kg', 'Premium basmati rice'),
      (2, 'Wheat Grain', 2, 350.00, 1500, 'kg', 'High-quality wheat grain'),
      (3, 'Sweet Corn', 3, 280.00, 800, 'kg', 'Fresh sweet corn'),
      (4, 'Organic Soybeans', 4, 390.00, 1200, 'kg', 'Organically grown soybeans')
    `);

    // Check if products exist
    console.log('Checking products...');
    const [products] = await connection.query('SELECT * FROM PRODUCT_T');
    console.log('Products found:', JSON.stringify(products, null, 2));

    // Create market analysis tables
    console.log('Creating market price trends table...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS MARKET_PRICE_TREND_T (
        PriceTrendID INT PRIMARY KEY AUTO_INCREMENT,
        ProductID INT NOT NULL,
        Month VARCHAR(20) NOT NULL,
        Year YEAR NOT NULL,
        Price DECIMAL(10,2) NOT NULL,
        ChangePercentage DECIMAL(5,2),
        Notes TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT FK_MARKET_PRICE_TREND_PRODUCT FOREIGN KEY (ProductID) REFERENCES PRODUCT_T(ProductID)
      )
    `);

    console.log('Creating market demand supply table...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS MARKET_DEMAND_SUPPLY_T (
        DemandSupplyID INT PRIMARY KEY AUTO_INCREMENT,
        ProductID INT NOT NULL,
        Year YEAR NOT NULL,
        Quarter TINYINT,
        Demand INT NOT NULL,
        Supply INT NOT NULL,
        Region VARCHAR(100),
        Notes TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT FK_MARKET_DEMAND_SUPPLY_PRODUCT FOREIGN KEY (ProductID) REFERENCES PRODUCT_T(ProductID)
      )
    `);

    console.log('Creating regional market stats table...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS REGIONAL_MARKET_STAT_T (
        RegionalStatID INT PRIMARY KEY AUTO_INCREMENT,
        Region VARCHAR(100) NOT NULL,
        Year YEAR NOT NULL,
        GDP DECIMAL(15,2),
        Population INT,
        ProductID INT,
        Consumption INT,
        Notes TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT FK_REGIONAL_MARKET_STAT_PRODUCT FOREIGN KEY (ProductID) REFERENCES PRODUCT_T(ProductID)
      )
    `);

    console.log('Creating market forecast table...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS MARKET_FORECAST_T (
        ForecastID INT PRIMARY KEY AUTO_INCREMENT,
        ProductID INT NOT NULL,
        Year YEAR NOT NULL,
        ProjectedDemand INT,
        ProjectedSupply INT,
        ProjectedPrice DECIMAL(10,2),
        Confidence DECIMAL(5,2),
        FactorsConsidered TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        CONSTRAINT FK_MARKET_FORECAST_PRODUCT FOREIGN KEY (ProductID) REFERENCES PRODUCT_T(ProductID)
      )
    `);

    // Seed market analysis tables
    console.log('Seeding price trends data...');
    await connection.query(`
      INSERT IGNORE INTO MARKET_PRICE_TREND_T (ProductID, Month, Year, Price, ChangePercentage, Notes) VALUES
      (1, 'Jan', 2024, 420.00, 1.20, 'Slight increase due to seasonal demand'),
      (1, 'Feb', 2024, 430.00, 2.38, 'Continued growth as export markets open'),
      (1, 'Mar', 2024, 450.00, 4.65, 'Significant increase due to export agreements'),
      (1, 'Apr', 2024, 470.00, 4.44, 'Price growth due to supply constraints'),
      (1, 'May', 2024, 490.00, 4.26, 'Peak price due to growing international demand'),
      (1, 'Jun', 2024, 500.00, 2.04, 'Stabilizing prices with new harvest coming in'),
      
      (2, 'Jan', 2024, 350.00, 0.00, 'Stable prices following winter harvest'),
      (2, 'Feb', 2024, 340.00, -2.86, 'Slight decrease due to excess supply'),
      (2, 'Mar', 2024, 360.00, 5.88, 'Price increase due to export opportunities'),
      (2, 'Apr', 2024, 380.00, 5.56, 'Continued growth due to international demand'),
      (2, 'May', 2024, 390.00, 2.63, 'Slowing growth with anticipated good harvest'),
      (2, 'Jun', 2024, 400.00, 2.56, 'Reaching stable price point with good supply-demand balance'),
      
      (3, 'Jan', 2024, 280.00, -1.41, 'Slight decrease due to winter supplies'),
      (3, 'Feb', 2024, 290.00, 3.57, 'Recovery with increased feed demand'),
      (3, 'Mar', 2024, 270.00, -6.90, 'Price drop due to unexpected surplus'),
      (3, 'Apr', 2024, 260.00, -3.70, 'Continued decrease with good planting conditions'),
      (3, 'May', 2024, 265.00, 1.92, 'Minor recovery due to ethanol demand'),
      (3, 'Jun', 2024, 270.00, 1.89, 'Stabilizing with balanced market conditions'),
      
      (4, 'Jan', 2024, 390.00, 2.63, 'Strong start to the year with good export demand'),
      (4, 'Feb', 2024, 400.00, 2.56, 'Continued growth with increasing livestock feed usage'),
      (4, 'Mar', 2024, 410.00, 2.50, 'Steady growth from Chinese imports'),
      (4, 'Apr', 2024, 420.00, 2.44, 'Price increase due to processing demand'),
      (4, 'May', 2024, 430.00, 2.38, 'Continued growth with tight supplies'),
      (4, 'Jun', 2024, 450.00, 4.65, 'Significant jump due to drought concerns')
    `);

    console.log('Seeding demand supply data...');
    await connection.query(`
      INSERT IGNORE INTO MARKET_DEMAND_SUPPLY_T (ProductID, Year, Quarter, Demand, Supply, Region, Notes) VALUES
      (1, 2024, 1, 15000, 14000, 'Global', 'Q1 2024 showing 7% supply gap'),
      (1, 2024, 2, 15500, 14800, 'Global', 'Q2 2024 with improving supply conditions'),
      (1, 2024, 3, 16200, 15500, 'Global', 'Q3 2024 forecast with harvest improvements'),
      (1, 2024, 4, 16500, 16000, 'Global', 'Q4 2024 projection with good harvest'),
      
      (2, 2024, 1, 14000, 13500, 'Global', 'Q1 2024 with manageable supply gap'),
      (2, 2024, 2, 14500, 14000, 'Global', 'Q2 2024 showing improved supply'),
      (2, 2024, 3, 15000, 14800, 'Global', 'Q3 2024 forecast with good harvest'),
      (2, 2024, 4, 15500, 15300, 'Global', 'Q4 2024 projection with near-balanced market'),
      
      (3, 2024, 1, 18000, 17200, 'Global', 'Q1 2024 with moderate supply gap'),
      (3, 2024, 2, 18500, 18000, 'Global', 'Q2 2024 with improved planting'),
      (3, 2024, 3, 19000, 18800, 'Global', 'Q3 2024 forecast with good yield'),
      (3, 2024, 4, 19500, 19300, 'Global', 'Q4 2024 projection with peak harvest'),
      
      (4, 2024, 1, 12000, 11000, 'Global', 'Q1 2024 with significant supply constraints'),
      (4, 2024, 2, 12500, 11800, 'Global', 'Q2 2024 with improving supply'),
      (4, 2024, 3, 13000, 12500, 'Global', 'Q3 2024 forecast with better balance'),
      (4, 2024, 4, 13500, 13200, 'Global', 'Q4 2024 projection with good harvest yield')
    `);

    console.log('Seeding regional market statistics...');
    await connection.query(`
      INSERT IGNORE INTO REGIONAL_MARKET_STAT_T (Region, Year, GDP, Population, ProductID, Consumption, Notes) VALUES
      ('North', 2024, 120000000000.00, 25000000, 1, 1200000, 'Northern region rice consumption patterns'),
      ('North', 2024, 120000000000.00, 25000000, 2, 800000, 'Northern region wheat consumption patterns'),
      ('South', 2024, 150000000000.00, 30000000, 1, 1500000, 'Southern region rice consumption patterns'),
      ('South', 2024, 150000000000.00, 30000000, 2, 700000, 'Southern region wheat consumption patterns'),
      ('East', 2024, 90000000000.00, 20000000, 1, 900000, 'Eastern region rice consumption patterns'),
      ('East', 2024, 90000000000.00, 20000000, 2, 600000, 'Eastern region wheat consumption patterns'),
      ('West', 2024, 110000000000.00, 22000000, 1, 1000000, 'Western region rice consumption patterns'),
      ('West', 2024, 110000000000.00, 22000000, 2, 750000, 'Western region wheat consumption patterns')
    `);

    console.log('Seeding market forecast data...');
    await connection.query(`
      INSERT IGNORE INTO MARKET_FORECAST_T (ProductID, Year, ProjectedDemand, ProjectedSupply, ProjectedPrice, Confidence, FactorsConsidered) VALUES
      (1, 2024, 16200, 15500, 480.00, 85.00, 'Weather patterns, export trends, global economy'),
      (1, 2025, 17500, 16800, 510.00, 75.00, 'Climate projections, population growth, policy changes'),
      (1, 2026, 18700, 18200, 535.00, 65.00, 'Long-term climate trends, infrastructure development'),
      (1, 2027, 20000, 19500, 560.00, 55.00, 'Very long-term projection with multiple variables'),
      
      (2, 2024, 15000, 14500, 380.00, 85.00, 'Winter wheat yield, export contracts, storage levels'),
      (2, 2025, 16000, 15500, 395.00, 75.00, 'Climate projections, global demand patterns'),
      (2, 2026, 17000, 16500, 420.00, 65.00, 'Long-term consumption trends, production efficiency'),
      (2, 2027, 18000, 17500, 435.00, 55.00, 'Very long-term projection with multiple variables'),
      
      (3, 2024, 19000, 18200, 275.00, 85.00, 'Ethanol demand, livestock feed usage, export trends'),
      (3, 2025, 20000, 19500, 280.00, 75.00, 'Biofuel policies, feed industry growth'),
      (3, 2026, 21000, 20500, 290.00, 65.00, 'Long-term consumption trends, productivity advances'),
      (3, 2027, 22000, 21800, 300.00, 55.00, 'Very long-term projection with multiple variables'),
      
      (4, 2024, 13000, 12450, 460.00, 85.00, 'Protein demand, vegetable oil consumption, export markets'),
      (4, 2025, 14000, 13500, 480.00, 75.00, 'Asian import projections, crush capacity expansion'),
      (4, 2026, 15000, 14600, 510.00, 65.00, 'Long-term food industry trends, production technology'),
      (4, 2027, 16000, 15700, 530.00, 55.00, 'Very long-term projection with multiple variables')
    `);

    // Verify data
    console.log('Verifying market analysis data...');
    const [marketPriceTrends] = await connection.query('SELECT COUNT(*) as count FROM MARKET_PRICE_TREND_T');
    const [marketDemandSupply] = await connection.query('SELECT COUNT(*) as count FROM MARKET_DEMAND_SUPPLY_T');
    const [regionalMarketStats] = await connection.query('SELECT COUNT(*) as count FROM REGIONAL_MARKET_STAT_T');
    const [marketForecasts] = await connection.query('SELECT COUNT(*) as count FROM MARKET_FORECAST_T');
    
    console.log('Price trends count:', marketPriceTrends);
    console.log('Demand-supply count:', marketDemandSupply);
    console.log('Regional stats count:', regionalMarketStats);
    console.log('Forecasts count:', marketForecasts);

    console.log('✅ Market analysis data setup completed successfully!');
  } catch (error) {
    console.error('❌ Error setting up market analysis data:', error);
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

// Call the function
setupMarketAnalysis()
  .then(() => console.log('✅ Setup completed'))
  .catch(err => {
    console.error('❌ Setup failed:', err);
    process.exit(1);
  }); 