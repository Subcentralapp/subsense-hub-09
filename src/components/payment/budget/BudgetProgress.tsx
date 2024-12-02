import { Progress } from "@/components/ui/progress";
import { AlertCircle } from "lucide-react";

interface BudgetProgressProps {
  currentBudget: number;
  totalExpenses: number;
  spentPercentage: number;
}

export const BudgetProgress = ({ currentBudget, totalExpenses, spentPercentage }: BudgetProgressProps) => {
  const remaining = Math.max(currentBudget - totalExpenses, 0);
  
  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return "bg-red-500";
    if (percentage >= 75) return "bg-orange-500";
    return "bg-primary";
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>Dépensé: {totalExpenses.toFixed(2)} €</span>
        <span>Budget: {currentBudget.toFixed(2)} €</span>
      </div>
      <Progress 
        value={Math.min(spentPercentage, 100)} 
        className={`h-3 ${getProgressColor(spentPercentage)}`}
      />
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">
          Restant: <span className="font-medium">{remaining.toFixed(2)} €</span>
        </p>
        {spentPercentage >= 90 && (
          <div className="flex items-center gap-2 text-red-500 bg-red-50 px-3 py-1 rounded-full">
            <AlertCircle className="h-4 w-4" />
            <span className="text-sm font-medium">Budget dépassé</span>
          </div>
        )}
      </div>
    </div>
  );
};