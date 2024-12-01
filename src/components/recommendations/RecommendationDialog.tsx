import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { Recommendation } from "@/types/recommendation";
import { Application } from "@/types/application";

interface RecommendationDialogProps {
  recommendation: Recommendation | null;
  currentApp?: Application;
  alternativeApp?: Application;
  onClose: () => void;
}

export const RecommendationDialog = ({
  recommendation,
  currentApp,
  alternativeApp,
  onClose,
}: RecommendationDialogProps) => {
  if (!recommendation || !currentApp || !alternativeApp) return null;

  return (
    <Dialog open={!!recommendation} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{recommendation.title}</DialogTitle>
          <DialogDescription>
            {recommendation.description}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium">Comparaison détaillée</h4>
            <div className="text-sm space-y-2">
              <p><strong>Application actuelle:</strong> {currentApp.name}</p>
              <p className="text-gray-600">{currentApp.description}</p>
              <p className="font-medium text-primary">{Number(currentApp.price).toFixed(2)}€/mois</p>
            </div>
            <div className="my-2 border-t border-gray-100" />
            <div className="text-sm space-y-2">
              <p><strong>Alternative suggérée:</strong> {alternativeApp.name}</p>
              <p className="text-gray-600">{alternativeApp.description}</p>
              <p className="font-medium text-green-600">{Number(alternativeApp.price).toFixed(2)}€/mois</p>
            </div>
          </div>
          
          {alternativeApp.website_url && (
            <Button
              className="w-full"
              onClick={() => window.open(alternativeApp.website_url, '_blank')}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Découvrir {alternativeApp.name}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};