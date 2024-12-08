import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Marie L.",
    role: "Early Supporter",
    content: "J'apprécie particulièrement la transparence et l'approche communautaire. C'est rafraîchissant de voir une startup qui implique réellement ses utilisateurs."
  },
  {
    name: "Thomas D.",
    role: "Early Supporter",
    content: "Le concept est génial et le fait de pouvoir participer au développement est vraiment motivant. J'ai hâte de voir l'évolution !"
  },
  {
    name: "Sophie M.",
    role: "Early Supporter",
    content: "Une approche innovante qui répond vraiment à un besoin. Le prix est très raisonnable pour toutes les fonctionnalités promises."
  }
];

export const TestimonialsSection = () => {
  return (
    <div className="mt-20">
      <h3 className="text-2xl font-bold text-center text-primary mb-10">
        Ils nous font confiance
      </h3>
      <div className="grid gap-8 md:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="bg-white/80 backdrop-blur-sm border border-primary/10">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Star className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-primary">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-600 italic">{testimonial.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};