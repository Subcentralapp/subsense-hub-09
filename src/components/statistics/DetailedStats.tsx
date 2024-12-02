import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";
import { supabase } from "@/lib/supabase";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";

interface Subscription {
  price: number;
  category?: string;
  is_trial?: boolean;
}

const DetailedStats = () => {
  const { data: subscriptions } = useQuery<Subscription[]>({
    queryKey: ['subscriptions'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;
      return data;
    }
  });

  const stats = {
    totalMonthly: subscriptions?.reduce((sum, sub) => sum + Number(sub.price), 0) || 0,
    totalYearly: (subscriptions?.reduce((sum, sub) => sum + Number(sub.price), 0) || 0) * 12,
    averagePerSub: subscriptions?.length ? 
      (subscriptions.reduce((sum, sub) => sum + Number(sub.price), 0) / subscriptions.length) : 0,
    categoryBreakdown: subscriptions?.reduce((acc: Record<string, number>, sub) => {
      const category = sub.category || 'Non catégorisé';
      acc[category] = (acc[category] || 0) + Number(sub.price);
      return acc;
    }, {}),
    totalSubscriptions: subscriptions?.length || 0,
    trialSubscriptions: subscriptions?.filter(sub => sub.is_trial).length || 0,
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    let yPos = 20;

    // Titre
    doc.setFontSize(20);
    doc.text("Rapport des Abonnements", 20, yPos);
    yPos += 20;

    // Statistiques générales
    doc.setFontSize(12);
    doc.text(`Total Mensuel: ${stats.totalMonthly.toFixed(2)}€`, 20, yPos);
    yPos += 10;
    doc.text(`Total Annuel: ${stats.totalYearly.toFixed(2)}€`, 20, yPos);
    yPos += 10;
    doc.text(`Moyenne par Abonnement: ${stats.averagePerSub.toFixed(2)}€`, 20, yPos);
    yPos += 10;
    doc.text(`Nombre d'Abonnements: ${stats.totalSubscriptions}`, 20, yPos);
    yPos += 10;
    doc.text(`Abonnements en période d'essai: ${stats.trialSubscriptions}`, 20, yPos);
    yPos += 20;

    // Répartition par catégorie
    doc.text("Répartition par Catégorie:", 20, yPos);
    yPos += 10;
    Object.entries(stats.categoryBreakdown || {}).forEach(([category, amount]) => {
      doc.text(`${category}: ${amount.toFixed(2)}€`, 30, yPos);
      yPos += 10;
    });

    doc.save("rapport-abonnements.pdf");
  };

  const exportToExcel = () => {
    const workbook = XLSX.utils.book_new();
    
    // Données générales
    const generalStats = [
      ["Statistique", "Valeur"],
      ["Total Mensuel", `${stats.totalMonthly.toFixed(2)}€`],
      ["Total Annuel", `${stats.totalYearly.toFixed(2)}€`],
      ["Moyenne par Abonnement", `${stats.averagePerSub.toFixed(2)}€`],
      ["Nombre d'Abonnements", stats.totalSubscriptions],
      ["Abonnements en période d'essai", stats.trialSubscriptions],
    ];
    
    // Données par catégorie
    const categoryStats = Object.entries(stats.categoryBreakdown || {}).map(([category, amount]) => [
      category,
      `${Number(amount).toFixed(2)}€`,
    ]);

    // Création des feuilles
    const wsGeneral = XLSX.utils.aoa_to_sheet(generalStats);
    const wsCategory = XLSX.utils.aoa_to_sheet([
      ["Catégorie", "Montant"],
      ...categoryStats,
    ]);

    XLSX.utils.book_append_sheet(workbook, wsGeneral, "Statistiques Générales");
    XLSX.utils.book_append_sheet(workbook, wsCategory, "Répartition Catégories");

    XLSX.writeFile(workbook, "rapport-abonnements.xlsx");
  };

  return (
    <Card className="p-6 bg-white/80 backdrop-blur-md border border-neutral-light shadow-lg space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800">Statistiques Détaillées</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex items-center gap-2 hover:bg-gray-100"
            onClick={exportToPDF}
          >
            <FileDown className="h-4 w-4" />
            PDF
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-2 hover:bg-gray-100"
            onClick={exportToExcel}
          >
            <FileDown className="h-4 w-4" />
            Excel
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg bg-white/50 border border-neutral-light">
          <h3 className="text-lg font-medium mb-2">Coûts</h3>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Total Mensuel: <span className="font-semibold text-primary">{stats.totalMonthly.toFixed(2)}€</span></p>
            <p className="text-sm text-gray-600">Total Annuel: <span className="font-semibold text-primary">{stats.totalYearly.toFixed(2)}€</span></p>
            <p className="text-sm text-gray-600">Moyenne/Abonnement: <span className="font-semibold text-primary">{stats.averagePerSub.toFixed(2)}€</span></p>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-white/50 border border-neutral-light">
          <h3 className="text-lg font-medium mb-2">Abonnements</h3>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Total: <span className="font-semibold text-primary">{stats.totalSubscriptions}</span></p>
            <p className="text-sm text-gray-600">En période d'essai: <span className="font-semibold text-primary">{stats.trialSubscriptions}</span></p>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-white/50 border border-neutral-light">
          <h3 className="text-lg font-medium mb-2">Répartition par Catégorie</h3>
          <div className="space-y-2">
            {Object.entries(stats.categoryBreakdown || {}).map(([category, amount]) => (
              <p key={category} className="text-sm text-gray-600">
                {category}: <span className="font-semibold text-primary">{Number(amount).toFixed(2)}€</span>
              </p>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DetailedStats;