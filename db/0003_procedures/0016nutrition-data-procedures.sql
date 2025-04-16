CREATE OR REPLACE PROCEDURE create_nutrition_data (
    IN p_Year INT,
    IN p_Type VARCHAR(100),
    IN p_Quantity INT,
    IN p_Price FLOAT
)
BEGIN
    INSERT INTO NUTRITION_DATA (Year, Type, Quantity, Price)
    VALUES (p_Year, p_Type, p_Quantity, p_Price);
END;
--SQLEND

CREATE OR REPLACE PROCEDURE get_all_nutrition_data()
BEGIN
    SELECT * FROM NUTRITION_DATA;
END;
--SQLEND

CREATE OR REPLACE PROCEDURE get_nutrition_data_by_year (
    IN p_Year INT
)
BEGIN
    SELECT * FROM NUTRITION_DATA WHERE Year = p_Year;
END;
--SQLEND

CREATE OR REPLACE PROCEDURE update_nutrition_data (
    IN p_Year INT,
    IN p_Type VARCHAR(100),
    IN p_Quantity INT,
    IN p_Price FLOAT
)
BEGIN
    UPDATE NUTRITION_DATA
    SET Type = p_Type,
        Quantity = p_Quantity,
        Price = p_Price
    WHERE Year = p_Year;
END;
--SQLEND

CREATE OR REPLACE PROCEDURE delete_nutrition_data (
    IN p_Year INT
)
BEGIN
    DELETE FROM NUTRITION_DATA WHERE Year = p_Year;
END;
--SQLEND
