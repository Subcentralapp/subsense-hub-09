import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useState } from "react";
import { ApplicationCard } from "./ApplicationCard";
import { Application } from "@/types/application";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface CategoryCardProps {
  name: string;
  description: string;
  color: string;
  isSelected: boolean;
  onSelect: () => void;
}

export const CategoryCard = ({ name, description, color, isSelected, onSelect }: CategoryCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const { data: applications } = useQuery({
    queryKey: ['applications', name],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .ilike('CATÉGORIE', `%${name}%`);

      if (error) {
        console.error('Error fetching applications:', error);
        return [];
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
    enabled: isSelected || isExpanded,
  });

  const handleClick = () => {
    // Sur mobile, on gère l'expansion locale
    if (window.innerWidth < 768) {
      setIsExpanded(!isExpanded);
    } else {
      // Sur desktop, on garde le comportement existant
      onSelect();
    }
  };

  return (
    <div className="w-full">
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Card
          className={`p-4 cursor-pointer ${color} transition-all ${
            isSelected || isExpanded
              ? 'border-2 border-primary shadow-lg' 
              : 'border-2 border-transparent hover:border-primary/20'
          }`}
          onClick={handleClick}
        >
          <h3 className="font-semibold text-gray-900">{name}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </Card>
      </motion.div>

      {/* Applications list - visible only on mobile when expanded */}
      {isExpanded && window.innerWidth < 768 && applications && applications.length > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-2 space-y-2 pl-4"
        >
          {applications.map((app) => (
            <ApplicationCard
              key={app.id}
              app={app}
              onAdd={() => {
                console.log('Add application:', app.name);
                window.open(app.website_url, '_blank');
              }}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
};