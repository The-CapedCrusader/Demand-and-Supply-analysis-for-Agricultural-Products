CREATE OR REPLACE VIEW DELIVERY_OVERVIEW AS
SELECT
    d.DeliveryID,
    d.DeliveryDate,
    d.Status,
    d.Type,
	p.ProductID,
	p.ProductName,
    u_vendor.Name AS VendorName,
    u_customer.Name AS CustomerName,
    w.AddressLine1 AS Warehouse,
    b.Quantity AS BatchQuantity
FROM DELIVERY d
LEFT JOIN VENDOR v ON d.LicenseID = v.LicenseID
LEFT JOIN USERS u_vendor ON v.UserID = u_vendor.UserID
LEFT JOIN USERS u_customer ON d.CustomerID = u_customer.UserID
LEFT JOIN WAREHOUSE w ON d.WarehouseID = w.WarehouseID
LEFT JOIN FARM_PRODUCT_BATCH b ON d.BatchID = b.BatchID
LEFT JOIN PRODUCT p ON b.ProductID = p.ProductID;
--SQLEND
