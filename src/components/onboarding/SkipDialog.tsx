import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface SkipDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export const SkipDialog = ({ open, onOpenChange, onConfirm }: SkipDialogProps) => {
  const navigate = useNavigate();

  const handleSkip = async () => {
    try {
      console.log("🔄 Création d'une entrée de préférences vide pour l'utilisateur...");
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        console.error("❌ Aucun utilisateur connecté");
        return;
      }

      // Créer une entrée vide dans user_preferences pour marquer l'onboarding comme ignoré
      const { error } = await supabase.from('user_preferences').insert({
        id: user.id,
        wants_recommendations: false
      });

      if (error) {
        console.error("❌ Erreur lors de la création des préférences:", error);
        throw error;
      }

      console.log("✅ Préférences créées avec succès");
      
      // Fermer le dialog
      onOpenChange(false);
      // Appeler onConfirm qui affichera le toast
      onConfirm();
      // Rediriger vers le dashboard
      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.error("❌ Erreur lors du skip:", error);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Êtes-vous sûr de vouloir passer cette étape ?</AlertDialogTitle>
          <AlertDialogDescription className="space-y-2">
            <p>
              Ce questionnaire nous aide à personnaliser votre expérience et à améliorer notre application.
            </p>
            <p>
              Vous pourrez toujours y revenir plus tard dans les paramètres de votre compte.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="space-x-2">
          <AlertDialogCancel onClick={() => onOpenChange(false)}>
            Reprendre le questionnaire
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleSkip}>
            Passer et accéder à l'application
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};