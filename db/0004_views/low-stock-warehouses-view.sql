CREATE OR REPLACE VIEW LOW_STOCK_WAREHOUSES AS
SELECT
    w.WarehouseID,
    w.AddressLine1,
    SUM(b.Quantity) AS CurrentStock
FROM DELIVERY_T d
JOIN WAREHOUSE_T w ON d.WarehouseID = w.WarehouseID
JOIN FARM_PRODUCT_BATCH_T b ON d.BatchID = b.BatchID
GROUP BY w.WarehouseID, w.AddressLine1
HAVING CurrentStock < 500
ORDER BY CurrentStock ASC;
--SQLEND
