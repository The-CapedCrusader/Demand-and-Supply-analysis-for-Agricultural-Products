CREATE OR REPLACE VIEW PRODUCT_CATALOG AS
SELECT
    p.ProductID,
	p.ProductName,
    pc.Category,
	pv.Variety,
    p.ShelfLifeDays
FROM PRODUCT_T p
JOIN PRODUCT_CATEGORY_T pc ON p.ProductID = pc.ProductID
JOIN PRODUCT_VARIETY_T pv ON p.ProductID = pv.ProductID
--SQLEND