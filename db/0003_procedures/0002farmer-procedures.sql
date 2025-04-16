CREATE OR REPLACE PROCEDURE create_farmer (
    IN p_UserID INT,
    IN p_Gender ENUM('Male', 'Female', 'Other')
)
BEGIN
    INSERT INTO FARMER (UserID, Gender)
    VALUES (p_UserID, p_Gender);
END;
--SQLEND

CREATE OR REPLACE PROCEDURE get_farmer_by_id(
	IN p_UserID INT
)
BEGIN
	SELECT u.*, f.Gender
	FROM USERS u
	JOIN FARMER f ON u.UserID = f.UserID
	WHERE u.UserID = p_UserID;
END;
--SQLEND

CREATE OR REPLACE PROCEDURE get_all_farmers()
BEGIN
	SELECT u.*, f.Gender
	FROM USERS u
	JOIN FARMER f ON u.UserID = f.UserID;
END;
--SQLEND

CREATE OR REPLACE PROCEDURE update_farmer (
    IN p_UserID INT,
    IN p_Gender ENUM('Male', 'Female', 'Other')
)
BEGIN
    UPDATE FARMER
    SET Gender = p_Gender
    WHERE UserID = p_UserID;
END;
--SQLEND

CREATE OR REPLACE PROCEDURE delete_farmer (
    IN p_UserID INT
)
BEGIN
    DELETE FROM FARMER WHERE UserID = p_UserID;
END;
--SQLEND