import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const AdSpace = () => {
  const ads = [
    {
      title: "Offre Spéciale Disney+",
      description: "3 mois à -50% pour tout nouvel abonnement",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&q=80",
    },
    {
      title: "Amazon Prime Student",
      description: "Profitez de -50% sur votre abonnement Prime avec votre statut étudiant",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500&q=80",
    },
  ];

  return (
    <div className="space-y-6 fade-in">
      <Card className="p-6 glass-card">
        <h2 className="text-xl font-semibold mb-6">Offres Spéciales</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ads.map((ad, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-lg border border-gray-100 hover-scale"
            >
              <div className="relative h-48">
                <img
                  src={ad.image}
                  alt={ad.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 bg-white">
                <h3 className="font-medium mb-2">{ad.title}</h3>
                <p className="text-sm text-gray-500 mb-4">{ad.description}</p>
                <Button className="w-full">
                  Voir l'offre
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default AdSpace;