CREATE OR REPLACE PROCEDURE create_delivery (
    IN p_Date DATE,
    IN p_TransportMode VARCHAR(100),
    IN p_Status VARCHAR(50),
    IN p_Type VARCHAR(50),
    IN p_BatchID INT,
    IN p_WarehouseID INT,
    IN p_LicenseID INT,
    IN p_CustomerID INT
)
BEGIN
    INSERT INTO DELIVERY_T (
        Date, TransportMode, Status, Type,
        BatchID, WarehouseID, LicenseID, CustomerID
    ) VALUES (
        p_Date, p_TransportMode, p_Status, p_Type,
        p_BatchID, p_WarehouseID, p_LicenseID, p_CustomerID
    );
END;
--SQLEND

CREATE OR REPLACE PROCEDURE get_all_deliveries()
BEGIN
    SELECT
        d.DeliveryID,
        d.Date,
        d.TransportMode,
        d.Status,
        d.Type,
        d.BatchID,
        d.WarehouseID,
        w.AddressLine1 AS WarehouseAddress,
        d.LicenseID,
        u1.Name AS VendorName,
        d.CustomerID,
        u2.Name AS CustomerName
    FROM DELIVERY_T d
    LEFT JOIN WAREHOUSE_T w ON d.WarehouseID = w.WarehouseID
    LEFT JOIN VENDOR_T v ON d.LicenseID = v.LicenseID
    LEFT JOIN USER_T u1 ON v.UserID = u1.UserID
    LEFT JOIN USER_T u2 ON d.CustomerID = u2.UserID;
END;
--SQLEND

CREATE OR REPLACE PROCEDURE get_delivery_by_id (
    IN p_DeliveryID INT
)
BEGIN
    SELECT * FROM DELIVERY_T
    WHERE DeliveryID = p_DeliveryID;
END;
--SQLEND

CREATE OR REPLACE PROCEDURE update_delivery (
    IN p_DeliveryID INT,
    IN p_Date DATE,
    IN p_TransportMode VARCHAR(100),
    IN p_Status VARCHAR(50),
    IN p_Type VARCHAR(50),
    IN p_BatchID INT,
    IN p_WarehouseID INT,
    IN p_LicenseID INT,
    IN p_CustomerID INT
)
BEGIN
    UPDATE DELIVERY_T
    SET
        Date = p_Date,
        TransportMode = p_TransportMode,
        Status = p_Status,
        Type = p_Type,
        BatchID = p_BatchID,
        WarehouseID = p_WarehouseID,
        LicenseID = p_LicenseID,
        CustomerID = p_CustomerID
    WHERE DeliveryID = p_DeliveryID;
END;
--SQLEND

CREATE OR REPLACE PROCEDURE delete_delivery (
    IN p_DeliveryID INT
)
BEGIN
    DELETE FROM DELIVERY_T WHERE DeliveryID = p_DeliveryID;
END;
--SQLEND
