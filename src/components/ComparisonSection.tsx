import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Application } from "@/types/application";
import { Loader2, Sparkles, ChevronRight } from "lucide-react";
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
    <div className="space-y-8 max-w-7xl mx-auto px-4 py-8">
      {!showComparison ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <ComparisonHero />

          <div className="rounded-2xl p-4 sm:p-8 bg-gradient-to-br from-white to-primary/5 shadow-lg">
            <div className="space-y-4 sm:space-y-8">
              <div className="flex items-center justify-center gap-4">
                <Sparkles className="h-6 w-6 text-primary hidden sm:block" />
                <h2 className="text-xl sm:text-2xl font-bold text-center text-primary">
                  Comparez jusqu'à 3 applications
                </h2>
              </div>
              
              {/* Mobile View */}
              <div className="block sm:hidden">
                <div className="space-y-4">
                  {[0, 1, 2].map((index) => (
                    <div key={index} className="relative">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                          {index + 1}
                        </div>
                        <span className="text-sm text-gray-600">
                          {selectedApps[index] ? selectedApps[index].name : `Application ${index + 1}`}
                        </span>
                      </div>
                      <ComparisonSearch
                        searchTerm={searchTerms[index]}
                        onSearchChange={(value) => {
                          setSearchTerms(prev => {
                            const newTerms = [...prev];
                            newTerms[index] = value;
                            return newTerms;
                          });
                        }}
                        applications={applications}
                        onSelectApp={(app) => handleAppSelect(app, index)}
                        selectedApps={selectedApps}
                        isMobile={true}
                      />
                      {index < 2 && (
                        <div className="flex items-center gap-2 my-2">
                          <div className="flex-1 border-t border-dashed border-gray-200" />
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Desktop View */}
              <div className="hidden sm:block">
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
              </div>

              <div className="flex justify-center pt-4">
                <Button
                  onClick={handleCompare}
                  disabled={selectedApps.length < 2 || appsLoading}
                  className="w-full sm:w-auto px-6 py-4 sm:px-8 sm:py-6 text-base sm:text-lg shadow-lg hover:shadow-xl transition-all bg-primary hover:bg-primary/90"
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