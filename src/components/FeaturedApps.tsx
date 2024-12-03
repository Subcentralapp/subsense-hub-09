import { ExternalLink, Check, Sparkles } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { toast } from "@/hooks/use-toast";

const logoUrls = {
  'Amazon': 'https://logo.clearbit.com/amazon.com',
  'Babbel': 'https://logo.clearbit.com/babbel.com',
  'Coursera': 'https://logo.clearbit.com/coursera.org',
  'Revolut': 'https://logo.clearbit.com/revolut.com',
  'Udemy': 'https://logo.clearbit.com/udemy.com',
  'Canal+': 'https://logo.clearbit.com/canalplus.com',
  'Hostinger': 'https://logo.clearbit.com/hostinger.com',
  'Bubble': 'https://logo.clearbit.com/bubble.io',
  'Netflix': 'https://logo.clearbit.com/netflix.com',
  'Shopify': 'https://logo.clearbit.com/shopify.com',
  'Semrush': 'https://logo.clearbit.com/semrush.com',
  'Make': 'https://logo.clearbit.com/make.com',
  'Airtable': 'https://logo.clearbit.com/airtable.com',
  'NordVPN': 'https://logo.clearbit.com/nordvpn.com'
};

const FeaturedApps = () => {
  const { data: apps, isLoading } = useQuery({
    queryKey: ['featured-apps'],
    queryFn: async () => {
      console.log("Fetching featured apps...");
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .in('NOM', Object.keys(logoUrls));

      if (error) {
        console.error("Error fetching featured apps:", error);
        throw error;
      }
      
      console.log("Featured apps data:", data);
      return data?.map(app => ({
        ...app,
        name: app.NOM,
        logo_url: logoUrls[app.NOM as keyof typeof logoUrls] || app["URL DU LOGO"]
      }));
    }
  });

  const handleVisitClick = (app: any) => {
    console.log("Handling visit click for app:", app);
    const websiteUrl = app["URL DU SITE WEB"];
    
    if (!websiteUrl) {
      console.log("No website URL found for app:", app.name);
      toast({
        title: "Lien non disponible",
        description: "Le lien vers le site web n'est pas disponible pour le moment.",
        variant: "destructive"
      });
      return;
    }

    // Ensure URL has protocol
    let url = websiteUrl.trim();
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }

    console.log("Opening URL:", url);
    window.open(url, '_blank');
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-pulse">
        {[...Array(8)].map((_, i) => (
          <Card key={i} className="p-6">
            <div className="w-12 h-12 bg-gray-200 rounded-full mb-4" />
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Bannière de conversion */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary to-secondary p-8 text-white"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full transform translate-x-32 -translate-y-32 blur-3xl" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-6 w-6 text-yellow-300 animate-pulse" />
            <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
              Offre Exclusive
            </span>
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Économisez jusqu'à 30% sur vos abonnements !
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <ul className="space-y-3">
              {[
                "Comparaison des prix en temps réel",
                "Codes promos exclusifs",
                "Gestion centralisée de vos abonnements"
              ].map((feature, i) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <Check className="h-5 w-5 text-green-300" />
                  <span>{feature}</span>
                </motion.li>
              ))}
            </ul>
            <div className="flex items-center justify-center">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: [0.8, 1.1, 1] }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className="text-5xl font-bold mb-2">30%</div>
                <div className="text-sm opacity-80">d'économies en moyenne</div>
              </motion.div>
            </div>
          </div>
          
          <Button 
            size="lg"
            className="bg-white text-primary hover:bg-white/90 transition-all duration-200 transform hover:scale-105"
          >
            Commencer à économiser
          </Button>
        </div>
      </motion.div>

      {/* Liste des applications */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {apps?.map((app) => (
          <Card key={app.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                {app.logo_url ? (
                  <img 
                    src={app.logo_url} 
                    alt={`${app.name} logo`}
                    className="w-12 h-12 object-contain"
                    onError={(e) => {
                      console.error(`Failed to load logo for ${app.name}`);
                      e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(app.name)}&background=random`;
                    }}
                  />
                ) : (
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-xl font-bold text-gray-500">
                      {app.name.charAt(0)}
                    </span>
                  </div>
                )}
                <div>
                  <h3 className="font-semibold">{app.name}</h3>
                  <p className="text-sm text-gray-500">{app.CATÉGORIE}</p>
                </div>
              </div>
            </div>

            <div className="flex items-baseline gap-1 mb-4">
              <span className="text-sm text-green-600">
                {app.PRICE ? `${app.PRICE}€/mois` : 'Gratuit'}
              </span>
            </div>

            <Button 
              variant="secondary" 
              className="w-full flex items-center justify-center gap-2"
              onClick={() => handleVisitClick(app)}
            >
              <span>Je veux essayer</span>
              <ExternalLink className="h-4 w-4" />
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FeaturedApps;