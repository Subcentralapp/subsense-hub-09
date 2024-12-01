export interface Subscription {
  id: number;
  name: string;
  price: number;
  category: string | null;
  description?: string;
  next_billing: string | null;
  created_at?: string;
  user_id?: string;
  is_trial?: boolean;
  trial_end_date?: string | null;
}