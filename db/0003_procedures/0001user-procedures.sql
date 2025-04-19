CREATE OR REPLACE PROCEDURE create_user (
  IN p_Name VARCHAR(100),
  IN p_Email VARCHAR(100),
  IN p_Password VARCHAR(100),
  IN p_Phone VARCHAR(20),
  IN p_AddressLine1 VARCHAR(255),
  IN p_AddressLine2 VARCHAR(255),
  IN p_Zip VARCHAR(10),
  IN p_UserType ENUM('farmer', 'retailer', 'wholesaler', 'customer', 'admin')
)
BEGIN
  INSERT INTO USERS (Name, Email, PASSWORD, Phone, AddressLine1, AddressLine2, Zip, UserType)
  VALUES (p_Name, p_Email, p_Password, p_Phone, p_AddressLine1, p_AddressLine2, p_Zip, p_UserType);
END;

--SQLEND

CREATE OR REPLACE PROCEDURE get_user_by_id (
    IN p_UserID INT
)
BEGIN
    SELECT * FROM USERS WHERE UserID = p_UserID;
END;

--SQLEND

CREATE OR REPLACE PROCEDURE update_user (
  IN p_UserID INT,
  IN p_Name VARCHAR(100),
  IN p_Email VARCHAR(100),
  IN p_Password VARCHAR(100),
  IN p_Phone VARCHAR(20),
  IN p_AddressLine1 VARCHAR(255),
  IN p_AddressLine2 VARCHAR(255),
  IN p_Zip VARCHAR(10),
  IN p_UserType ENUM('farmer', 'retailer', 'wholesaler', 'customer', 'admin')
)
BEGIN
  UPDATE USERS
  SET Name = p_Name,
	  Email = p_Email,
	  PASSWORD = p_Password,
	  Phone = p_Phone,
	  AddressLine1 = p_AddressLine1,
	  AddressLine2 = p_AddressLine2,
	  Zip = p_Zip,
	  UserType = p_UserType
  WHERE UserID = p_UserID;
END;

--SQLEND

CREATE OR REPLACE PROCEDURE read_all_users ()
BEGIN
    SELECT * FROM USERS;
END;

--SQLEND

CREATE OR REPLACE PROCEDURE delete_user (
  IN p_UserID INT
)
BEGIN
  DELETE FROM USERS WHERE UserID = p_UserID;
END;

--SQLEND