export interface Recommendation {
  title: string;
  description: string;
  saving: number;
  details?: string;
  websiteUrl?: string;
  type?: string;
  currentApp: any;
  alternativeApp: any;
}

export interface CategoryRecommendation {
  category: string;
  name: string;
  description: string;
  rating: number;
  progress: number;
  color: string;
  apps?: any[];
}