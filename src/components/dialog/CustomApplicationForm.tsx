import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Application } from "@/types/application";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface CustomApplicationFormProps {
  onSubmit: (app: Application) => Promise<void>;
  onCancel: () => void;
}

const CustomApplicationForm = ({ onSubmit, onCancel }: CustomApplicationFormProps) => {
  const { toast } = useToast();
  const [customApp, setCustomApp] = useState<Partial<Application>>({
    name: "",
    price: 0,
    category: "",
    description: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customApp.name || !customApp.price || !customApp.category) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return;
    }

    await onSubmit(customApp as Application);
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit} className="animate-fade-in bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-medium">Nom de l'application *</Label>
          <Input
            id="name"
            value={customApp.name}
            onChange={(e) => setCustomApp(prev => ({ ...prev, name: e.target.value }))}
            placeholder="ex: Netflix, Spotify..."
            className="w-full"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="price" className="text-sm font-medium">Prix mensuel *</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            value={customApp.price}
            onChange={(e) => setCustomApp(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
            placeholder="9.99"
            className="w-full"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category" className="text-sm font-medium">Catégorie *</Label>
          <Input
            id="category"
            value={customApp.category}
            onChange={(e) => setCustomApp(prev => ({ ...prev, category: e.target.value }))}
            placeholder="ex: Streaming vidéo, Gaming..."
            className="w-full"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-sm font-medium">Description (optionnelle)</Label>
          <Input
            id="description"
            value={customApp.description || ""}
            onChange={(e) => setCustomApp(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Description de l'application..."
            className="w-full"
          />
        </div>

        <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
          Ajouter mon abonnement
        </Button>
      </div>
    </form>
  );
};

export default CustomApplicationForm;