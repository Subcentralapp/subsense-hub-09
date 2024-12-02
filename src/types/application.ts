export type Application = {
  id: number;
  name: string | null;
  price: number;
  category: string | null;
  description: string | null;
  features: string[];
  pros: string | null;
  cons: string | null;
  website_url: string | null;
  logo_url: string | null;
  rating: number | null;
  review: string | null;
  users_count: number | null;
};

export type DatabaseApplication = {
  id: number;
  NOM: string | null;
  PRICE: string | null;
  CATÉGORIE: string | null;
  DESCRIPTION: string | null;
  CARACTÉRISTIQUES: any[] | null;
  AVANTAGES: string | null;
  INCONVÉNIENTS: string | null;
  "URL DU SITE WEB": string | null;
  "URL DU LOGO": string | null;
  NOTE: number | null;
  REVUE: string | null;
  "NOMBRE D'UTILISATEURS": number | null;
};

export const mapDatabaseApplication = (app: DatabaseApplication): Application => ({
  id: app.id,
  name: app.NOM,
  price: parseFloat(app.PRICE || "0"),
  category: app.CATÉGORIE,
  description: app.DESCRIPTION,
  features: Array.isArray(app.CARACTÉRISTIQUES) ? app.CARACTÉRISTIQUES : [],
  pros: app.AVANTAGES,
  cons: app.INCONVÉNIENTS,
  website_url: app["URL DU SITE WEB"],
  logo_url: app["URL DU LOGO"],
  rating: app.NOTE,
  review: app.REVUE,
  users_count: app["NOMBRE D'UTILISATEURS"]
});