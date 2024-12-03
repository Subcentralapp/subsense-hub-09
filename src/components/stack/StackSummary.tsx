import { Application } from "@/types/application";

interface StackSummaryProps {
  tools: Application[];
}

export const StackSummary = ({ tools }: StackSummaryProps) => {
  const totalBudget = tools.reduce((sum, tool) => sum + tool.price, 0);

  return tools.length > 0 ? (
    <div>
      <h3 className="text-lg font-medium text-gray-700 mb-4">Budget Total</h3>
      <div className="flex justify-between items-center">
        <span className="text-gray-600">Coût mensuel</span>
        <span className="text-2xl font-bold text-primary">
          {totalBudget.toFixed(2)}€/mois
        </span>
      </div>
    </div>
  ) : null;
};