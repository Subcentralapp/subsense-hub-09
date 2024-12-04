import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const WhyChooseSection = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: "🎯",
      title: "Simplifiez votre quotidien",
      description: "Gérez tous vos abonnements en un seul endroit."
    },
    {
      icon: "💳",
      title: "Gratuit à vie",
      description: "Pour les 1000 premiers inscrits (sans carte bancaire)."
    },
    {
      icon: "📊",
      title: "Prenez le contrôle",
      description: "Suivez vos dépenses, définissez un budget et économisez."
    },
    {
      icon: "🛠",
      title: "Personnalisation",
      description: "Créez votre liste parfaite d'abonnements selon votre profil."
    },
    {
      icon: "🔒",
      title: "Sécurité optimale",
      description: "Données 100% protégées."
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Pourquoi choisir SubaCentral ?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-neutral-100"
            >
              <div className="flex items-start gap-4">
                <span className="text-2xl">{feature.icon}</span>
                <div>
                  <h3 className="font-semibold text-lg text-primary mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button
            onClick={() => navigate("/auth")}
            className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg group h-auto"
          >
            Essayez gratuitement dès maintenant
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};