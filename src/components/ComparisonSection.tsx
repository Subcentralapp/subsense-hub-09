import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Application } from "@/types/application";
import { fallbackApplications } from "@/data/fallbackApplications";
import { SearchDropdown } from "./search/SearchDropdown";
import { ComparisonResult } from "./comparison/ComparisonResult";

const ComparisonSection = () => {
  const [app1, setApp1] = useState<string | null>(null);
  const [app2, setApp2] = useState<string | null>(null);
  const [showComparison, setShowComparison] = useState(false);
  const [searchTerm1, setSearchTerm1] = useState("");
  const [searchTerm2, setSearchTerm2] = useState("");

  const { data: applications } = useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("applications")
        .select("*")
        .order("name");
      
      if (error || !data?.length) {
        console.log("Utilisation des données de repli:", error);
        return fallbackApplications;
      }
      return data as Application[];
    },
  });

  const filteredApps1 = applications?.filter(app => 
    app.name.toLowerCase().includes(searchTerm1.toLowerCase())
  );

  const filteredApps2 = applications?.filter(app => 
    app.name.toLowerCase().includes(searchTerm2.toLowerCase())
  );

  const selectedApp1 = applications?.find(app => app.name === app1);
  const selectedApp2 = applications?.find(app => app.name === app2);

  const determineWinner = () => {
    if (!selectedApp1 || !selectedApp2) return null;
    
    let score1 = 0;
    let score2 = 0;

    if (selectedApp1.price < selectedApp2.price) score1++;
    else if (selectedApp2.price < selectedApp1.price) score2++;

    if (selectedApp1.description?.length > (selectedApp2.description?.length || 0)) score1++;
    else if (selectedApp2.description?.length > (selectedApp1.description?.length || 0)) score2++;

    return score1 >= score2 ? selectedApp1 : selectedApp2;
  };

  const winner = determineWinner();

  const handleCompare = () => {
    if (app1 && app2) {
      setShowComparison(true);
    }
  };

  return (
    <div className="space-y-6 fade-in">
      {!showComparison ? (
        <Card className="p-6">
          <div className="flex items-center justify-center gap-4">
            <div className="w-1/3">
              <SearchDropdown
                searchTerm={searchTerm1}
                onSearchChange={setSearchTerm1}
                filteredApps={filteredApps1}
                onSelectApp={setApp1}
                placeholder="Rechercher une application..."
              />
              {app1 && (
                <div className="mt-2 p-2 bg-neutral-light rounded-md">
                  Application sélectionnée: <span className="font-semibold">{app1}</span>
                </div>
              )}
            </div>

            <div className="flex flex-col items-center justify-center w-1/3">
              <div className="relative w-20 h-20 flex items-center justify-center">
                <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse"></div>
                <span className="text-2xl font-bold text-primary">VS</span>
              </div>
            </div>

            <div className="w-1/3">
              <SearchDropdown
                searchTerm={searchTerm2}
                onSearchChange={setSearchTerm2}
                filteredApps={filteredApps2}
                onSelectApp={setApp2}
                placeholder="Rechercher une application..."
              />
              {app2 && (
                <div className="mt-2 p-2 bg-neutral-light rounded-md">
                  Application sélectionnée: <span className="font-semibold">{app2}</span>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <Button
              onClick={handleCompare}
              disabled={!app1 || !app2}
              className="px-8"
            >
              Comparer
            </Button>
          </div>
        </Card>
      ) : (
        <ComparisonResult
          selectedApp1={selectedApp1}
          selectedApp2={selectedApp2}
          winner={winner}
          onNewComparison={() => setShowComparison(false)}
        />
      )}
    </div>
  );
};

export default ComparisonSection;