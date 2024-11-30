import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Application } from "@/types/application";
import { SearchDropdown } from "./search/SearchDropdown";
import { ComparisonResult } from "./comparison/ComparisonResult";
import { Loader2, Plus, Sparkles } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

const ComparisonSection = () => {
  const [selectedApps, setSelectedApps] = useState<Application[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const [searchTerms, setSearchTerms] = useState<string[]>(['', '', '']);
  const { toast } = useToast();

  const { data: applications, isLoading: appsLoading } = useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("applications")
        .select("*")
        .order("name");
      
      if (error) {
        console.error("Error fetching applications:", error);
        return [];
      }
      return data as Application[];
    },
  });

  const { data: comparisonData, isLoading: comparisonLoading } = useQuery({
    queryKey: ["comparison", selectedApps.map(app => app.name)],
    queryFn: async () => {
      if (selectedApps.length < 2) return null;

      const response = await fetch('https://qhidxbdxcymhuyquyqgk.functions.supabase.co/compare-apps', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ apps: selectedApps }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch comparison data');
      }

      const data = await response.json();
      return JSON.parse(data.analysis);
    },
    enabled: showComparison && selectedApps.length >= 2,
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
    setShowComparison(true);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 py-8">
      {!showComparison ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Hero Banner */}
          <div className="mb-12 text-center">
            <motion.h1 
              className="text-4xl font-bold text-primary mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Comparez et Économisez
            </motion.h1>
            <motion.p 
              className="text-lg text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Trouvez la meilleure application pour vos besoins en comparant les fonctionnalités, 
              les prix et les avis utilisateurs.
            </motion.p>
          </div>

          <Card className="p-8 bg-gradient-to-br from-white to-primary/5">
            <div className="space-y-8">
              <div className="flex items-center justify-center gap-4">
                <Sparkles className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold text-center text-primary">
                  Comparez jusqu'à 3 applications
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[0, 1, 2].map((index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative"
                  >
                    <SearchDropdown
                      searchTerm={searchTerms[index]}
                      onSearchChange={(value) => {
                        setSearchTerms(prev => {
                          const newTerms = [...prev];
                          newTerms[index] = value;
                          return newTerms;
                        });
                      }}
                      filteredApps={applications?.filter(app => {
                        const searchLower = searchTerms[index].toLowerCase();
                        return (
                          app.name?.toLowerCase().includes(searchLower) ||
                          app.category?.toLowerCase().includes(searchLower) ||
                          app.description?.toLowerCase().includes(searchLower)
                        );
                      })}
                      onSelectApp={(app) => handleAppSelect(app, index)}
                      placeholder="Rechercher une application..."
                    />
                    {index < 2 && !selectedApps[index] && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <Plus className="h-6 w-6 text-gray-400" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              <div className="flex justify-center pt-4">
                <Button
                  onClick={handleCompare}
                  disabled={selectedApps.length < 2 || appsLoading}
                  className="px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all"
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
          </Card>

          {/* Trust Indicators */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="font-semibold text-lg mb-2">Comparaison Objective</h3>
              <p className="text-gray-600">Analyses détaillées basées sur des critères précis</p>
            </motion.div>
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h3 className="font-semibold text-lg mb-2">Données à Jour</h3>
              <p className="text-gray-600">Prix et fonctionnalités mis à jour quotidiennement</p>
            </motion.div>
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h3 className="font-semibold text-lg mb-2">Meilleurs Prix</h3>
              <p className="text-gray-600">Accès aux meilleures offres et réductions</p>
            </motion.div>
          </div>
        </motion.div>
      ) : (
        <ComparisonResult
          apps={selectedApps}
          comparisonData={comparisonData}
          isLoading={comparisonLoading}
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