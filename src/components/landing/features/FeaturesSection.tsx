import { ArrowRight, Wrench, Brain, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const features = [
  {
    category: "🛠 Gestion et Suivi",
    icon: <Wrench className="w-5 h-5" />,
    features: [
      {
        name: "Gestion d'abonnements illimitée",
        free: true,
        premium: true,
      },
      {
        name: "Suivi des dépenses (simple)",
        free: true,
        premium: true,
      },
      {
        name: "Statistiques détaillées",
        free: true,
        premium: true,
      },
      {
        name: "Téléchargement de factures",
        free: true,
        premium: true,
      },
    ],
  },
  {
    category: "💡 Personnalisation et Découverte",
    icon: <Brain className="w-5 h-5" />,
    features: [
      {
        name: "Comparaison d'applications",
        free: true,
        premium: true,
      },
      {
        name: "Recommandations personnalisées",
        free: true,
        premium: true,
      },
      {
        name: "Création de votre stack technique",
        free: true,
        premium: true,
      },
    ],
  },
  {
    category: "🤖 Automatisation et Avancées Premium",
    icon: <Users className="w-5 h-5" />,
    features: [
      {
        name: "Ajout automatique d'abonnements",
        free: false,
        premium: true,
      },
      {
        name: "Résiliation d'abonnements",
        free: false,
        premium: true,
      },
      {
        name: "Analyse automatique des factures avec OCR",
        free: false,
        premium: true,
      },
      {
        name: "Gestion multi-comptes",
        free: false,
        premium: true,
      },
      {
        name: "Réductions sur abonnements partenaires",
        free: false,
        premium: true,
      },
      {
        name: "Intégrations avancées (API, Slack, etc.)",
        free: false,
        premium: true,
      },
    ],
  },
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

        <div className="w-full space-y-4">
          <Accordion type="single" collapsible defaultValue="section-0" className="w-full space-y-4">
            {features.map((section, idx) => (
              <AccordionItem
                key={idx}
                value={`section-${idx}`}
                className="border rounded-lg bg-white/50 backdrop-blur-sm group"
              >
                <AccordionTrigger className="px-4 py-2 hover:no-underline">
                  <div className="flex items-center gap-2 text-lg font-semibold">
                    <span>{section.icon}</span>
                    <span>{section.category}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <span className="hidden group-data-[state=closed]:inline-flex">
                      Découvrir les fonctionnalités
                    </span>
                    <ArrowRight className="w-4 h-4 transition-transform group-data-[state=open]:rotate-90" />
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Fonctionnalité</TableHead>
                        <TableHead className="w-[100px] text-center">Gratuit</TableHead>
                        <TableHead className="w-[100px] text-center">Premium</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {section.features.map((feature, featureIdx) => (
                        <TableRow key={featureIdx}>
                          <TableCell className="font-medium">{feature.name}</TableCell>
                          <TableCell className="text-center">
                            {feature.free ? (
                              <span className="text-green-500">✓</span>
                            ) : (
                              <span className="text-red-500">✗</span>
                            )}
                          </TableCell>
                          <TableCell className="text-center">
                            <span className="text-green-500">✓</span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center mt-8">
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