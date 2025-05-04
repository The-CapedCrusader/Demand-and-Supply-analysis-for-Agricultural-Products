CREATE OR REPLACE PROCEDURE create_land_usage (
    IN p_Year INT,
    IN p_Type VARCHAR(100),
    IN p_Area FLOAT,
    IN p_Quantity INT,
    IN p_Source VARCHAR(255)
)
BEGIN
    INSERT INTO LAND_USAGE_T (Year, Type, Area, Quantity, Source)
    VALUES (p_Year, p_Type, p_Area, p_Quantity, p_Source);
END;
--SQLEND

CREATE OR REPLACE PROCEDURE get_all_land_usage()
BEGIN
    SELECT * FROM LAND_USAGE_T;
END;
--SQLEND

CREATE OR REPLACE PROCEDURE get_land_usage_by_year (
    IN p_Year INT
)
BEGIN
    SELECT * FROM LAND_USAGE_T WHERE Year = p_Year;
END;
--SQLEND

CREATE OR REPLACE PROCEDURE update_land_usage (
    IN p_Year INT,
    IN p_Type VARCHAR(100),
    IN p_Area FLOAT,
    IN p_Quantity INT,
    IN p_Source VARCHAR(255)
)
BEGIN
    UPDATE LAND_USAGE_T
    SET Type = p_Type,
        Area = p_Area,
        Quantity = p_Quantity,
        Source = p_Source
    WHERE Year = p_Year;
END;
--SQLEND

CREATE OR REPLACE PROCEDURE delete_land_usage (
    IN p_Year INT
)
BEGIN
    DELETE FROM LAND_USAGE_T WHERE Year = p_Year;
END;
--SQLEND
