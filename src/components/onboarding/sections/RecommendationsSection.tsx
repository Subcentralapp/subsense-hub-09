import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface Props {
  value: boolean;
  onChange: (value: boolean) => void;
}

export const RecommendationsSection = ({ value, onChange }: Props) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Recevoir des recommandations personnalisées</h3>
      <RadioGroup value={value ? "yes" : "no"} onValueChange={(val) => onChange(val === "yes")}>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="recommendations-yes" />
            <Label htmlFor="recommendations-yes">
              Oui, je veux des recommandations adaptées à mon profil
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="recommendations-no" />
            <Label htmlFor="recommendations-no">
              Non, je préfère gérer mes abonnements seul(e)
            </Label>
          </div>
        </div>
      </RadioGroup>
    </div>
  );
};