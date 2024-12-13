import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Form } from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { signUpFormSchema, type SignUpFormValues } from "./form-schema";
import { FormFields } from "./form-fields/FormFields";

interface CustomSignUpFormProps {
  onEmailSent: (email: string) => void;
}

export function CustomSignUpForm({ onEmailSent }: CustomSignUpFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: "",
      password: "",
      displayName: "",
      phone: "",
    },
  });

  const onSubmit = async (values: SignUpFormValues) => {
    console.log("📝 Début de l'inscription...");
    setIsLoading(true);
    try {
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            display_name: values.displayName,
            phone: values.phone || null,
          },
        },
      });

      if (signUpError) {
        console.error("❌ Erreur lors de l'inscription:", signUpError);
        throw signUpError;
      }

      if (signUpData.user) {
        console.log("✅ Inscription réussie, création du profil...");
        
        const { error: profileError } = await supabase
          .from('profiles')
          .update({
            username: values.displayName,
          })
          .eq('id', signUpData.user.id);

        if (profileError) {
          console.error("❌ Erreur lors de la création du profil:", profileError);
          throw profileError;
        }

        console.log("✅ Profil créé avec succès, redirection vers la confirmation email");
        onEmailSent(values.email);
      }
    } catch (error: any) {
      console.error("❌ Erreur:", error);
      toast({
        title: "Erreur lors de l'inscription",
        description: error.message || "Une erreur est survenue",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormFields form={form} isLoading={isLoading} />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Inscription en cours...
            </>
          ) : (
            "S'inscrire"
          )}
        </Button>
      </form>
    </Form>
  );
}