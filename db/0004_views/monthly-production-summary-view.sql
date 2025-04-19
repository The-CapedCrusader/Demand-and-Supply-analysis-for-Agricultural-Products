CREATE OR REPLACE VIEW monthly_production_summary AS
SELECT
    MONTH(ProductionDate) AS Month,
    YEAR(ProductionDate) AS Year,
    ProductID,
    SUM(Quantity) AS TotalProduced
FROM FARM_PRODUCT
GROUP BY YEAR(ProductionDate), MONTH(ProductionDate), ProductID
ORDER BY TotalProduced DESC;
--SQLEND
