import { BadgeDollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SavingsBadgeProps {
  amount: number;
}

export const SavingsBadge = ({ amount }: SavingsBadgeProps) => {
  return (
    <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20 transition-colors flex items-center gap-1">
      <BadgeDollarSign className="h-3 w-3" />
      <span>Économie potentielle: {amount}€/mois</span>
    </Badge>
  );
};