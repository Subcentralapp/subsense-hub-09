import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ApplicationCard } from '../ApplicationCard';
import { Button } from '../ui/button';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { Input } from '../ui/input';

const categories = [
  { id: 'gestion-financiere', name: 'Gestion financière', description: 'Gérez vos finances efficacement' },
  { id: 'no-code', name: 'Automatisation et développement sans code', description: 'Solutions no-code et automatisation' },
  { id: 'social-messaging', name: 'Réseaux sociaux et messagerie', description: 'Communication et réseaux sociaux' },
  { id: 'collaboration', name: 'Outils de collaboration et de productivité', description: 'Travaillez en équipe' },
  { id: 'payments', name: 'Applications de paiements et transferts', description: 'Gérez vos transactions' },
  { id: 'creation', name: 'Applications de création', description: 'Outils créatifs' },
  { id: 'streaming', name: 'Plateformes de streaming', description: 'Contenu en streaming' },
  { id: 'ai', name: 'Applications IA', description: 'Intelligence artificielle' },
  { id: 'health', name: 'Santé et forme physique', description: 'Bien-être et santé' },
  { id: 'crm', name: 'CRM et outils de vente', description: 'Gestion de la relation client' },
  { id: 'marketing', name: 'Marketing et gestion des médias sociaux', description: 'Stratégie marketing' },
  { id: 'ecommerce', name: 'Plateformes de commerce électronique', description: 'Solutions e-commerce' },
  { id: 'music', name: 'Musique et streaming audio', description: 'Audio et musique' },
  { id: 'finance', name: 'Paiement et services financiers', description: 'Services financiers' },
  { id: 'dating', name: 'Applications de rencontre', description: 'Rencontres en ligne' },
];

export const CategoryDiscovery = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const { data: applications, isLoading } = useQuery({
    queryKey: ['applications', selectedCategory],
    queryFn: async () => {
      console.log('Fetching applications for category:', selectedCategory);
      const query = supabase
        .from('applications')
        .select('*')
        .order('NOM');

      if (selectedCategory) {
        query.ilike('CATÉGORIE', `%${categories.find(c => c.id === selectedCategory)?.name}%`);
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

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="py-12 space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold">Découvrez les meilleurs outils par catégorie</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Sélectionnez une catégorie pour explorer les outils les plus adaptés à vos besoins
        </p>
      </div>

      <div className="relative">
        <Input
          type="search"
          placeholder="Rechercher une catégorie..."
          className="max-w-md mx-auto mb-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredCategories.map((category) => (
          <motion.div
            key={category.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              variant={selectedCategory === category.id ? "default" : "outline"}
              className="w-full h-full min-h-[90px] flex flex-col gap-2 p-4 text-left items-start"
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
                  buttonText="discover"
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
