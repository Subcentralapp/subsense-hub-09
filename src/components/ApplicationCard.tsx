import { Tv, Music, Play, Book, Heart, Globe, Zap, Gamepad, Video, BookOpen, Smile, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import SubscriptionCustomizeDialog from "./dialog/SubscriptionCustomizeDialog";

type Application = {
  name: string;
  price: number;
  category: string | null;
  description: string | null;
};

interface ApplicationCardProps {
  app: Application;
  onAdd: (app: Application, customPrice?: number, nextBilling?: Date) => void;
}

const getAppIcon = (category: string | null) => {
  const categoryLower = category?.toLowerCase() || '';
  
  switch (categoryLower) {
    case "streaming vidéo":
      return <Video className="h-6 w-6 text-purple-500" />;
    case "streaming musical":
      return <Headphones className="h-6 w-6 text-green-500" />;
    case "gaming":
      return <Gamepad className="h-6 w-6 text-red-500" />;
    case "productivité":
      return <Zap className="h-6 w-6 text-blue-500" />;
    case "éducation":
      return <BookOpen className="h-6 w-6 text-yellow-500" />;
    case "bien-être":
      return <Smile className="h-6 w-6 text-pink-500" />;
    default:
      return <Globe className="h-6 w-6 text-gray-500" />;
  }
};

export const ApplicationCard = ({ app, onAdd }: ApplicationCardProps) => {
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);

  const handleCustomize = (customPrice: number, nextBilling: Date) => {
    onAdd(app, customPrice, nextBilling);
  };

  return (
    <>
      <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-100 hover:border-primary/20 transition-all hover:shadow-md hover:scale-[1.02]">
        <div className="flex items-center gap-3">
          {getAppIcon(app.category)}
          <div>
            <h4 className="font-medium text-gray-900">{app.name}</h4>
            <p className="text-sm text-gray-500">{app.category || 'Non catégorisé'}</p>
            {app.description && (
              <p className="text-xs text-gray-400 mt-1 max-w-[200px]">{app.description}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <p className="font-medium text-primary">{app.price}€/mois</p>
          <Button 
            onClick={() => setIsCustomizeOpen(true)}
            size="sm"
            className="bg-primary/10 text-primary hover:bg-primary/20"
          >
            Ajouter
          </Button>
        </div>
      </div>

      <SubscriptionCustomizeDialog
        app={app}
        isOpen={isCustomizeOpen}
        onClose={() => setIsCustomizeOpen(false)}
        onConfirm={handleCustomize}
      />
    </>
  );
};