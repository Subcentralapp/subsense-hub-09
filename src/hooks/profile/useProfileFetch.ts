import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export const useProfileFetch = () => {
  const { toast } = useToast();

  const fetchUser = async () => {
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;
      return user;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  };

  const fetchProfile = async (userId: string) => {
    try {
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('username, avatar_url')
        .eq('id', userId)
        .single();

      if (profileError) {
        if (profileError.code === 'PGRST116') {
          console.log("No profile found, creating one...");
          const { data: newProfile, error: insertError } = await supabase
            .from('profiles')
            .insert([{ 
              id: userId,
              username: userId
            }])
            .select()
            .single();
            
          if (insertError) throw insertError;
          return newProfile;
        }
        throw profileError;
      }

      return profile;
    } catch (error) {
      console.error("Error fetching profile:", error);
      throw error;
    }
  };

  return {
    fetchUser,
    fetchProfile
  };
};