import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { encryptData, decryptData } from '@/utils/encryption';
import { useToast } from '@/components/ui/use-toast';

export const useEncryptedStorage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const storeEncryptedData = async (
    tableName: string,
    data: any,
    userId: string
  ) => {
    console.log('Storing encrypted data in table:', tableName);
    setIsLoading(true);
    try {
      const encryptedData = encryptData(data, userId);
      const { error } = await supabase
        .from(tableName)
        .insert([{ 
          user_id: userId,
          encrypted_data: encryptedData,
          created_at: new Date().toISOString()
        }]);

      if (error) throw error;

      toast({
        title: "Données sécurisées",
        description: "Vos données ont été chiffrées et stockées en toute sécurité.",
      });
    } catch (error) {
      console.error('Error storing encrypted data:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors du chiffrement des données.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const retrieveEncryptedData = async (
    tableName: string,
    userId: string
  ) => {
    console.log('Retrieving encrypted data from table:', tableName);
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from(tableName)
        .select('encrypted_data')
        .eq('user_id', userId)
        .single();

      if (error) throw error;
      if (!data?.encrypted_data) return null;

      return decryptData(data.encrypted_data, userId);
    } catch (error) {
      console.error('Error retrieving encrypted data:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors du déchiffrement des données.",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    storeEncryptedData,
    retrieveEncryptedData,
    isLoading
  };
};