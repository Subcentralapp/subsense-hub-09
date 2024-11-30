import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

const FeaturedApps = () => {
  const { data: apps, isLoading } = useQuery({
    queryKey: ['featured-apps'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .in('name', [
          'Netflix', 'Shopify', 'Coursera', 'Udemy', 'Amazon', 
          'Hostinger', 'Semrush', 'Make', 'Airtable', 'Revolut', 
          'NordVPN', 'Babbel', 'Bubble', 'Canal+'
        ]);

      if (error) throw error;
      return data;
    }
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <Card key={i} className="p-6 animate-pulse">
            <div className="h-12 w-12 bg-gray-200 rounded-full mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Applications Vedettes</h2>
        <div className="flex gap-4">
          <Button variant="ghost" size="sm" className="hover:bg-gray-100">
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M5 4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v1H5V4z"/>
              <path fillRule="evenodd" d="M4 7a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7zm2 1v8h8V8H6z"/>
            </svg>
          </Button>
          <Button variant="ghost" size="sm" className="hover:bg-gray-100">
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M3 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4z"/>
              <path fillRule="evenodd" d="M3 9a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9zm0 5a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-2z"/>
            </svg>
          </Button>
          <Button variant="ghost" size="sm" className="hover:bg-gray-100">
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-.293.707L12 11.414V15a1 1 0 0 1-.293.707l-2 2A1 1 0 0 1 8 17v-5.586L3.293 6.707A1 1 0 0 1 3 6V3z"/>
            </svg>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {apps?.map((app) => (
          <Card key={app.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              {app.logo_url ? (
                <img 
                  src={app.logo_url} 
                  alt={`${app.name} logo`}
                  className="w-12 h-12 object-contain"
                />
              ) : (
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-xl font-semibold text-gray-400">
                    {app.name.charAt(0)}
                  </span>
                </div>
              )}
              <div>
                <h3 className="font-semibold">{app.name}</h3>
                <p className="text-sm text-gray-500">{app.category}</p>
              </div>
            </div>

            <div className="flex items-baseline gap-1 mb-4">
              <span className="text-sm text-green-600">
                {app.price ? `${app.price}% Off` : 'Gratuit'}
              </span>
              <span className="text-xs text-gray-400">Sales upper scale</span>
            </div>

            <Button 
              variant="secondary" 
              className="w-full flex items-center justify-center gap-2"
            >
              <span>Visit</span>
              <ExternalLink className="h-4 w-4" />
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FeaturedApps;