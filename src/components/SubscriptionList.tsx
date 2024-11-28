import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";

const SubscriptionList = () => {
  const { data: applications, isLoading } = useQuery({
    queryKey: ['applications'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <div>Chargement des applications...</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Applications disponibles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {applications?.map((app) => (
          <Card key={app.id} className="p-4 hover:shadow-lg transition-shadow">
            <h3 className="font-semibold">{app.name}</h3>
            <p className="text-sm text-muted-foreground">{app.category}</p>
            <p className="mt-2 text-sm">{app.description}</p>
            <p className="mt-2 font-medium">
              {app.price === 0 ? 'Gratuit' : `${app.price} €/mois`}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionList;