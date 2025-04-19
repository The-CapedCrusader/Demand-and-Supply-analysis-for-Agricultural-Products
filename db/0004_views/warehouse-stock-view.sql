CREATE OR REPLACE VIEW WAREHOUSE_STOCK AS
	SELECT
		w.WarehouseID,
		w.WarehouseName,
		w.AddressLine1,
		p.ProductID,
		p.ProductName,
		p.ShelfLifeDays,
		SUM(b.Quantity) AS TotalStock
	FROM DELIVERY d
	JOIN WAREHOUSE w ON d.WarehouseID = w.WarehouseID
	JOIN FARM_PRODUCT_BATCH b ON d.BatchID = b.BatchID
	JOIN PRODUCT p ON b.ProductID = p.ProductID
	JOIN PRODUCT_VARIETY pv ON p.ProductID = pv.ProductID
	GROUP BY w.WarehouseID, w.WarehouseName, w.AddressLine1, p.ProductID, p.ProductName, p.ShelfLifeDays;
--SQLEND