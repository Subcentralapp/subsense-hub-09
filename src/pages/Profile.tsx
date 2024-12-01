import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { AccountInfo } from "@/components/profile/AccountInfo";
import { SecurityInfo } from "@/components/profile/SecurityInfo";
import { PasswordManagement } from "@/components/profile/PasswordManagement";
import { AccountDeletion } from "@/components/profile/AccountDeletion";

interface Profile {
  username?: string;
  avatar_url?: string;
}

export default function Profile() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<Profile>({});
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          navigate("/auth");
          return;
        }
        setUser(user);
        console.log("Current user:", user);
        
        // First try to fetch the profile
        let { data: profile, error } = await supabase
          .from('profiles')
          .select('username, avatar_url')
          .eq('id', user.id)
          .single();
        
        // If there's an error or no profile, create one
        if (error || !profile) {
          console.log("No profile found, creating one...");
          const { data: newProfile, error: insertError } = await supabase
            .from('profiles')
            .insert([{ id: user.id }])
            .select()
            .single();
            
          if (insertError) {
            console.error("Error creating profile:", insertError);
            throw insertError;
          }
          
          profile = newProfile;
        }
        
        if (profile) {
          setProfile(profile);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les informations utilisateur",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, [navigate, toast]);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Déconnexion réussie",
        description: "À bientôt !",
      });
      navigate("/auth");
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la déconnexion",
        variant: "destructive",
      });
    }
  };

  const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('Vous devez sélectionner une image à uploader.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}/${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', user.id);

      if (updateError) {
        throw updateError;
      }

      setProfile(prev => ({ ...prev, avatar_url: publicUrl }));
      
      toast({
        title: "Succès",
        description: "Votre avatar a été mis à jour",
      });
    } catch (error) {
      console.error('Error uploading avatar:', error);
      toast({
        title: "Erreur",
        description: "Erreur lors de l'upload de l'avatar",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const updateProfile = async (username: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ username })
        .eq('id', user.id);

      if (error) throw error;

      setProfile(prev => ({ ...prev, username }));
      
      toast({
        title: "Succès",
        description: "Votre profil a été mis à jour",
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Erreur",
        description: "Erreur lors de la mise à jour du profil",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-neutral-light flex items-center justify-center">
        <div className="animate-pulse text-primary">Chargement...</div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-neutral-light p-4">
      <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
        <Card className="p-6">
          <ProfileHeader
            profile={profile}
            user={user}
            onSignOut={handleSignOut}
            onAvatarUpload={uploadAvatar}
            onUpdateProfile={updateProfile}
            uploading={uploading}
          />
        </Card>

        <Tabs defaultValue="account" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="account">Compte</TabsTrigger>
            <TabsTrigger value="security">Sécurité</TabsTrigger>
            <TabsTrigger value="danger">Zone de danger</TabsTrigger>
          </TabsList>
          
          <TabsContent value="account" className="space-y-4">
            <AccountInfo user={user} />
          </TabsContent>
          
          <TabsContent value="security" className="space-y-4">
            <SecurityInfo user={user} />
            <PasswordManagement />
          </TabsContent>

          <TabsContent value="danger" className="space-y-4">
            <AccountDeletion />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}