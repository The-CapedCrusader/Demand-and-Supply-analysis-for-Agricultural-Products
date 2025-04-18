CREATE OR REPLACE VIEW top_farmers AS
SELECT
    u.UserID AS FarmerID,
    u.Name AS FarmerName,
    SUM(fp.Quantity) AS TotalProduction
FROM FARM_PRODUCT fp
JOIN FARMER f ON fp.FarmerID = f.UserID
JOIN USERS u ON f.UserID = u.UserID
GROUP BY u.UserID, u.Name
HAVING TotalProduction > 0
ORDER BY TotalProduction DESC
LIMIT 10;
--SQLEND