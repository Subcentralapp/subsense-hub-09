export type Application = {
  id: number;
  name: string;
  price: number;
  category: string;
  description?: string;
  features?: string[];
  pros?: string[];
  cons?: string[];
  website_url?: string;
  logo_url?: string;
  rating?: number;
  review?: string;
  users_count?: string;
};