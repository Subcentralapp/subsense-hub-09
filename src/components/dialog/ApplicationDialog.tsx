import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus, ChevronDown } from "lucide-react";
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
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Choisir une application</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <ApplicationSearch 
            applications={applications} 
            onSearch={handleSearch}
          />
          <ApplicationGrid 
            applications={filteredApplications} 
            isLoading={isLoading} 
            onAddSubscription={onAddSubscription} 
          />

          <div className="border-t pt-6">
            <button
              onClick={() => setShowCustomForm(!showCustomForm)}
              className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
            >
              <ChevronDown className={`h-4 w-4 transition-transform ${showCustomForm ? 'rotate-180' : ''}`} />
              Je ne trouve pas mon abonnement
            </button>

            {showCustomForm && (
              <form onSubmit={handleCustomSubmit} className="mt-4 space-y-4 animate-fade-in">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom de l'application *</Label>
                  <Input
                    id="name"
                    value={customApp.name}
                    onChange={(e) => setCustomApp(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="ex: Netflix, Spotify..."
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Prix mensuel *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={customApp.price}
                    onChange={(e) => setCustomApp(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
                    placeholder="9.99"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Catégorie *</Label>
                  <Input
                    id="category"
                    value={customApp.category}
                    onChange={(e) => setCustomApp(prev => ({ ...prev, category: e.target.value }))}
                    placeholder="ex: Streaming vidéo, Gaming..."
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description (optionnelle)</Label>
                  <Input
                    id="description"
                    value={customApp.description || ""}
                    onChange={(e) => setCustomApp(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Description de l'application..."
                  />
                </div>

                <Button type="submit" className="w-full">
                  Ajouter mon abonnement
                </Button>
              </form>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationDialog;