CREATE OR REPLACE PROCEDURE create_product_type (
    IN p_ProductType VARCHAR(100)
)
BEGIN
    INSERT INTO WAREHOUSE_PRODUCT_TYPE (ProductType)
    VALUES (p_ProductType);
END;
--SQLEND

CREATE OR REPLACE PROCEDURE get_all_product_types()
BEGIN
    SELECT * FROM WAREHOUSE_PRODUCT_TYPE;
END;
--SQLEND

CREATE OR REPLACE PROCEDURE update_product_type (
    IN p_ProductTypeID INT,
    IN p_ProductType VARCHAR(100)
)
BEGIN
    UPDATE WAREHOUSE_PRODUCT_TYPE
    SET ProductType = p_ProductType
    WHERE ProductTypeID = p_ProductTypeID;
END;
--SQLEND

CREATE OR REPLACE PROCEDURE delete_product_type (
    IN p_ProductTypeID INT
)
BEGIN
    DELETE FROM WAREHOUSE_PRODUCT_TYPE WHERE ProductTypeID = p_ProductTypeID;
END;
--SQLEND
