insert into public.products (name, category, description, image_url, unit, average_price)
values
  ('Tomato', 'Vegetables & Greens', 'Fresh red tomato', '/products/tomato.svg', 'kg', 2.50),
  ('Onion', 'Vegetables & Greens', 'White onion', '/products/onion.svg', 'kg', 1.90),
  ('Banana', 'Fruits', 'Silver banana', '/products/banana.svg', 'kg', 1.80),
  ('Apple', 'Fruits', 'Red apple', '/products/apple.svg', 'kg', 3.20),
  ('Chicken Breast', 'Meat & Poultry', 'Skinless breast', '/products/chicken-breast.svg', 'kg', 6.40),
  ('Ground Beef', 'Meat & Poultry', 'Lean ground beef', '/products/ground-beef.svg', 'kg', 7.10),
  ('Milk', 'Dairy & Eggs', 'Whole milk', '/products/milk.svg', 'L', 1.40),
  ('Eggs', 'Dairy & Eggs', 'Chicken eggs pack', '/products/eggs.svg', 'unit', 3.60),
  ('Rice', 'Bakery & Grains', 'White rice pack', '/products/rice.svg', 'kg', 2.20),
  ('Beans', 'Bakery & Grains', 'Carioca beans', '/products/beans.svg', 'kg', 2.80),
  ('Sparkling Water', 'Beverages', 'Sparkling water bottle', '/products/sparkling-water.svg', 'L', 1.10),
  ('Orange Juice', 'Beverages', 'Natural juice bottle', '/products/orange-juice.svg', 'L', 2.70)
on conflict do nothing;
