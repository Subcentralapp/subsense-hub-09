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
    <div className="mt-2">
      <Badge 
        variant="secondary" 
        className="flex items-center gap-2 text-xs font-normal bg-primary/5 text-primary hover:bg-primary/10"
      >
        <Clock className="h-3 w-3" />
        {daysLeft > 0 ? (
          <span>
            Essai gratuit • {daysLeft} jours restants
          </span>
        ) : (
          <span>
            Essai terminé le {formattedDate}
          </span>
        )}
      </Badge>
    </div>
  );
};