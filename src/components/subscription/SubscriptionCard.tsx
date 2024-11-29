import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { SubscriptionProgress } from "./SubscriptionProgress";
import { Application } from "@/types/application";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { SavingsBadge } from "../badges/SavingsBadge";
import { AlternativeSuggestion } from "../suggestions/AlternativeSuggestion";
import { useState } from "react";

interface Subscription {
  id: number;
  name: string;
  price: number;
  category: string;
  next_billing: string;
  description?: string;
}

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

export const SubscriptionCard = ({ subscription, onEdit, onDelete, alternative }: SubscriptionCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="group relative p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] hover:bg-gradient-to-r hover:from-primary/5 hover:to-transparent">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{subscription.name}</h3>
          <p className="text-sm text-gray-500">{subscription.category}</p>
        </div>
        <div>
          <p className="text-xl font-bold text-primary">
            {subscription.price} €<span className="text-sm font-normal text-gray-500">/mois</span>
          </p>
          <div className="space-y-2">
            <SubscriptionProgress nextBilling={subscription.next_billing} />
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

        <div className="flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => onEdit(subscription)}
            className="hover:bg-primary/10 hover:text-primary"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => onDelete(subscription.id)}
            className="hover:bg-red-50 hover:text-red-500"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};