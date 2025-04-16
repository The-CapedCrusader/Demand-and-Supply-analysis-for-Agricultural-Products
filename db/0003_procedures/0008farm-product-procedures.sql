CREATE OR REPLACE PROCEDURE create_farm_product (
    IN p_FarmerID INT,
    IN p_ProductID INT,
    IN p_Quantity INT,
    IN p_ProductionDate DATE
)
BEGIN
    INSERT INTO FARM_PRODUCT (FarmerID, ProductID, Quantity, ProductionDate)
    VALUES (p_FarmerID, p_ProductID, p_Quantity, p_ProductionDate);
END;
--SQLEND

CREATE OR REPLACE PROCEDURE get_all_farm_products()
BEGIN
    SELECT fp.*, u.Name AS FarmerName, p.ShelfLifeDays
    FROM FARM_PRODUCT fp
    JOIN FARMER f ON fp.FarmerID = f.UserID
    JOIN USERS u ON f.UserID = u.UserID
    JOIN PRODUCT p ON fp.ProductID = p.ProductID;
END;
--SQLEND

CREATE OR REPLACE PROCEDURE get_farm_product_by_farmer (
    IN p_FarmerID INT
)
BEGIN
    SELECT * FROM FARM_PRODUCT
    WHERE FarmerID = p_FarmerID;
END;
--SQLEND

CREATE OR REPLACE PROCEDURE update_farm_product (
    IN p_FarmerID INT,
    IN p_ProductID INT,
    IN p_Quantity INT,
    IN p_ProductionDate DATE
)
BEGIN
    UPDATE FARM_PRODUCT
    SET Quantity = p_Quantity,
        ProductionDate = p_ProductionDate
    WHERE FarmerID = p_FarmerID AND ProductID = p_ProductID;
END;
--SQLEND

CREATE OR REPLACE PROCEDURE delete_farm_product (
    IN p_FarmerID INT,
    IN p_ProductID INT
)
BEGIN
    DELETE FROM FARM_PRODUCT
    WHERE FarmerID = p_FarmerID AND ProductID = p_ProductID;
END;
--SQLEND
