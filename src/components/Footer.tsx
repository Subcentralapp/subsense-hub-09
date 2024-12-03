import { Instagram, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="w-full bg-neutral-light mt-auto">
      <div className="container mx-auto px-4">
        {/* Ligne décorative ondulée */}
        <div className="w-full h-4 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 1440 320%22%3E%3Cpath fill=%22%23ffffff%22 d=%22M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,208C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z%22%3E%3C/path%3E%3C/svg%3E')] bg-repeat-x"></div>
        
        {/* Contenu du footer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8">
          {/* Colonne de gauche */}
          <div className="text-center md:text-left">
            <h3 className="font-bold text-lg mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li><Link to="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link></li>
              <li><Link to="/profile" className="hover:text-primary transition-colors">Profil</Link></li>
              <li><Link to="/subscriptions" className="hover:text-primary transition-colors">Abonnements</Link></li>
            </ul>
          </div>

          {/* Colonne du milieu */}
          <div className="text-center">
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-2 rounded-full transition-colors">
              Réserver un appel
            </button>
          </div>

          {/* Colonne de droite */}
          <div className="text-center md:text-right">
            <h3 className="font-bold text-lg mb-4">Suivez-nous</h3>
            <div className="flex justify-center md:justify-end space-x-4">
              <a href="#" className="hover:text-primary transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 py-4 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Tous droits réservés</p>
        </div>
      </div>
    </footer>
  );
}