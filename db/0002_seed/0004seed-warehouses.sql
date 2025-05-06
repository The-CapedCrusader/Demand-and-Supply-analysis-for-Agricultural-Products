INSERT IGNORE INTO WAREHOUSE_T (
  WarehouseName,
  WarehouseType,
  Location,
  Capacity,
  TemperatureControlled
)
VALUES
  (
    'Elm Street Warehouse',
    'Storage',
    'Chicago, IL',
    50000,
    TRUE
  ),
  (
    'Oak Road Storage',
    'Storage',
    '5678 Oak Road, Newark, NJ',
    80000,
    FALSE
  );

--SQLEND
INSERT IGNORE INTO WAREHOUSE_PRODUCT_T (
  WarehouseID,
  ProductID,
  StockQuantity,
  ProductCapacity,
  LastStockedDate
)
VALUES
  (1, 1, 12000, 20000, '2025-05-01'),
  (1, 2, 8000, 15000, '2025-05-01'),
  (2, 3, 15000, 22000, '2025-05-01'),
  (2, 4, 6000, 10000, '2025-05-01');

--SQLEND