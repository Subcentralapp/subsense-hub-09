import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Props {
  value: string[];
  onChange: (value: string[]) => void;
}

export const FavoriteSubscriptions = ({ value, onChange }: Props) => {
  const [otherSubscription, setOtherSubscription] = useState("");

  const options = [
    "Netflix",
    "Spotify",
    "Disney+",
    "Amazon Prime",
    "Canva",
    "Microsoft 365",
    "Apple Music",
  ];

  const handleToggle = (option: string) => {
    if (value.includes(option)) {
      onChange(value.filter(v => v !== option));
    } else if (value.length < 5) {
      onChange([...value, option]);
    }
  };

  const handleAddOther = () => {
    if (otherSubscription && value.length < 5) {
      onChange([...value, otherSubscription]);
      setOtherSubscription("");
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="font-medium">
          Quelles sont vos applications ou services d'abonnement préférés ?
        </h3>
        <p className="text-sm text-muted-foreground">
          Choisissez jusqu'à 5 options
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map((option) => (
          <div key={option} className="flex items-center space-x-2">
            <Checkbox
              id={option}
              checked={value.includes(option)}
              onCheckedChange={() => handleToggle(option)}
              disabled={value.length >= 5 && !value.includes(option)}
            />
            <Label htmlFor={option}>{option}</Label>
          </div>
        ))}
      </div>

      <div className="flex items-end gap-2 pt-4">
        <div className="flex-1">
          <Label htmlFor="other">Autre</Label>
          <Input
            id="other"
            value={otherSubscription}
            onChange={(e) => setOtherSubscription(e.target.value)}
            placeholder="Entrez le nom de l'application"
            disabled={value.length >= 5}
          />
        </div>
        <Button
          variant="outline"
          onClick={handleAddOther}
          disabled={!otherSubscription || value.length >= 5}
        >
          Ajouter
        </Button>
      </div>
    </div>
  );
};