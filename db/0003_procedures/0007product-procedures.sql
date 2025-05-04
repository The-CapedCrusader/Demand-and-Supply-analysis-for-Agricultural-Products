CREATE OR REPLACE PROCEDURE create_product (
    IN p_Quantity INT,
    IN p_ShelfLifeDays INT
)
BEGIN
    INSERT INTO PRODUCT_T (Quantity, ShelfLifeDays)
    VALUES (p_Quantity, p_ShelfLifeDays);
END;
--SQLEND

CREATE OR REPLACE PROCEDURE get_all_products()
BEGIN
    SELECT * FROM PRODUCT_T;
END;
--SQLEND

CREATE OR REPLACE PROCEDURE get_product_by_id (
    IN p_ProductID INT
)
BEGIN
    SELECT * FROM PRODUCT_T WHERE ProductID = p_ProductID;
END;
--SQLEND

CREATE OR REPLACE PROCEDURE update_product (
    IN p_ProductID INT,
    IN p_Quantity INT,
    IN p_ShelfLifeDays INT
)
BEGIN
    UPDATE PRODUCT_T
    SET Quantity = p_Quantity,
        ShelfLifeDays = p_ShelfLifeDays
    WHERE ProductID = p_ProductID;
END;
--SQLEND

CREATE OR REPLACE PROCEDURE delete_product (
    IN p_ProductID INT
)
BEGIN
    DELETE FROM PRODUCT_T WHERE ProductID = p_ProductID;
END;
--SQLEND