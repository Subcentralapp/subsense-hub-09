import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";

interface Props {
  value: Record<string, string>;
  onChange: (value: Record<string, string>) => void;
}

export const UsageSection = ({ value, onChange }: Props) => {
  const services = [
    "Netflix",
    "Spotify",
    "Disney+",
    "Amazon Prime",
    "Apple Music",
  ];

  const frequencies = [
    { value: "daily", label: "Tous les jours" },
    { value: "weekly", label: "Plusieurs fois par semaine" },
    { value: "monthly", label: "Une fois par semaine" },
    { value: "rarely", label: "Rarement" },
    { value: "never", label: "Jamais" },
  ];

  const handleFrequencyChange = (service: string, frequency: string) => {
    onChange({ ...value, [service]: frequency });
  };

  return (
    <div className="space-y-8 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
      <h3 className="text-xl font-semibold text-gray-900">
        À quelle fréquence utilisez-vous vos abonnements ?
      </h3>

      <div className="space-y-6">
        {services.map((service, serviceIndex) => (
          <motion.div
            key={service}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: serviceIndex * 0.1 }}
            className="space-y-3"
          >
            <h4 className="font-medium text-gray-700">{service}</h4>
            <RadioGroup
              value={value[service] || ""}
              onValueChange={(frequency) => handleFrequencyChange(service, frequency)}
              className="space-y-2"
            >
              {frequencies.map((frequency, freqIndex) => (
                <motion.div
                  key={`${service}-${frequency.value}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (serviceIndex * 0.1) + (freqIndex * 0.05) }}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <RadioGroupItem 
                    value={frequency.value} 
                    id={`${service}-${frequency.value}`}
                    className="data-[state=checked]:border-primary data-[state=checked]:bg-primary"
                  />
                  <Label 
                    htmlFor={`${service}-${frequency.value}`}
                    className="text-sm font-medium text-gray-700 cursor-pointer"
                  >
                    {frequency.label}
                  </Label>
                </motion.div>
              ))}
            </RadioGroup>
          </motion.div>
        ))}
      </div>
    </div>
  );
};