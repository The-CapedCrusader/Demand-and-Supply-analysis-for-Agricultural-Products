CREATE OR REPLACE VIEW WAREHOUSE_STOCK AS
	SELECT
		w.WarehouseID,
		w.WarehouseName,
		w.AddressLine1,
		p.ProductID,
		p.ProductName,
		p.ShelfLifeDays,
		SUM(b.Quantity) AS TotalStock
	FROM DELIVERY_T d
	JOIN WAREHOUSE_T w ON d.WarehouseID = w.WarehouseID
	JOIN FARM_PRODUCT_BATCH_T b ON d.BatchID = b.BatchID
	JOIN PRODUCT_T p ON b.ProductID = p.ProductID
	JOIN PRODUCT_VARIETY_T pv ON p.ProductID = pv.ProductID
	GROUP BY w.WarehouseID, w.WarehouseName, w.AddressLine1, p.ProductID, p.ProductName, p.ShelfLifeDays;
--SQLEND