import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { motion } from "framer-motion";
import { useState } from "react";

interface Props {
  value: {
    interested_services: string[];
    revenue_percentage: string;
  } | undefined;
  onChange: (value: {
    interested_services: string[];
    revenue_percentage: string;
  }) => void;
}

export const NewServicesSection = ({ 
  value = {
    interested_services: [],
    revenue_percentage: ""
  }, 
  onChange 
}: Props) => {
  const [otherService, setOtherService] = useState("");

  const services = [
    { id: "streaming", label: "Streaming musical ou vidéo" },
    { id: "fitness", label: "Fitness ou bien-être" },
    { id: "education", label: "Éducation ou développement personnel" },
    { id: "professional", label: "Outils professionnels (SaaS, gestion de projet)" },
  ];

  const percentages = [
    { value: "less-5", label: "Moins de 5%" },
    { value: "5-10", label: "5% à 10%" },
    { value: "10-20", label: "10% à 20%" },
    { value: "more-20", label: "Plus de 20%" },
  ];

  const handleServiceToggle = (serviceId: string) => {
    const newServices = value.interested_services.includes(serviceId)
      ? value.interested_services.filter(s => s !== serviceId)
      : [...value.interested_services, serviceId];
    
    onChange({ ...value, interested_services: newServices });
  };

  const handleAddOtherService = () => {
    if (otherService && !value.interested_services.includes(otherService)) {
      onChange({
        ...value,
        interested_services: [...value.interested_services, otherService],
      });
      setOtherService("");
    }
  };

  return (
    <div className="space-y-8 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <h3 className="text-xl font-semibold text-gray-900">
          Quel type de service aimeriez-vous essayer si le prix était abordable ?
        </h3>

        <div className="grid gap-4">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Checkbox
                id={service.id}
                checked={value.interested_services.includes(service.id)}
                onCheckedChange={() => handleServiceToggle(service.id)}
                className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
              />
              <Label 
                htmlFor={service.id}
                className="text-sm font-medium text-gray-700 cursor-pointer"
              >
                {service.label}
              </Label>
            </motion.div>
          ))}
        </div>

        <div className="flex space-x-2 mt-4">
          <Input
            placeholder="Autre service..."
            value={otherService}
            onChange={(e) => setOtherService(e.target.value)}
            className="flex-1"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleAddOtherService();
              }
            }}
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="space-y-4"
      >
        <h3 className="text-xl font-semibold text-gray-900">
          Quel pourcentage de vos revenus mensuels consacrez-vous aux abonnements ?
        </h3>

        <RadioGroup
          value={value.revenue_percentage}
          onValueChange={(newValue) =>
            onChange({ ...value, revenue_percentage: newValue })
          }
          className="space-y-3"
        >
          {percentages.map((percentage, index) => (
            <motion.div
              key={percentage.value}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <RadioGroupItem 
                value={percentage.value} 
                id={`percentage-${percentage.value}`}
                className="data-[state=checked]:border-primary data-[state=checked]:bg-primary"
              />
              <Label 
                htmlFor={`percentage-${percentage.value}`}
                className="text-sm font-medium text-gray-700 cursor-pointer"
              >
                {percentage.label}
              </Label>
            </motion.div>
          ))}
        </RadioGroup>
      </motion.div>
    </div>
  );
};