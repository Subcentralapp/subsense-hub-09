import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { SignUpFormValues } from "../form-schema";

interface FormFieldsProps {
  form: UseFormReturn<SignUpFormValues>;
  isLoading: boolean;
}

export function FormFields({ form, isLoading }: FormFieldsProps) {
  return (
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
            <FormLabel>Téléphone (optionnel)</FormLabel>
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
  );
}