import { Application } from "@/types/application";
import { ApplicationLogo } from "./ApplicationLogo";

interface ApplicationHeaderProps {
  app: Application;
  logoUrl: string | null;
}

export const ApplicationHeader = ({ app, logoUrl }: ApplicationHeaderProps) => {
  return (
    <div className="flex items-center gap-3 mb-3">
      <ApplicationLogo 
        logoUrl={logoUrl}
        name={app.name || ''}
        category={app.category || null}
      />
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-gray-900 truncate">{app.name}</h4>
        <p className="text-sm text-gray-500 truncate">{app.category || 'Non catégorisé'}</p>
      </div>
    </div>
  );
};