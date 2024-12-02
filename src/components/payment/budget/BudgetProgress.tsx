import { Progress } from "@/components/ui/progress";
import { AlertCircle, TrendingDown, TrendingUp } from "lucide-react";

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
    <div className="space-y-4">
      {/* Cards showing budget details */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-lg bg-neutral-light">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Dépensé</span>
            <TrendingDown className="w-4 h-4 text-primary" />
          </div>
          <p className="mt-2 text-2xl font-semibold text-gray-900">
            {totalExpenses.toFixed(2)} €
          </p>
        </div>
        
        <div className="p-4 rounded-lg bg-neutral-light">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Restant</span>
            <TrendingUp className="w-4 h-4 text-primary" />
          </div>
          <p className="mt-2 text-2xl font-semibold text-gray-900">
            {remaining.toFixed(2)} €
          </p>
        </div>
      </div>

      {/* Budget progress bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Progression du budget</span>
          <span>{spentPercentage.toFixed(1)}%</span>
        </div>
        <Progress 
          value={Math.min(spentPercentage, 100)} 
          className={`h-3 ${getProgressColor(spentPercentage)}`}
        />
      </div>

      {/* Warning message if budget is nearly exceeded */}
      {spentPercentage >= 90 && (
        <div className="flex items-center gap-2 text-red-500 bg-red-50 p-3 rounded-lg">
          <AlertCircle className="h-5 w-5" />
          <span className="text-sm font-medium">
            Attention : Vous approchez de la limite de votre budget
          </span>
        </div>
      )}
    </div>
  );
};