insert into public.products (name, category, description, image_url, unit, average_price)
values
  ('Tomate', 'Verduras e Legumes', 'Tomate fresco vermelho', '/products/tomato.png', 'kg', 2.50),
  ('Cebola', 'Verduras e Legumes', 'Cebola branca', '/products/onion.png', 'kg', 1.90),
  ('Banana', 'Frutas', 'Banana prata', '/products/banana.png', 'kg', 1.80),
  ('Maca', 'Frutas', 'Maca vermelha', '/products/apple.png', 'kg', 3.20),
  ('Peito de Frango', 'Carnes e Aves', 'Peito de frango sem pele', '/products/chicken-breast.png', 'kg', 6.40),
  ('Carne Moida', 'Carnes e Aves', 'Carne moida magra', '/products/ground-beef.png', 'kg', 7.10),
  ('Leite', 'Laticinios e Ovos', 'Leite integral', '/products/milk.png', 'L', 1.40),
  ('Ovos', 'Laticinios e Ovos', 'Bandeja de ovos de galinha', '/products/eggs.png', 'unidade', 3.60),
  ('Arroz', 'Padaria e Graos', 'Pacote de arroz branco', '/products/rice.png', 'kg', 2.20),
  ('Feijao', 'Padaria e Graos', 'Feijao carioca', '/products/beans.png', 'kg', 2.80),
  ('Agua com Gas', 'Bebidas', 'Garrafa de agua com gas', '/products/sparkling-water.png', 'L', 1.10),
  ('Suco de Laranja', 'Bebidas', 'Garrafa de suco natural', '/products/orange-juice.png', 'L', 2.70)
on conflict do nothing;
