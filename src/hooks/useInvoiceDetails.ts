import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export const useInvoiceDetails = () => {
  return useQuery({
    queryKey: ['invoicedetails'],
    queryFn: async () => {
      console.log('Fetching invoice details...');
      const { data, error } = await supabase
        .from('invoicedetails')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching invoice details:', error);
        return []; // Retourner un tableau vide en cas d'erreur
      }

      console.log('Fetched invoice details:', data);
      return data || [];
    },
    retry: 1,
  });
};