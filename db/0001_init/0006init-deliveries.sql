CREATE TABLE IF NOT EXISTS DELIVERY (
	DeliveryID INT PRIMARY KEY AUTO_INCREMENT,
	DeliveryDate DATETIME,
	TransportMode VARCHAR(100),
	Status VARCHAR(100),
	Type VARCHAR(100),
	BatchID INT,
	WarehouseID INT,
	LicenseID INT,
	CustomerID INT,
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
	updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY (BatchID) REFERENCES FARM_PRODUCT_BATCH (BatchID),
	FOREIGN KEY (WarehouseID) REFERENCES WAREHOUSE (WarehouseID),
	FOREIGN KEY (LicenseID) REFERENCES VENDOR (LicenseID),
	FOREIGN KEY (CustomerID) REFERENCES USERS (UserID)
);
--SQLEND