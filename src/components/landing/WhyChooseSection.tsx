import { ArrowRight, CheckSquare, Lightbulb, Gift, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const WhyChooseSection = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <CheckSquare className="w-5 h-5 text-primary" />,
      text: "Gérez tout au même endroit : Abonnements centralisés et dépenses suivies"
    },
    {
      icon: <Lightbulb className="w-5 h-5 text-primary" />,
      text: "Simplifiez votre quotidien : Alertes, recommandations et analyses détaillées"
    },
    {
      icon: <Gift className="w-5 h-5 text-primary" />,
      text: "Gratuit à vie pour les 1000 premiers inscrits"
    },
    {
      icon: <Shield className="w-5 h-5 text-primary" />,
      text: "Ultra sécurisé : Vos données protégées avec les standards les plus élevés"
    }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-primary mb-2">
            Pourquoi SubaCentral ?
          </h2>
          <p className="text-lg text-gray-600">
            La seule application dont vous avez vraiment besoin pour vos abonnements.
          </p>
        </div>

        <div className="space-y-4 mb-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-3 bg-neutral-50 p-3 rounded-lg"
            >
              {feature.icon}
              <p className="text-gray-700">{feature.text}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button
            onClick={() => navigate("/auth")}
            className="bg-primary hover:bg-primary/90 text-white px-6 py-2 text-base group"
          >
            Reprenez le contrôle
            <ArrowRight className="ml-2 h-4 w-4 inline-block transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};