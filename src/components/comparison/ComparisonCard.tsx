import { Application } from "@/types/application";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface ComparisonCardProps {
  app: Application;
  isHighlighted?: boolean;
  onSelect: () => void;
}

export const ComparisonCard = ({ app, isHighlighted, onSelect }: ComparisonCardProps) => {
  const basePrice = app.price || 0;
  const monthlyPrice = (basePrice / 12).toFixed(2);

  return (
    <div className={`relative p-6 rounded-xl border transition-all ${
      isHighlighted 
        ? 'border-primary bg-primary/5 shadow-lg scale-105' 
        : 'border-gray-200 hover:border-primary/50'
    }`}>
      <div className="space-y-4">
        <div className="text-center space-y-2">
          <h3 className="text-xl font-semibold">{app.name}</h3>
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-3xl font-bold">${monthlyPrice}</span>
            <span className="text-sm text-gray-500">/month</span>
          </div>
          <p className="text-sm text-gray-600">{app.description}</p>
        </div>

        <Button 
          onClick={onSelect}
          className="w-full"
          variant={isHighlighted ? "default" : "outline"}
        >
          Get started with {app.name}
        </Button>

        <div className="space-y-3 pt-4">
          <p className="text-sm font-medium text-center text-gray-700">WHAT YOU GET</p>
          <ul className="space-y-3">
            {app.features?.slice(0, 6).map((feature, index) => (
              <li key={index} className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm text-gray-600">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};