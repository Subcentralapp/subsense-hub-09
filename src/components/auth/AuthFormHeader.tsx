import { Tabs, TabsContent } from "@/components/ui/tabs";

interface AuthFormHeaderProps {
  title: string;
  description: string;
}

export const AuthFormHeader = ({ title, description }: AuthFormHeaderProps) => {
  return (
    <div className="text-center space-y-4 mb-8">
      <h1 className="text-4xl font-bold tracking-tight text-primary">
        Bienvenue sur SubCentral
      </h1>
      <p className="text-lg text-muted-foreground">
        Simplifiez la gestion de vos abonnements en quelques clics
      </p>
      <Tabs defaultValue="signin">
        <TabsContent value="signin">
          <h2 className="text-2xl font-semibold tracking-tight text-primary">
            {title}
          </h2>
          <p className="text-sm text-muted-foreground mt-2">
            {description}
          </p>
        </TabsContent>
        <TabsContent value="signup">
          <h2 className="text-2xl font-semibold tracking-tight text-primary">
            Créez votre compte
          </h2>
          <p className="text-sm text-muted-foreground mt-2">
            Rejoignez notre communauté et commencez à optimiser vos dépenses
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
};