import { Subscription } from "@/types/subscription";
import { Application } from "@/types/application";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { SavingsBadge } from "../badges/SavingsBadge";
import { AlternativeSuggestion } from "../suggestions/AlternativeSuggestion";
import { useState, useEffect } from "react";
import { TrialBadge } from "./components/TrialBadge";
import { SubscriptionHeader } from "./components/SubscriptionHeader";
import { SubscriptionActions } from "./components/SubscriptionActions";
import { SubscriptionProgress } from "./SubscriptionProgress";
import { supabase } from "@/integrations/supabase/client";

interface SubscriptionCardProps {
  subscription: Subscription;
  onEdit: (subscription: Subscription) => void;
  onDelete: (id: number) => void;
  alternative?: {
    currentApp: Application;
    alternativeApp: Application;
    savingsAmount: number;
  } | null;
}

export const SubscriptionCard = ({ 
  subscription, 
  onEdit, 
  onDelete,
  alternative: initialAlternative 
}: SubscriptionCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [alternative, setAlternative] = useState(initialAlternative);

  useEffect(() => {
    const findAlternatives = async () => {
      try {
        console.log("Searching for alternatives for:", subscription.name);
        const { data: similarApps } = await supabase
          .from('applications')
          .select('*')
          .eq('CATÉGORIE', subscription.category)
          .lt('PRICE', subscription.price)
          .order('PRICE', { ascending: true })
          .limit(1);

        if (similarApps && similarApps.length > 0) {
          const alternativeApp: Application = {
            id: similarApps[0].id,
            name: similarApps[0].NOM || '',
            price: parseFloat(similarApps[0].PRICE || '0'),
            category: similarApps[0].CATÉGORIE || '',
            description: similarApps[0].DESCRIPTION || '',
            website_url: similarApps[0]["URL DU SITE WEB"] || null,
            logo_url: similarApps[0]["URL DU LOGO"] || null,
            features: Array.isArray(similarApps[0].CARACTÉRISTIQUES) 
              ? similarApps[0].CARACTÉRISTIQUES.map(String)
              : [],
            pros: similarApps[0].AVANTAGES || null,
            cons: similarApps[0].INCONVÉNIENTS || null,
            rating: similarApps[0].NOTE || null,
            review: similarApps[0].REVUE || null,
            users_count: similarApps[0]["NOMBRE D'UTILISATEURS"] || null
          };

          const currentApp: Application = {
            id: 0,
            name: subscription.name,
            price: subscription.price,
            category: subscription.category || '',
            description: subscription.description || '',
            website_url: null,
            logo_url: null,
            features: [],
            pros: null,
            cons: null,
            rating: null,
            review: null,
            users_count: null
          };

          const savingsAmount = subscription.price - alternativeApp.price;

          if (savingsAmount > 0) {
            console.log("Found alternative with savings:", savingsAmount);
            setAlternative({
              currentApp,
              alternativeApp,
              savingsAmount
            });
          }
        }
      } catch (error) {
        console.error("Erreur lors de la recherche d'alternatives:", error);
      }
    };

    if (!initialAlternative && subscription.category) {
      findAlternatives();
    }
  }, [subscription, initialAlternative]);

  return (
    <div className="group relative p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <SubscriptionHeader 
            name={subscription.name}
            category={subscription.category}
            isTrial={subscription.is_trial}
            trialEndDate={subscription.trial_end_date}
          />
          <TrialBadge 
            isTrial={subscription.is_trial}
            trialEndDate={subscription.trial_end_date}
          />
        </div>

        <div>
          <p className="text-xl font-bold text-primary">
            {subscription.price} €
            <span className="text-sm font-normal text-gray-500">/mois</span>
          </p>
          <div className="space-y-2">
            <SubscriptionProgress 
              subscriptionId={subscription.id}
              nextBilling={subscription.next_billing} 
              isTrial={subscription.is_trial}
              trialEndDate={subscription.trial_end_date}
            />
          </div>
        </div>

        {alternative && (
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger asChild>
              <button className="w-full">
                <SavingsBadge 
                  amount={alternative.savingsAmount} 
                  isOpen={isOpen}
                />
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-3">
              <AlternativeSuggestion
                currentApp={alternative.currentApp}
                alternativeApp={alternative.alternativeApp}
                savingsAmount={alternative.savingsAmount}
              />
            </CollapsibleContent>
          </Collapsible>
        )}

        <SubscriptionActions
          onEdit={() => onEdit(subscription)}
          onDelete={() => onDelete(subscription.id)}
        />
      </div>
    </div>
  );
};