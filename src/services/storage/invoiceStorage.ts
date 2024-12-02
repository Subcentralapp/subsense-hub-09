import { supabase } from "@/integrations/supabase/client";

export const uploadInvoiceFile = async (file: File) => {
  try {
    console.log('Starting invoice upload process:', file.name);
    
    // Clean the filename
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9.]/g, '-');
    const fileName = `${Date.now()}-${cleanFileName}`;
    
    console.log('Generated file name:', fileName);
    
    // 1. Create invoice record first
    const { data: invoice, error: dbError } = await supabase
      .from('invoices')
      .insert([{
        names: file.name,
        created_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (dbError) {
      console.error('Database insert error:', dbError);
      throw dbError;
    }

    console.log('Invoice record created:', invoice);

    // 2. Upload the file
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('invoices')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      console.error('Storage upload error:', uploadError);
      // Clean up the invoice record if file upload fails
      await supabase.from('invoices').delete().eq('id', invoice.id);
      throw uploadError;
    }

    console.log('File uploaded successfully:', uploadData);

    // 3. Get the public URL
    const { data: urlData } = supabase.storage
      .from('invoices')
      .getPublicUrl(fileName);

    if (!urlData?.publicUrl) {
      throw new Error('Failed to generate public URL');
    }

    console.log('Generated public URL:', urlData.publicUrl);

    // 4. Update invoice record with file info
    const { data: updatedInvoice, error: updateError } = await supabase
      .from('invoices')
      .update({
        file_path: fileName,
        url: urlData.publicUrl
      })
      .eq('id', invoice.id)
      .select()
      .single();

    if (updateError) {
      console.error('Error updating invoice with file info:', updateError);
      throw updateError;
    }

    console.log('Invoice updated with file info:', updatedInvoice);
    return updatedInvoice;
  } catch (error) {
    console.error('Error in uploadInvoiceFile:', error);
    throw error;
  }
};

export const deleteInvoiceFile = async (filePath: string) => {
  try {
    console.log('Starting invoice deletion:', filePath);
    
    // Delete from storage first
    const { error: storageError } = await supabase.storage
      .from('invoices')
      .remove([filePath]);

    if (storageError) {
      console.error('Storage deletion error:', storageError);
      throw storageError;
    }

    console.log('File deleted from storage successfully');

    // Delete from database
    const { error: dbError } = await supabase
      .from('invoices')
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
      .from('invoices')
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
