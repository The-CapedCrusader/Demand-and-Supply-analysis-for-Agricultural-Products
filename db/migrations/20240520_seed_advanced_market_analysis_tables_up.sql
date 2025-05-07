-- Seed data for advanced market analysis tables

-- Seed Product Seasonality Table
INSERT INTO PRODUCT_SEASONALITY_T (SeasonalityID, SeasonalityName, StartMonth, EndMonth, Description) VALUES
(1, 'Year-round', 1, 12, 'Available throughout the year'),
(2, 'Spring-Summer', 3, 8, 'Primary growing season from March to August'),
(3, 'Summer-Fall', 6, 11, 'Growing season from June to November'),
(4, 'Winter', 11, 2, 'Winter crop with planting in November and harvest by February');

-- Update Product table with seasonality
UPDATE PRODUCT_T SET SeasonalityID = 1, ShelfLifeDays = 365, StorageRequirements = 'Store in cool, dry place' WHERE ProductID = 1; -- Rice
UPDATE PRODUCT_T SET SeasonalityID = 4, ShelfLifeDays = 730, StorageRequirements = 'Store in dry, ventilated silos' WHERE ProductID = 2; -- Wheat
UPDATE PRODUCT_T SET SeasonalityID = 2, ShelfLifeDays = 180, StorageRequirements = 'Refrigerate for best freshness' WHERE ProductID = 3; -- Corn
UPDATE PRODUCT_T SET SeasonalityID = 3, ShelfLifeDays = 270, StorageRequirements = 'Store in cool, dry conditions' WHERE ProductID = 4; -- Soybeans

-- Seed Historical Production Data
INSERT INTO HISTORICAL_PRODUCTION_T (ProductID, Year, TotalAcreage, AverageYield, ProductionCost, TotalProduction, Region, Notes) VALUES
-- Rice
(1, 2020, 120000.00, 5.20, 180.00, 624000.00, 'North', 'Good year with favorable weather'),
(1, 2021, 125000.00, 5.35, 190.00, 668750.00, 'North', 'Expanded acreage with maintained yield'),
(1, 2022, 128000.00, 5.15, 210.00, 659200.00, 'North', 'Slight yield reduction due to pest issues'),
(1, 2023, 130000.00, 5.40, 220.00, 702000.00, 'North', 'Recovery with improved pest management'),
(1, 2020, 150000.00, 5.60, 175.00, 840000.00, 'South', 'Excellent growing conditions'),
(1, 2021, 155000.00, 5.50, 185.00, 852500.00, 'South', 'Good year with minor floods in coastal areas'),
(1, 2022, 160000.00, 5.45, 200.00, 872000.00, 'South', 'Continued expansion with slight yield issues'),
(1, 2023, 165000.00, 5.70, 215.00, 940500.00, 'South', 'Excellent harvest with favorable conditions'),

-- Wheat
(2, 2020, 200000.00, 3.10, 150.00, 620000.00, 'North', 'Average winter wheat season'),
(2, 2021, 195000.00, 3.20, 160.00, 624000.00, 'North', 'Slight reduction in acreage, better yield'),
(2, 2022, 190000.00, 3.05, 175.00, 579500.00, 'North', 'Challenging weather conditions'),
(2, 2023, 200000.00, 3.25, 190.00, 650000.00, 'North', 'Recovery and expansion'),
(2, 2020, 100000.00, 2.90, 155.00, 290000.00, 'South', 'Lower yields in southern region'),
(2, 2021, 105000.00, 3.00, 165.00, 315000.00, 'South', 'Slight improvement in conditions'),
(2, 2022, 110000.00, 2.95, 180.00, 324500.00, 'South', 'Expanded acreage with stable yield'),
(2, 2023, 115000.00, 3.10, 195.00, 356500.00, 'South', 'Continued improvement in southern wheat production'),

-- Corn
(3, 2020, 180000.00, 9.80, 120.00, 1764000.00, 'Central', 'Strong corn production year'),
(3, 2021, 185000.00, 9.60, 130.00, 1776000.00, 'Central', 'Expanded acreage with slight yield decrease'),
(3, 2022, 190000.00, 9.30, 145.00, 1767000.00, 'Central', 'Drought impact in some areas'),
(3, 2023, 195000.00, 9.90, 155.00, 1930500.00, 'Central', 'Excellent recovery with perfect growing season'),
(3, 2020, 80000.00, 8.50, 125.00, 680000.00, 'West', 'Lower yield in western region'),
(3, 2021, 85000.00, 8.60, 135.00, 731000.00, 'West', 'Slight improvement with irrigation enhancements'),
(3, 2022, 90000.00, 8.40, 150.00, 756000.00, 'West', 'Continued challenges with water availability'),
(3, 2023, 95000.00, 8.70, 160.00, 826500.00, 'West', 'Better water management leading to yield increases'),

-- Soybeans
(4, 2020, 110000.00, 3.40, 200.00, 374000.00, 'East', 'Good soybean production year'),
(4, 2021, 115000.00, 3.50, 210.00, 402500.00, 'East', 'Expanded acreage with improved yield'),
(4, 2022, 120000.00, 3.30, 225.00, 396000.00, 'East', 'Weather challenges affecting yield'),
(4, 2023, 125000.00, 3.60, 240.00, 450000.00, 'East', 'Recovery with ideal growing conditions'),
(4, 2020, 90000.00, 3.10, 205.00, 279000.00, 'Central', 'Lower yield in central region'),
(4, 2021, 95000.00, 3.20, 215.00, 304000.00, 'Central', 'Improvement with new seed varieties'),
(4, 2022, 100000.00, 3.15, 230.00, 315000.00, 'Central', 'Stable production despite cost increases'),
(4, 2023, 105000.00, 3.45, 245.00, 362250.00, 'Central', 'Substantial yield improvement with favorable weather');

-- Seed Consumer Demand Data
INSERT INTO CONSUMER_DEMAND_T (ProductID, Year, Quarter, DemographicGroup, ConsumptionPerCapita, PriceElasticity, IncomeElasticity, SubstitutionIndex, Region, Notes) VALUES
-- Rice
(1, 2023, 1, 'Urban', 35.60, -0.25, 0.10, 0.30, 'National', 'Urban consumers show less price sensitivity'),
(1, 2023, 1, 'Rural', 42.80, -0.45, 0.30, 0.20, 'National', 'Rural consumers more sensitive to price changes'),
(1, 2023, 2, 'Urban', 34.90, -0.25, 0.10, 0.30, 'National', 'Slight seasonal decrease in consumption'),
(1, 2023, 2, 'Rural', 43.50, -0.45, 0.30, 0.20, 'National', 'Increased rural consumption during planting season'),
(1, 2023, 3, 'Urban', 36.20, -0.25, 0.10, 0.30, 'National', 'Return to normal consumption levels'),
(1, 2023, 3, 'Rural', 44.10, -0.45, 0.30, 0.20, 'National', 'Continued high consumption in rural areas'),
(1, 2023, 4, 'Urban', 38.50, -0.25, 0.10, 0.30, 'National', 'Increased consumption during holiday season'),
(1, 2023, 4, 'Rural', 45.20, -0.45, 0.30, 0.20, 'National', 'Peak rural consumption after harvest'),

-- Wheat
(2, 2023, 1, 'Urban', 28.40, -0.35, 0.15, 0.40, 'National', 'Moderate price sensitivity for wheat products'),
(2, 2023, 1, 'Rural', 25.60, -0.50, 0.25, 0.30, 'National', 'Lower per capita consumption in rural areas'),
(2, 2023, 2, 'Urban', 27.90, -0.35, 0.15, 0.40, 'National', 'Slight seasonal decrease'),
(2, 2023, 2, 'Rural', 24.80, -0.50, 0.25, 0.30, 'National', 'Continued lower rural consumption'),
(2, 2023, 3, 'Urban', 29.10, -0.35, 0.15, 0.40, 'National', 'Increased consumption as prices stabilize'),
(2, 2023, 3, 'Rural', 26.20, -0.50, 0.25, 0.30, 'National', 'Gradual increase in rural areas'),
(2, 2023, 4, 'Urban', 31.50, -0.35, 0.15, 0.40, 'National', 'Peak consumption during winter months'),
(2, 2023, 4, 'Rural', 27.10, -0.50, 0.25, 0.30, 'National', 'Increased rural consumption during winter'),

-- Corn
(3, 2023, 1, 'Urban', 15.20, -0.30, 0.20, 0.60, 'National', 'Lower direct consumption, higher processed products'),
(3, 2023, 1, 'Rural', 18.90, -0.40, 0.15, 0.50, 'National', 'Higher direct consumption in rural areas'),
(3, 2023, 2, 'Urban', 16.30, -0.30, 0.20, 0.60, 'National', 'Increased summer consumption for fresh corn'),
(3, 2023, 2, 'Rural', 20.10, -0.40, 0.15, 0.50, 'National', 'Peak fresh corn consumption in rural areas'),
(3, 2023, 3, 'Urban', 15.80, -0.30, 0.20, 0.60, 'National', 'Return to processed consumption patterns'),
(3, 2023, 3, 'Rural', 19.50, -0.40, 0.15, 0.50, 'National', 'Gradual decrease as season ends'),
(3, 2023, 4, 'Urban', 14.90, -0.30, 0.20, 0.60, 'National', 'Lowest consumption quarter for urban areas'),
(3, 2023, 4, 'Rural', 17.80, -0.40, 0.15, 0.50, 'National', 'Reduced consumption in winter months'),

-- Soybeans
(4, 2023, 1, 'Urban', 8.40, -0.20, 0.40, 0.35, 'National', 'Mainly consumed as processed products'),
(4, 2023, 1, 'Rural', 7.20, -0.25, 0.30, 0.30, 'National', 'Similar consumption patterns nationwide'),
(4, 2023, 2, 'Urban', 8.60, -0.20, 0.40, 0.35, 'National', 'Slight increase in urban consumption'),
(4, 2023, 2, 'Rural', 7.30, -0.25, 0.30, 0.30, 'National', 'Stable rural consumption'),
(4, 2023, 3, 'Urban', 8.80, -0.20, 0.40, 0.35, 'National', 'Peak consumption in urban areas'),
(4, 2023, 3, 'Rural', 7.40, -0.25, 0.30, 0.30, 'National', 'Gradual increase in rural areas'),
(4, 2023, 4, 'Urban', 8.50, -0.20, 0.40, 0.35, 'National', 'Return to baseline urban consumption'),
(4, 2023, 4, 'Rural', 7.20, -0.25, 0.30, 0.30, 'National', 'Return to baseline rural consumption');

-- Seed Supply Inventory Data
INSERT INTO SUPPLY_INVENTORY_T (ProductID, WarehouseID, CurrentStock, MinimumStock, MaximumCapacity, LastUpdated, ExpiryDate, QualityGrade, StorageCondition, Notes) VALUES
(1, 1, 12500.00, 5000.00, 25000.00, NOW(), DATE_ADD(NOW(), INTERVAL 11 MONTH), 'A', 'Temperature: 15-20°C, Humidity: 40-60%', 'Basmati rice in good condition'),
(1, 2, 18000.00, 7500.00, 30000.00, NOW(), DATE_ADD(NOW(), INTERVAL 10 MONTH), 'A', 'Temperature: 15-20°C, Humidity: 40-60%', 'Basmati rice well-maintained'),
(2, 1, 15000.00, 6000.00, 20000.00, NOW(), DATE_ADD(NOW(), INTERVAL 18 MONTH), 'A', 'Temperature: 10-15°C, Humidity: 35-45%', 'Wheat grain in excellent condition'),
(2, 3, 22000.00, 8000.00, 35000.00, NOW(), DATE_ADD(NOW(), INTERVAL 20 MONTH), 'B', 'Temperature: 10-15°C, Humidity: 35-45%', 'Wheat grain with slight moisture variation'),
(3, 4, 8000.00, 3000.00, 15000.00, NOW(), DATE_ADD(NOW(), INTERVAL 4 MONTH), 'A', 'Temperature: 0-4°C, Humidity: 85-95%', 'Sweet corn in refrigerated storage'),
(3, 5, 6500.00, 2500.00, 12000.00, NOW(), DATE_ADD(NOW(), INTERVAL 4 MONTH), 'A', 'Temperature: 0-4°C, Humidity: 85-95%', 'Fresh sweet corn well-maintained'),
(4, 3, 9500.00, 4000.00, 18000.00, NOW(), DATE_ADD(NOW(), INTERVAL 7 MONTH), 'A', 'Temperature: 5-10°C, Humidity: 40-50%', 'Organic soybeans properly stored'),
(4, 5, 7000.00, 3000.00, 15000.00, NOW(), DATE_ADD(NOW(), INTERVAL 8 MONTH), 'B', 'Temperature: 5-10°C, Humidity: 40-50%', 'Organic soybeans with some quality variation');

-- Seed Weather Impact Data
INSERT INTO WEATHER_IMPACT_T (ProductID, Region, WeatherType, Year, Month, YieldImpactPercent, PriceImpactPercent, Notes) VALUES
(1, 'South', 'Flood', 2023, 7, -15.20, 8.50, 'Monsoon flooding affected southern rice production'),
(1, 'North', 'Drought', 2023, 5, -8.40, 5.20, 'Moderate drought impacted northern rice production'),
(2, 'North', 'Normal', 2023, 12, 2.10, -1.50, 'Favorable winter conditions improved wheat yield'),
(2, 'South', 'Excessive Rain', 2023, 1, -5.30, 3.80, 'Heavy winter rain affected southern wheat quality'),
(3, 'Central', 'Drought', 2023, 6, -12.40, 7.60, 'Severe drought impacted corn during critical growth phase'),
(3, 'West', 'Heat Wave', 2023, 7, -9.80, 5.30, 'Extended heat wave reduced corn yield in western regions'),
(4, 'East', 'Normal', 2023, 8, 1.80, -1.20, 'Favorable conditions for soybean development'),
(4, 'Central', 'Flood', 2023, 9, -7.50, 4.20, 'Early autumn flooding damaged some soybean crops');

-- Seed Product Recommendation Data
INSERT INTO PRODUCT_RECOMMENDATION_T (ProductID, Region, SoilType, WaterRequirement, ProfitabilityIndex, RiskIndex, SustainabilityScore, RecommendedPlantingMonth, RecommendedHarvestMonth, Notes) VALUES
(1, 'South', 'Clay Loam', 1200.00, 4.20, 2.30, 3.80, 6, 11, 'Highly suitable for southern region with good irrigation'),
(1, 'North', 'Silty Clay', 1100.00, 3.90, 2.50, 3.70, 5, 10, 'Good fit for northern region with adequate water management'),
(2, 'North', 'Loam', 600.00, 4.10, 2.20, 4.20, 11, 4, 'Excellent winter crop for northern region'),
(2, 'West', 'Sandy Loam', 700.00, 3.70, 3.10, 3.90, 11, 4, 'Viable with supplemental irrigation in western region'),
(3, 'Central', 'Loam', 800.00, 4.50, 2.60, 3.60, 4, 8, 'Highly profitable in central region with adequate rainfall'),
(3, 'East', 'Clay Loam', 850.00, 4.20, 2.80, 3.50, 4, 8, 'Good option for eastern region with proper drainage'),
(4, 'East', 'Loam', 650.00, 4.30, 2.40, 4.10, 6, 11, 'Excellent fit for eastern region with moderate water needs'),
(4, 'Central', 'Silt Loam', 700.00, 4.10, 2.50, 4.00, 6, 11, 'Good option for central region with proper field management');

-- Seed Trade Analytics Data
INSERT INTO TRADE_ANALYTICS_T (ProductID, ExportingCountry, ImportingCountry, Year, Quarter, TradeVolume, AveragePrice, TariffPercent, TradeBalance, Notes) VALUES
(1, 'Local', 'Foreign', 2023, 1, 25000.00, 460.00, 2.50, 11500000.00, 'Strong Q1 rice exports'),
(1, 'Local', 'Foreign', 2023, 2, 28000.00, 480.00, 2.50, 13440000.00, 'Increased Q2 rice exports with rising prices'),
(1, 'Foreign', 'Local', 2023, 1, 12000.00, 445.00, 5.00, -5340000.00, 'Q1 rice imports for specialty varieties'),
(1, 'Foreign', 'Local', 2023, 2, 10000.00, 455.00, 5.00, -4550000.00, 'Reduced Q2 rice imports as domestic production increased'),
(2, 'Local', 'Foreign', 2023, 1, 35000.00, 360.00, 1.80, 12600000.00, 'Strong wheat exports in Q1'),
(2, 'Local', 'Foreign', 2023, 2, 32000.00, 380.00, 1.80, 12160000.00, 'Slightly reduced wheat exports in Q2, higher prices'),
(2, 'Foreign', 'Local', 2023, 1, 15000.00, 350.00, 3.50, -5250000.00, 'Wheat imports for specialty flours'),
(2, 'Foreign', 'Local', 2023, 2, 18000.00, 365.00, 3.50, -6570000.00, 'Increased wheat imports in Q2 for domestic processing');

-- Seed Policy Impact Data
INSERT INTO POLICY_IMPACT_T (ProductID, PolicyName, PolicyType, ImplementationDate, ImpactOnSupplyPercent, ImpactOnDemandPercent, ImpactOnPricePercent, Region, Notes) VALUES
(1, 'Rice Export Promotion', 'Trade', '2023-01-15', 5.20, 2.80, 3.50, 'National', 'Government initiative to boost rice exports through incentives'),
(1, 'Sustainable Rice Farming Subsidy', 'Subsidy', '2023-03-10', 3.80, 0.50, -2.30, 'National', 'Subsidies for environmentally sustainable rice farming practices'),
(2, 'Winter Wheat Support Program', 'Subsidy', '2023-09-20', 4.50, 1.20, -3.10, 'North', 'Regional program to support winter wheat production'),
(2, 'Wheat Import Tariff Adjustment', 'Trade', '2023-02-05', -1.80, -0.90, 2.40, 'National', 'Increased tariffs on imported wheat to protect domestic producers'),
(3, 'Corn for Biofuel Initiative', 'Environmental', '2023-04-12', 6.20, 7.50, 4.80, 'National', 'New policy promoting corn use in biofuel production'),
(3, 'Drought Response Program', 'Subsidy', '2023-06-30', 3.10, 0.30, -2.60, 'Central', 'Emergency support for corn farmers affected by drought'),
(4, 'Soybean Export Tax Reduction', 'Trade', '2023-01-01', 4.80, 1.50, 2.10, 'National', 'Reduced export taxes to promote soybean exports'),
(4, 'Organic Farming Transition Grant', 'Subsidy', '2023-05-15', 2.40, 3.60, 1.80, 'National', 'Support for conventional farmers transitioning to organic soybean production'); 