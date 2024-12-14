import { Layout } from "@/components/Layout";

export default function PrivacyPolicy() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 prose prose-sm sm:prose lg:prose-lg max-w-none">
        <h1>Politique de Confidentialité</h1>
        <p>Dernière mise à jour : 14/12/2024</p>

        <p>Chez Gowithia, nous nous engageons à protéger la confidentialité de vos données. Cette politique de confidentialité décrit comment nous collectons, utilisons, protégeons et partageons les informations que vous nous fournissez en utilisant Subcentral.</p>

        <h2>1. Informations collectées</h2>
        <p>Nous collectons les informations suivantes lorsque vous utilisez Subcentral :</p>
        <ul>
          <li>Informations personnelles : nom, adresse e-mail, informations de paiement, etc.</li>
          <li>Informations d'utilisation : historique des abonnements, factures, informations sur les applications.</li>
        </ul>

        <h2>2. Utilisation des données</h2>
        <p>Nous utilisons vos informations pour :</p>
        <ul>
          <li>Gérer vos abonnements et factures.</li>
          <li>Vous fournir des recommandations d'applications.</li>
          <li>Améliorer notre service et l'expérience utilisateur.</li>
        </ul>

        <h2>3. Partage des données</h2>
        <p>Nous ne partageons pas vos données personnelles avec des tiers, sauf dans les cas suivants :</p>
        <ul>
          <li>Avec des prestataires de services qui nous aident à exécuter notre application (par exemple, traitement des paiements).</li>
          <li>Si la loi nous y oblige ou pour protéger nos droits.</li>
        </ul>

        <h2>4. Sécurité des données</h2>
        <p>Nous utilisons des mesures de sécurité pour protéger vos données, y compris le chiffrement des informations sensibles et une communication sécurisée via HTTPS. Cependant, aucune méthode de transmission sur Internet n'est totalement sûre.</p>

        <h2>5. Conservation des données</h2>
        <p>Nous conserverons vos données personnelles aussi longtemps que nécessaire pour remplir les objectifs décrits dans cette politique ou pour répondre à des exigences légales.</p>

        <h2>6. Vos droits</h2>
        <p>Vous avez le droit d'accéder à vos données personnelles, de les corriger, de les supprimer, ou de vous opposer à leur traitement. Pour exercer ces droits, veuillez nous contacter à l'adresse suivante : subcentral@gowithia.fr</p>

        <h2>7. Cookies</h2>
        <p>Nous utilisons des cookies pour améliorer votre expérience sur notre site. Vous pouvez gérer vos préférences de cookies dans les paramètres de votre navigateur.</p>

        <h2>8. Modifications de la politique</h2>
        <p>Nous nous réservons le droit de modifier cette politique de confidentialité. Les modifications seront publiées sur cette page avec la date de la dernière mise à jour.</p>

        <h2>9. Contact</h2>
        <p>Pour toute question concernant cette politique de confidentialité, veuillez nous contacter à : subcentral@gowithia.fr</p>
      </div>
    </Layout>
  );
}