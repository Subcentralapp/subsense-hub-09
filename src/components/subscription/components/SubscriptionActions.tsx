import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

interface SubscriptionActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

export const SubscriptionActions = ({ onEdit, onDelete }: SubscriptionActionsProps) => {
  return (
    <div className="flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <Button 
        variant="ghost" 
        size="icon"
        onClick={onEdit}
        className="hover:bg-primary/10 hover:text-primary"
      >
        <Pencil className="h-4 w-4" />
      </Button>
      <Button 
        variant="ghost" 
        size="icon"
        onClick={onDelete}
        className="hover:bg-red-50 hover:text-red-500"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};