CREATE TABLE IF NOT EXISTS USERS (
	UserID INT PRIMARY KEY AUTO_INCREMENT,
	Name VARCHAR(255) NOT NULL,
	Email VARCHAR(255) NOT NULL UNIQUE,
	PASSWORD VARCHAR(255) NOT NULL,
	Phone VARCHAR(20),
	AddressLine1 VARCHAR(255),
	AddressLine2 VARCHAR(255),
	Zip VARCHAR(10),
	UserType ENUM (
		'farmer',
		'retailer',
		'wholesaler',
		'customer',
		'admin'
	) NOT NULL,
	FOREIGN KEY (Zip) REFERENCES ZIP_CODE (Zip),
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
	updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
--SQLEND
CREATE TABLE IF NOT EXISTS FARMER (
	UserID INT PRIMARY KEY,
	Gender ENUM ('male', 'female', 'other'),
	FOREIGN KEY (UserID) REFERENCES USERS (UserID),
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
	updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
--SQLEND
CREATE TABLE IF NOT EXISTS CUSTOMER (
	UserID INT PRIMARY KEY,
	FOREIGN KEY (UserID) REFERENCES USERS (UserID),
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
	updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
--SQLEND
CREATE TABLE IF NOT EXISTS VENDOR (
	LicenseID INT PRIMARY KEY AUTO_INCREMENT,
	UserID INT,
	RegistrationDate DATETIME,
	VendorType ENUM ('wholesaler', 'retailer'),
	FOREIGN KEY (UserID) REFERENCES USERS (UserID),
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
	updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
--SQLEND
CREATE TABLE IF NOT EXISTS WHOLESALER (
	WLicenseID INT PRIMARY KEY,
	MinOrderQuantity INT,
	FOREIGN KEY (WLicenseID) REFERENCES VENDOR (LicenseID),
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
	updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
--SQLEND
CREATE TABLE IF NOT EXISTS RETAILER (
	RLicenseID INT PRIMARY KEY,
	StoreType VARCHAR(100),
	FOREIGN KEY (RLicenseID) REFERENCES VENDOR (LicenseID),
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
	updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
--SQLEND