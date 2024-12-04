import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="py-16"
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-primary mb-2">
          Vous avez des questions ?
        </h2>
        <p className="text-xl text-neutral/80">
          Nous avons les réponses.
        </p>
      </div>

      <div className="max-w-3xl mx-auto bg-white/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem value="item-1" className="border-b border-neutral/10">
            <AccordionTrigger className="text-lg font-semibold hover:text-primary">
              Est-ce vraiment gratuit ?
            </AccordionTrigger>
            <AccordionContent className="text-neutral/80">
              Oui, SubaCentral est gratuit pour les 1000 premiers inscrits. Vous bénéficiez d'un accès à vie aux fonctionnalités de base, sans carte bancaire requise.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="border-b border-neutral/10">
            <AccordionTrigger className="text-lg font-semibold hover:text-primary">
              Que se passe-t-il si le crowdfunding échoue ?
            </AccordionTrigger>
            <AccordionContent className="text-neutral/80">
              Pas d'inquiétude ! Si l'objectif n'est pas atteint, vous serez intégralement remboursé et continuerez à profiter de l'application gratuitement.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="border-b border-neutral/10">
            <AccordionTrigger className="text-lg font-semibold hover:text-primary">
              Quelles fonctionnalités sont disponibles dès maintenant ?
            </AccordionTrigger>
            <AccordionContent className="text-neutral/80">
              <ul className="list-disc pl-5 space-y-2">
                <li>Gestion illimitée d'abonnements</li>
                <li>Suivi des dépenses</li>
                <li>Alertes personnalisées</li>
                <li>Comparaison et recommandations d'applications</li>
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4" className="border-b border-neutral/10">
            <AccordionTrigger className="text-lg font-semibold hover:text-primary">
              Quand les fonctionnalités Premium seront-elles disponibles ?
            </AccordionTrigger>
            <AccordionContent className="text-neutral/80">
              Les fonctionnalités Premium seront débloquées dès que l'objectif de crowdfunding sera atteint. Rejoignez l'aventure pour accélérer leur développement !
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5" className="border-b border-neutral/10">
            <AccordionTrigger className="text-lg font-semibold hover:text-primary">
              Pourquoi devenir Early Supporter ?
            </AccordionTrigger>
            <AccordionContent className="text-neutral/80">
              Vous obtenez un accès Premium pendant un an, un badge exclusif et des réductions à vie, tout en contribuant à l'évolution de l'application.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </motion.section>
  );
};