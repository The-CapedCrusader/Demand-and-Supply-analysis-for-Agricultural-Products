CREATE OR REPLACE VIEW SELLER_DIRECTORY AS
SELECT
    u.UserID,
    u.Name,
    u.Email,
    u.Phone,
    u.Zip,
    v.VendorType
FROM USERS u
JOIN VENDOR v ON v.UserID = u.UserID;
--SQLEND