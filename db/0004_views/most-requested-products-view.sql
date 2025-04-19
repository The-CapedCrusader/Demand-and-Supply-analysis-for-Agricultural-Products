CREATE OR REPLACE VIEW MOST_REQUESTED_PRODUCTS AS
SELECT
    b.ProductID,
    COUNT(DISTINCT d.DeliveryID) AS DeliveryCount,
    SUM(b.Quantity) AS TotalQuantityDelivered
FROM DELIVERY d
JOIN FARM_PRODUCT_BATCH b ON d.BatchID = b.BatchID
GROUP BY b.ProductID
ORDER BY DeliveryCount DESC, TotalQuantityDelivered DESC;
--SQLEND
