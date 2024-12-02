import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { useState } from "react";

interface Props {
  value: {
    has_used_management_app: boolean;
    desired_features: string[];
  } | undefined;
  onChange: (value: {
    has_used_management_app: boolean;
    desired_features: string[];
  }) => void;
}

export const ManagementToolsSection = ({ 
  value = {
    has_used_management_app: false,
    desired_features: []
  }, 
  onChange 
}: Props) => {
  const [otherFeature, setOtherFeature] = useState("");

  const features = [
    { id: "notifications", label: "Notifications de renouvellement" },
    { id: "cancellation", label: "Automatisation des résiliations" },
    { id: "analysis", label: "Analyse des dépenses" },
    { id: "savings", label: "Suggestions d'économies" },
    { id: "integrations", label: "Intégrations avec mes outils financiers" },
  ];

  const handleFeatureToggle = (featureId: string) => {
    const newFeatures = value.desired_features.includes(featureId)
      ? value.desired_features.filter(f => f !== featureId)
      : [...value.desired_features, featureId];
    
    onChange({ ...value, desired_features: newFeatures });
  };

  const handleAddOtherFeature = () => {
    if (otherFeature && !value.desired_features.includes(otherFeature)) {
      onChange({
        ...value,
        desired_features: [...value.desired_features, otherFeature],
      });
      setOtherFeature("");
    }
  };

  return (
    <div className="space-y-8 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between space-x-4"
      >
        <Label htmlFor="used-app" className="text-lg font-medium">
          Avez-vous déjà utilisé une application pour gérer vos abonnements ?
        </Label>
        <Switch
          id="used-app"
          checked={value.has_used_management_app}
          onCheckedChange={(checked) =>
            onChange({ ...value, has_used_management_app: checked })
          }
          className="data-[state=checked]:bg-primary"
        />
      </motion.div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900">
          Quelles fonctionnalités aimeriez-vous voir ?
        </h3>

        <div className="grid gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Checkbox
                id={feature.id}
                checked={value.desired_features.includes(feature.id)}
                onCheckedChange={() => handleFeatureToggle(feature.id)}
                className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <Label 
                htmlFor={feature.id}
                className="text-sm font-medium text-gray-700 cursor-pointer"
              >
                {feature.label}
              </Label>
            </motion.div>
          ))}
        </div>

        <div className="flex space-x-2 mt-4">
          <Input
            placeholder="Autre fonctionnalité..."
            value={otherFeature}
            onChange={(e) => setOtherFeature(e.target.value)}
            className="flex-1"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleAddOtherFeature();
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};