import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Application } from "@/types/application";

export const useSubscriptionSearch = () => {
  const [otherSubscription, setOtherSubscription] = useState("");
  const [searchResults, setSearchResults] = useState<Partial<Application>[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const searchApplications = async (searchTerm: string) => {
    if (!searchTerm) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .ilike('NOM', `%${searchTerm}%`)
        .limit(5);

      if (error) throw error;
      
      setSearchResults(data.map(app => ({
        id: app.id,
        name: app.NOM || '',
        category: app.CATÉGORIE || '',
        description: app.DESCRIPTION || '',
        logo_url: app["URL DU LOGO"],
      })));
    } catch (error) {
      console.error('Error searching applications:', error);
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (otherSubscription) {
        searchApplications(otherSubscription);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [otherSubscription]);

  return {
    otherSubscription,
    setOtherSubscription,
    searchResults,
    setSearchResults,
    isSearching
  };
};