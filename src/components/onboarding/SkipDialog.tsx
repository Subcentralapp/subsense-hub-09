import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useNavigate } from "react-router-dom";

interface SkipDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export const SkipDialog = ({ open, onOpenChange, onConfirm }: SkipDialogProps) => {
  const navigate = useNavigate();

  const handleSkip = () => {
    // First close the dialog
    onOpenChange(false);
    // Then call onConfirm which will show the toast
    onConfirm();
    // Finally navigate
    navigate("/dashboard");
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