CREATE TABLE SEASONAL_PRODUCTION_T (
  SeasonID INT PRIMARY KEY AUTO_INCREMENT,
  ProductID INT NOT NULL,
  Season ENUM('Winter', 'Spring', 'Summer', 'Fall', 'Year-round', 'Spring-Summer', 'Summer-Fall', 'Summer-Fall', 'Fall-Winter', 'Winter-Spring') NOT NULL,
  ProductionVolume DECIMAL(10,2),
  Year YEAR,
  FOREIGN KEY (ProductID) REFERENCES PRODUCT_T(ProductID)
);

