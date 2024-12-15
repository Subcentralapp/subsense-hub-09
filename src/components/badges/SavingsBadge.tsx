import { BadgeDollarSign, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SavingsBadgeProps {
  amount: number;
  isOpen?: boolean;
}

export const SavingsBadge = ({ amount, isOpen }: SavingsBadgeProps) => {
  return (
    <Badge 
      className={cn(
        "w-full justify-between bg-green-500/10 text-green-500 hover:bg-green-500/20 transition-colors",
        "flex items-center gap-1 cursor-pointer py-2 group-hover:bg-green-500/15"
      )}
    >
      <div className="flex items-center gap-1">
        <BadgeDollarSign className="h-3 w-3" />
        <span>Économie potentielle : {amount.toFixed(2)}€/mois</span>
      </div>
      <ChevronDown className={cn(
        "h-3 w-3 transition-transform duration-200",
        isOpen && "transform rotate-180"
      )} />
    </Badge>
  );
};