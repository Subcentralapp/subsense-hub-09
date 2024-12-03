import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Moon, Wind } from "lucide-react";

const NuitisPromo = () => {
  const [showPromo, setShowPromo] = useState(false);

  useEffect(() => {
    // 30% de chance d'afficher la promo
    const shouldShow = Math.random() < 0.3;
    setShowPromo(shouldShow);
  }, []);

  if (!showPromo) return null;

  return (
    <Card className="p-6 mt-8 bg-gradient-to-br from-neutral-900 to-neutral-800 text-white hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between">
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-2">
            <Moon className="h-6 w-6 text-blue-400" />
            <h3 className="text-xl font-semibold">Nuitis - Optimisez votre sommeil</h3>
          </div>
          <p className="text-neutral-200">
            Découvrez nos solutions innovantes pour un sommeil optimal : bandes nasales magnétiques et bouchons d'oreilles premium.
          </p>
          <div className="flex items-center gap-2 text-sm text-neutral-300">
            <Wind className="h-4 w-4" />
            <span>Respirez mieux, dormez mieux, récupérez mieux</span>
          </div>
          <Button 
            className="bg-blue-500 hover:bg-blue-600 text-white"
            onClick={() => window.open('https://nuitis.com/', '_blank')}
          >
            Découvrir Nuitis
          </Button>
        </div>
        <div className="hidden md:block">
          <img 
            src="/lovable-uploads/bfe15ec1-9826-45c2-9fe8-449d17115639.png" 
            alt="Bouchons d'oreilles Nuitis" 
            className="w-32 h-32 object-contain"
          />
        </div>
      </div>
    </Card>
  );
};

export default NuitisPromo;