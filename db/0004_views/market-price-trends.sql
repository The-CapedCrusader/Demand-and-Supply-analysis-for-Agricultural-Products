CREATE OR REPLACE VIEW MARKET_PRICE_TRENDS AS
SELECT
    nd.Type AS ProductType,
    nd.Year,
    nd.Price,
    g.GDP,
    g.Population
FROM NUTRITION_DATA_T nd
LEFT JOIN GDP_T g ON nd.Year = g.Year
ORDER BY nd.Type, nd.Year;
--SQLEND