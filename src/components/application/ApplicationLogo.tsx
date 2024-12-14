import { useState } from 'react';
import { getAppIcon } from '@/utils/appIcons';

interface ApplicationLogoProps {
  logoUrl: string | null;
  name: string;
  category: string | null;
}

export const ApplicationLogo = ({ logoUrl, name, category }: ApplicationLogoProps) => {
  const [logoError, setLogoError] = useState(false);

  if (logoUrl && !logoError) {
    return (
      <img 
        src={logoUrl}
        alt={`Logo ${name}`} 
        className="h-8 w-8 object-contain"
        onError={() => {
          console.log(`Failed to load logo for ${name}, falling back to icon`);
          setLogoError(true);
        }}
      />
    );
  }

  return getAppIcon(category, name);
};