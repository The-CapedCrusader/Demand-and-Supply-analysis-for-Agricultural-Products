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
FROM DELIVERY_T d
LEFT JOIN VENDOR_T v ON d.LicenseID = v.LicenseID
LEFT JOIN USER_T u_vendor ON v.UserID = u_vendor.UserID
LEFT JOIN USER_T u_customer ON d.CustomerID = u_customer.UserID
LEFT JOIN WAREHOUSE_T w ON d.WarehouseID = w.WarehouseID
LEFT JOIN FARM_PRODUCT_BATCH_T b ON d.BatchID = b.BatchID
LEFT JOIN PRODUCT_T p ON b.ProductID = p.ProductID;
--SQLEND
