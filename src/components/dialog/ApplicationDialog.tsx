import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState, useMemo } from "react";
import ApplicationSearch from "./ApplicationSearch";
import ApplicationGrid from "./ApplicationGrid";
import { Application } from "@/types/application";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import confetti from 'canvas-confetti';
import { useToast } from "@/components/ui/use-toast";

interface ApplicationDialogProps {
  applications: Application[] | undefined;
  isLoading: boolean;
  onAddSubscription: (app: Application) => Promise<void>;
}

const ApplicationDialog = ({ applications, isLoading, onAddSubscription }: ApplicationDialogProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [customApp, setCustomApp] = useState<Partial<Application>>({
    name: "",
    price: 0,
    category: "",
    description: ""
  });
  const { toast } = useToast();

  const filteredApplications = useMemo(() => {
    if (!applications) return [];
    
    return applications.filter(app => {
      const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          app.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || app.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [applications, searchTerm, selectedCategory]);

  const handleSearch = (newSearchTerm: string, category: string | null) => {
    setSearchTerm(newSearchTerm);
    setSelectedCategory(category);
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleCustomSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customApp.name || !customApp.price || !customApp.category) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return;
    }

    await onAddSubscription(customApp as Application);
    triggerConfetti();
    setCustomApp({ name: "", price: 0, category: "", description: "" });
    setShowCustomForm(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          Ajouter un abonnement
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row justify-between items-center">
          <DialogTitle className="text-2xl font-bold">Choisir une application</DialogTitle>
          <button
            onClick={() => setShowCustomForm(!showCustomForm)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors bg-neutral-light rounded-lg hover:bg-neutral-light/80"
          >
            <Plus className="h-4 w-4" />
            Je ne trouve pas mon abonnement
          </button>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <ApplicationSearch 
            applications={applications} 
            onSearch={handleSearch}
          />

          {showCustomForm && (
            <form onSubmit={handleCustomSubmit} className="animate-fade-in bg-white p-6 rounded-lg shadow-sm border border-gray-100">
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
          )}

          <ApplicationGrid 
            applications={filteredApplications} 
            isLoading={isLoading} 
            onAddSubscription={onAddSubscription} 
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationDialog;