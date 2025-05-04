CREATE OR REPLACE VIEW BUYER_DIRECTORY AS
SELECT
    u.UserID,
    u.Name,
    u.Email,
    u.Phone,
    u.Zip
FROM USER_T u
JOIN CUSTOMER_T c ON c.UserID = u.UserID;
--SQLEND