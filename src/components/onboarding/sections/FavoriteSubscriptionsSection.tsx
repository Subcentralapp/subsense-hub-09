import { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { Application } from "@/types/application";
import { Command } from "cmdk";
import { Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  value: string[];
  onChange: (value: string[]) => void;
}

export const FavoriteSubscriptionsSection = ({ value, onChange }: Props) => {
  const [otherSubscription, setOtherSubscription] = useState("");
  const [searchResults, setSearchResults] = useState<Application[]>([]);
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
        price: app.PRICE || 0,
        category: app.CATÉGORIE || '',
        description: app.DESCRIPTION || '',
        logo_url: app["URL DU LOGO"],
        features: [],
        pros: null,
        cons: null,
        rating: null,
        review: null,
        users_count: null,
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
    <div className="space-y-6 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Vos abonnements préférés</h3>
        <p className="text-sm text-gray-500">
          Choisissez jusqu'à 5 applications ou services d'abonnement préférés
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {commonSubscriptions.map((subscription) => (
          <motion.div 
            key={subscription.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
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

      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Rechercher d'autres abonnements..."
            value={otherSubscription}
            onChange={(e) => setOtherSubscription(e.target.value)}
            disabled={value.length >= 5}
            className="pl-9"
          />
        </div>

        <AnimatePresence>
          {otherSubscription && searchResults.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute z-10 w-full max-w-md bg-white rounded-lg shadow-lg border border-gray-200 mt-1"
            >
              <Command className="rounded-lg overflow-hidden">
                <div className="max-h-[300px] overflow-y-auto p-2">
                  {searchResults.map((app) => (
                    <motion.button
                      key={app.id}
                      onClick={() => {
                        handleSubscriptionToggle(app.name);
                        setOtherSubscription("");
                        setSearchResults([]);
                      }}
                      className="flex items-center gap-3 w-full rounded-md px-3 py-2 text-sm text-left hover:bg-primary/5 cursor-pointer"
                      whileHover={{ scale: 1.01 }}
                      disabled={value.length >= 5 && !value.includes(app.name)}
                    >
                      {app.logo_url ? (
                        <img 
                          src={app.logo_url}
                          alt={`Logo ${app.name}`}
                          className="w-8 h-8 rounded object-contain bg-white"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(app.name)}&background=random`;
                          }}
                        />
                      ) : (
                        <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                          <span className="text-sm font-semibold text-primary">
                            {app.name.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div>
                        <div className="font-medium text-gray-900">{app.name}</div>
                        <div className="text-xs text-gray-500">{app.category || 'Non catégorisé'}</div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </Command>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {value.length > 0 && (
        <div className="mt-4">
          <p className="text-sm text-gray-500 mb-2">Sélectionnés ({value.length}/5) :</p>
          <div className="flex flex-wrap gap-2">
            {value.map((subscription) => (
              <motion.span
                key={subscription}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary/10 text-primary"
              >
                {subscription}
              </motion.span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
