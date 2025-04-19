CREATE OR REPLACE PROCEDURE create_product (
    IN p_Quantity INT,
    IN p_ShelfLifeDays INT
)
BEGIN
    INSERT INTO PRODUCT (Quantity, ShelfLifeDays)
    VALUES (p_Quantity, p_ShelfLifeDays);
END;
--SQLEND

CREATE OR REPLACE PROCEDURE get_all_products()
BEGIN
    SELECT * FROM PRODUCT;
END;
--SQLEND

CREATE OR REPLACE PROCEDURE get_product_by_id (
    IN p_ProductID INT
)
BEGIN
    SELECT * FROM PRODUCT WHERE ProductID = p_ProductID;
END;
--SQLEND

CREATE OR REPLACE PROCEDURE update_product (
    IN p_ProductID INT,
    IN p_Quantity INT,
    IN p_ShelfLifeDays INT
)
BEGIN
    UPDATE PRODUCT
    SET Quantity = p_Quantity,
        ShelfLifeDays = p_ShelfLifeDays
    WHERE ProductID = p_ProductID;
END;
--SQLEND

CREATE OR REPLACE PROCEDURE delete_product (
    IN p_ProductID INT
)
BEGIN
    DELETE FROM PRODUCT WHERE ProductID = p_ProductID;
END;
--SQLEND