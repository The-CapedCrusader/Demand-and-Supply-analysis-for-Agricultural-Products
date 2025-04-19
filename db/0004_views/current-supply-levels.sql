CREATE OR REPLACE VIEW CURRENT_SUPPLY_LEVELS AS
SELECT
    p.ProductID,
	p.ProductName,
    w.WarehouseID,
	w.WarehouseName,
    w.AddressLine1,
    SUM(b.Quantity) AS TotalInWarehouse
FROM DELIVERY d
JOIN FARM_PRODUCT_BATCH b ON d.BatchID = b.BatchID
JOIN WAREHOUSE w ON d.WarehouseID = w.WarehouseID
JOIN PRODUCT p ON b.ProductID = p.ProductID
GROUP BY b.ProductID, w.WarehouseID;
--SQLEND