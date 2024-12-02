import { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { Command } from "cmdk";
import { Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SearchResults } from "./SearchResults";
import { SelectedSubscriptions } from "./SelectedSubscriptions";
import { Application } from "@/types/application";

interface Props {
  value: string[];
  onChange: (value: string[]) => void;
}

export const FavoriteSubscriptionsSection = ({ value, onChange }: Props) => {
  const [otherSubscription, setOtherSubscription] = useState("");
  const [searchResults, setSearchResults] = useState<Partial<Application>[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  
  const commonSubscriptions = [
    { id: "netflix", label: "Netflix" },
    { id: "spotify", label: "Spotify" },
    { id: "disney", label: "Disney+" },
    { id: "amazon", label: "Amazon Prime" },
    { id: "canva", label: "Canva" },
    { id: "microsoft", label: "Microsoft 365" },
    { id: "apple", label: "Apple Music" },
  ];

  const handleSubscriptionToggle = (subscription: string) => {
    if (value.length >= 5 && !value.includes(subscription)) {
      return;
    }
    onChange(
      value.includes(subscription)
        ? value.filter(s => s !== subscription)
        : [...value, subscription]
    );
  };

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

  return (
    <div className="space-y-4 bg-white rounded-xl">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          Vos abonnements préférés
        </h3>
        <p className="text-sm text-gray-500">
          Choisissez jusqu'à 5 applications ou services
        </p>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {commonSubscriptions.map((subscription) => (
          <motion.div 
            key={subscription.id}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Checkbox
              id={subscription.id}
              checked={value.includes(subscription.id)}
              onCheckedChange={() => handleSubscriptionToggle(subscription.id)}
              disabled={value.length >= 5 && !value.includes(subscription.id)}
              className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
            />
            <Label 
              htmlFor={subscription.id}
              className="text-sm font-medium text-gray-700 cursor-pointer"
            >
              {subscription.label}
            </Label>
          </motion.div>
        ))}
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Rechercher d'autres abonnements..."
          value={otherSubscription}
          onChange={(e) => setOtherSubscription(e.target.value)}
          disabled={value.length >= 5}
          className="pl-9"
        />
      </div>

      <SearchResults 
        searchResults={searchResults}
        otherSubscription={otherSubscription}
        handleSubscriptionToggle={handleSubscriptionToggle}
        setOtherSubscription={setOtherSubscription}
        setSearchResults={setSearchResults}
        value={value}
      />

      <SelectedSubscriptions value={value} />
    </div>
  );
};