import { Link } from "react-router-dom";
import { Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Description */}
          <div className="space-y-4">
            <p className="text-gray-600 text-sm leading-relaxed">
              Subcentral est l'application tout-en-un qui vous permet de centraliser, gérer et suivre vos abonnements numériques. 
              Comparez vos applications préférées, découvrez de nouvelles options, gérez vos paiements et obtenez des factures 
              directement depuis votre tableau de bord. Simplifiez votre gestion d'abonnements et gardez un œil sur vos finances 
              facilement avec Subcentral.
            </p>
            <div className="flex items-center space-x-2 text-gray-600">
              <Mail className="h-4 w-4" />
              <a href="mailto:subcentral@gowithia.fr" className="text-sm hover:text-primary transition-colors">
                subcentral@gowithia.fr
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="space-y-4 md:text-right">
            <h3 className="font-semibold text-gray-900 mb-4">Mentions légales</h3>
            <nav className="space-y-2">
              <div>
                <Link to="/privacy" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Politique de confidentialité
                </Link>
              </div>
              <div>
                <Link to="/terms" className="text-sm text-gray-600 hover:text-primary transition-colors">
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