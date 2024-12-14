import { useState } from "react";
import { Profile } from "../useProfile";

export const useProfileState = () => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<Profile>({});
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  return {
    user,
    setUser,
    profile,
    setProfile,
    loading,
    setLoading,
    uploading,
    setUploading
  };
};