export type Application = {
  id: number;
  name: string | null;
  price: number;
  category: string | null;
  description: string | null;
  features: string[] | null;
  pros: string | null;
  cons: string | null;
  website_url: string | null;
  logo_url: string | null;
  rating: number | null;
  review: string | null;
  users_count: number | null;
};