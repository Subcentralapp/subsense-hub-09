import { ChevronDown, Wrench, Brain, Users } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

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

export const FeatureGrid = () => {
  return (
    <div className="w-full space-y-4">
      <Accordion type="single" collapsible className="w-full space-y-4">
        {features.map((section, idx) => (
          <AccordionItem
            key={idx}
            value={`section-${idx}`}
            className="border rounded-lg bg-white/50 backdrop-blur-sm"
          >
            <AccordionTrigger className="px-4 py-2 hover:no-underline">
              <div className="flex items-center gap-2 text-lg font-semibold">
                <span>{section.icon}</span>
                <span>{section.category}</span>
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
      <div className="text-sm text-gray-500 text-center animate-bounce">
        <ChevronDown className="w-4 h-4 mx-auto" />
        Cliquez pour voir plus de fonctionnalités
      </div>
    </div>
  );
};