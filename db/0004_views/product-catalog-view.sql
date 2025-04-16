CREATE OR REPLACE VIEW PRODUCT_CATALOG AS
SELECT
    p.ProductID,
	p.ProductName,
    pc.Category,
	pv.Variety,
    p.ShelfLifeDays
FROM PRODUCT p
JOIN PRODUCT_CATEGORY pc ON p.ProductID = pc.ProductID
JOIN PRODUCT_VARIETY pv ON p.ProductID = pv.ProductID
--SQLEND