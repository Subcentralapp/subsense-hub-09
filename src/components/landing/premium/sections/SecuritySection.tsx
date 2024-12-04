import { Card, CardContent } from "@/components/ui/card";
import { Lock, Globe, Zap } from "lucide-react";

const securityFeatures = [
  {
    icon: <Lock className="w-6 h-6 text-primary" />,
    title: "Protection des données",
    description: "Standards de sécurité les plus élevés"
  },
  {
    icon: <Globe className="w-6 h-6 text-primary" />,
    title: "Accessibilité totale",
    description: "Compatible mobile, tablette, et ordinateur"
  },
  {
    icon: <Zap className="w-6 h-6 text-primary" />,
    title: "Interface intuitive",
    description: "Simple, rapide, et efficace"
  }
];

export const SecuritySection = () => {
  return (
    <div className="mt-20">
      <h3 className="text-2xl font-bold text-center text-primary mb-10">
        Une application moderne et sécurisée
      </h3>
      <div className="grid gap-6 md:grid-cols-3">
        {securityFeatures.map((item, index) => (
          <Card key={index} className="bg-white/80 backdrop-blur-sm border border-primary/10">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  {item.icon}
                </div>
                <p className="text-gray-700">
                  <span className="font-semibold">{item.title} :</span>
                  <br />{item.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};