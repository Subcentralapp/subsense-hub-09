import { ArrowLeft, Check, Trophy, X, Loader2, Star, Zap, Shield, Users, Cpu, HeartHandshake } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Application } from "@/types/application";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";

interface ComparisonResultProps {
  apps: Application[];
  comparisonData: any;
  isLoading: boolean;
  onNewComparison: () => void;
}

export const ComparisonResult = ({
  apps,
  comparisonData,
  isLoading,
  onNewComparison,
}: ComparisonResultProps) => {
  if (isLoading) {
    return (
      <Card className="p-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-lg font-medium text-gray-600">
            Analyse approfondie en cours...
          </p>
        </div>
      </Card>
    );
  }

  const renderScoreCard = (title: string, score: number, icon: React.ReactNode) => (
    <div className="bg-white p-4 rounded-lg border border-gray-100 hover:border-primary/20 transition-all">
      <div className="flex items-center space-x-3 mb-2">
        {icon}
        <h4 className="font-medium text-gray-700">{title}</h4>
      </div>
      <div className="space-y-2">
        <Progress value={score * 10} className="h-2" />
        <p className="text-sm text-gray-500 text-right">{score}/10</p>
      </div>
    </div>
  );

  const renderFeatureComparison = (app: any) => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {renderScoreCard("Expérience Utilisateur", app.userExperienceScore, 
          <Star className="h-5 w-5 text-yellow-500" />
        )}
        {renderScoreCard("Performance", app.performanceMetrics.score, 
          <Cpu className="h-5 w-5 text-blue-500" />
        )}
        {renderScoreCard("Support Client", app.customerSupportQuality.score, 
          <HeartHandshake className="h-5 w-5 text-green-500" />
        )}
      </div>

      <div className="mt-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-3 flex items-center text-green-600">
              <Check className="h-4 w-4 mr-2" />
              Points Forts
            </h4>
            <ul className="space-y-2">
              {app.pros.map((pro: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">{pro}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-3 flex items-center text-red-600">
              <X className="h-4 w-4 mr-2" />
              Points Faibles
            </h4>
            <ul className="space-y-2">
              {app.cons.map((con: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <X className="h-4 w-4 text-red-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">{con}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-neutral-50 p-4 rounded-lg">
          <h4 className="font-medium mb-3 flex items-center">
            <Users className="h-4 w-4 mr-2 text-primary" />
            Public Cible
          </h4>
          <p className="text-sm text-gray-700">{app.targetAudience}</p>
        </div>

        <div className="bg-neutral-50 p-4 rounded-lg">
          <h4 className="font-medium mb-3 flex items-center">
            <Zap className="h-4 w-4 mr-2 text-primary" />
            Cas d'Usage Optimaux
          </h4>
          <ul className="space-y-2">
            {app.bestUseCases.map((useCase: string, idx: number) => (
              <li key={idx} className="text-sm text-gray-700 flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary/60" />
                {useCase}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-neutral-50 p-4 rounded-lg">
          <h4 className="font-medium mb-3 flex items-center">
            <Shield className="h-4 w-4 mr-2 text-primary" />
            Sécurité et Conformité
          </h4>
          <p className="text-sm text-gray-700">{app.securityFeatures.description}</p>
        </div>
      </div>
    </div>
  );

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <Button variant="ghost" onClick={onNewComparison} className="text-primary">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Nouvelle comparaison
        </Button>
      </div>
      
      <div className="space-y-8">
        {apps.map((app, index) => (
          <div key={app.name} className="bg-white rounded-lg border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center space-x-4">
                {app.logo_url && (
                  <img 
                    src={app.logo_url} 
                    alt={`Logo ${app.name}`} 
                    className="w-12 h-12 object-contain"
                  />
                )}
                <div>
                  <h3 className="text-xl font-semibold">{app.name}</h3>
                  <p className="text-sm text-gray-500">{app.category}</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              {comparisonData && renderFeatureComparison(comparisonData[app.name])}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};