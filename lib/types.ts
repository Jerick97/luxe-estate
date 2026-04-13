export type PropertyType = 'House' | 'Apartment' | 'Villa' | 'Penthouse' | 'Studio';
export type PropertyStatus = 'FOR SALE' | 'FOR RENT';
export type FeaturedBadge = 'Exclusive' | 'New Arrival';

export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  period?: '/mo' | null;
  beds: number;
  baths: number;
  area: number;
  imageUrl: string;
  imageAlt: string;
  status: PropertyStatus;
  type: PropertyType;
  featuredBadge?: FeaturedBadge | null;
  isFeatured?: boolean;
}

/** Raw row shape from the Supabase `properties` table (snake_case). */
export interface DbProperty {
  id: string;
  title: string;
  location: string;
  price: number;
  period: string | null;
  beds: number;
  baths: number;
  area: number;
  image_url: string;
  image_alt: string;
  status: PropertyStatus;
  type: PropertyType;
  featured_badge: FeaturedBadge | null;
  is_featured: boolean;
  created_at: string;
}

/** Convert a DB row to the frontend Property shape. */
export function toProperty(row: DbProperty): Property {
  return {
    id: row.id,
    title: row.title,
    location: row.location,
    price: row.price,
    period: row.period as Property['period'],
    beds: row.beds,
    baths: row.baths,
    area: row.area,
    imageUrl: row.image_url,
    imageAlt: row.image_alt,
    status: row.status,
    type: row.type,
    featuredBadge: row.featured_badge,
    isFeatured: row.is_featured,
  };
}
