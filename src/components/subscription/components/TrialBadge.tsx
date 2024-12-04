import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { format, differenceInDays } from "date-fns";
import { fr } from "date-fns/locale";

interface TrialBadgeProps {
  isTrial: boolean;
  trialEndDate?: string | null;
}

export const TrialBadge = ({ isTrial, trialEndDate }: TrialBadgeProps) => {
  if (!isTrial || !trialEndDate) return null;

  const daysLeft = differenceInDays(new Date(trialEndDate), new Date());
  const formattedDate = format(new Date(trialEndDate), 'd MMMM yyyy', { locale: fr });

  return (
    <Badge variant="secondary" className="flex items-center gap-1">
      <Clock className="h-3 w-3" />
      {daysLeft > 0 ? (
        <span>Essai gratuit - {daysLeft} jours restants</span>
      ) : (
        <span>Essai terminé le {formattedDate}</span>
      )}
    </Badge>
  );
};