import { Progress } from "@/components/ui/progress";

interface SubscriptionProgressProps {
  nextBilling: string;
}

export const SubscriptionProgress = ({ nextBilling }: SubscriptionProgressProps) => {
  const calculateDaysProgress = (nextBilling: string): number => {
    const now = new Date();
    const nextDate = new Date(nextBilling);
    const lastMonth = new Date(nextDate);
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    const totalDays = (nextDate.getTime() - lastMonth.getTime()) / (1000 * 60 * 60 * 24);
    const daysLeft = (nextDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
    
    const progress = ((totalDays - daysLeft) / totalDays) * 100;
    return Math.min(Math.max(progress, 0), 100);
  };

  const getProgressColor = (progress: number): string => {
    if (progress >= 90) {
      return "linear-gradient(90deg, #EF4444 0%, #DC2626 100%)"; // Rouge vif pour moins de 10%
    }
    if (progress >= 75) {
      return "linear-gradient(90deg, #F97316 0%, #EA580C 100%)"; // Orange pour moins de 25%
    }
    return "linear-gradient(90deg, #9b87f5 0%, #7E69AB 100%)"; // Dégradé de violet (couleurs primaire/secondaire)
  };

  const progress = calculateDaysProgress(nextBilling);
  const daysLeft = Math.ceil((new Date(nextBilling).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="space-y-2">
      <Progress 
        value={progress} 
        className="h-3 bg-gray-100 shadow-inner"
        style={{
          ["--progress-color" as any]: getProgressColor(progress),
        }}
      />
      <div className="flex justify-between items-center text-xs">
        <span className={`font-medium ${daysLeft <= 7 ? 'text-red-500' : 'text-gray-500'}`}>
          {daysLeft} jours restants
        </span>
        <span className="text-gray-400">
          Prochain paiement: {new Date(nextBilling).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};