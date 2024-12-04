import { MessageSquare, Music, Play, Book, Heart, Globe, Zap, Gamepad, Video, BookOpen, Smile, Headphones, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Application } from "@/types/application";
import { useState } from 'react';

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
    case "design":
      return <Zap className="h-6 w-6 text-[#1a237e]" />;
    default:
      return <Globe className="h-6 w-6 text-[#1a237e]" />;
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
  
  // Cas spéciaux pour certaines applications
  const specialCases: { [key: string]: string } = {
    'Figma': 'https://www.figma.com/favicon.ico',
    'Adobe': 'https://www.adobe.com/favicon.ico',
    'Canva': 'https://www.canva.com/favicon.ico'
  };
  
  if (specialCases[appName]) {
    return specialCases[appName];
  }
  
  const domain = `${appName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`;
  return `https://logo.clearbit.com/${domain}`;
};

const formatPrice = (price: number | undefined | null): string => {
  if (price === undefined || price === null) return 'Prix non disponible';
  if (price === 0) return 'Gratuit';
  return `${price}€/mois`;
};

export const ApplicationCard = ({ app, onAdd }: ApplicationCardProps) => {
  const [logoError, setLogoError] = useState(false);
  const logoUrl = app.logo_url || (logoError ? null : getClearbitLogoUrl(app.name || '', app.website_url));

  const handleTryApp = () => {
    console.log("Trying to open URL:", app.website_url);
    
    if (!app.website_url || app.website_url.trim() === '') {
      console.log("No website URL available for:", app.name);
      return;
    }

    let url = app.website_url.trim();
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }

    console.log("Opening URL:", url);
    window.open(url, '_blank');
  };

  return (
    <div className="flex flex-col p-4 bg-white rounded-lg border border-gray-100 hover:border-primary/20 transition-all hover:shadow-md w-full">
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
          getAppIcon(app.category || null, app.name || '')
        )}
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-gray-900 truncate">{app.name}</h4>
          <p className="text-sm text-gray-500 truncate">{app.category || 'Non catégorisé'}</p>
        </div>
      </div>

      {app.description && (
        <p className="text-xs text-gray-400 mb-3 line-clamp-2">{app.description}</p>
      )}

      <div className="mt-auto">
        <p className="font-medium text-primary mb-2">{formatPrice(app.price)}</p>
        <Button 
          onClick={handleTryApp}
          size="sm"
          className="w-full bg-primary text-white hover:bg-primary/90"
        >
          Je veux essayer
        </Button>
      </div>
    </div>
  );
};