export interface PromoCodeWithApp {
  code: string;
  discount_amount: number;
  discount_type: string | null;
  description: string | null;
  applications: {
    id: number;
    NOM: string | null;
    PRICE: string | null;
    DESCRIPTION: string | null;
    CATÉGORIE: string | null;
    "URL DU LOGO": string | null;
    "URL DU SITE WEB": string | null;
  } | null;
}

export interface GroupedApp {
  app: {
    id: number;
    name: string;
    price: number;
    description: string;
    category: string;
    logo_url: string | null;
    website_url: string | null;
  };
  promoCode: {
    code: string;
    discount_amount: number;
    discount_type: string | null;
    description: string | null;
  };
}