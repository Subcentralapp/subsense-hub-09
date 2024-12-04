import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Marie L.",
    role: "Early Supporter",
    content: "J'apprécie particulièrement la transparence et l'approche communautaire. C'est rafraîchissant de voir une startup qui implique réellement ses utilisateurs.",
    avatar: "/lovable-uploads/816a1ebc-09b0-4dd0-903d-bf0b89cf7ba8.png"
  },
  {
    name: "Thomas D.",
    role: "Early Supporter",
    content: "Le concept est génial et le fait de pouvoir participer au développement est vraiment motivant. J'ai hâte de voir l'évolution !",
    avatar: "/lovable-uploads/8e3958b8-cb49-4a9f-8d56-4c994cc8c3f0.png"
  },
  {
    name: "Sophie M.",
    role: "Early Supporter",
    content: "Une approche innovante qui répond vraiment à un besoin. Le prix est très raisonnable pour toutes les fonctionnalités promises.",
    avatar: "/lovable-uploads/bfe15ec1-9826-45c2-9fe8-449d17115639.png"
  }
];

export const TestimonialsSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="mt-20"
    >
      <h3 className="text-2xl font-bold text-center text-primary mb-10">
        Ils nous font confiance
      </h3>
      <div className="grid gap-8 md:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full bg-white/80 backdrop-blur-sm border border-primary/10">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-primary">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">{testimonial.content}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};