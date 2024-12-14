import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
      "Le mot de passe doit contenir au moins une minuscule, une majuscule, un chiffre et un symbole"
    ),
  displayName: z
    .string()
    .min(2, "Le nom d'affichage doit contenir au moins 2 caractères")
    .max(50, "Le nom d'affichage ne peut pas dépasser 50 caractères"),
  phone: z
    .string()
    .min(10, "Le numéro de téléphone doit contenir au moins 10 chiffres")
    .max(15, "Le numéro de téléphone ne peut pas dépasser 15 chiffres"),
});

interface CustomSignUpFormProps {
  onEmailSent: (email: string) => void;
}

export function CustomSignUpForm({ onEmailSent }: CustomSignUpFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      displayName: "",
      phone: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("📝 Début de l'inscription...");
    setIsLoading(true);
    try {
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            display_name: values.displayName,
            phone: values.phone,
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

        console.log("✉️ Email de confirmation envoyé à:", values.email);
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
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="exemple@email.com"
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mot de passe</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="••••••••"
                    disabled={isLoading}
                  />
                </FormControl>
                <FormDescription className="text-xs text-muted-foreground">
                  Le mot de passe doit contenir :
                  <ul className="list-disc list-inside mt-1">
                    <li>Au moins 8 caractères</li>
                    <li>Au moins une lettre minuscule</li>
                    <li>Au moins une lettre majuscule</li>
                    <li>Au moins un chiffre</li>
                    <li>Au moins un symbole spécial (!@#$%^&*)</li>
                  </ul>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="displayName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom d'affichage</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="John Doe"
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Téléphone</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="tel"
                    placeholder="+33612345678"
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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