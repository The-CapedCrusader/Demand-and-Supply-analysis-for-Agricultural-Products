CREATE OR REPLACE PROCEDURE link_warehouse_product (
    IN p_WarehouseID INT,
    IN p_ProductTypeID INT
)
BEGIN
    INSERT INTO WAREHOUSE_PRODUCT (WarehouseID, ProductTypeID)
    VALUES (p_WarehouseID, p_ProductTypeID);
END;
--SQLEND

CREATE OR REPLACE PROCEDURE get_products_in_warehouse (
    IN p_WarehouseID INT
)
BEGIN
    SELECT wpt.ProductType
    FROM WAREHOUSE_PRODUCT wp
    JOIN WAREHOUSE_PRODUCT_TYPE wpt ON wp.ProductTypeID = wpt.ProductTypeID
    WHERE wp.WarehouseID = p_WarehouseID;
END;
--SQLEND

CREATE OR REPLACE PROCEDURE unlink_warehouse_product (
    IN p_WarehouseID INT,
    IN p_ProductTypeID INT
)
BEGIN
    DELETE FROM WAREHOUSE_PRODUCT
    WHERE WarehouseID = p_WarehouseID AND ProductTypeID = p_ProductTypeID;
END;
--SQLEND
