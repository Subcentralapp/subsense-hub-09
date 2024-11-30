import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Application } from "@/types/application";
import { SearchDropdown } from "./search/SearchDropdown";
import { ComparisonResult } from "./comparison/ComparisonResult";
import { Loader2, Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

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
    <div className="space-y-6 animate-fade-in">
      {!showComparison ? (
        <Card className="p-6">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-center text-primary">
              Comparez jusqu'à 3 applications
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[0, 1, 2].map((index) => (
                <div key={index} className="relative">
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
                </div>
              ))}
            </div>

            <div className="flex justify-center pt-4">
              <Button
                onClick={handleCompare}
                disabled={selectedApps.length < 2 || appsLoading}
                className="px-8"
              >
                {appsLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Chargement...
                  </>
                ) : (
                  'Comparer'
                )}
              </Button>
            </div>
          </div>
        </Card>
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