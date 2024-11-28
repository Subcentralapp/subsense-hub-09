import { SupabaseClient } from '@supabase/supabase-js';

export const setupInvoicesBucket = async (supabase: SupabaseClient) => {
  const { data: buckets } = await supabase.storage.listBuckets();
  const invoicesBucket = buckets?.find(b => b.name === 'invoices');
  
  if (!invoicesBucket) {
    console.log('Création du bucket invoices...');
    const { error: bucketError } = await supabase
      .storage
      .createBucket('invoices', { public: true });

    if (bucketError) throw bucketError;
  }
};

export const uploadInvoiceFile = async (supabase: SupabaseClient, file: File) => {
  const fileName = `${Date.now()}-${file.name}`;
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('invoices')
    .upload(fileName, file);

  if (uploadError) throw uploadError;

  const { data: { publicUrl } } = supabase.storage
    .from('invoices')
    .getPublicUrl(fileName);

  return { fileName, publicUrl };
};

export const deleteInvoiceFile = async (supabase: SupabaseClient, filePath: string) => {
  const { error: storageError } = await supabase.storage
    .from('invoices')
    .remove([filePath]);

  if (storageError) throw storageError;
};