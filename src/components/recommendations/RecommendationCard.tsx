import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Application } from "@/types/application";
import { ExternalLink } from "lucide-react";

interface RecommendationCardProps {
  app: Application;
}

export const RecommendationCard = ({ app }: RecommendationCardProps) => {
  return (
    <div className="relative group">
      <Card className="overflow-hidden bg-white dark:bg-neutral-900 border-2 border-neutral-100 hover:border-primary/20 transition-all duration-300">
        {/* Header Section */}
        <div className="relative h-48 bg-gradient-to-br from-neutral-50 to-neutral-100 p-6">
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-primary">
            {app.category || 'App'}
          </div>
          
          <div className="flex items-start space-x-4">
            {app.logo_url ? (
              <img
                src={app.logo_url}
                alt={app.name}
                className="w-16 h-16 rounded-xl object-cover bg-white shadow-sm"
              />
            ) : (
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">
                  {app.name.charAt(0)}
                </span>
              </div>
            )}
            
            <div className="flex-1">
              <h3 className="font-bold text-xl text-neutral-900 mb-1">
                {app.name}
              </h3>
              <p className="text-sm text-neutral-600 line-clamp-2">
                {app.description || "Aucune description disponible"}
              </p>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="p-4 border-t border-neutral-100">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs text-neutral-500">Prix mensuel</p>
              <p className="text-lg font-bold text-primary">
                {app.price ? `${app.price}€` : 'Gratuit'}
              </p>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-primary/10 hover:text-primary"
              onClick={() => {
                // URL redirection will be added later
                console.log('Redirect to:', app.website_url);
              }}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Voir plus
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};