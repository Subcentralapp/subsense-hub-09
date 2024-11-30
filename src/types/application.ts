export type Application = {
  name: string;
  price: number;
  category: string;
  description: string | null;
  features?: string[];
  pricing_plans?: Array<{
    name: string;
    price: number;
    features: string[];
  }>;
  pros?: string[];
  cons?: string[];
  website_url?: string;
  logo_url?: string | null;
  rating?: number;
  users_count?: string;
  key_features?: string[];
};