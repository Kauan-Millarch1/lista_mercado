# AI Product Photo Prompts (Transparent Background)

Use this guide to generate realistic product photos with transparent background for the grocery catalog.

## Global generation settings

- Style: photorealistic e-commerce product photo
- Background: fully transparent (alpha), no shadow baked into background
- Lighting: soft studio light, neutral white balance, high detail texture
- Framing: centered product, full object visible, no clipping
- Output format: PNG or WebP with alpha channel
- Output size: minimum 1024x1024
- Composition: one product per image, no text, no labels, no logos, no watermark
- Color fidelity: natural food color, avoid oversaturation

## Negative prompt (use in all generations)

cartoon, illustration, drawing, CGI toy look, blurry, low resolution, watermark, logo, text overlay, frame, border, background gradient, table, plate, hands, people, multiple products, duplicate objects, cut object edges, over-sharpened

## File naming (must match app paths)

- /public/products/tomato.png
- /public/products/onion.png
- /public/products/banana.png
- /public/products/apple.png
- /public/products/chicken-breast.png
- /public/products/ground-beef.png
- /public/products/milk.png
- /public/products/eggs.png
- /public/products/rice.png
- /public/products/beans.png
- /public/products/sparkling-water.png
- /public/products/orange-juice.png

## Product prompts

### tomato.png
A single fresh ripe red tomato, photorealistic grocery product photo, high-detail natural skin texture, subtle stem detail, centered composition, isolated object, transparent background, studio soft light, ultra clean edge cutout.

### onion.png
A single fresh white/yellow onion, photorealistic grocery product photo, natural papery peel texture, realistic root/stem detail, centered composition, isolated object, transparent background, studio soft light, clean alpha edge.

### banana.png
A single ripe yellow banana, photorealistic grocery product photo, natural peel spots, realistic curvature, centered composition, isolated object, transparent background, soft studio lighting, crisp cutout edges.

### apple.png
A single fresh red apple, photorealistic grocery product photo, realistic skin sheen and tiny surface texture, centered composition, isolated object, transparent background, studio lighting, high-detail cutout.

### chicken-breast.png
A raw skinless chicken breast portion, photorealistic grocery product photo, natural meat texture and color, clean food-safe appearance, centered composition, isolated object, transparent background, soft studio lighting.

### ground-beef.png
A portion of fresh ground beef (raw), photorealistic grocery product photo, visible realistic meat strands and texture, centered composition, isolated object, transparent background, studio lighting, clean cutout.

### milk.png
A sealed whole milk carton or bottle (generic, no brand), photorealistic grocery product photo, realistic packaging material, centered composition, isolated object, transparent background, soft studio lighting.

### eggs.png
A group of chicken eggs (6 eggs) as one product unit, photorealistic grocery product photo, natural shell texture, centered composition, isolated object, transparent background, studio lighting, no tray if possible.

### rice.png
A clean white rice package (generic, no brand), photorealistic grocery product photo, realistic package folds and texture, centered composition, isolated object, transparent background, studio soft light.

### beans.png
A package of carioca beans (generic, no brand), photorealistic grocery product photo, visible bean grain texture through packaging if possible, centered composition, isolated object, transparent background.

### sparkling-water.png
A sparkling water bottle (generic, no brand), photorealistic grocery product photo, realistic condensation highlights optional, centered composition, isolated object, transparent background, studio light.

### orange-juice.png
An orange juice bottle (generic, no brand), photorealistic grocery product photo, natural juice color visible, centered composition, isolated object, transparent background, studio light, no label text.

## Quality checklist before saving

- Background truly transparent (check alpha channel)
- No text/logo/watermark
- Product fully visible and centered
- No jagged edges around object
- Natural color and realistic texture
- Consistent scale style across all products

## Current app references

The app currently references `.svg` paths in `supabase/seed.sql`.
If you switch to `.png`, update the image paths in seed/migrations accordingly.