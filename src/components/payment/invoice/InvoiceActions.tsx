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
    <div className="flex gap-2 justify-end">
      <Button
        variant="outline"
        size="sm"
        onClick={onEdit}
        className="h-8"
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
        className="h-8 text-red-600 hover:text-red-700 hover:bg-red-50"
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