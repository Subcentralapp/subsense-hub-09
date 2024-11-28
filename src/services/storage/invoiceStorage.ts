import { supabase } from '@/lib/supabase';

export const uploadInvoiceFile = async (file: File) => {
  try {
    console.log('Starting invoice upload:', file.name);
    
    const fileName = `${Date.now()}-${file.name}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('invoices')
      .upload(fileName, file);

    if (uploadError) {
      console.error('Error uploading file:', uploadError);
      throw uploadError;
    }

    console.log('File uploaded successfully:', fileName);

    const { data: { publicUrl } } = supabase.storage
      .from('invoices')
      .getPublicUrl(fileName);

    console.log('Generated public URL:', publicUrl);

    const { data: invoice, error: dbError } = await supabase
      .from('Invoices')
      .insert([
        {
          Names: file.name,
          file_path: fileName,
          url: publicUrl
        }
      ])
      .select()
      .single();

    if (dbError) {
      console.error('Error saving invoice to database:', dbError);
      throw dbError;
    }

    console.log('Invoice saved to database:', invoice);
    return invoice;
  } catch (error) {
    console.error('Error in uploadInvoiceFile:', error);
    throw error;
  }
};

export const deleteInvoiceFile = async (filePath: string) => {
  try {
    console.log('Starting invoice deletion:', filePath);
    
    const { error: storageError } = await supabase.storage
      .from('invoices')
      .remove([filePath]);

    if (storageError) {
      console.error('Error deleting file from storage:', storageError);
      throw storageError;
    }

    console.log('File deleted from storage successfully');

    const { error: dbError } = await supabase
      .from('Invoices')
      .delete()
      .eq('file_path', filePath);

    if (dbError) {
      console.error('Error deleting invoice from database:', dbError);
      throw dbError;
    }

    console.log('Invoice deleted from database successfully');
  } catch (error) {
    console.error('Error in deleteInvoiceFile:', error);
    throw error;
  }
};

export const fetchInvoices = async () => {
  try {
    console.log('Fetching invoices...');
    
    const { data, error } = await supabase
      .from('Invoices')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching invoices:', error);
      throw error;
    }

    console.log('Invoices fetched successfully:', data);
    return data;
  } catch (error) {
    console.error('Error in fetchInvoices:', error);
    throw error;
  }
};