CREATE OR REPLACE PROCEDURE create_farm_product_batch (
    IN p_Quantity INT,
    IN p_BatchDate DATE,
    IN p_FarmerID INT,
    IN p_ProductID INT
)
BEGIN
    INSERT INTO FARM_PRODUCT_BATCH (Quantity, BatchDate, FarmerID, ProductID)
    VALUES (p_Quantity, p_BatchDate, p_FarmerID, p_ProductID);
END;
--SQLEND

CREATE OR REPLACE PROCEDURE get_all_farm_product_batches()
BEGIN
    SELECT b.*, u.Name AS FarmerName, p.ShelfLifeDays
    FROM FARM_PRODUCT_BATCH b
    JOIN FARMER f ON b.FarmerID = f.UserID
    JOIN USERS u ON f.UserID = u.UserID
    JOIN PRODUCT p ON b.ProductID = p.ProductID;
END;
--SQLEND

CREATE OR REPLACE PROCEDURE get_batch_by_id (
    IN p_BatchID INT
)
BEGIN
    SELECT * FROM FARM_PRODUCT_BATCH WHERE BatchID = p_BatchID;
END;
--SQLEND

CREATE OR REPLACE PROCEDURE update_farm_product_batch (
    IN p_BatchID INT,
    IN p_Quantity INT,
    IN p_BatchDate DATE
)
BEGIN
    UPDATE FARM_PRODUCT_BATCH
    SET Quantity = p_Quantity,
        BatchDate = p_BatchDate
    WHERE BatchID = p_BatchID;
END;
--SQLEND

CREATE OR REPLACE PROCEDURE delete_farm_product_batch (
    IN p_BatchID INT
)
BEGIN
    DELETE FROM FARM_PRODUCT_BATCH WHERE BatchID = p_BatchID;
END;
--SQLEND
