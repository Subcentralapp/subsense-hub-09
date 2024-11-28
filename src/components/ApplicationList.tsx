import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search, Tv, Play, Video } from "lucide-react";

type Application = {
  name: string;
  price: number;
  category: string;
  description: string | null;
};

// Liste de repli des applications
const fallbackApplications: Application[] = [
  {
    name: "Netflix",
    price: 8.99,
    category: "Streaming",
    description: "Service de streaming vidéo"
  },
  {
    name: "YouTube Premium",
    price: 11.99,
    category: "Streaming",
    description: "Service de streaming vidéo et musique"
  },
  {
    name: "Amazon Prime Video",
    price: 8.99,
    category: "Streaming",
    description: "Service de streaming vidéo"
  },
  {
    name: "Disney+",
    price: 7.99,
    category: "Streaming",
    description: "Service de streaming vidéo"
  },
  {
    name: "Hulu",
    price: 7.99,
    category: "Streaming",
    description: "Service de streaming vidéo"
  }
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

const ApplicationList = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");

  const { data: applications, isLoading, error } = useQuery({
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

  const getAppIcon = (appName: string) => {
    switch (appName.toLowerCase()) {
      case "netflix":
        return <Tv className="h-6 w-6 text-red-600" />;
      case "youtube premium":
        return <Play className="h-6 w-6 text-red-500" />;
      case "amazon prime video":
        return <Video className="h-6 w-6 text-blue-500" />;
      case "disney+":
        return <Play className="h-6 w-6 text-blue-600" />;
      case "hulu":
        return <Tv className="h-6 w-6 text-green-500" />;
      default:
        return <Play className="h-6 w-6" />;
    }
  };

  const filteredApplications = applications?.filter(app =>
    app.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <div>Chargement des applications...</div>;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          Ajouter un abonnement
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Choisir une application</DialogTitle>
        </DialogHeader>
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Rechercher un service..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="grid gap-4 py-4">
          {filteredApplications?.map((app) => (
            <div
              key={app.name}
              className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-100 hover:border-primary/20 transition-colors"
            >
              <div className="flex items-center gap-3">
                {getAppIcon(app.name)}
                <div>
                  <h4 className="font-medium">{app.name}</h4>
                  <p className="text-sm text-gray-500">{app.category}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <p className="font-medium">À partir de {app.price}€/mois</p>
                <Button onClick={() => handleAddSubscription(app)}>
                  Ajouter
                </Button>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationList;