import { MessageSquare, Music, Play, Book, Heart, Globe, Zap, Gamepad, Video, BookOpen, Smile, Headphones, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Application } from "@/types/application";

interface ApplicationCardProps {
  app: Application;
  onAdd: (app: Application) => void;
}

const getAppIcon = (category: string | null, name: string) => {
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
    case "vpn & sécurité":
      return <Shield className="h-6 w-6 text-indigo-500" />;
    default:
      return <Globe className="h-6 w-6 text-gray-500" />;
  }
};

const getClearbitLogoUrl = (appName: string, websiteUrl?: string) => {
  if (websiteUrl) {
    try {
      const domain = new URL(websiteUrl).hostname;
      return `https://logo.clearbit.com/${domain}`;
    } catch (e) {
      console.log(`Invalid website URL for ${appName}:`, e);
    }
  }
  
  const domain = `${appName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`;
  return `https://logo.clearbit.com/${domain}`;
};

export const ApplicationCard = ({ app, onAdd }: ApplicationCardProps) => {
  const [logoError, setLogoError] = useState(false);
  const logoUrl = app.logo_url || (logoError ? null : getClearbitLogoUrl(app.name, app.website_url));

  return (
    <div className="flex flex-col p-4 bg-white rounded-lg border border-gray-100 hover:border-primary/20 transition-all hover:shadow-md">
      <div className="flex items-center gap-3 mb-3">
        {logoUrl && !logoError ? (
          <img 
            src={logoUrl}
            alt={`Logo ${app.name}`} 
            className="h-8 w-8 object-contain"
            onError={() => {
              console.log(`Failed to load logo for ${app.name}, falling back to icon`);
              setLogoError(true);
            }}
          />
        ) : (
          getAppIcon(app.category, app.name)
        )}
        <div>
          <h4 className="font-medium text-gray-900">{app.name}</h4>
          <p className="text-sm text-gray-500">{app.category || 'Non catégorisé'}</p>
        </div>
      </div>

      {app.description && (
        <p className="text-xs text-gray-400 mb-3">{app.description}</p>
      )}

      <div className="mt-auto">
        <p className="font-medium text-primary mb-2">{app.price}€/mois</p>
        <Button 
          onClick={() => onAdd(app)}
          size="sm"
          className="w-full bg-primary/10 text-primary hover:bg-primary/20"
        >
          Ajouter
        </Button>
      </div>
    </div>
  );
};