CREATE OR REPLACE PROCEDURE create_vendor (
    IN p_UserID INT,
    IN p_RegistrationDate DATE,
    IN p_VendorType ENUM('wholesaler', 'retailer')
)
BEGIN
    INSERT INTO VENDOR_T (UserID, RegistrationDate, VendorType)
    VALUES (p_UserID, p_RegistrationDate, p_VendorType);
END;
--SQLEND

CREATE OR REPLACE PROCEDURE get_all_vendors()
BEGIN
    SELECT v.*, u.Name, u.Email, u.Phone
    FROM VENDOR_T v
    JOIN USER_T u ON v.UserID = u.UserID;
END;
--SQLEND

CREATE OR REPLACE PROCEDURE get_vendor_by_id (
    IN p_LicenseID INT
)
BEGIN
    SELECT v.*, u.*
    FROM VENDOR_T v
    JOIN USER_T u ON v.UserID = u.UserID
    WHERE v.LicenseID = p_LicenseID;
END;
--SQLEND

CREATE OR REPLACE PROCEDURE update_vendor (
    IN p_LicenseID INT,
    IN p_RegistrationDate DATE,
    IN p_VendorType ENUM('wholesaler', 'retailer')
)
BEGIN
    UPDATE VENDOR_T
    SET RegistrationDate = p_RegistrationDate,
        VendorType = p_VendorType
    WHERE LicenseID = p_LicenseID;
END;
--SQLEND

CREATE OR REPLACE PROCEDURE delete_vendor (
    IN p_LicenseID INT
)
BEGIN
    DELETE FROM VENDOR_T WHERE LicenseID = p_LicenseID;
END;
--SQLEND