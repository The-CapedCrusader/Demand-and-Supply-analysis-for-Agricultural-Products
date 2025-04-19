CREATE OR REPLACE VIEW FARMER_DELIVERY_STATS AS
SELECT
    f.UserID AS FarmerID,
    u.Name AS FarmerName,
    COUNT(DISTINCT d.DeliveryID) AS TotalDeliveries,
    SUM(b.Quantity) AS TotalDeliveredQuantity
FROM FARM_PRODUCT_BATCH b
JOIN FARMER f ON b.FarmerID = f.UserID
JOIN USERS u ON f.UserID = u.UserID
JOIN DELIVERY d ON b.BatchID = d.BatchID
GROUP BY f.UserID, u.Name
ORDER BY TotalDeliveries DESC, TotalDeliveredQuantity DESC;
--SQLEND