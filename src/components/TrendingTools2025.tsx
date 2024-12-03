import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

export const TrendingTools2025 = () => {
  const { data: trendingApps, isLoading } = useQuery({
    queryKey: ["trending-2025-apps"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("applications")
        .select("*")
        .in("NOM", ["Replit", "Tome", "HeyGen", "Tana", "Descript", "FlowGPT"]);

      if (error) {
        console.error("Error fetching trending apps:", error);
        throw error;
      }

      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-[#1a237e]">
          Outils ultra-tendances pour 2025
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-lg p-4 shadow-sm animate-pulse"
            >
              <div className="w-12 h-12 bg-gray-200 rounded-lg mb-4" />
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
              <div className="h-3 bg-gray-100 rounded w-2/3" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#1a237e]">
        Outils ultra-tendances pour 2025
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trendingApps?.map((app) => (
          <motion.div
            key={app.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4">
              {app["URL DU LOGO"] ? (
                <img
                  src={app["URL DU LOGO"]}
                  alt={`Logo ${app.NOM}`}
                  className="w-12 h-12 rounded-lg object-contain"
                />
              ) : (
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <span className="text-xl font-bold text-primary">
                    {app.NOM?.[0]}
                  </span>
                </div>
              )}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{app.NOM}</h3>
                <p className="text-sm text-gray-500">{app.CATÉGORIE}</p>
              </div>
            </div>

            <Button
              className="w-full mt-4 bg-white text-primary border border-primary/20 hover:bg-primary/5"
              onClick={() => {
                if (app["URL DU SITE WEB"]) {
                  window.open(app["URL DU SITE WEB"], "_blank");
                }
              }}
            >
              Découvrir
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};