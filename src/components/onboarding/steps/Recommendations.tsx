import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface Props {
  value: boolean;
  onChange: (value: boolean) => void;
}

export const Recommendations = ({ value, onChange }: Props) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h3 className="font-medium">
          Souhaitez-vous recevoir des recommandations pour optimiser vos abonnements et vos dépenses ?
        </h3>
      </div>

      <RadioGroup
        value={value ? "yes" : "no"}
        onValueChange={(val) => onChange(val === "yes")}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="yes" id="yes" />
          <Label htmlFor="yes">Oui, je veux des recommandations adaptées à mon profil</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="no" id="no" />
          <Label htmlFor="no">Non, je préfère gérer mes abonnements seul(e)</Label>
        </div>
      </RadioGroup>
    </div>
  );
};