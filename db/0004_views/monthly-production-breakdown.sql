CREATE OR REPLACE VIEW MONTHLY_PRODUCTION_BREAKDOWN AS
SELECT
    MONTH(fp.ProductionDate) AS Month,
    fp.ProductID,
	p.ProductName,
    SUM(fp.Quantity) AS QuantityProduced
FROM FARM_PRODUCT_T fp
JOIN PRODUCT_T p ON fp.ProductID = p.ProductID
GROUP BY MONTH(fp.ProductionDate), fp.ProductID;
--SQLEND