import { Tv, Music, Play, Book, Heart, Globe, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

type Application = {
  name: string;
  price: number;
  category: string;
  description: string | null;
};

interface ApplicationCardProps {
  app: Application;
  onAdd: (app: Application) => void;
}

const getAppIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case "streaming vidéo":
      return <Tv className="h-6 w-6 text-purple-500" />;
    case "streaming musical":
      return <Music className="h-6 w-6 text-green-500" />;
    case "gaming":
      return <Play className="h-6 w-6 text-red-500" />;
    case "productivité":
      return <Zap className="h-6 w-6 text-blue-500" />;
    case "éducation":
      return <Book className="h-6 w-6 text-yellow-500" />;
    case "bien-être":
      return <Heart className="h-6 w-6 text-pink-500" />;
    default:
      return <Globe className="h-6 w-6 text-gray-500" />;
  }
};

export const ApplicationCard = ({ app, onAdd }: ApplicationCardProps) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-100 hover:border-primary/20 transition-all hover:shadow-md hover:scale-[1.02]">
      <div className="flex items-center gap-3">
        {getAppIcon(app.category)}
        <div>
          <h4 className="font-medium text-gray-900">{app.name}</h4>
          <p className="text-sm text-gray-500">{app.category}</p>
          {app.description && (
            <p className="text-xs text-gray-400 mt-1 max-w-[200px]">{app.description}</p>
          )}
        </div>
      </div>
      <div className="flex flex-col items-end gap-2">
        <p className="font-medium text-primary">{app.price}€/mois</p>
        <Button 
          onClick={() => onAdd(app)}
          size="sm"
          className="bg-primary/10 text-primary hover:bg-primary/20"
        >
          Ajouter
        </Button>
      </div>
    </div>
  );
};