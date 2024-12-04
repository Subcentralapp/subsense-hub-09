import { motion } from "framer-motion";
import { ArrowRight, Gift, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const ConclusionSection = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="mt-20 text-center"
    >
      <h3 className="text-3xl font-bold text-primary mb-8">
        Centralisez. Économisez. Simplifiez.
      </h3>
      <div className="space-y-3 mb-8">
        <div className="flex items-center justify-center gap-2 text-lg">
          <Gift className="w-5 h-5 text-primary" />
          <span>Gratuit à vie pour les 1000 premiers inscrits</span>
        </div>
        <div className="flex items-center justify-center gap-2 text-lg">
          <Rocket className="w-5 h-5 text-primary" />
          <span>Accès Premium Early Supporter : 19,99€/an</span>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          size="lg"
          onClick={() => navigate("/auth")}
          className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 group"
        >
          Commencer gratuitement
          <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
        </Button>
        <Button
          size="lg"
          variant="outline"
          onClick={() => navigate("/auth")}
          className="text-lg px-8 py-6 border-2 hover:bg-primary/5 group"
        >
          Devenir Early Supporter
          <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </motion.div>
  );
};