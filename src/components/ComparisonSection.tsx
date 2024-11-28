import { Card } from "@/components/ui/card";
import { Check, X } from "lucide-react";

const ComparisonSection = () => {
  const services = [
    {
      name: "Netflix",
      price: 17.99,
      features: ["4K HDR", "4 écrans", "Téléchargements", "Sans pub"],
    },
    {
      name: "Disney+",
      price: 8.99,
      features: ["4K HDR", "4 écrans", "Téléchargements", "Sans pub"],
    },
    {
      name: "Prime Video",
      price: 6.99,
      features: ["4K HDR", "3 écrans", "Téléchargements", "Avec pub"],
    },
  ];

  return (
    <div className="space-y-6 fade-in">
      <Card className="p-6 glass-card">
        <h2 className="text-xl font-semibold mb-6">Comparaison des Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.name}
              className="p-6 bg-white rounded-lg border border-gray-100 hover-scale"
            >
              <h3 className="text-lg font-semibold mb-2">{service.name}</h3>
              <p className="text-2xl font-bold mb-4">{service.price} €/mois</p>
              <ul className="space-y-3">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    {feature.includes("Sans pub") ? (
                      <Check className="h-5 w-5 text-green-500" />
                    ) : feature.includes("Avec pub") ? (
                      <X className="h-5 w-5 text-red-500" />
                    ) : (
                      <Check className="h-5 w-5 text-primary" />
                    )}
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default ComparisonSection;