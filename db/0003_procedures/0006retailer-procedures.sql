CREATE OR REPLACE PROCEDURE create_retailer (
    IN p_LicenseID INT,
    IN p_StoreType VARCHAR(100)
)
BEGIN
    INSERT INTO RETAILER (RLicenseID, StoreType)
    VALUES (p_LicenseID, p_StoreType);
END;
--SQLEND

CREATE OR REPLACE PROCEDURE get_all_retailers()
BEGIN
    SELECT r.*, v.*, u.Name, u.Email
    FROM RETAILER r
    JOIN VENDOR v ON r.RLicenseID = v.LicenseID
    JOIN USERS u ON v.UserID = u.UserID;
END;
--SQLEND

CREATE OR REPLACE PROCEDURE get_retailer_by_id (
    IN p_LicenseID INT
)
BEGIN
    SELECT r.*, v.*, u.*
    FROM RETAILER r
    JOIN VENDOR v ON r.RLicenseID = v.LicenseID
    JOIN USERS u ON v.UserID = u.UserID
    WHERE r.RLicenseID = p_LicenseID;
END;
--SQLEND

CREATE OR REPLACE PROCEDURE update_retailer (
    IN p_LicenseID INT,
    IN p_StoreType VARCHAR(100)
)
BEGIN
    UPDATE RETAILER
    SET StoreType = p_StoreType
    WHERE RLicenseID = p_LicenseID;
END;
--SQLEND

CREATE OR REPLACE PROCEDURE delete_retailer (
    IN p_LicenseID INT
)
BEGIN
    DELETE FROM RETAILER WHERE RLicenseID = p_LicenseID;
END;
--SQLEND