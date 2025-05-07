-- Advanced Market Analysis Tables for Agricultural Products

-- Product Seasonality Table
CREATE TABLE IF NOT EXISTS PRODUCT_SEASONALITY_T (
  SeasonalityID INT PRIMARY KEY AUTO_INCREMENT,
  SeasonalityName VARCHAR(100) NOT NULL,
  StartMonth INT,
  EndMonth INT,
  Description TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Add seasonality to Product table if not exists (alter existing table)
ALTER TABLE PRODUCT_T 
ADD COLUMN IF NOT EXISTS SeasonalityID INT,
ADD COLUMN IF NOT EXISTS ShelfLifeDays INT,
ADD COLUMN IF NOT EXISTS StorageRequirements TEXT,
ADD CONSTRAINT FK_PRODUCT_SEASONALITY FOREIGN KEY (SeasonalityID) REFERENCES PRODUCT_SEASONALITY_T(SeasonalityID);

-- Historical Production Data
CREATE TABLE IF NOT EXISTS HISTORICAL_PRODUCTION_T (
  ProductionID INT PRIMARY KEY AUTO_INCREMENT,
  ProductID INT NOT NULL,
  Year YEAR NOT NULL,
  TotalAcreage DECIMAL(12,2), -- In hectares or acres
  AverageYield DECIMAL(10,2), -- Yield per unit area
  ProductionCost DECIMAL(12,2), -- Per unit
  TotalProduction DECIMAL(15,2), -- Total quantity produced
  Region VARCHAR(100),
  Notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT FK_HISTORICAL_PRODUCTION_PRODUCT FOREIGN KEY (ProductID) REFERENCES PRODUCT_T(ProductID)
);

-- Consumer Demand Analysis
CREATE TABLE IF NOT EXISTS CONSUMER_DEMAND_T (
  DemandID INT PRIMARY KEY AUTO_INCREMENT,
  ProductID INT NOT NULL,
  Year YEAR NOT NULL,
  Quarter TINYINT,
  DemographicGroup VARCHAR(100), -- e.g., "Urban", "Rural", "High-income", etc.
  ConsumptionPerCapita DECIMAL(10,2),
  PriceElasticity DECIMAL(5,2), -- Measure of how demand responds to price changes
  IncomeElasticity DECIMAL(5,2), -- Measure of how demand responds to income changes
  SubstitutionIndex DECIMAL(5,2), -- Index for product substitution probability
  Region VARCHAR(100),
  Notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT FK_CONSUMER_DEMAND_PRODUCT FOREIGN KEY (ProductID) REFERENCES PRODUCT_T(ProductID)
);

-- Real-time Supply Inventory
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
);

-- Supply Chain Analytics
CREATE TABLE IF NOT EXISTS SUPPLY_CHAIN_T (
  SupplyChainID INT PRIMARY KEY AUTO_INCREMENT,
  ProductID INT NOT NULL,
  SourceRegion VARCHAR(100),
  DestinationRegion VARCHAR(100),
  TransportationCost DECIMAL(10,2),
  TransportTime INT, -- In days
  DistanceKm DECIMAL(10,2),
  BottleneckRisk DECIMAL(5,2), -- Risk index
  TransportMode VARCHAR(50), -- e.g., "Road", "Rail", "Ship"
  Notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT FK_SUPPLY_CHAIN_PRODUCT FOREIGN KEY (ProductID) REFERENCES PRODUCT_T(ProductID)
);

-- Weather Impact Analytics
CREATE TABLE IF NOT EXISTS WEATHER_IMPACT_T (
  WeatherImpactID INT PRIMARY KEY AUTO_INCREMENT,
  ProductID INT NOT NULL,
  Region VARCHAR(100),
  WeatherType VARCHAR(100), -- e.g., "Drought", "Flood", "Normal"
  Year YEAR,
  Month TINYINT,
  YieldImpactPercent DECIMAL(5,2), -- Percent change in yield due to weather
  PriceImpactPercent DECIMAL(5,2), -- Percent change in price due to weather
  Notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT FK_WEATHER_IMPACT_PRODUCT FOREIGN KEY (ProductID) REFERENCES PRODUCT_T(ProductID)
);

-- Product Recommendation Metrics
CREATE TABLE IF NOT EXISTS PRODUCT_RECOMMENDATION_T (
  RecommendationID INT PRIMARY KEY AUTO_INCREMENT,
  ProductID INT NOT NULL,
  Region VARCHAR(100),
  SoilType VARCHAR(100),
  WaterRequirement DECIMAL(10,2),
  ProfitabilityIndex DECIMAL(5,2), -- Higher is better
  RiskIndex DECIMAL(5,2), -- Lower is better
  SustainabilityScore DECIMAL(5,2), -- Higher is better
  RecommendedPlantingMonth TINYINT,
  RecommendedHarvestMonth TINYINT,
  Notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT FK_PRODUCT_RECOMMENDATION_PRODUCT FOREIGN KEY (ProductID) REFERENCES PRODUCT_T(ProductID)
);

-- Trade and Export Analytics
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
  TradeBalance DECIMAL(15,2), -- Positive for net exports, negative for net imports
  Notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT FK_TRADE_ANALYTICS_PRODUCT FOREIGN KEY (ProductID) REFERENCES PRODUCT_T(ProductID)
);

-- Policy Impact Analysis
CREATE TABLE IF NOT EXISTS POLICY_IMPACT_T (
  PolicyImpactID INT PRIMARY KEY AUTO_INCREMENT,
  ProductID INT NOT NULL,
  PolicyName VARCHAR(200),
  PolicyType VARCHAR(100), -- e.g., "Subsidy", "Trade", "Environmental"
  ImplementationDate DATE,
  ImpactOnSupplyPercent DECIMAL(5,2),
  ImpactOnDemandPercent DECIMAL(5,2),
  ImpactOnPricePercent DECIMAL(5,2),
  Region VARCHAR(100),
  Notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT FK_POLICY_IMPACT_PRODUCT FOREIGN KEY (ProductID) REFERENCES PRODUCT_T(ProductID)
);

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_historical_production_product_year 
ON HISTORICAL_PRODUCTION_T(ProductID, Year);

CREATE INDEX IF NOT EXISTS idx_consumer_demand_product_year 
ON CONSUMER_DEMAND_T(ProductID, Year);

CREATE INDEX IF NOT EXISTS idx_supply_inventory_product 
ON SUPPLY_INVENTORY_T(ProductID);

CREATE INDEX IF NOT EXISTS idx_weather_impact_product_region 
ON WEATHER_IMPACT_T(ProductID, Region);

CREATE INDEX IF NOT EXISTS idx_product_recommendation_region 
ON PRODUCT_RECOMMENDATION_T(Region);

CREATE INDEX IF NOT EXISTS idx_trade_analytics_product_year 
ON TRADE_ANALYTICS_T(ProductID, Year); 