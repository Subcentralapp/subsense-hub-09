import { ArrowRight, FileText, Bell, DollarSign, ChartBar, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const features = [
  {
    icon: <FileText className="w-5 h-5" />,
    title: "Gérez vos abonnements",
    description: "Suivez vos dépenses mensuelles et annuelles",
    free: true,
    premium: true
  },
  {
    icon: <Bell className="w-5 h-5" />,
    title: "Recevez des alertes",
    description: "Rappels pour essais gratuits et échéances",
    free: true,
    premium: true
  },
  {
    icon: <DollarSign className="w-5 h-5" />,
    title: "Recommandations d'économie",
    description: "Définissez un budget et réduisez vos frais",
    free: true,
    premium: true
  },
  {
    icon: <ChartBar className="w-5 h-5" />,
    title: "Analyse claire",
    description: "Catégories, comparaisons, et évolutions de vos dépenses",
    free: true,
    premium: true
  },
  {
    icon: <Settings className="w-5 h-5" />,
    title: "Créez votre stack technique",
    description: "Sélectionnez les apps idéales pour vos besoins",
    free: true,
    premium: true
  }
];

export const FeaturesSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-primary mb-4">
            Fonctionnalités Clés
          </h2>
          <p className="text-xl text-gray-600">
            Gratuit dès aujourd'hui
          </p>
        </div>

        <div className="overflow-x-auto mb-8">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12"></TableHead>
                <TableHead>Fonctionnalité</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-center">Gratuit</TableHead>
                <TableHead className="text-center">Premium</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {features.map((feature, index) => (
                <TableRow key={index}>
                  <TableCell className="text-primary">
                    {feature.icon}
                  </TableCell>
                  <TableCell className="font-medium">
                    {feature.title}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {feature.description}
                  </TableCell>
                  <TableCell className="text-center">
                    {feature.free && "✓"}
                  </TableCell>
                  <TableCell className="text-center">
                    {feature.premium && "✓"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="text-center">
          <Button
            onClick={() => navigate("/auth")}
            className="bg-primary hover:bg-primary/90 text-white px-6 py-2 text-lg group"
          >
            Commencez gratuitement
            <ArrowRight className="ml-2 h-5 w-5 inline-block transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};