import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useProfileState } from "./profile/useProfileState";
import { useProfileFetch } from "./profile/useProfileFetch";
import { useProfileActions } from "./profile/useProfileActions";

export interface Profile {
  username?: string;
  avatar_url?: string;
}

export const useProfile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, setUser, profile, setProfile, loading, setLoading, uploading, setUploading } = useProfileState();
  const { fetchUser, fetchProfile } = useProfileFetch();
  const { uploadAvatar, updateProfile, handleSignOut } = useProfileActions();

  useEffect(() => {
    const getUser = async () => {
      try {
        const currentUser = await fetchUser();
        
        if (!currentUser) {
          navigate("/auth");
          return;
        }

        setUser(currentUser);
        console.log("Current user:", currentUser);
        
        const userProfile = await fetchProfile(currentUser.id);
        setProfile(userProfile || {});
        
      } catch (error) {
        console.error("Error in getUser:", error);
        if (error.message?.includes('Too many requests')) {
          toast({
            title: "Trop de requêtes",
            description: "Veuillez patienter quelques minutes avant de réessayer.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Erreur",
            description: "Impossible de charger les informations utilisateur",
            variant: "destructive",
          });
        }
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, [navigate, toast]);

  const handleUploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!user) return;
    
    setUploading(true);
    try {
      const publicUrl = await uploadAvatar(event, user.id);
      setProfile(prev => ({ ...prev, avatar_url: publicUrl }));
      
      toast({
        title: "Succès",
        description: "Votre avatar a été mis à jour",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Erreur lors de l'upload de l'avatar",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleUpdateProfile = async (username: string) => {
    if (!user) return;
    
    try {
      await updateProfile(username, user.id);
      setProfile(prev => ({ ...prev, username }));
    } catch (error) {
      console.error('Error in handleUpdateProfile:', error);
    }
  };

  return {
    user,
    profile,
    loading,
    uploading,
    handleSignOut,
    uploadAvatar: handleUploadAvatar,
    updateProfile: handleUpdateProfile
  };
};