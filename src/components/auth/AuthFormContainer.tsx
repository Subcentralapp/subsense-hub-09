import { useState } from "react";
import { CustomSignUpForm } from "./CustomSignUpForm";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { SignInForm } from "./SignInForm";

export const AuthFormContainer = () => {
  const [activeTab, setActiveTab] = useState("signin");
  const [emailSent, setEmailSent] = useState<string | null>(null);

  const handleEmailSent = (email: string) => {
    setEmailSent(email);
    console.log("📧 Email de confirmation envoyé à:", email);
  };

  return (
    <div className="w-full">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="signin">Connexion</TabsTrigger>
          <TabsTrigger value="signup">Inscription</TabsTrigger>
        </TabsList>

        <TabsContent value="signin">
          <SignInForm />
        </TabsContent>

        <TabsContent value="signup">
          {emailSent ? (
            <div className="text-center space-y-4 p-6 bg-green-50 rounded-lg">
              <h3 className="text-lg font-semibold text-green-800">
                Vérifiez votre email
              </h3>
              <p className="text-green-600">
                Un email de confirmation a été envoyé à {emailSent}.<br />
                Cliquez sur le lien dans l'email pour activer votre compte.
              </p>
            </div>
          ) : (
            <CustomSignUpForm onEmailSent={handleEmailSent} />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};