import { Check, Trophy, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Application } from "@/types/application";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface ComparisonResultProps {
  app1: Application | null;
  app2: Application | null;
  winner: Application | null;
  onNewComparison: () => void;
}

export const ComparisonResult = ({
  app1,
  app2,
  winner,
  onNewComparison,
}: ComparisonResultProps) => {
  const renderPricingPlans = (app: Application) => {
    if (!app.pricing_plans?.length) return null;
    
    return (
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="pricing">
          <AccordionTrigger>Plans tarifaires</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              {app.pricing_plans.map((plan: any, index: number) => (
                <div key={index} className="p-3 bg-neutral-50 rounded-lg">
                  <h4 className="font-semibold">{plan.name}</h4>
                  <p className="text-primary font-bold">{plan.price}€/mois</p>
                  <ul className="mt-2 space-y-1">
                    {plan.features?.map((feature: string, idx: number) => (
                      <li key={idx} className="text-sm flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Comparaison des Services</h2>
        <Button variant="outline" onClick={onNewComparison}>
          Nouvelle comparaison
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {[app1, app2].map((app, index) => app && (
          <div
            key={`app-${index}`}
            className="p-6 bg-white rounded-lg border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4 mb-4">
              {app.logo_url && (
                <img 
                  src={app.logo_url} 
                  alt={`Logo ${app.name}`} 
                  className="w-12 h-12 object-contain"
                />
              )}
              <div>
                <h3 className="text-lg font-semibold">{app.name}</h3>
                {app.website_url && (
                  <a 
                    href={app.website_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    Visiter le site
                  </a>
                )}
              </div>
            </div>

            {renderPricingPlans(app)}

            <div className="mt-6 space-y-4">
              <div>
                <h4 className="font-medium mb-2">Fonctionnalités principales</h4>
                <ul className="space-y-2">
                  {Array.isArray(app.features) && app.features.map((feature: string, idx: number) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2 text-green-600">Avantages</h4>
                  <ul className="space-y-2">
                    {Array.isArray(app.pros) && app.pros.map((pro: string, idx: number) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-green-500" />
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2 text-red-600">Inconvénients</h4>
                  <ul className="space-y-2">
                    {Array.isArray(app.cons) && app.cons.map((con: string, idx: number) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <X className="h-4 w-4 text-red-500" />
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {winner && (
        <div className="bg-primary/10 p-6 rounded-lg">
          <div className="flex items-center gap-3 mb-4">
            <Trophy className="h-6 w-6 text-primary" />
            <h3 className="text-lg font-semibold">Application Recommandée</h3>
          </div>
          <p className="text-gray-700">
            Basé sur notre analyse comparative, nous recommandons{" "}
            <span className="font-semibold text-primary">{winner.name}</span> pour les raisons suivantes :
          </p>
          <ul className="mt-3 space-y-2">
            {Array.isArray(winner.pros) && winner.pros.map((pro, index) => (
              <li key={index} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                {pro}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
};