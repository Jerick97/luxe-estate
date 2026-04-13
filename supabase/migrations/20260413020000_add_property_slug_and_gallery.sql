ALTER TABLE public.properties ADD COLUMN slug TEXT;
ALTER TABLE public.properties ADD COLUMN gallery_urls TEXT[] DEFAULT '{}';

UPDATE public.properties 
SET 
  slug = lower(regexp_replace(regexp_replace(title, '[^a-zA-Z0-9\s-]', '', 'g'), '\s+', '-', 'g')),
  gallery_urls = ARRAY[
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=400&q=80'
  ]
WHERE slug IS NULL;

ALTER TABLE public.properties ALTER COLUMN slug SET NOT NULL;
ALTER TABLE public.properties ADD CONSTRAINT properties_slug_key UNIQUE (slug);
