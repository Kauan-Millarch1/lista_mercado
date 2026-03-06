update public.products
set
  name = case image_url
    when '/products/tomato.png' then 'Tomate'
    when '/products/onion.png' then 'Cebola'
    when '/products/banana.png' then 'Banana'
    when '/products/apple.png' then 'Maca'
    when '/products/chicken-breast.png' then 'Peito de Frango'
    when '/products/ground-beef.png' then 'Carne Moida'
    when '/products/milk.png' then 'Leite'
    when '/products/eggs.png' then 'Ovos'
    when '/products/rice.png' then 'Arroz'
    when '/products/beans.png' then 'Feijao'
    when '/products/sparkling-water.png' then 'Agua com Gas'
    when '/products/orange-juice.png' then 'Suco de Laranja'
    else name
  end,
  category = case image_url
    when '/products/tomato.png' then 'Verduras e Legumes'
    when '/products/onion.png' then 'Verduras e Legumes'
    when '/products/banana.png' then 'Frutas'
    when '/products/apple.png' then 'Frutas'
    when '/products/chicken-breast.png' then 'Carnes e Aves'
    when '/products/ground-beef.png' then 'Carnes e Aves'
    when '/products/milk.png' then 'Laticinios e Ovos'
    when '/products/eggs.png' then 'Laticinios e Ovos'
    when '/products/rice.png' then 'Padaria e Graos'
    when '/products/beans.png' then 'Padaria e Graos'
    when '/products/sparkling-water.png' then 'Bebidas'
    when '/products/orange-juice.png' then 'Bebidas'
    else category
  end,
  description = case image_url
    when '/products/tomato.png' then 'Tomate fresco vermelho'
    when '/products/onion.png' then 'Cebola branca'
    when '/products/banana.png' then 'Banana prata'
    when '/products/apple.png' then 'Maca vermelha'
    when '/products/chicken-breast.png' then 'Peito de frango sem pele'
    when '/products/ground-beef.png' then 'Carne moida magra'
    when '/products/milk.png' then 'Leite integral'
    when '/products/eggs.png' then 'Bandeja de ovos de galinha'
    when '/products/rice.png' then 'Pacote de arroz branco'
    when '/products/beans.png' then 'Feijao carioca'
    when '/products/sparkling-water.png' then 'Garrafa de agua com gas'
    when '/products/orange-juice.png' then 'Garrafa de suco natural'
    else description
  end,
  unit = case image_url
    when '/products/eggs.png' then 'unidade'
    else unit
  end;
