import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";

export const AccountDeletion = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.admin.deleteUser(
        (await supabase.auth.getUser()).data.user?.id || ""
      );

      if (error) throw error;

      toast({
        title: "Compte supprimé",
        description: "Votre compte a été supprimé avec succès",
      });
      
      await supabase.auth.signOut();
      navigate("/auth");
    } catch (error) {
      console.error("Error deleting account:", error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le compte",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  return (
    <Card className="p-6 border-destructive/50">
      <h2 className="text-xl font-semibold mb-4 flex items-center text-destructive">
        <Trash2 className="h-5 w-5 mr-2" />
        Supprimer le compte
      </h2>
      <p className="text-muted-foreground mb-4">
        Attention : la suppression de votre compte est irréversible. Toutes vos données seront définitivement effacées.
      </p>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="destructive">
            Supprimer mon compte
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Êtes-vous sûr de vouloir supprimer votre compte ?</DialogTitle>
            <DialogDescription>
              Cette action est irréversible. Toutes vos données seront définitivement supprimées.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Annuler
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteAccount}
              disabled={isLoading}
            >
              {isLoading ? "Suppression..." : "Confirmer la suppression"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};