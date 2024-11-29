import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Application } from "@/types/application";

interface RecommendationCardProps {
  app: Application;
}

export const RecommendationCard = ({ app }: RecommendationCardProps) => {
  return (
    <Card className="p-6 hover-scale glass-card group transition-all duration-300 ease-in-out">
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-4 mb-4">
          {app.logo_url ? (
            <img
              src={app.logo_url}
              alt={app.name}
              className="w-12 h-12 rounded-lg object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <span className="text-lg font-bold text-primary">
                {app.name.charAt(0)}
              </span>
            </div>
          )}
          <div>
            <h3 className="font-semibold text-lg">{app.name}</h3>
            <p className="text-sm text-muted-foreground">{app.category}</p>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 flex-grow">
          {app.description || "Aucune description disponible"}
        </p>
        
        <div className="mt-4 flex items-center justify-between">
          <span className="font-semibold text-primary">
            {app.price ? `${app.price}€/mois` : 'Gratuit'}
          </span>
          {app.website_url && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.open(app.website_url, '_blank')}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              Voir plus
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};