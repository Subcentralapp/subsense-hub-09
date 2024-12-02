import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Steps } from "./Steps";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";

export const OnboardingForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    favorite_subscriptions: [] as string[],
    current_monthly_spend: "",
    target_monthly_budget: "",
    wants_recommendations: true,
    notification_preferences: ["renewal", "suggestions"] as string[],
  });

  const { toast } = useToast();
  const navigate = useNavigate();
  const totalSteps = 3;

  const commonSubscriptions = [
    { id: "netflix", label: "Netflix" },
    { id: "spotify", label: "Spotify" },
    { id: "amazon", label: "Amazon Prime" },
    { id: "apple", label: "Apple Music" },
    { id: "disney", label: "Disney+" },
    { id: "youtube", label: "YouTube Premium" },
  ];

  const handleSubscriptionToggle = (subscription: string) => {
    setFormData(prev => ({
      ...prev,
      favorite_subscriptions: prev.favorite_subscriptions.includes(subscription)
        ? prev.favorite_subscriptions.filter(s => s !== subscription)
        : [...prev.favorite_subscriptions, subscription]
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Erreur",
          description: "Vous devez être connecté pour continuer",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from('user_preferences')
        .insert([
          {
            id: user.id,
            ...formData,
          },
        ]);

      if (error) throw error;

      toast({
        title: "Profil complété !",
        description: "Nous avons personnalisé votre tableau de bord selon vos réponses.",
      });

      navigate("/dashboard");
    } catch (error) {
      console.error("Error saving preferences:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'enregistrement de vos préférences",
        variant: "destructive",
      });
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Quels sont vos abonnements actuels ?</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {commonSubscriptions.map((subscription) => (
                <div key={subscription.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={subscription.id}
                    checked={formData.favorite_subscriptions.includes(subscription.id)}
                    onCheckedChange={() => handleSubscriptionToggle(subscription.id)}
                  />
                  <Label htmlFor={subscription.id}>{subscription.label}</Label>
                </div>
              ))}
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Quel est votre budget mensuel ?</h3>
            <RadioGroup
              value={formData.current_monthly_spend}
              onValueChange={(value) => setFormData(prev => ({ ...prev, current_monthly_spend: value }))}
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="0-20" id="r1" />
                  <Label htmlFor="r1">Moins de 20€</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="20-50" id="r2" />
                  <Label htmlFor="r2">20€ à 50€</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="50-100" id="r3" />
                  <Label htmlFor="r3">50€ à 100€</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="100+" id="r4" />
                  <Label htmlFor="r4">Plus de 100€</Label>
                </div>
              </div>
            </RadioGroup>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Personnalisation</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="recommendations"
                  checked={formData.wants_recommendations}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, wants_recommendations: checked as boolean }))
                  }
                />
                <Label htmlFor="recommendations">Je souhaite recevoir des recommandations personnalisées</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="renewal"
                  checked={formData.notification_preferences.includes("renewal")}
                  onCheckedChange={(checked) => {
                    const newPrefs = checked 
                      ? [...formData.notification_preferences, "renewal"]
                      : formData.notification_preferences.filter(p => p !== "renewal");
                    setFormData(prev => ({ ...prev, notification_preferences: newPrefs }));
                  }}
                />
                <Label htmlFor="renewal">M'alerter avant les renouvellements</Label>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-light flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-6 space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold text-primary">
            Personnalisez votre expérience en quelques clics !
          </h1>
          <p className="text-sm text-muted-foreground">
            Répondez à ces questions rapides pour un tableau de bord adapté à vos besoins.
          </p>
        </div>

        <Progress value={(currentStep / (totalSteps - 1)) * 100} className="h-2" />
        
        <Steps currentStep={currentStep} totalSteps={totalSteps} />

        <div className="min-h-[300px] flex flex-col justify-between">
          <div className="py-4">
            {renderStep()}
          </div>

          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              Précédent
            </Button>

            {currentStep === totalSteps - 1 ? (
              <Button onClick={handleSubmit}>
                Terminer
              </Button>
            ) : (
              <Button onClick={handleNext}>
                Suivant
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};