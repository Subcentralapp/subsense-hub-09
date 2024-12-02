import { Card } from "@/components/ui/card";

const Invoices = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Factures</h1>
      <Card className="p-6">
        <p>Vos factures</p>
      </Card>
    </div>
  );
};

export default Invoices;