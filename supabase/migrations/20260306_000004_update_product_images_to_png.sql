update public.products
set image_url = replace(image_url, '.svg', '.png')
where image_url like '/products/%.svg';
