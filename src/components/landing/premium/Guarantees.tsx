import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Guarantees = () => {
  return (
    <>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Shield className="w-5 h-5 text-primary" />
          Nos garanties
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-300"
        >
          <h4 className="font-semibold mb-2">Accès garanti</h4>
          <p className="text-sm text-gray-600">
            L'accès gratuit reste disponible quoi qu'il arrive
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-300"
        >
          <h4 className="font-semibold mb-2">Support prioritaire</h4>
          <p className="text-sm text-gray-600">
            Une équipe dédiée à votre écoute
          </p>
        </motion.div>
        <Button
          size="lg"
          onClick={() => {
            const supportSection = document.getElementById('support-section');
            supportSection?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
        >
          Devenir Early Supporter
        </Button>
      </CardContent>
    </>
  );
};