CREATE OR REPLACE VIEW BUYER_DIRECTORY AS
SELECT
    u.UserID,
    u.Name,
    u.Email,
    u.Phone,
    u.Zip
FROM USERS u
JOIN CUSTOMER c ON c.UserID = u.UserID;
--SQLEND