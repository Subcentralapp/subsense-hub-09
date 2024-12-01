export type Application = {
  id?: number;
  name?: string | null;
  price?: number | null;
  category?: string | null;
  description?: string | null;
  features?: any | null;
  pros?: string[] | null;
  cons?: string[] | null;
  website_url?: string | null;
  logo_url?: string | null;
  rating?: number | null;
  review?: string | null;
  users_count?: string | null;
  key_features?: string[] | null;
};