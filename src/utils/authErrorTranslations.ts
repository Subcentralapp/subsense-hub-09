type ErrorTranslations = {
  [key: string]: string;
};

const authErrorMessages: ErrorTranslations = {
  'invalid_credentials': 'Email ou mot de passe incorrect',
  'Invalid login credentials': 'Email ou mot de passe incorrect',
  'Email not confirmed': 'Veuillez vérifier votre email avant de vous connecter',
  'User not found': 'Aucun utilisateur trouvé avec ces identifiants',
  'Invalid email or password': 'Email ou mot de passe invalide',
  'Email already registered': 'Cet email est déjà enregistré',
  'Email already taken': 'Cet email est déjà utilisé',
  'Password is too short': 'Le mot de passe est trop court',
  'User already registered': 'Cet utilisateur est déjà enregistré',
  'Invalid email': 'Email invalide',
  'Password is too weak': 'Le mot de passe est trop faible',
  'Password must be at least 6 characters': 'Le mot de passe doit contenir au moins 6 caractères',
  'Email is required': 'L\'email est requis',
  'Password is required': 'Le mot de passe est requis',
};

export const translateAuthError = (error: string): string => {
  console.log("Message d'erreur original:", error);
  const translation = authErrorMessages[error] || error;
  console.log("Message traduit:", translation);
  return translation;
};