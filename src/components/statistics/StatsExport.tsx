import { Button } from "@/components/ui/button";
import { FileDown } from "lucide-react";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";

interface StatsExportProps {
  stats: {
    totalMonthly: number;
    totalYearly: number;
    averagePerSub: number;
    categoryBreakdown: Record<string, number>;
    totalSubscriptions: number;
    trialSubscriptions: number;
  };
}

export const StatsExport = ({ stats }: StatsExportProps) => {
  const exportToPDF = () => {
    const doc = new jsPDF();
    let yPos = 20;

    doc.setFontSize(20);
    doc.text("Rapport des Abonnements", 20, yPos);
    yPos += 20;

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
    
    const generalStats = [
      ["Statistique", "Valeur"],
      ["Total Mensuel", `${stats.totalMonthly.toFixed(2)}€`],
      ["Total Annuel", `${stats.totalYearly.toFixed(2)}€`],
      ["Moyenne par Abonnement", `${stats.averagePerSub.toFixed(2)}€`],
      ["Nombre d'Abonnements", stats.totalSubscriptions],
      ["Abonnements en période d'essai", stats.trialSubscriptions],
    ];
    
    const categoryStats = Object.entries(stats.categoryBreakdown || {}).map(([category, amount]) => [
      category,
      `${Number(amount).toFixed(2)}€`,
    ]);

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
    <div className="flex items-center gap-2 text-sm text-gray-600">
      <Button
        variant="ghost"
        size="sm"
        className="flex items-center gap-1.5 hover:bg-gray-100"
        onClick={exportToPDF}
      >
        <FileDown className="h-3.5 w-3.5" />
        pdf
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="flex items-center gap-1.5 hover:bg-gray-100"
        onClick={exportToExcel}
      >
        <FileDown className="h-3.5 w-3.5" />
        excel
      </Button>
    </div>
  );
};