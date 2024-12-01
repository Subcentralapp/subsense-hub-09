import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Upload, Pencil, LogOut } from "lucide-react";
import { useState } from "react";

interface ProfileHeaderProps {
  profile: {
    username?: string;
    avatar_url?: string;
  };
  user: any;
  onSignOut: () => Promise<void>;
  onAvatarUpload: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  onUpdateProfile: (username: string) => Promise<void>;
  uploading: boolean;
}

export const ProfileHeader = ({
  profile,
  user,
  onSignOut,
  onAvatarUpload,
  onUpdateProfile,
  uploading
}: ProfileHeaderProps) => {
  const [editing, setEditing] = useState(false);
  const [username, setUsername] = useState(profile.username || "");

  const handleUpdateProfile = async () => {
    await onUpdateProfile(username);
    setEditing(false);
  };

  return (
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
            onChange={onAvatarUpload}
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
              <Button onClick={handleUpdateProfile} size="sm">Sauvegarder</Button>
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
        onClick={onSignOut}
      >
        <LogOut className="h-4 w-4" />
        <span>Déconnexion</span>
      </Button>
    </div>
  );
};