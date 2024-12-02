import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Guarantees = () => {
  return (
    <Card className="bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          Nos garanties
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-green-50 rounded-lg">
          <h4 className="font-semibold mb-2">Satisfaction garantie</h4>
          <p className="text-sm text-gray-600">
            Si nous n'atteignons pas notre objectif, vous serez intégralement remboursé
          </p>
        </div>
        <div className="p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold mb-2">Accès garanti</h4>
          <p className="text-sm text-gray-600">
            L'accès gratuit reste disponible quoi qu'il arrive
          </p>
        </div>
        <Button
          size="lg"
          onClick={() => {
            const supportSection = document.getElementById('support-section');
            supportSection?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="w-full"
        >
          Devenir Early Supporter
        </Button>
      </CardContent>
    </Card>
  );
};