CREATE OR REPLACE VIEW SELLER_DIRECTORY AS
SELECT
    u.UserID,
    u.Name,
    u.Email,
    u.Phone,
    u.Zip,
    v.VendorType
FROM USER_T u
JOIN VENDOR_T v ON v.UserID = u.UserID;
--SQLEND