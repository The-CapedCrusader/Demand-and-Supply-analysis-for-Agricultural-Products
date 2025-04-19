CREATE OR REPLACE VIEW MARKET_PRICE_TRENDS AS
SELECT
    nd.Type AS ProductType,
    nd.Year,
    nd.Price,
    g.GDP,
    g.Population
FROM NUTRITION_DATA nd
LEFT JOIN GDP g ON nd.Year = g.Year
ORDER BY nd.Type, nd.Year;
--SQLEND