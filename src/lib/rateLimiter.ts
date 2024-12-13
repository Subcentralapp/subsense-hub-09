import { supabase } from "@/integrations/supabase/client";

export const checkRateLimit = async (endpoint: string) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    const response = await supabase.functions.invoke('rate-limiter', {
      body: {
        endpoint,
        userId: user?.id,
        ip: window.location.hostname // Fallback pour les utilisateurs non connectés
      }
    });

    if (response.error) {
      console.error('Rate limit check failed:', response.error);
      throw new Error(response.error.message);
    }

    return response.data;
  } catch (error) {
    console.error('Rate limit error:', error);
    throw error;
  }
};