import { Link } from "react-router-dom";
import { Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-white to-gray-50 border-t mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Description */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Simplifiez votre vie numérique
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Subcentral est l'application tout-en-un qui vous permet de centraliser, gérer et suivre vos abonnements numériques. 
              Comparez vos applications préférées, découvrez de nouvelles options, gérez vos paiements et obtenez des factures 
              directement depuis votre tableau de bord. Simplifiez votre gestion d'abonnements et gardez un œil sur vos finances 
              facilement avec Subcentral.
            </p>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-primary" />
              <a 
                href="mailto:subcentral@gowithia.fr" 
                className="text-sm text-primary hover:text-primary/80 transition-colors font-medium"
              >
                subcentral@gowithia.fr
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="space-y-4 md:text-right">
            <h3 className="font-semibold text-gray-900 mb-4">Mentions légales</h3>
            <nav className="space-y-2">
              <div>
                <Link 
                  to="/privacy" 
                  className="inline-flex px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-full text-sm font-medium transition-colors"
                >
                  Politique de confidentialité
                </Link>
              </div>
              <div>
                <Link 
                  to="/terms" 
                  className="inline-flex px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-full text-sm font-medium transition-colors"
                >
                  Conditions générales d'utilisation
                </Link>
              </div>
            </nav>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Subcentral - Tous droits réservés</p>
        </div>
      </div>
    </footer>
  );
}