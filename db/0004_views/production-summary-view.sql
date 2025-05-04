CREATE OR REPLACE VIEW PRODUCTION_SUMMARY AS
	SELECT
		u.USERID as FarmerID,
		u.name as FarmerName,
		fp.ProductID,
		p.ProductName,
		SUM(fp.Quantity) as TotalProduced,
		MIN(fp.ProductionDate) as FirstProductionDate,
		MAX(fp.ProductionDate) as LastProductionDate
	FROM FARM_PRODUCT_T fp
	JOIN PRODUCT_T p ON fp.ProductID = p.ProductID
	JOIN FARMER_T f ON fp.FarmerID = f.UserID
	JOIN USER_T u ON f.UserID = u.UserID
	GROUP BY u.USERID, u.name, fp.ProductID;
--SQLEND