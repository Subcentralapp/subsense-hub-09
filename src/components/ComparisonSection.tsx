import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Application } from "@/types/application";
import { Loader2, Sparkles, Shield, Zap, Award } from "lucide-react";
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

      const mappedData = data.map(app => ({
        id: app.id,
        name: app.NOM,
        price: app.PRICE ? parseFloat(app.PRICE) : 0,
        category: app.CATÉGORIE,
        description: app.DESCRIPTION,
        features: app.CARACTÉRISTIQUES as string[],
        pros: app.AVANTAGES,
        cons: app.INCONVÉNIENTS,
        website_url: app["URL DU SITE WEB"],
        logo_url: app["URL DU LOGO"],
        rating: app.NOTE,
        review: app.REVUE,
        users_count: app["NOMBRE D'UTILISATEURS"]
      }));

      console.log("Applications mappées:", mappedData);
      return mappedData;
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
    <div className="space-y-4 sm:space-y-8 max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-8">
      {!showComparison ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4 sm:space-y-8"
        >
          <div className="sm:block hidden">
            <ComparisonHero />
          </div>

          <div className="sm:rounded-2xl bg-transparent sm:bg-gradient-to-br from-white to-primary/5 sm:shadow-lg sm:p-8">
            <div className="space-y-3 sm:space-y-8">
              <div className="flex items-center justify-center gap-2 sm:gap-4 mb-4 sm:mb-0">
                <Sparkles className="h-4 w-4 sm:h-6 sm:w-6 text-primary hidden sm:block" />
                <h2 className="text-lg sm:text-2xl font-bold text-center text-primary">
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
                isMobile={window.innerWidth < 640}
              />

              {selectedApps.length >= 2 && (
                <div className="flex justify-center">
                  <Button
                    onClick={handleCompare}
                    disabled={appsLoading}
                    className="w-full sm:w-auto px-4 py-2 sm:px-8 sm:py-6 text-base sm:text-lg shadow-lg hover:shadow-xl transition-all bg-primary hover:bg-primary/90"
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
              )}
            </div>
          </div>

          <div className="hidden sm:block">
            <TrustIndicators />
          </div>
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