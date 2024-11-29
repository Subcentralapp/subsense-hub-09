import { Button } from "@/components/ui/button";
import { PenLine, Trash2, Loader2 } from "lucide-react";

interface InvoiceActionsProps {
  isEditing: boolean;
  isLoading: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

const InvoiceActions = ({ isEditing, isLoading, onEdit, onDelete }: InvoiceActionsProps) => {
  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={onEdit}
      >
        {isEditing ? (
          "Sauvegarder"
        ) : (
          <>
            <PenLine className="h-4 w-4 mr-1" />
            Modifier
          </>
        )}
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={onDelete}
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Trash2 className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
};

export default InvoiceActions;