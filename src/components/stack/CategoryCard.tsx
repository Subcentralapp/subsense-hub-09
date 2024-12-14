import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Application } from "@/types/application";
import { CategoryHeader } from "./CategoryHeader";
import { ApplicationsList } from "./ApplicationsList";

interface CategoryCardProps {
  name: string;
  description: string;
  color: string;
  isSelected: boolean;
  onSelect: () => void;
  onAddTool?: (app: Application) => void;
}

export const CategoryCard = ({ 
  name, 
  description, 
  color, 
  isSelected, 
  onSelect, 
  onAddTool 
}: CategoryCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const { data: applications } = useQuery({
    queryKey: ['applications', name],
    queryFn: async () => {
      console.log('Fetching applications for category:', name);
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
    setIsExpanded(!isExpanded);
    onSelect();
  };

  return (
    <div className="w-full">
      <CategoryHeader
        name={name}
        description={description}
        color={color}
        isSelected={isSelected}
        onClick={handleClick}
      />
      
      {(isExpanded || isSelected) && (
        <ApplicationsList 
          applications={applications || []}
          onAddTool={onAddTool}
        />
      )}
    </div>
  );
};