DROP DATABASE IF EXISTS bamazon;

-- Creates the "bamazon" database --
CREATE DATABASE bamazon;

-- Make it so all of the following code will affect bamazon --
USE bamazon;

CREATE TABLE products (
  -- Create a numeric column called "item_id" which automatically increments and cannot be null --
  item_id INTEGER(10) AUTO_INCREMENT NOT NULL,
  -- Create a string column called "product_name" which cannot be null --
  product_name VARCHAR(100) NOT NULL,
    -- Create a string column called "department_name" which cannot be null --
  department_name VARCHAR(100) NOT NULL,
  -- Make a column called "price" (cost to consumer) --
  price DECIMAL(10,2) NULL,
  -- Make a column called "stock-quantity" for how much product is available in stores
  stock_quantity INTEGER(10) NOT NULL,
  -- Set the primary key of the table to item_id --
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Digital Multimeter', 'Automotive & Motorcycle', 12.98, 18),
('Digital Tire Pressure Gauge','Automotive & Motorcycle', 8.47, 25 ),
('Hand Wipes', 'Beauty', 12.04, 100),
('Essential Oil Diffuser', 'Beauty', 19.99, 32),
('Action Camera', 'Camera & Photo', 72.99, 15),
('Professional Binoculars', 'Camera & Photo', 109.00, 11),
('Glass Screen Protector', 'Cell Phones & Accessories', 6.79, 45),
('USB Wall Charger', 'Cell Phones & Accessories', 21.89, 14),
('Measuring Spoons Set', 'Kitchen', 9.99, 27),
('Digital Kitchen Scale', 'Kitchen', 10.19, 8);

SELECT * FROM products;


