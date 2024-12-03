import { Application } from "@/types/application";

interface StackSummaryProps {
  tools: Application[];
}

export const StackSummary = ({ tools }: StackSummaryProps) => {
  const totalBudget = tools.reduce((sum, tool) => sum + tool.price, 0);

  return tools.length > 0 ? (
    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <span className="text-gray-600">Budget Total</span>
        <span className="text-xl font-bold text-primary">
          {totalBudget.toFixed(2)}€/mois
        </span>
      </div>
    </div>
  ) : null;
};