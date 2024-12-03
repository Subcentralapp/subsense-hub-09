import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ApplicationCard } from '../ApplicationCard';
import { Button } from '../ui/button';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

const categories = [
  { id: 'streaming-video', name: 'Streaming Vidéo', description: 'Plateformes de streaming vidéo' },
  { id: 'streaming-musical', name: 'Streaming Musical', description: 'Services de streaming musical' },
  { id: 'gaming', name: 'Gaming', description: 'Applications et services de jeux' },
  { id: 'productivité', name: 'Productivité', description: 'Optimisez votre workflow' },
  { id: 'éducation', name: 'Éducation', description: 'Outils d\'apprentissage' },
  { id: 'bien-être', name: 'Bien-être', description: 'Applications de bien-être' },
  { id: 'vpn-securite', name: 'VPN & Sécurité', description: 'Protection et sécurité en ligne' },
];

export const CategoryDiscovery = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data: applications, isLoading } = useQuery({
    queryKey: ['applications', selectedCategory],
    queryFn: async () => {
      console.log('Fetching applications for category:', selectedCategory);
      const query = supabase
        .from('applications')
        .select('*')
        .order('NOM');

      if (selectedCategory) {
        query.ilike('CATÉGORIE', `%${selectedCategory}%`);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching applications:', error);
        throw error;
      }

      return data.map(app => ({
        id: app.id,
        name: app.NOM || '',
        price: parseFloat(app.PRICE || '0'),
        category: app.CATÉGORIE,
        description: app.DESCRIPTION,
        features: Array.isArray(app.CARACTÉRISTIQUES) 
          ? app.CARACTÉRISTIQUES.map(String)
          : [],
        pros: app.AVANTAGES,
        cons: app.INCONVÉNIENTS,
        website_url: app["URL DU SITE WEB"],
        logo_url: app["URL DU LOGO"],
        rating: app.NOTE,
        review: app.REVUE,
        users_count: app["NOMBRE D'UTILISATEURS"]
      }));
    },
    enabled: true,
  });

  return (
    <section className="py-12 space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold">Découvrez les meilleurs outils par catégorie</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Sélectionnez une catégorie pour explorer les outils les plus adaptés à vos besoins
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((category) => (
          <motion.div
            key={category.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              variant={selectedCategory === category.id ? "default" : "outline"}
              className="w-full h-full min-h-[90px] flex flex-col gap-2 p-4"
              onClick={() => setSelectedCategory(prev => prev === category.id ? null : category.id)}
            >
              <span className="font-semibold">{category.name}</span>
              <span className="text-xs opacity-70">{category.description}</span>
            </Button>
          </motion.div>
        ))}
      </div>

      {selectedCategory && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">
              Outils {categories.find(c => c.id === selectedCategory)?.name.toLowerCase()}
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedCategory(null)}
            >
              Voir toutes les catégories
            </Button>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-[300px] bg-gray-100 animate-pulse rounded-lg" />
              ))}
            </div>
          ) : applications && applications.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {applications.map((app) => (
                <ApplicationCard
                  key={app.id}
                  app={app}
                  onAdd={() => {
                    console.log('Add application:', app.name);
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Search className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Aucun outil trouvé
              </h3>
              <p className="text-gray-500">
                Nous n'avons pas encore d'outils dans cette catégorie.
              </p>
            </div>
          )}
        </motion.div>
      )}
    </section>
  );
};