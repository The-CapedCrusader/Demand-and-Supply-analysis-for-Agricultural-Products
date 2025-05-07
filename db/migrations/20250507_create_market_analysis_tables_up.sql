-- First, check if PRODUCT_T table exists, if not create it
CREATE TABLE IF NOT EXISTS PRODUCT_CATEGORY_T (
  CategoryID INT PRIMARY KEY AUTO_INCREMENT,
  CategoryName VARCHAR(100) NOT NULL,
  Description TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS PRODUCT_VARIETY_T (
  VarietyID INT PRIMARY KEY AUTO_INCREMENT,
  VarietyName VARCHAR(100) NOT NULL,
  CategoryID INT,
  Description TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT FK_VARIETY_CATEGORY FOREIGN KEY (CategoryID) REFERENCES PRODUCT_CATEGORY_T(CategoryID)
);

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
);

-- Insert sample categories if they don't exist
INSERT IGNORE INTO PRODUCT_CATEGORY_T (CategoryID, CategoryName, Description) VALUES
(1, 'Grains', 'Various grain products including rice, wheat, and corn'),
(2, 'Vegetables', 'Fresh vegetables of all kinds'),
(3, 'Fruits', 'Fresh fruits of all varieties'),
(4, 'Oilseeds', 'Oil-producing seeds like soybeans and sunflower');

-- Insert sample varieties if they don't exist
INSERT IGNORE INTO PRODUCT_VARIETY_T (VarietyID, VarietyName, CategoryID, Description) VALUES
(1, 'Rice Varieties', 1, 'Different types of rice'),
(2, 'Wheat Varieties', 1, 'Different types of wheat'),
(3, 'Corn Varieties', 1, 'Different types of corn'),
(4, 'Soybean Varieties', 4, 'Different types of soybeans');

-- Insert sample products if they don't exist
INSERT IGNORE INTO PRODUCT_T (ProductID, ProductName, VarietyID, Price, Quantity, UnitOfMeasure, Description) VALUES
(1, 'Basmati Rice', 1, 450.00, 1000, 'kg', 'Premium basmati rice'),
(2, 'Wheat Grain', 2, 350.00, 1500, 'kg', 'High-quality wheat grain'),
(3, 'Sweet Corn', 3, 280.00, 800, 'kg', 'Fresh sweet corn'),
(4, 'Organic Soybeans', 4, 390.00, 1200, 'kg', 'Organically grown soybeans');

-- Market price trends table
CREATE TABLE MARKET_PRICE_TREND_T (
  PriceTrendID INT PRIMARY KEY AUTO_INCREMENT,
  ProductID INT NOT NULL,
  Month VARCHAR(20) NOT NULL,
  Year YEAR NOT NULL,
  Price DECIMAL(10,2) NOT NULL,
  ChangePercentage DECIMAL(5,2),
  Notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Market demand and supply data
CREATE TABLE MARKET_DEMAND_SUPPLY_T (
  DemandSupplyID INT PRIMARY KEY AUTO_INCREMENT,
  ProductID INT NOT NULL,
  Year YEAR NOT NULL,
  Quarter TINYINT,
  Demand INT NOT NULL,
  Supply INT NOT NULL,
  Region VARCHAR(100),
  Notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Regional market statistics
CREATE TABLE REGIONAL_MARKET_STAT_T (
  RegionalStatID INT PRIMARY KEY AUTO_INCREMENT,
  Region VARCHAR(100) NOT NULL,
  Year YEAR NOT NULL,
  GDP DECIMAL(15,2),
  Population INT,
  ProductID INT,
  Consumption INT,
  Notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Market forecasting data
CREATE TABLE MARKET_FORECAST_T (
  ForecastID INT PRIMARY KEY AUTO_INCREMENT,
  ProductID INT NOT NULL,
  Year YEAR NOT NULL,
  ProjectedDemand INT,
  ProjectedSupply INT,
  ProjectedPrice DECIMAL(10,2),
  Confidence DECIMAL(5,2), -- A percentage from 0-100 indicating confidence level
  FactorsConsidered TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Add foreign key constraints
ALTER TABLE MARKET_PRICE_TREND_T 
ADD CONSTRAINT FK_MARKET_PRICE_TREND_PRODUCT 
FOREIGN KEY (ProductID) REFERENCES PRODUCT_T(ProductID);

ALTER TABLE MARKET_DEMAND_SUPPLY_T 
ADD CONSTRAINT FK_MARKET_DEMAND_SUPPLY_PRODUCT 
FOREIGN KEY (ProductID) REFERENCES PRODUCT_T(ProductID);

ALTER TABLE REGIONAL_MARKET_STAT_T 
ADD CONSTRAINT FK_REGIONAL_MARKET_STAT_PRODUCT 
FOREIGN KEY (ProductID) REFERENCES PRODUCT_T(ProductID);

ALTER TABLE MARKET_FORECAST_T 
ADD CONSTRAINT FK_MARKET_FORECAST_PRODUCT 
FOREIGN KEY (ProductID) REFERENCES PRODUCT_T(ProductID); 