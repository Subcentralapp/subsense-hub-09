import { MessageSquare, Music, Play, Book, Heart, Globe, Zap, Gamepad, Video, BookOpen, Smile, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import SubscriptionCustomizeDialog from "./dialog/SubscriptionCustomizeDialog";

type Application = {
  name: string;
  price: number;
  category: string | null;
  description: string | null;
  logo_url?: string | null;
  pricing_plans?: Array<{
    name: string;
    price: number;
    features: string[];
  }>;
};

interface ApplicationCardProps {
  app: Application;
  onAdd: (app: Application, customPrice?: number, nextBilling?: Date) => void;
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
  
  // Fallback: use company name
  const domain = `${appName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`;
  return `https://logo.clearbit.com/${domain}`;
};

export const ApplicationCard = ({ app, onAdd }: ApplicationCardProps) => {
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [logoError, setLogoError] = useState(false);

  const handleCustomize = (customPrice: number, nextBilling: Date) => {
    onAdd(app, customPrice, nextBilling);
  };

  const handlePlanSelect = (plan: any) => {
    setSelectedPlan(plan);
    setIsCustomizeOpen(true);
  };

  const logoUrl = app.logo_url || (logoError ? null : getClearbitLogoUrl(app.name, app.website_url));

  return (
    <>
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

        {app.pricing_plans && app.pricing_plans.length > 0 ? (
          <div className="mt-auto">
            <p className="font-medium text-primary mb-2">{app.pricing_plans[0].price}€/mois</p>
            <Button 
              onClick={() => handlePlanSelect(app.pricing_plans[0])}
              size="sm"
              className="w-full bg-primary/10 text-primary hover:bg-primary/20"
            >
              Ajouter
            </Button>
          </div>
        ) : (
          <div className="mt-auto">
            <p className="font-medium text-primary mb-2">{app.price}€/mois</p>
            <Button 
              onClick={() => setIsCustomizeOpen(true)}
              size="sm"
              className="w-full bg-primary/10 text-primary hover:bg-primary/20"
            >
              Ajouter
            </Button>
          </div>
        )}
      </div>

      <SubscriptionCustomizeDialog
        app={selectedPlan ? { ...app, price: selectedPlan.price } : app}
        isOpen={isCustomizeOpen}
        onClose={() => {
          setIsCustomizeOpen(false);
          setSelectedPlan(null);
        }}
        onConfirm={handleCustomize}
      />
    </>
  );
};