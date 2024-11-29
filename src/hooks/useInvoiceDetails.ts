import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export const useInvoiceDetails = () => {
  return useQuery({
    queryKey: ['invoiceDetails'],
    queryFn: async () => {
      console.log('Fetching invoice details...');
      const { data, error } = await supabase
        .from('invoicedetails')  // Changed from 'InvoiceDetails' to 'invoicedetails'
        .select('*');
      
      if (error) {
        console.error('Error fetching invoice details:', error);
        throw error;
      }
      console.log('Fetched invoice details:', data);
      return data;
    }
  });
};