CREATE OR REPLACE VIEW land_usage_summary AS
SELECT
    Type,
    SUM(Area) AS TotalAreaUsed,
    SUM(Quantity) AS TotalQuantity,
    AVG(Quantity / Area) AS YieldPerAcre
FROM LAND_USAGE
GROUP BY Type;
--SQLEND