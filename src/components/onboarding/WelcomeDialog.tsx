import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Crown } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface WelcomeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const WelcomeDialog = ({ open, onOpenChange }: WelcomeDialogProps) => {
  const navigate = useNavigate();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Bienvenue sur SubaCentral ! 🎉
          </DialogTitle>
          <DialogDescription className="text-lg">
            Votre profil est maintenant configuré
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <div className="bg-primary/5 p-4 rounded-lg">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Crown className="w-5 h-5 text-primary" />
              Devenez Early Supporter
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Profitez d'un accès exclusif aux fonctionnalités premium et soutenez le développement de SubaCentral.
            </p>
            <Button 
              onClick={() => navigate("/landing#support-section")}
              className="w-full bg-gradient-to-r from-primary to-secondary text-white"
            >
              Découvrir l'offre
            </Button>
          </div>
          <Button 
            variant="outline" 
            onClick={() => navigate("/dashboard")}
            className="w-full"
          >
            Accéder au tableau de bord
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};