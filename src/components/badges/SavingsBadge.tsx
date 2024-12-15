import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface SavingsBadgeProps {
  amount: number;
  isOpen: boolean;
}

export const SavingsBadge = ({ amount, isOpen }: SavingsBadgeProps) => {
  return (
    <div className="flex items-center justify-between w-full px-3 py-2 text-sm bg-orange-50 hover:bg-orange-100/80 text-orange-700 rounded-lg transition-colors">
      <span>Économisez {amount.toFixed(2)}€/mois</span>
      {isOpen ? (
        <ChevronUp className="h-4 w-4" />
      ) : (
        <ChevronDown className="h-4 w-4" />
      )}
    </div>
  );
};