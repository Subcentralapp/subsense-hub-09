import { supabase } from '@/lib/supabase';

export const uploadInvoiceFile = async (file: File) => {
  try {
    console.log('Starting invoice upload process:', file.name);
    
    // Générer un nom de fichier unique en retirant les caractères spéciaux
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9.]/g, '-');
    const fileName = `${Date.now()}-${cleanFileName}`;
    
    console.log('Generated file name:', fileName);
    
    // Upload du fichier dans le bucket Supabase avec des options minimales
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('invoices')
      .upload(fileName, file);

    if (uploadError) {
      console.error('Storage upload error:', uploadError);
      throw uploadError;
    }

    console.log('File uploaded successfully:', uploadData);

    // Récupérer l'URL publique du fichier
    const { data: urlData } = supabase.storage
      .from('invoices')
      .getPublicUrl(fileName);

    if (!urlData?.publicUrl) {
      throw new Error('Failed to generate public URL');
    }

    console.log('Generated public URL:', urlData.publicUrl);

    // Enregistrer les informations dans la base de données
    const { data: invoice, error: dbError } = await supabase
      .from('Invoices')
      .insert([
        {
          Names: file.name,
          file_path: fileName,
          url: urlData.publicUrl,
          created_at: new Date().toISOString()
        }
      ])
      .select()
      .single();

    if (dbError) {
      console.error('Database insert error:', dbError);
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
    
    // Supprimer le fichier du stockage
    const { error: storageError } = await supabase.storage
      .from('invoices')
      .remove([filePath]);

    if (storageError) {
      console.error('Storage deletion error:', storageError);
      throw storageError;
    }

    console.log('File deleted from storage successfully');

    // Supprimer l'entrée de la base de données
    const { error: dbError } = await supabase
      .from('Invoices')
      .delete()
      .eq('file_path', filePath);

    if (dbError) {
      console.error('Database deletion error:', dbError);
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
    console.log('Fetching invoices from database...');
    
    const { data, error } = await supabase
      .from('Invoices')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Database fetch error:', error);
      throw error;
    }

    console.log('Invoices fetched successfully:', data);
    return data;
  } catch (error) {
    console.error('Error in fetchInvoices:', error);
    throw error;
  }
};