-- Create nutritional information tables
CREATE TABLE IF NOT EXISTS PRODUCT_NUTRITIONAL_INFO_T (
  NutritionalInfoID INT PRIMARY KEY AUTO_INCREMENT,
  ProductID INT NOT NULL,
  CaloriesPerUnit DECIMAL(10,2),
  ProteinPerUnit DECIMAL(10,2),
  CarbohydratesPerUnit DECIMAL(10,2),
  FatPerUnit DECIMAL(10,2),
  FiberPerUnit DECIMAL(10,2),
  UnitOfMeasure VARCHAR(50),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT FK_NUTRITIONAL_INFO_PRODUCT FOREIGN KEY (ProductID) REFERENCES PRODUCT_T(ProductID)
);

-- Insert sample nutritional data
INSERT INTO PRODUCT_NUTRITIONAL_INFO_T 
(ProductID, CaloriesPerUnit, ProteinPerUnit, CarbohydratesPerUnit, FatPerUnit, FiberPerUnit, UnitOfMeasure) VALUES
(1, 360.00, 7.00, 79.00, 0.70, 2.80, '100g'), -- Rice
(2, 340.00, 13.00, 72.00, 2.50, 10.70, '100g'), -- Wheat
(3, 86.00, 3.20, 19.00, 1.20, 2.70, '100g'), -- Corn
(4, 446.00, 36.50, 30.20, 19.90, 9.30, '100g'); -- Soybeans

-- Create daily nutritional requirements table
CREATE TABLE IF NOT EXISTS DAILY_NUTRITIONAL_REQUIREMENTS_T (
  RequirementID INT PRIMARY KEY AUTO_INCREMENT,
  AgeGroup VARCHAR(50),
  Gender VARCHAR(20),
  ActivityLevel VARCHAR(50),
  DailyCalories INT,
  DailyProtein DECIMAL(10,2),
  DailyCarbohydrates DECIMAL(10,2),
  DailyFat DECIMAL(10,2),
  DailyFiber DECIMAL(10,2),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample daily nutritional requirements
INSERT INTO DAILY_NUTRITIONAL_REQUIREMENTS_T 
(AgeGroup, Gender, ActivityLevel, DailyCalories, DailyProtein, DailyCarbohydrates, DailyFat, DailyFiber) VALUES
('Adult', 'Male', 'Moderate', 2500, 56.00, 300.00, 83.00, 30.00),
('Adult', 'Female', 'Moderate', 2000, 46.00, 250.00, 67.00, 25.00),
('Child', 'Male', 'Active', 1800, 34.00, 225.00, 60.00, 20.00),
('Child', 'Female', 'Active', 1600, 30.00, 200.00, 53.00, 18.00),
('Senior', 'Male', 'Sedentary', 2000, 50.00, 250.00, 67.00, 28.00),
('Senior', 'Female', 'Sedentary', 1800, 43.00, 225.00, 60.00, 25.00); 