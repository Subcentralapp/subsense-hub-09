import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, LogOut, Mail, Calendar, Upload, Pencil } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

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
  const [editing, setEditing] = useState(false);
  const [username, setUsername] = useState("");

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
        
        // Fetch profile data
        const { data: profile } = await supabase
          .from('profiles')
          .select('username, avatar_url')
          .eq('id', user.id)
          .single();
        
        if (profile) {
          setProfile(profile);
          setUsername(profile.username || "");
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

  const updateProfile = async () => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ username })
        .eq('id', user.id);

      if (error) throw error;

      setProfile(prev => ({ ...prev, username }));
      setEditing(false);
      
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
          <div className="flex items-center space-x-4">
            <div className="relative group">
              <Avatar className="h-20 w-20">
                <AvatarImage src={profile.avatar_url} />
                <AvatarFallback>
                  <User className="h-10 w-10" />
                </AvatarFallback>
              </Avatar>
              <label className="absolute bottom-0 right-0 p-1 bg-primary rounded-full cursor-pointer group-hover:scale-110 transition-transform">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={uploadAvatar}
                  disabled={uploading}
                />
                <Upload className="h-4 w-4 text-white" />
              </label>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                {editing ? (
                  <div className="flex items-center gap-2">
                    <Input
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Votre nom d'utilisateur"
                      className="max-w-xs"
                    />
                    <Button onClick={updateProfile} size="sm">Sauvegarder</Button>
                    <Button onClick={() => setEditing(false)} variant="outline" size="sm">Annuler</Button>
                  </div>
                ) : (
                  <>
                    <h1 className="text-2xl font-bold">{profile.username || user.email}</h1>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditing(true)}
                      className="p-2"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>
              <p className="text-muted-foreground">
                Membre depuis le {new Date(user.created_at).toLocaleDateString()}
              </p>
            </div>
            <Button
              variant="outline"
              className="flex items-center space-x-2"
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4" />
              <span>Déconnexion</span>
            </Button>
          </div>
        </Card>

        <Tabs defaultValue="account" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">Compte</TabsTrigger>
            <TabsTrigger value="security">Sécurité</TabsTrigger>
          </TabsList>
          
          <TabsContent value="account" className="space-y-4">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                Informations du compte
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <p className="mt-1">{user.email}</p>
                </div>
                <Separator />
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Date d'inscription</label>
                  <p className="mt-1">{new Date(user.created_at).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</p>
                </div>
                <Separator />
                <div>
                  <label className="text-sm font-medium text-muted-foreground">ID Utilisateur</label>
                  <p className="mt-1 font-mono text-sm">{user.id}</p>
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-4">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Sécurité
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Dernière connexion</label>
                  <p className="mt-1">{new Date(user.last_sign_in_at).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}</p>
                </div>
                <Separator />
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Méthode d'authentification</label>
                  <p className="mt-1 capitalize">{user.app_metadata?.provider || 'Email'}</p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}