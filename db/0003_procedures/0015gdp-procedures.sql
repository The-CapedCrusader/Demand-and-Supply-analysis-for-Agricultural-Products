CREATE OR REPLACE PROCEDURE create_gdp (
    IN p_Year INT,
    IN p_Population BIGINT,
    IN p_GDP DECIMAL(15, 2),
    IN p_Source VARCHAR(255)
)
BEGIN
    INSERT INTO GDP (Year, Population, GDP, Source)
    VALUES (p_Year, p_Population, p_GDP, p_Source);
END;
--SQLEND

CREATE OR REPLACE PROCEDURE get_all_gdp()
BEGIN
    SELECT * FROM GDP;
END;
--SQLEND

CREATE OR REPLACE PROCEDURE get_gdp_by_year (
    IN p_Year INT
)
BEGIN
    SELECT * FROM GDP WHERE Year = p_Year;
END;
--SQLEND

CREATE OR REPLACE PROCEDURE update_gdp (
    IN p_Year INT,
    IN p_Population BIGINT,
    IN p_GDP DECIMAL(15, 2),
    IN p_Source VARCHAR(255)
)
BEGIN
    UPDATE GDP
    SET Population = p_Population,
        GDP = p_GDP,
        Source = p_Source
    WHERE Year = p_Year;
END;
--SQLEND

CREATE OR REPLACE PROCEDURE delete_gdp (
    IN p_Year INT
)
BEGIN
    DELETE FROM GDP WHERE Year = p_Year;
END;
--SQLEND
