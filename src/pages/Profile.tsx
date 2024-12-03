import { Card } from "@/components/ui/card";
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
import { ProfilePageHeader } from "@/components/profile/ProfilePageHeader";
import { useProfile } from "@/hooks/useProfile";

export default function Profile() {
  const {
    user,
    profile,
    loading,
    uploading,
    handleSignOut,
    uploadAvatar,
    updateProfile
  } = useProfile();

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-neutral-light flex items-center justify-center">
        <div className="animate-pulse text-primary">Chargement...</div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-neutral-light">
      <ProfilePageHeader />
      <div className="max-w-4xl mx-auto px-4 space-y-6 animate-fade-in pb-8">
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
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">Compte</TabsTrigger>
            <TabsTrigger value="security">Sécurité</TabsTrigger>
          </TabsList>
          
          <TabsContent value="account" className="space-y-4">
            <AccountInfo user={user} />
          </TabsContent>
          
          <TabsContent value="security" className="space-y-4">
            <SecurityInfo user={user} />
            <PasswordManagement />
            <AccountDeletion />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}