import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Check, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Application } from "@/types/application";
import { fallbackApplications } from "@/data/fallbackApplications";

const ComparisonSection = () => {
  const [app1, setApp1] = useState<string | null>(null);
  const [app2, setApp2] = useState<string | null>(null);
  const [showComparison, setShowComparison] = useState(false);

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

  const selectedApp1 = applications?.find(app => app.name === app1);
  const selectedApp2 = applications?.find(app => app.name === app2);

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
              <Select onValueChange={setApp1}>
                <SelectTrigger>
                  <SelectValue placeholder="Choisir une application" />
                </SelectTrigger>
                <SelectContent>
                  {applications?.map((app) => (
                    <SelectItem key={app.name} value={app.name}>
                      {app.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col items-center justify-center w-1/3">
              <div className="relative w-20 h-20 flex items-center justify-center">
                <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse"></div>
                <span className="text-2xl font-bold text-primary">VS</span>
              </div>
            </div>

            <div className="w-1/3">
              <Select onValueChange={setApp2}>
                <SelectTrigger>
                  <SelectValue placeholder="Choisir une application" />
                </SelectTrigger>
                <SelectContent>
                  {applications?.map((app) => (
                    <SelectItem key={app.name} value={app.name}>
                      {app.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
          
          <div className="grid grid-cols-2 gap-6">
            {[selectedApp1, selectedApp2].map((app, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-lg border border-gray-100 hover-scale"
              >
                <h3 className="text-lg font-semibold mb-2">{app?.name}</h3>
                <p className="text-2xl font-bold mb-4">{app?.price} €/mois</p>
                <p className="text-sm text-gray-600 mb-4">{app?.description}</p>
                <p className="text-sm font-medium text-gray-700">
                  Catégorie: {app?.category}
                </p>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default ComparisonSection;