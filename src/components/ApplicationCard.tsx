import { Button } from "@/components/ui/button";
import { Application } from "@/types/application";
import { useState } from 'react';
import { getClearbitLogoUrl, formatPrice } from '@/utils/logoUtils';
import { ApplicationHeader } from './application/ApplicationHeader';

interface ApplicationCardProps {
  app: Application;
  onAdd: (app: Application) => void;
  buttonText?: 'add' | 'discover';
}

export const ApplicationCard = ({ app, onAdd, buttonText = 'add' }: ApplicationCardProps) => {
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
      <ApplicationHeader app={app} logoUrl={logoUrl} />

      {app.description && (
        <p className="text-xs text-gray-400 mb-3 line-clamp-2">{app.description}</p>
      )}

      <div className="mt-auto">
        <p className="font-medium text-primary mb-2">{formatPrice(app.price)}</p>
        <Button 
          onClick={() => onAdd(app)}
          size="sm"
          className="w-full bg-primary text-white hover:bg-primary/90"
        >
          {buttonText === 'add' ? 'Ajouter' : 'Découvrir'}
        </Button>
      </div>
    </div>
  );
};