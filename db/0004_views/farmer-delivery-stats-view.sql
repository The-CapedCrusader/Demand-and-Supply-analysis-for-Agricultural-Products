CREATE OR REPLACE VIEW FARMER_DELIVERY_STATS AS
SELECT
    f.UserID AS FarmerID,
    u.Name AS FarmerName,
    COUNT(DISTINCT d.DeliveryID) AS TotalDeliveries,
    SUM(b.Quantity) AS TotalDeliveredQuantity
FROM FARM_PRODUCT_BATCH_T b
JOIN FARMER_T f ON b.FarmerID = f.UserID
JOIN USER_T u ON f.UserID = u.UserID
JOIN DELIVERY_T d ON b.BatchID = d.BatchID
GROUP BY f.UserID, u.Name
ORDER BY TotalDeliveries DESC, TotalDeliveredQuantity DESC;
--SQLEND