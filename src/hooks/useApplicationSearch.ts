import { useState, useCallback } from 'react';
import { Application } from '@/types/application';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export const useApplicationSearch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchApplications = useCallback(async () => {
    console.log("Fetching applications from Supabase...");
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("applications")
        .select("*")
        .order("NOM");

      if (error) throw error;

      return data.map(app => ({
        id: app.id,
        name: app.NOM,
        price: app.PRICE ? parseFloat(app.PRICE) : 0,
        category: app.CATÉGORIE,
        description: app.DESCRIPTION,
        features: app.CARACTÉRISTIQUES as string[],
        pros: app.AVANTAGES,
        cons: app.INCONVÉNIENTS,
        website_url: app["URL DU SITE WEB"],
        logo_url: app["URL DU LOGO"],
        rating: app.NOTE,
        review: app.REVUE,
        users_count: app["NOMBRE D'UTILISATEURS"]
      }));
    } catch (error) {
      console.error("Error fetching applications:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les applications",
        variant: "destructive",
      });
      return [];
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  return { fetchApplications, isLoading };
};