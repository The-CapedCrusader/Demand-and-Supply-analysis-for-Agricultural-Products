CREATE OR REPLACE PROCEDURE create_wholesaler (
    IN p_LicenseID INT,
    IN p_MinOrderQuantity INT
)
BEGIN
    INSERT INTO WHOLESALER_T (WLicenseID, MinOrderQuantity)
    VALUES (p_LicenseID, p_MinOrderQuantity);
END;
--SQLEND

CREATE OR REPLACE PROCEDURE get_all_wholesalers()
BEGIN
    SELECT w.*, v.*, u.Name, u.Email
    FROM WHOLESALER_T w
    JOIN VENDOR_T v ON w.WLicenseID = v.LicenseID
    JOIN USER_T u ON v.UserID = u.UserID;
END;
--SQLEND

CREATE OR REPLACE PROCEDURE get_wholesaler_by_id (
    IN p_LicenseID INT
)
BEGIN
    SELECT w.*, v.*, u.*
    FROM WHOLESALER_T w
    JOIN VENDOR_T v ON w.WLicenseID = v.LicenseID
    JOIN USER_T u ON v.UserID = u.UserID
    WHERE w.WLicenseID = p_LicenseID;
END;
--SQLEND

CREATE OR REPLACE PROCEDURE update_wholesaler (
    IN p_LicenseID INT,
    IN p_MinOrderQuantity INT
)
BEGIN
    UPDATE WHOLESALER_T
    SET MinOrderQuantity = p_MinOrderQuantity
    WHERE WLicenseID = p_LicenseID;
END;
--SQLEND

CREATE OR REPLACE PROCEDURE delete_wholesaler (
    IN p_LicenseID INT
)
BEGIN
    DELETE FROM WHOLESALER_T WHERE WLicenseID = p_LicenseID;
END;
--SQLEND