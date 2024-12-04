import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const nuitisAd = {
  id: 1,
  title: "Nuitis - Révolutionnez vos nuits",
  description: "Découvrez notre partenaire qui révolutionne le sommeil",
  image: "/lovable-uploads/cc5a4237-1fb2-4cbc-a83f-0477f2278211.png",
  url: "https://nuitis.com"
};

const RandomAd = () => {
  const [showAd, setShowAd] = useState(false);

  useEffect(() => {
    // 30% de chance d'afficher la publicité
    const shouldShowAd = Math.random() < 0.3;
    if (shouldShowAd) {
      setShowAd(true);
    }
  }, []);

  if (!showAd) return null;

  return (
    <Card className="p-4 glass-card hover-scale my-6">
      <div className="flex items-center gap-4">
        <img
          src={nuitisAd.image}
          alt="Nuitis"
          className="w-16 h-16 object-cover rounded"
        />
        <div className="flex-grow">
          <h3 className="font-semibold">{nuitisAd.title}</h3>
          <p className="text-sm text-gray-500">{nuitisAd.description}</p>
        </div>
        <Button 
          className="bg-blue-600 hover:bg-blue-700 text-white"
          onClick={() => window.open(nuitisAd.url, '_blank')}
        >
          Découvrir
        </Button>
      </div>
    </Card>
  );
};

export default RandomAd;