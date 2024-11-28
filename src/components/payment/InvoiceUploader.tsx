import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Upload, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface InvoiceUploaderProps {
  isLoading: boolean;
  onUpload: (file: File) => Promise<void>;
}

const InvoiceUploader = ({ isLoading, onUpload }: InvoiceUploaderProps) => {
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un fichier PDF.",
        variant: "destructive",
      });
      return;
    }

    if (selectedFile.type !== "application/pdf") {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un fichier PDF valide.",
        variant: "destructive",
      });
      return;
    }

    try {
      await onUpload(selectedFile);
      setSelectedFile(null);
      toast({
        title: "Succès",
        description: `${selectedFile.name} a été ajouté avec succès.`,
      });
    } catch (error) {
      console.error("Erreur lors de l'upload:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'upload du fichier.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
      <div className="flex flex-col items-center gap-3">
        <FileText className="h-10 w-10 text-gray-400" />
        <div>
          <p className="text-lg font-medium">Déposez votre facture ici</p>
          <p className="text-sm text-gray-500">Format accepté : PDF</p>
        </div>
        <div className="flex flex-col gap-2">
          <Input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="w-full"
            disabled={isLoading}
          />
          <Button 
            onClick={handleUpload} 
            disabled={isLoading || !selectedFile}
            className="w-full"
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Upload className="mr-2 h-4 w-4" />
            )}
            {selectedFile ? "Uploader le fichier" : "Sélectionner un fichier"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceUploader;