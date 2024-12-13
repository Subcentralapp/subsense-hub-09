import { Tabs, TabsContent } from "@/components/ui/tabs";

interface AuthFormHeaderProps {
  title: string;
  description: string;
}

export const AuthFormHeader = ({ title, description }: AuthFormHeaderProps) => {
  return (
    <div className="text-center space-y-2 mb-8">
      <Tabs defaultValue="signin">
        <TabsContent value="signin">
          <h2 className="text-3xl font-bold tracking-tight text-primary">
            Connexion
          </h2>
          <p className="text-sm text-muted-foreground">
            Connectez-vous à votre compte pour continuer
          </p>
        </TabsContent>
        <TabsContent value="signup">
          <h2 className="text-3xl font-bold tracking-tight text-primary">
            Inscription
          </h2>
          <p className="text-sm text-muted-foreground">
            Créez votre compte pour commencer
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
};