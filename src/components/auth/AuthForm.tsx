import { AuthFormContainer } from "./AuthFormContainer";
import { AuthFormHeader } from "./AuthFormHeader";

export const AuthForm = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-neutral-light">
      <div className="w-full max-w-md space-y-8 glass-card p-8 rounded-xl shadow-lg animate-fade-in">
        <AuthFormHeader 
          title="Ravi de vous revoir"
          description="Connectez-vous pour accéder à votre espace"
        />
        <AuthFormContainer />
      </div>
    </div>
  );
};