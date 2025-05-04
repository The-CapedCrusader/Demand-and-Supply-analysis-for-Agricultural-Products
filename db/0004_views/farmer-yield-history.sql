CREATE OR REPLACE VIEW FARMER_YIELD_HISTORY AS
SELECT
    fp.FarmerID,
    u.Name AS FarmerName,
    fp.ProductID,
    SUM(fp.Quantity) AS TotalYield,
    MIN(fp.ProductionDate) AS FirstRecorded,
    MAX(fp.ProductionDate) AS LastRecorded
FROM FARM_PRODUCT_T fp
JOIN USER_T u ON fp.FarmerID = u.UserID
GROUP BY fp.FarmerID, fp.ProductID;
--SQLEND