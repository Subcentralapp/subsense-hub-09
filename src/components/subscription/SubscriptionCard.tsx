import { Subscription } from "@/types/subscription";
import { Application } from "@/types/application";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { SavingsBadge } from "../badges/SavingsBadge";
import { AlternativeSuggestion } from "../suggestions/AlternativeSuggestion";
import { useState } from "react";
import { TrialBadge } from "./components/TrialBadge";
import { SubscriptionHeader } from "./components/SubscriptionHeader";
import { SubscriptionActions } from "./components/SubscriptionActions";
import { SubscriptionProgress } from "./SubscriptionProgress";

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
  alternative 
}: SubscriptionCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="group relative p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] hover:bg-gradient-to-r hover:from-primary/5 hover:to-transparent">
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
            <CollapsibleContent className="mt-3 animate-fade-in">
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