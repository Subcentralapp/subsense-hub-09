import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";

interface Props {
  value: { age_range?: string; region?: string } | undefined;
  onChange: (value: { age_range: string; region: string }) => void;
}

export const DemographicsSection = ({ value = { age_range: '', region: '' }, onChange }: Props) => {
  const ageRanges = [
    { value: "under-18", label: "Moins de 18 ans" },
    { value: "18-24", label: "18 à 24 ans" },
    { value: "25-34", label: "25 à 34 ans" },
    { value: "35-44", label: "35 à 44 ans" },
    { value: "45-plus", label: "Plus de 45 ans" },
  ];

  const regions = [
    { value: "europe", label: "Europe" },
    { value: "north-america", label: "Amérique du Nord" },
    { value: "south-america", label: "Amérique du Sud" },
    { value: "asia", label: "Asie" },
    { value: "africa", label: "Afrique" },
    { value: "oceania", label: "Océanie" },
  ];

  return (
    <div className="space-y-8 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <h3 className="text-xl font-semibold text-gray-900">Quel âge avez-vous ?</h3>
        <RadioGroup
          value={value.age_range || ''}
          onValueChange={(newValue) => onChange({ ...value, age_range: newValue })}
          className="space-y-3"
        >
          {ageRanges.map((range, index) => (
            <motion.div
              key={range.value}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <RadioGroupItem 
                value={range.value} 
                id={`age-${range.value}`}
                className="data-[state=checked]:border-primary data-[state=checked]:bg-primary"
              />
              <Label 
                htmlFor={`age-${range.value}`}
                className="text-sm font-medium text-gray-700 cursor-pointer"
              >
                {range.label}
              </Label>
            </motion.div>
          ))}
        </RadioGroup>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="space-y-4"
      >
        <h3 className="text-xl font-semibold text-gray-900">Dans quelle région vivez-vous ?</h3>
        <Select
          value={value.region || ''}
          onValueChange={(newValue) => onChange({ ...value, region: newValue })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Sélectionnez votre région" />
          </SelectTrigger>
          <SelectContent>
            {regions.map((region) => (
              <SelectItem key={region.value} value={region.value}>
                {region.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </motion.div>
    </div>
  );
};