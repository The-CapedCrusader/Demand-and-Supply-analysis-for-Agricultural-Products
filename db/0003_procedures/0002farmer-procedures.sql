CREATE OR REPLACE PROCEDURE create_farmer (
    IN p_UserID INT,
    IN p_Gender ENUM('Male', 'Female', 'Other')
)
BEGIN
    INSERT INTO FARMER_T (UserID, Gender)
    VALUES (p_UserID, p_Gender);
END;
--SQLEND

CREATE OR REPLACE PROCEDURE get_farmer_by_id(
	IN p_UserID INT
)
BEGIN
	SELECT u.*, f.Gender
	FROM USER_T u
	JOIN FARMER_T f ON u.UserID = f.UserID
	WHERE u.UserID = p_UserID;
END;
--SQLEND

CREATE OR REPLACE PROCEDURE get_all_farmers()
BEGIN
	SELECT u.*, f.Gender
	FROM USER_T u
	JOIN FARMER_T f ON u.UserID = f.UserID;
END;
--SQLEND

CREATE OR REPLACE PROCEDURE update_farmer (
    IN p_UserID INT,
    IN p_Gender ENUM('Male', 'Female', 'Other')
)
BEGIN
    UPDATE FARMER_T
    SET Gender = p_Gender
    WHERE UserID = p_UserID;
END;
--SQLEND

CREATE OR REPLACE PROCEDURE delete_farmer (
    IN p_UserID INT
)
BEGIN
    DELETE FROM FARMER_T WHERE UserID = p_UserID;
END;
--SQLEND