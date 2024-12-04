import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "Est-ce vraiment gratuit ?",
    answer: "Oui, SubaCentral est gratuit pour les 1000 premiers inscrits. Vous bénéficiez d'un accès à vie aux fonctionnalités de base, sans carte bancaire requise."
  },
  {
    question: "Que se passe-t-il si le crowdfunding échoue ?",
    answer: "Pas d'inquiétude ! Si l'objectif n'est pas atteint, vous serez intégralement remboursé et continuerez à profiter de l'application gratuitement."
  },
  {
    question: "Quelles fonctionnalités sont disponibles ?",
    answer: "Gestion illimitée d'abonnements, suivi des dépenses, alertes personnalisées, comparaison et recommandations d'applications."
  },
  {
    question: "Quand les fonctionnalités Premium seront-elles disponibles ?",
    answer: "Les fonctionnalités Premium seront débloquées dès que l'objectif de crowdfunding sera atteint. Rejoignez l'aventure pour accélérer leur développement !"
  },
  {
    question: "Pourquoi devenir Early Supporter ?",
    answer: "Vous obtenez un accès Premium pendant un an, un badge exclusif et des réductions à vie, tout en contribuant à l'évolution de l'application."
  }
];

export const FAQSection = () => {
  return (
    <section className="py-8 mt-16 md:mt-20">
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-xl md:text-2xl font-bold text-primary">
          Vous avez des questions ?
        </h2>
        <p className="text-sm md:text-base text-neutral/80">
          Nous avons les réponses.
        </p>
      </div>

      <div className="max-w-2xl mx-auto bg-white/50 backdrop-blur-sm rounded-xl p-4 shadow-lg">
        <Accordion type="single" collapsible className="space-y-2">
          {faqItems.map((item, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`} 
              className="border-b border-neutral/10 last:border-b-0"
            >
              <AccordionTrigger className="text-sm md:text-base font-medium hover:text-primary">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-xs md:text-sm text-neutral/80">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};