import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Check, X, ArrowRight, Search, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Application } from "@/types/application";
import { fallbackApplications } from "@/data/fallbackApplications";

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
    
    // Critères de comparaison
    let score1 = 0;
    let score2 = 0;

    // Prix (le moins cher gagne)
    if (selectedApp1.price < selectedApp2.price) score1++;
    else if (selectedApp2.price < selectedApp1.price) score2++;

    // Description (plus détaillée gagne)
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
            <div className="w-1/3 space-y-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Rechercher une application..."
                  value={searchTerm1}
                  onChange={(e) => setSearchTerm1(e.target.value)}
                  className="pl-9"
                />
              </div>
              {searchTerm1 && (
                <div className="absolute mt-1 w-[calc(100%-1rem)] bg-white rounded-md shadow-lg max-h-48 overflow-auto z-10">
                  {filteredApps1?.map((app) => (
                    <div
                      key={app.name}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setApp1(app.name);
                        setSearchTerm1("");
                      }}
                    >
                      {app.name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-col items-center justify-center w-1/3">
              <div className="relative w-20 h-20 flex items-center justify-center">
                <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse"></div>
                <span className="text-2xl font-bold text-primary">VS</span>
              </div>
            </div>

            <div className="w-1/3 space-y-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Rechercher une application..."
                  value={searchTerm2}
                  onChange={(e) => setSearchTerm2(e.target.value)}
                  className="pl-9"
                />
              </div>
              {searchTerm2 && (
                <div className="absolute mt-1 w-[calc(100%-1rem)] bg-white rounded-md shadow-lg max-h-48 overflow-auto z-10">
                  {filteredApps2?.map((app) => (
                    <div
                      key={app.name}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        setApp2(app.name);
                        setSearchTerm2("");
                      }}
                    >
                      {app.name}
                    </div>
                  ))}
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
        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Comparaison des Services</h2>
            <Button variant="outline" onClick={() => setShowComparison(false)}>
              Nouvelle comparaison
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-6 mb-8">
            {[selectedApp1, selectedApp2].map((app, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-lg border border-gray-100 hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-semibold mb-2">{app?.name}</h3>
                <p className="text-2xl font-bold mb-4">{app?.price} €/mois</p>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <p className="text-sm">Catégorie: {app?.category}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-500" />
                    <p className="text-sm">Description détaillée disponible</p>
                  </div>
                  <p className="text-sm text-gray-600">{app?.description}</p>
                </div>
              </div>
            ))}
          </div>

          {winner && (
            <div className="bg-primary/10 p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <Trophy className="h-6 w-6 text-primary" />
                <h3 className="text-lg font-semibold">Application Recommandée</h3>
              </div>
              <p className="text-gray-700">
                Basé sur notre analyse comparative, nous recommandons{" "}
                <span className="font-semibold text-primary">{winner.name}</span> pour les raisons suivantes :
              </p>
              <ul className="mt-3 space-y-2">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  {winner.price < (selectedApp1?.name === winner.name ? selectedApp2?.price || 0 : selectedApp1?.price || 0) 
                    ? "Meilleur rapport qualité-prix"
                    : "Fonctionnalités plus complètes"}
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-500" />
                  Description plus détaillée des services
                </li>
              </ul>
            </div>
          )}
        </Card>
      )}
    </div>
  );
};

export default ComparisonSection;