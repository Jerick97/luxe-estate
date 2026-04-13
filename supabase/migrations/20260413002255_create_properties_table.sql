-- Create properties table
CREATE TABLE public.properties (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  location TEXT NOT NULL,
  price NUMERIC NOT NULL,
  period TEXT,
  beds INTEGER NOT NULL,
  baths NUMERIC NOT NULL,
  area NUMERIC NOT NULL,
  image_url TEXT NOT NULL,
  image_alt TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('FOR SALE', 'FOR RENT')),
  type TEXT NOT NULL CHECK (type IN ('House', 'Apartment', 'Villa', 'Penthouse', 'Studio')),
  featured_badge TEXT CHECK (featured_badge IN ('Exclusive', 'New Arrival')),
  is_featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

-- Public read access policy
CREATE POLICY "Allow public read access"
  ON public.properties
  FOR SELECT
  TO anon
  USING (true);
