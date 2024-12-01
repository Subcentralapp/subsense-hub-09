import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Application } from "@/types/application";
import { Loader2, Sparkles } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { ComparisonResult } from "./comparison/ComparisonResult";
import { ComparisonHero } from "./comparison/ComparisonHero";
import { ComparisonSearch } from "./comparison/ComparisonSearch";
import { TrustIndicators } from "./comparison/TrustIndicators";

const ComparisonSection = () => {
  const [selectedApps, setSelectedApps] = useState<Application[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const [searchTerms, setSearchTerms] = useState<string[]>(['', '', '']);
  const { toast } = useToast();

  const { data: applications, isLoading: appsLoading } = useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      console.log("Fetching applications...");
      const { data, error } = await supabase
        .from("applications")
        .select("*")
        .order("NOM");
      
      if (error) {
        console.error("Error fetching applications:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les applications",
          variant: "destructive",
        });
        return [];
      }

      console.log("Applications fetched:", data);
      return data.map(app => ({
        id: app.id,
        name: app.NOM,
        price: parseFloat(app.PRICE),
        category: app.CATÉGORIE,
        description: app.DESCRIPTION,
        features: app.CARACTÉRISTIQUES,
        pros: app.AVANTAGES ? [app.AVANTAGES] : [],
        cons: app.INCONVÉNIENTS ? [app.INCONVÉNIENTS] : [],
        website_url: app["URL DU SITE WEB"],
        logo_url: app["URL DU LOGO"],
        rating: app.NOTE,
        review: app.REVUE,
        users_count: app["NOMBRE D'UTILISATEURS"]?.toString()
      }));
    },
  });

  const handleAppSelect = (app: Application, index: number) => {
    if (selectedApps.some(selectedApp => selectedApp.name === app.name)) {
      toast({
        title: "Application déjà sélectionnée",
        description: "Veuillez choisir une autre application.",
        variant: "destructive",
      });
      return;
    }

    setSelectedApps(prev => {
      const newApps = [...prev];
      newApps[index] = app;
      console.log("Updated selected apps:", newApps);
      return newApps;
    });
    
    setSearchTerms(prev => {
      const newTerms = [...prev];
      newTerms[index] = '';
      return newTerms;
    });
  };

  const handleCompare = () => {
    if (selectedApps.length < 2) {
      toast({
        title: "Sélection insuffisante",
        description: "Veuillez sélectionner au moins 2 applications à comparer.",
        variant: "destructive",
      });
      return;
    }
    console.log("Starting comparison with apps:", selectedApps);
    setShowComparison(true);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 py-8">
      {!showComparison ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <ComparisonHero />

          <div className="rounded-2xl p-8 bg-gradient-to-br from-white to-primary/5 shadow-lg">
            <div className="space-y-8">
              <div className="flex items-center justify-center gap-4">
                <Sparkles className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold text-center text-primary">
                  Comparez jusqu'à 3 applications
                </h2>
              </div>
              
              <ComparisonSearch 
                searchTerms={searchTerms}
                onSearchChange={(value, index) => {
                  setSearchTerms(prev => {
                    const newTerms = [...prev];
                    newTerms[index] = value;
                    return newTerms;
                  });
                }}
                applications={applications}
                onSelectApp={handleAppSelect}
                selectedApps={selectedApps}
              />

              <div className="flex justify-center pt-4">
                <Button
                  onClick={handleCompare}
                  disabled={selectedApps.length < 2 || appsLoading}
                  className="px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all bg-primary hover:bg-primary/90"
                >
                  {appsLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Chargement...
                    </>
                  ) : (
                    'Comparer maintenant'
                  )}
                </Button>
              </div>
            </div>
          </div>

          <TrustIndicators />
        </motion.div>
      ) : (
        <ComparisonResult
          apps={selectedApps}
          onNewComparison={() => {
            setShowComparison(false);
            setSelectedApps([]);
            setSearchTerms(['', '', '']);
          }}
        />
      )}
    </div>
  );
};

export default ComparisonSection;
