import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Application } from "@/types/application";
import { ApplicationCard } from "../ApplicationCard";

export const ApplicationExplorer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data: applications, isLoading } = useQuery({
    queryKey: ['applications', searchTerm, selectedCategory],
    queryFn: async () => {
      let query = supabase
        .from('applications')
        .select('*');
      
      if (searchTerm) {
        query = query.ilike('NOM', `%${searchTerm}%`);
      }
      
      if (selectedCategory) {
        query = query.eq('CATÉGORIE', selectedCategory);
      }
      
      const { data, error } = await query;
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

  const categories = [
    "Productivité",
    "Design",
    "Marketing",
    "Communication",
    "Finance",
    "Développement"
  ];

  return (
    <section className="space-y-6">
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Rechercher une application..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(
                  selectedCategory === category ? null : category
                )}
                className="whitespace-nowrap"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {isLoading ? (
          Array(8).fill(0).map((_, i) => (
            <Card key={i} className="h-[200px] animate-pulse" />
          ))
        ) : applications?.map((app) => (
          <ApplicationCard
            key={app.id}
            app={app}
            onAdd={() => {
              console.log('Adding app:', app.name);
            }}
          />
        ))}
      </div>
    </section>
  );
};