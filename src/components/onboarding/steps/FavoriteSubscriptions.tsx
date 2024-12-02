import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Application } from "@/types/application";

const FavoriteSubscriptions = () => {
  const [favoriteApps, setFavoriteApps] = useState<Application[]>([]);

  const handleAddFavorite = (app: Application) => {
    setFavoriteApps((prev) => [...prev, app]);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Mes Abonnements Favoris</h2>
      <Card className="p-4">
        {favoriteApps.length > 0 ? (
          favoriteApps.map((app) => (
            <div key={app.id} className="flex justify-between items-center py-2">
              <span>{app.name}</span>
              <Button variant="outline" onClick={() => handleAddFavorite(app)}>
                Supprimer
              </Button>
            </div>
          ))
        ) : (
          <p>Aucun abonnement favori ajouté.</p>
        )}
      </Card>
    </div>
  );
};

export default FavoriteSubscriptions;
