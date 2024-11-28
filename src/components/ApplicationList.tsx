import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search, Tv, Play, Video, Music, Book, Camera, Cloud, Globe, Heart, Mail, Phone, Shield, Zap } from "lucide-react";

type Application = {
  name: string;
  price: number;
  category: string;
  description: string | null;
};

// Liste étendue d'applications
const fallbackApplications: Application[] = [
  // Streaming Vidéo
  { name: "Netflix", price: 15.49, category: "Streaming Vidéo", description: "Films, séries et documentaires en streaming" },
  { name: "Disney+", price: 8.99, category: "Streaming Vidéo", description: "Contenu Disney, Marvel, Star Wars et plus" },
  { name: "Prime Video", price: 6.99, category: "Streaming Vidéo", description: "Service de streaming d'Amazon" },
  { name: "Canal+", price: 24.99, category: "Streaming Vidéo", description: "Chaînes TV et contenus exclusifs" },
  { name: "Apple TV+", price: 9.99, category: "Streaming Vidéo", description: "Séries et films originaux Apple" },
  { name: "OCS", price: 10.99, category: "Streaming Vidéo", description: "Films et séries en streaming" },
  { name: "Paramount+", price: 7.99, category: "Streaming Vidéo", description: "Contenu Paramount, CBS, MTV et plus" },
  
  // Streaming Musical
  { name: "Spotify", price: 10.99, category: "Streaming Musical", description: "Musique et podcasts en streaming" },
  { name: "Apple Music", price: 10.99, category: "Streaming Musical", description: "Service de streaming musical d'Apple" },
  { name: "Deezer", price: 10.99, category: "Streaming Musical", description: "Musique en streaming haute qualité" },
  { name: "Amazon Music", price: 9.99, category: "Streaming Musical", description: "Service musical d'Amazon" },
  { name: "YouTube Music", price: 9.99, category: "Streaming Musical", description: "Musique et clips en streaming" },
  { name: "Tidal", price: 19.99, category: "Streaming Musical", description: "Streaming musical haute-fidélité" },
  
  // Gaming
  { name: "Xbox Game Pass", price: 12.99, category: "Gaming", description: "Bibliothèque de jeux Xbox et PC" },
  { name: "PlayStation Plus", price: 8.99, category: "Gaming", description: "Service gaming de Sony" },
  { name: "Nintendo Switch Online", price: 3.99, category: "Gaming", description: "Gaming en ligne Nintendo" },
  { name: "EA Play", price: 4.99, category: "Gaming", description: "Jeux Electronic Arts" },
  { name: "GeForce Now", price: 9.99, category: "Gaming", description: "Cloud gaming NVIDIA" },
  
  // Productivité
  { name: "Microsoft 365", price: 7.00, category: "Productivité", description: "Suite Office et stockage cloud" },
  { name: "Google One", price: 1.99, category: "Productivité", description: "Stockage Google supplémentaire" },
  { name: "Dropbox", price: 11.99, category: "Productivité", description: "Stockage et partage de fichiers" },
  { name: "Adobe Creative Cloud", price: 59.99, category: "Productivité", description: "Suite créative complète" },
  { name: "Notion", price: 8.00, category: "Productivité", description: "Outil de productivité tout-en-un" },
  
  // Éducation
  { name: "Duolingo Plus", price: 12.99, category: "Éducation", description: "Apprentissage des langues" },
  { name: "Skillshare", price: 15.00, category: "Éducation", description: "Cours créatifs en ligne" },
  { name: "Coursera Plus", price: 59.00, category: "Éducation", description: "Formations universitaires" },
  { name: "MasterClass", price: 15.00, category: "Éducation", description: "Cours par des experts" },
  
  // Bien-être
  { name: "Calm", price: 14.99, category: "Bien-être", description: "Méditation et sommeil" },
  { name: "Headspace", price: 12.99, category: "Bien-être", description: "Méditation guidée" },
  { name: "Fitbod", price: 12.99, category: "Bien-être", description: "Entraînement personnalisé" },
  { name: "MyFitnessPal", price: 9.99, category: "Bien-être", description: "Suivi nutritionnel" }
];

const fetchApplications = async () => {
  console.log("Tentative de récupération des applications depuis Supabase...");
  try {
    const { data, error } = await supabase
      .from("applications")
      .select("*")
      .order("name");

    if (error) {
      console.error("Erreur Supabase:", error);
      console.log("Utilisation de la liste de repli...");
      return fallbackApplications;
    }

    if (!data || data.length === 0) {
      console.log("Aucune donnée trouvée, utilisation de la liste de repli...");
      return fallbackApplications;
    }

    console.log("Applications récupérées:", data);
    return data as Application[];
  } catch (error) {
    console.error("Erreur lors de la récupération:", error);
    console.log("Utilisation de la liste de repli...");
    return fallbackApplications;
  }
};

const getAppIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case "streaming vidéo":
      return <Tv className="h-6 w-6 text-purple-500" />;
    case "streaming musical":
      return <Music className="h-6 w-6 text-green-500" />;
    case "gaming":
      return <Play className="h-6 w-6 text-red-500" />;
    case "productivité":
      return <Zap className="h-6 w-6 text-blue-500" />;
    case "éducation":
      return <Book className="h-6 w-6 text-yellow-500" />;
    case "bien-être":
      return <Heart className="h-6 w-6 text-pink-500" />;
    default:
      return <Globe className="h-6 w-6 text-gray-500" />;
  }
};

const ApplicationList = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data: applications, isLoading } = useQuery({
    queryKey: ["applications"],
    queryFn: fetchApplications
  });

  const handleAddSubscription = async (app: Application) => {
    try {
      const nextBillingDate = new Date();
      nextBillingDate.setMonth(nextBillingDate.getMonth() + 1);

      const { error } = await supabase.from("subscriptions").insert({
        name: app.name,
        price: app.price,
        category: app.category,
        next_billing: nextBillingDate.toISOString(),
        description: app.description,
      });

      if (error) throw error;

      toast({
        title: "Abonnement ajouté",
        description: `L'abonnement à ${app.name} a été ajouté avec succès.`,
      });
    } catch (error) {
      console.error("Error adding subscription:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'ajout de l'abonnement.",
        variant: "destructive",
      });
    }
  };

  const categories = [...new Set(applications?.map(app => app.category))];

  const filteredApplications = applications?.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || app.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

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
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Rechercher une application..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <select
              value={selectedCategory || ""}
              onChange={(e) => setSelectedCategory(e.target.value || null)}
              className="px-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="">Toutes les catégories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto p-2">
            {filteredApplications?.map((app) => (
              <div
                key={app.name}
                className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-100 hover:border-primary/20 transition-all hover:shadow-md hover:scale-[1.02]"
              >
                <div className="flex items-center gap-3">
                  {getAppIcon(app.category)}
                  <div>
                    <h4 className="font-medium text-gray-900">{app.name}</h4>
                    <p className="text-sm text-gray-500">{app.category}</p>
                    {app.description && (
                      <p className="text-xs text-gray-400 mt-1 max-w-[200px]">{app.description}</p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <p className="font-medium text-primary">{app.price}€/mois</p>
                  <Button 
                    onClick={() => handleAddSubscription(app)}
                    size="sm"
                    className="bg-primary/10 text-primary hover:bg-primary/20"
                  >
                    Ajouter
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationList;