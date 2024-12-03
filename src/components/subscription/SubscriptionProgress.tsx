import { Progress } from "@/components/ui/progress";
import { useEffect } from "react";
import { useSubscriptions } from "@/hooks/useSubscriptions";
import { addMonths } from "date-fns";

interface SubscriptionProgressProps {
  subscriptionId: number;
  nextBilling: string;
  isTrial?: boolean;
  trialEndDate?: string | null;
}

export const SubscriptionProgress = ({ subscriptionId, nextBilling, isTrial, trialEndDate }: SubscriptionProgressProps) => {
  const { updateNextBillingDate } = useSubscriptions();

  const calculateDaysProgress = (date: string): number => {
    const now = new Date();
    const nextDate = new Date(date);
    const lastMonth = new Date(nextDate);
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    const totalDays = (nextDate.getTime() - lastMonth.getTime()) / (1000 * 60 * 60 * 24);
    const daysLeft = (nextDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
    
    const progress = ((totalDays - daysLeft) / totalDays) * 100;
    return Math.min(Math.max(progress, 0), 100);
  };

  const getProgressColor = (progress: number, isTrial: boolean): string => {
    if (isTrial) {
      return "linear-gradient(90deg, #F59E0B 0%, #D97706 100%)"; // Orange pour les essais
    }
    if (progress >= 90) {
      return "linear-gradient(90deg, #EF4444 0%, #DC2626 100%)"; // Rouge vif pour moins de 10%
    }
    if (progress >= 75) {
      return "linear-gradient(90deg, #F97316 0%, #EA580C 100%)"; // Orange pour moins de 25%
    }
    return "linear-gradient(90deg, #9b87f5 0%, #7E69AB 100%)"; // Dégradé de violet (couleurs primaire/secondaire)
  };

  const getDateToUse = () => {
    if (isTrial && trialEndDate) {
      return trialEndDate;
    }
    return nextBilling;
  };

  useEffect(() => {
    const dateToUse = getDateToUse();
    const nextDate = new Date(dateToUse);
    const now = new Date();

    if (nextDate < now && !isTrial) {
      // Si la date est dépassée, on met à jour pour le mois suivant
      const newNextBilling = addMonths(nextDate, 1);
      console.log("Updating next billing date for subscription", subscriptionId, "to", newNextBilling);
      updateNextBillingDate(subscriptionId, newNextBilling);
    }
  }, [nextBilling, isTrial, trialEndDate, subscriptionId, updateNextBillingDate]);

  const dateToUse = getDateToUse();
  const progress = calculateDaysProgress(dateToUse);
  const daysLeft = Math.ceil((new Date(dateToUse).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="space-y-2">
      <Progress 
        value={progress} 
        className="h-3 bg-gray-100 shadow-inner"
        style={{
          ["--progress-color" as any]: getProgressColor(progress, Boolean(isTrial)),
        }}
      />
      <div className="flex justify-between items-center text-xs">
        <span className={`font-medium ${daysLeft <= 7 ? 'text-red-500' : 'text-gray-500'}`}>
          {daysLeft} jours {isTrial ? "d'essai" : ""} restants
        </span>
        <span className="text-gray-400">
          {isTrial ? "Fin de l'essai" : "Prochain paiement"}: {new Date(dateToUse).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};