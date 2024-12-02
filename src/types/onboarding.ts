export interface OnboardingFormData {
  favorite_subscriptions: string[];
  current_monthly_spend: string;
  target_monthly_budget: string;
  subscription_priorities: string[];
  management_habits: string;
  wants_recommendations: boolean;
  subscription_barriers: string[];
  age_range: string;
  region: string;
  has_used_management_app: boolean;
  desired_features: string[];
  interested_services: string[];
  revenue_percentage: string;
  usage_frequency: Record<string, string>;
}

export type OnboardingStep = {
  title: string;
  description: string;
  component: React.ComponentType<any>;
  key: keyof OnboardingFormData;
};