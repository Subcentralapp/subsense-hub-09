import { motion } from "framer-motion";
import { Lock, Globe, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const SecuritySection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.7 }}
      className="mt-20"
    >
      <h3 className="text-2xl font-bold text-center text-primary mb-10">
        Une application moderne et sécurisée
      </h3>
      <div className="grid gap-6 md:grid-cols-3">
        {[
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
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full bg-white/80 backdrop-blur-sm border border-primary/10">
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
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};