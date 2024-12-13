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
      console.log("🔄 Vérification des préférences utilisateur existantes...");
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        console.error("❌ Aucun utilisateur connecté");
        return;
      }

      // Vérifier si une entrée existe déjà
      const { data: existingPrefs, error: fetchError } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('id', user.id)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        console.error("❌ Erreur lors de la vérification des préférences:", fetchError);
        throw fetchError;
      }

      let upsertError;

      if (existingPrefs) {
        console.log("🔄 Mise à jour des préférences existantes...");
        const { error } = await supabase
          .from('user_preferences')
          .update({
            wants_recommendations: false,
            updated_at: new Date().toISOString()
          })
          .eq('id', user.id);
        upsertError = error;
      } else {
        console.log("➕ Création de nouvelles préférences...");
        const { error } = await supabase
          .from('user_preferences')
          .insert({
            id: user.id,
            wants_recommendations: false
          });
        upsertError = error;
      }

      if (upsertError) {
        console.error("❌ Erreur lors de la mise à jour/création des préférences:", upsertError);
        throw upsertError;
      }

      console.log("✅ Préférences mises à jour avec succès");
      
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
          <AlertDialogDescription>
            Ce questionnaire nous aide à personnaliser votre expérience et à améliorer notre application.
            Vous pourrez toujours y revenir plus tard dans les paramètres de votre compte.
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