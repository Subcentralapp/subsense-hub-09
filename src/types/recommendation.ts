export interface Recommendation {
  title: string;
  description: string;
  saving: number;
  details?: string;
  websiteUrl?: string;
  type?: string;
}

export interface CategoryRecommendation {
  category: string;
  name: string;
  description: string;
  rating: number;
  progress: number;
  color: string;
}