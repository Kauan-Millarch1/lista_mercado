update public.products
set image_url = '/products/placeholders/product-default.svg'
where image_url is null or btrim(image_url) = '';

alter table public.products
alter column image_url set not null;
