import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";

const ads = [
  {
    id: 1,
    title: "Découvrez nos offres",
    description: "Profitez de -20% sur votre premier mois d'abonnement",
    image: "/placeholder.svg",
  },
  {
    id: 2,
    title: "Offre spéciale",
    description: "2 mois gratuits pour tout abonnement annuel",
    image: "/placeholder.svg",
  },
];

const RandomAd = () => {
  const [showAd, setShowAd] = useState(false);
  const [currentAd, setCurrentAd] = useState(ads[0]);

  useEffect(() => {
    // 30% de chance d'afficher une publicité
    const shouldShowAd = Math.random() < 0.3;
    if (shouldShowAd) {
      const randomAd = ads[Math.floor(Math.random() * ads.length)];
      setCurrentAd(randomAd);
      setShowAd(true);
    }
  }, []);

  if (!showAd) return null;

  return (
    <Card className="p-4 glass-card hover-scale my-6">
      <div className="flex items-center gap-4">
        <img
          src={currentAd.image}
          alt="Publicité"
          className="w-16 h-16 object-cover rounded"
        />
        <div>
          <h3 className="font-semibold">{currentAd.title}</h3>
          <p className="text-sm text-gray-500">{currentAd.description}</p>
        </div>
      </div>
    </Card>
  );
};

export default RandomAd;