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

interface RecommendationDialogProps {
  recommendation: Recommendation | null;
  onClose: () => void;
}

export const RecommendationDialog = ({
  recommendation,
  onClose,
}: RecommendationDialogProps) => {
  if (!recommendation) return null;

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
          <p className="text-sm text-gray-500">{recommendation.details}</p>
          {recommendation.websiteUrl && (
            <Button
              className="w-full"
              onClick={() => window.open(recommendation.websiteUrl, '_blank')}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Visiter le site
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};