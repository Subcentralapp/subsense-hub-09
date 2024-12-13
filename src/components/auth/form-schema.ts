import { z } from "zod";

export const signUpFormSchema = z.object({
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
    .max(15, "Le numéro de téléphone ne peut pas dépasser 15 chiffres")
    .optional()
    .nullable(),
});

export type SignUpFormValues = z.infer<typeof signUpFormSchema>;