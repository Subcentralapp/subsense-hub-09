import { useState } from 'react';
import { SearchDropdown } from '../search/SearchDropdown';
import { supabase } from '@/integrations/supabase/client';
import { Application } from '@/types/application';
import { toast } from '@/hooks/use-toast';

interface StackSearchProps {
  onAddTool: (app: Application) => void;
}

export const StackSearch = ({ onAddTool }: StackSearchProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredApps, setFilteredApps] = useState<Application[]>([]);

  const searchApplications = async (term: string) => {
    if (term.length < 2) {
      setFilteredApps([]);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .ilike('NOM', `%${term}%`)
        .limit(5);

      if (error) throw error;

      const mappedApps: Application[] = data.map(app => ({
        id: app.id,
        name: app.NOM || '',
        price: parseFloat(app.PRICE || '0'),
        category: app.CATÉGORIE || null,
        description: app.DESCRIPTION || null,
        features: Array.isArray(app.CARACTÉRISTIQUES) 
          ? app.CARACTÉRISTIQUES.map(String)
          : typeof app.CARACTÉRISTIQUES === 'string'
            ? [app.CARACTÉRISTIQUES]
            : [],
        pros: app.AVANTAGES || null,
        cons: app.INCONVÉNIENTS || null,
        website_url: app["URL DU SITE WEB"] || null,
        logo_url: app["URL DU LOGO"] || null,
        rating: app.NOTE || null,
        review: app.REVUE || null,
        users_count: app["NOMBRE D'UTILISATEURS"] || null
      }));

      setFilteredApps(mappedApps);
    } catch (error) {
      console.error('Error in searchApplications:', error);
      toast({
        title: "Erreur lors de la recherche",
        description: "Impossible de charger les applications",
        variant: "destructive"
      });
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    searchApplications(value);
  };

  const handleSelectApp = (app: Application) => {
    onAddTool(app);
    setSearchTerm('');
    setFilteredApps([]);
    toast({
      title: "Application ajoutée",
      description: `${app.name} a été ajouté à votre stack`
    });
  };

  return (
    <div className="w-full">
      <SearchDropdown
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        filteredApps={filteredApps}
        onSelectApp={handleSelectApp}
        placeholder="Rechercher une application..."
      />
    </div>
  );
};