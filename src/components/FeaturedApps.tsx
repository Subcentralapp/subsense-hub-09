import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

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
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .in('name', Object.keys(logoUrls));

      if (error) throw error;
      
      // Add logo URLs to the apps data
      return data?.map(app => ({
        ...app,
        logo_url: logoUrls[app.name as keyof typeof logoUrls] || app.logo_url
      }));
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
                  onError={(e) => {
                    console.error(`Failed to load logo for ${app.name}`);
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(app.name)}&background=random`;
                  }}
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
                {app.price ? `${app.price}€/mois` : 'Gratuit'}
              </span>
            </div>

            <Button 
              variant="secondary" 
              className="w-full flex items-center justify-center gap-2"
            >
              <span>Visiter</span>
              <ExternalLink className="h-4 w-4" />
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FeaturedApps;