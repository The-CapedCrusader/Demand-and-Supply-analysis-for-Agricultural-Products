CREATE OR REPLACE PROCEDURE create_warehouse (
    IN p_AddressLine1 VARCHAR(200),
    IN p_AddressLine2 VARCHAR(200),
    IN p_Zip VARCHAR(10),
    IN p_Capacity INT,
    IN p_TemperatureControlled BOOLEAN
)
BEGIN
    INSERT INTO WAREHOUSE (AddressLine1, AddressLine2, Zip, Capacity, TemperatureControlled)
    VALUES (p_AddressLine1, p_AddressLine2, p_Zip, p_Capacity, p_TemperatureControlled);
END;
--SQLEND

CREATE OR REPLACE PROCEDURE get_all_warehouses()
BEGIN
    SELECT * FROM WAREHOUSE;
END;
--SQLEND

CREATE OR REPLACE PROCEDURE get_warehouse_by_id (
    IN p_WarehouseID INT
)
BEGIN
    SELECT * FROM WAREHOUSE WHERE WarehouseID = p_WarehouseID;
END;
--SQLEND

CREATE OR REPLACE PROCEDURE update_warehouse (
    IN p_WarehouseID INT,
    IN p_AddressLine1 VARCHAR(200),
    IN p_AddressLine2 VARCHAR(200),
    IN p_Zip VARCHAR(10),
    IN p_Capacity INT,
    IN p_TemperatureControlled BOOLEAN
)
BEGIN
    UPDATE WAREHOUSE
    SET AddressLine1 = p_AddressLine1,
        AddressLine2 = p_AddressLine2,
        Zip = p_Zip,
        Capacity = p_Capacity,
        TemperatureControlled = p_TemperatureControlled
    WHERE WarehouseID = p_WarehouseID;
END;
--SQLEND

CREATE OR REPLACE PROCEDURE delete_warehouse (
    IN p_WarehouseID INT
)
BEGIN
    DELETE FROM WAREHOUSE WHERE WarehouseID = p_WarehouseID;
END;
--SQLEND
