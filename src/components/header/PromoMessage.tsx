import { Timer } from "lucide-react";

export const PromoMessage = ({ isMobile = false }: { isMobile?: boolean }) => {
  if (isMobile) {
    return (
      <div className="sm:hidden w-full overflow-hidden py-2">
        <div className="animate-marquee whitespace-nowrap">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-100 text-green-600">
            <Timer className="w-4 h-4 animate-pulse" />
            <span className="text-xs font-medium">
              Accès gratuit à vie pour les 1000 premiers inscrits ! 🚀
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="hidden sm:flex flex-1 justify-center px-2">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100 text-green-600">
        <Timer className="w-4 h-4 animate-pulse" />
        <span className="text-sm font-medium">
          Offre limitée : Accès gratuit à vie pour les 1000 premiers inscrits ! 🚀
        </span>
      </div>
    </div>
  );
};