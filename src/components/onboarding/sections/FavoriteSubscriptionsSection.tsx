import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface Props {
  value: string[];
  onChange: (value: string[]) => void;
}

export const FavoriteSubscriptionsSection = ({ value, onChange }: Props) => {
  const [otherSubscription, setOtherSubscription] = useState("");
  
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

  const handleOtherSubscriptionAdd = () => {
    if (otherSubscription && value.length < 5) {
      onChange([...value, otherSubscription]);
      setOtherSubscription("");
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Vos abonnements préférés</h3>
      <p className="text-sm text-muted-foreground">
        Choisissez jusqu'à 5 applications ou services d'abonnement préférés
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {commonSubscriptions.map((subscription) => (
          <div key={subscription.id} className="flex items-center space-x-2">
            <Checkbox
              id={subscription.id}
              checked={value.includes(subscription.id)}
              onCheckedChange={() => handleSubscriptionToggle(subscription.id)}
              disabled={value.length >= 5 && !value.includes(subscription.id)}
            />
            <Label htmlFor={subscription.id}>{subscription.label}</Label>
          </div>
        ))}
      </div>

      <div className="flex gap-2 items-center">
        <Input
          placeholder="Autre abonnement..."
          value={otherSubscription}
          onChange={(e) => setOtherSubscription(e.target.value)}
          disabled={value.length >= 5}
        />
        <button
          onClick={handleOtherSubscriptionAdd}
          disabled={!otherSubscription || value.length >= 5}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md disabled:opacity-50"
        >
          Ajouter
        </button>
      </div>
    </div>
  );
};