import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Application } from "@/types/application";

export const TrendingApps = () => {
  const { data: trendingApps } = useQuery({
    queryKey: ['trending-apps'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .limit(6)
        .order('users_count', { ascending: false });
      
      if (error) throw error;
      
      return (data || []).map(app => ({
        id: app.id,
        name: app.NOM || '',
        price: parseFloat(app.PRICE || '0'),
        category: app.CATÉGORIE,
        description: app.DESCRIPTION,
        features: Array.isArray(app.CARACTÉRISTIQUES) 
          ? app.CARACTÉRISTIQUES.map(String)
          : typeof app.CARACTÉRISTIQUES === 'string' 
            ? [app.CARACTÉRISTIQUES]
            : [],
        pros: app.AVANTAGES,
        cons: app.INCONVÉNIENTS,
        website_url: app["URL DU SITE WEB"],
        logo_url: app["URL DU LOGO"],
        rating: app.NOTE,
        review: app.REVUE,
        users_count: app["NOMBRE D'UTILISATEURS"]
      })) as Application[];
    }
  });

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-semibold">Applications Tendances</h2>
        </div>
        <Button variant="ghost" className="text-primary hover:text-primary/80">
          Voir tout
          <ExternalLink className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trendingApps?.map((app) => (
          <motion.div
            key={app.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            className="group"
          >
            <Card className="p-6 hover:shadow-lg transition-all hover:border-primary/20">
              <div className="flex items-start gap-4">
                {app.logo_url ? (
                  <img 
                    src={app.logo_url} 
                    alt={app.name} 
                    className="w-12 h-12 rounded-lg object-contain bg-gray-50"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <span className="text-lg font-semibold text-primary">
                      {app.name?.[0]}
                    </span>
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{app.name}</h3>
                  <p className="text-sm text-gray-500">{app.category}</p>
                  <p className="text-xs text-gray-400 mt-2 line-clamp-2">
                    {app.description}
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-primary">
                    {app.price}€/mois
                  </span>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => window.open(app.website_url, '_blank')}
                  >
                    Découvrir
                    <ExternalLink className="ml-2 h-3 w-3" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};