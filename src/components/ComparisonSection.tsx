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
  const [app1, setApp1] = useState<Application | null>(null);
  const [app2, setApp2] = useState<Application | null>(null);
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

  const determineWinner = () => {
    if (!app1 || !app2) return null;
    
    let score1 = 0;
    let score2 = 0;

    if (app1.price < app2.price) score1++;
    else if (app2.price < app1.price) score2++;

    if (app1.description?.length > (app2.description?.length || 0)) score1++;
    else if (app2.description?.length > (app1.description?.length || 0)) score2++;

    return score1 >= score2 ? app1 : app2;
  };

  const handleCompare = () => {
    if (app1 && app2) {
      setShowComparison(true);
    }
  };

  return (
    <div className="space-y-6 fade-in">
      {!showComparison ? (
        <Card className="p-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <div className="w-full md:w-1/3">
              <SearchDropdown
                searchTerm={searchTerm1}
                onSearchChange={setSearchTerm1}
                filteredApps={filteredApps1}
                onSelectApp={setApp1}
                placeholder="Rechercher une application..."
                selectedApp={app1}
              />
            </div>

            <div className="flex items-center justify-center w-full md:w-1/3">
              <div className="relative w-20 h-20 flex items-center justify-center">
                <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse"></div>
                <span className="text-2xl font-bold text-primary">VS</span>
              </div>
            </div>

            <div className="w-full md:w-1/3">
              <SearchDropdown
                searchTerm={searchTerm2}
                onSearchChange={setSearchTerm2}
                filteredApps={filteredApps2}
                onSelectApp={setApp2}
                placeholder="Rechercher une application..."
                selectedApp={app2}
              />
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
          app1={app1}
          app2={app2}
          winner={determineWinner()}
          onNewComparison={() => {
            setShowComparison(false);
            setApp1(null);
            setApp2(null);
          }}
        />
      )}
    </div>
  );
};

export default ComparisonSection;